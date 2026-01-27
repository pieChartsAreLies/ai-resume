# Skills: Homelab Modern Data Stack (Technical Depth Proof)

---
category: skills
subcategory: technical_depth
tags: [airflow, dbt, duckdb, postgres, self-hosted, modern-data-stack, cost-optimization]
date_range: 2025-01 to present
relevance_to_vp_role: high
sanitization_status: public
---

# Skills: Homelab Modern Data Stack

**Purpose:** Demonstrate hands-on technical depth with modern data stack outside of work
**Status:** Production-ready, running hourly since January 2025
**Cost:** $0/month infrastructure (self-hosted on Proxmox)

## Executive Summary

Built a production-grade analytics platform on self-hosted infrastructure to stay sharp on the modern data stack. The homelab runs Postgres (operational database), dbt (transformation layer), DuckDB (analytical database), and Airflow (orchestration) across three LXC containers with proper networking, credentials management, and observability.

**Why This Matters:** When I say "I'm deeply technical," this is the proof. I don't just read about dbt and Airflow—I run them in production at home, debug SSH connection issues, manage Postgres authentication, and write orchestration DAGs. This isn't tutorial-following; it's production infrastructure operations scaled down.

---

## Architecture Overview

### Infrastructure Stack

**Hosting:** Proxmox VE (Type 1 hypervisor running on personal hardware)

**Containers (LXC):**
1. **postgres-data** (192.168.2.67) - Operational database
   - PostgreSQL 16
   - 1 vCPU, 2GB RAM
   - Hosts: project_data (raw data) + airflow_metadata (Airflow backend)

2. **analytics-platform** (192.168.2.68) - Transformation layer
   - dbt + DuckDB
   - 2 vCPU, 4GB RAM
   - Python virtual environment with modern stack dependencies

3. **airflow-orchestration** (192.168.2.69) - Workflow orchestration
   - Apache Airflow 2.x
   - 2 vCPU, 4GB RAM
   - Runs scheduler + webserver in tmux sessions

### Data Flow

```
External API (OpenWeather)
    ↓
Airflow schedules hourly job (192.168.2.69)
    ↓
SSH to analytics-platform → Python script fetches weather
    ↓
Writes raw JSON to Postgres (192.168.2.67)
    ↓
Airflow triggers dbt transformation
    ↓
dbt reads from Postgres via postgres_scanner
    ↓
dbt writes transformed data to DuckDB (192.168.2.68)
    ↓
Query layer: DuckDB optimized for analytics
```

---

## Technical Implementation Details

### 1. Database Architecture

**Why Two Databases?**

**Postgres (Operational):**
- Row-oriented storage
- Optimized for writes (INSERT/UPDATE/DELETE)
- Landing zone for API data
- Mirrors production operational databases

**DuckDB (Analytical):**
- Column-oriented storage
- 10-100x faster for analytical queries (aggregations, scans)
- Stores transformed, analysis-ready data
- Mirrors Snowflake/BigQuery pattern at zero cost

**This mirrors enterprise patterns:**
- Production: Postgres/MySQL → dbt → Snowflake/BigQuery/Redshift
- Homelab: Postgres → dbt → DuckDB

### 2. Transformation Layer (dbt)

**Configuration:**
- dbt-core 1.7+ with dbt-duckdb adapter
- Version-controlled models in `/root/analytics-platform/dbt/analytics_project`
- Sources defined in `sources.yml` (Postgres tables)
- Transformations written as SQL with Jinja templating
- Uses `postgres_scanner` extension to read from remote Postgres

**Example Model (stg_weather.sql):**
```sql
{{ config(materialized='view') }}

SELECT
    id,
    city,
    ingested_at,
    (data->>'dt')::bigint AS observation_timestamp,
    (data->'main'->>'temp')::numeric AS temperature_f,
    (data->'main'->>'humidity')::int AS humidity_pct,
    (data->'main'->>'pressure')::int AS pressure_hpa,
    (data->'weather'->0->>'description')::text AS weather_description,
    (data->'wind'->>'speed')::numeric AS wind_speed_mph
FROM {{ source('raw', 'weather_observations') }}
```

**Key dbt Features Demonstrated:**
- Source definitions (external table references)
- Jinja templating (`{{ source() }}`, `{{ config() }}`)
- JSON parsing (Postgres jsonb operations)
- Materialization strategies (view vs. table)
- Cross-database transformations (read Postgres, write DuckDB)

### 3. Orchestration (Airflow)

**Configuration:**
- Backend database: PostgreSQL on separate LXC (not SQLite)
- Web UI: http://192.168.2.69:8080
- Runs in tmux sessions (scheduler + webserver)
- SSH-based task execution to analytics-platform

**DAG Structure (weather_ingestion_pipeline):**

```python
default_args = {
    'owner': 'airflow',
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

dag = DAG(
    'weather_ingestion_pipeline',
    default_args=default_args,
    schedule_interval='@hourly',  # Runs every hour at :00
    catchup=False,
)

fetch_weather = BashOperator(
    task_id='fetch_weather_data',
    bash_command='ssh root@192.168.2.68 "cd /root/analytics-platform/scripts && python3 ingest_weather.py"',
    dag=dag,
)

run_dbt = BashOperator(
    task_id='run_dbt_transformation',
    bash_command='ssh root@192.168.2.68 "source /root/analytics-platform/venv/bin/activate && cd /root/analytics-platform/dbt/analytics_project && export POSTGRES_PASSWORD=\'password\' && dbt run"',
    dag=dag,
)

fetch_weather >> run_dbt  # Sequential dependency
```

**Production Patterns Demonstrated:**
- Retry logic with exponential backoff
- Environment variable management for credentials
- SSH-based remote execution (like Kubernetes/ECS exec)
- Task dependencies (DAG creation)
- Schedule intervals (cron-like syntax)

### 4. Networking & Security

**Network Configuration:**
- Private subnet (192.168.2.x)
- Postgres configured with pg_hba.conf to allow specific IPs:
  ```
  host  all  analytics      192.168.2.68/32  scram-sha-256
  host  all  airflow_admin  192.168.2.69/32  scram-sha-256
  ```
- SSH key-based authentication (no passwords)
- Environment variables for database credentials (not hardcoded)

**Security Practices:**
- Principle of least privilege (Airflow can't write to Postgres, only read)
- Separate users per service (analytics, airflow_admin)
- SSH authorized_keys controls who can access what
- Virtual environments isolate Python dependencies

---

## Production-Grade Features

### 1. Observability

**Logging:**
- Airflow task logs: `/home/airflow/airflow/logs/`
- Postgres logs: `/var/log/postgresql/`
- dbt run logs: Stored in `target/` directory

**Monitoring:**
- Airflow Web UI shows DAG run history, task success/failure
- tmux sessions allow real-time log viewing
- PostgreSQL `pg_stat_activity` for connection monitoring

### 2. Reliability

**Retry Logic:**
- Airflow configured with 1 retry, 5-minute delay
- If API call fails (rate limit, network issue), automatically retries

**Idempotency:**
- dbt models use `CREATE OR REPLACE VIEW` (safe to rerun)
- Weather ingestion appends data (no deletes)

**Failure Handling:**
- Airflow Web UI alerts on failed tasks
- Email notifications possible (not configured yet)

### 3. Scalability

**Current Limits:**
- DuckDB handles datasets up to ~100GB efficiently
- Postgres can scale to ~1TB before needing optimization
- Airflow can scale horizontally with worker nodes

**Migration Path:**
- When data exceeds DuckDB limits → migrate to Snowflake/ClickHouse
- When Airflow needs scaling → add worker LXCs with Celery executor
- Architecture designed to mirror cloud-native patterns

---

## Skills Demonstrated

### Technical Proficiency

**Infrastructure:**
- Proxmox VE (Type 1 hypervisor management)
- LXC container creation and networking
- Linux systems administration (Ubuntu 24.04)
- SSH key management and authentication
- tmux for persistent sessions

**Data Engineering:**
- dbt (SQL transformations, Jinja templating, source definitions)
- Airflow (DAG authoring, BashOperator, task dependencies)
- PostgreSQL (database administration, user management, pg_hba.conf)
- DuckDB (analytical database, postgres_scanner extension)
- Python (API calls, JSON parsing, psycopg2 database connections)

**DevOps:**
- Virtual environment management (Python venv)
- Environment variable handling for secrets
- Service management (systemctl for Postgres)
- Process management (tmux for long-running services)
- Troubleshooting (reading logs, debugging SSH issues)

### Design Principles

**Cost Optimization:**
- $0/month infrastructure cost (self-hosted vs. cloud)
- DuckDB instead of Snowflake for small workloads
- Single-node Postgres instead of managed RDS

**Separation of Concerns:**
- Operational database (Postgres) separate from analytical (DuckDB)
- Orchestration layer (Airflow) separate from execution (analytics-platform)
- Clear boundaries between ingestion, transformation, storage

**Production Patterns at Scale:**
- Same architecture used at Chewy/Babylist, just smaller scale
- Version-controlled transformations (dbt models as code)
- Orchestrated pipelines with retry logic
- Credential management (environment variables, not hardcoded)

---

## Interview Talking Points

### When Asked: "How hands-on are you?"

**My Answer:**
"I'll be candid: my SQL skills are a shadow of what they used to be. I haven't been an individual contributor in years, and that's not where I'm heading.

That said, I run a homelab to stay sharp on the modern data stack. I have Postgres, dbt, DuckDB, and Airflow running across three LXC containers with proper networking and orchestration. It's pulling weather data hourly, transforming it with dbt, and writing to DuckDB for analytics.

I can read dbt code, review SQL transformations, debug Airflow DAG failures, and make architecture decisions. But I'm not writing every model myself anymore—I'm leading teams who execute. The homelab keeps me technically credible without being tactically hands-on."

### When Asked: "Are you familiar with [modern data stack tool]?"

**My Framework:**

| Tool | Experience Level | Context |
|------|------------------|---------|
| **dbt** | Proficient | Running in homelab, reviewed 100+ models at Babylist |
| **Airflow** | Proficient | Running in homelab, architected at Chewy (replaced custom scheduler) |
| **Snowflake** | Expert | 5+ years production use, cost optimization, data sharing |
| **DuckDB** | Proficient | Homelab implementation, understand columnar storage advantages |
| **Postgres** | Advanced | Homelab + production use, understand pg_hba.conf, user management |
| **Kafka** | Advanced | Built event streaming platform at Chewy (replaced Segment) |
| **Kubernetes** | Familiar | Haven't run in production, but understand orchestration concepts |

**Honest Assessment:**
"I have deep expertise in Snowflake, Airflow, and dbt from production use. I'm proficient in DuckDB and Postgres from my homelab. I understand Kafka architecture from building event streaming at Chewy. I haven't used Kubernetes in production, but I understand the orchestration patterns—it's on my homelab roadmap."

### When Asked: "What are you learning right now?"

**My Answer:**
"I'm currently running a homelab with the modern data stack—Postgres, dbt, DuckDB, and Airflow. The latest thing I'm exploring is DuckDB as a Snowflake replacement for smaller analytical workloads. It's columnar storage, handles datasets up to 100GB efficiently, and costs $0 infrastructure.

The architecture mirrors what I built at Chewy and Babylist: operational database (Postgres) → transformation layer (dbt) → analytical database (DuckDB). It keeps me sharp on real infrastructure operations—SSH debugging, credential management, orchestration patterns—not just reading documentation."

---

## Gaps & Honest Limitations

**What I Don't Have in Homelab (Yet):**
- Kubernetes orchestration (using LXC instead)
- Real-time streaming (Kafka/Flink)
- Data lake layer (MinIO/S3-compatible storage)
- Visualization layer (Metabase/Superset)
- CI/CD for dbt (GitHub Actions)
- Monitoring (Prometheus/Grafana)

**What I Don't Claim Expertise In:**
- Kubernetes production operations (understand concepts, haven't run)
- Real-time ML model serving (batch yes, streaming no)
- Spark production tuning (understand architecture, haven't optimized at scale)
- Advanced Airflow (haven't used Celery executor, XComs extensively)

**My Approach to Gaps:**
"I'm honest about what I don't know. If you need Kubernetes expertise, I'll learn it or hire someone who knows it better than me. But I understand orchestration patterns deeply—Airflow, Docker Compose, LXC containers—so the concepts translate. I'd rather admit a gap and fill it than claim universal expertise."

---

## Future Enhancements

**Immediate Next Steps:**
- Add data quality tests to dbt models (schema tests, custom tests)
- Create marts layer with business logic (currently only staging)
- Set up Metabase/Superset for visualization
- Add email/Slack alerting on Airflow failures
- Implement incremental dbt models (process only new data)

**Advanced Features:**
- Add Kafka for real-time streaming (migrate from hourly batch)
- Implement data lake layer with MinIO (S3-compatible storage)
- Add CI/CD pipeline for dbt (GitHub Actions on PR merge)
- Monitor with Prometheus/Grafana (infrastructure metrics)
- Snapshot weather data with dbt (track historical changes)

**Architecture Evolution:**
- Separate ingestion scripts into dedicated LXC (isolate concerns)
- Add message queue between ingestion and storage (decouple services)
- Migrate DuckDB to ClickHouse when data exceeds 100GB
- Add Kubernetes cluster for container orchestration learning

---

## Cost Analysis

### Current Cost: $0/month

**Hardware:**
- Proxmox host: Personal hardware (sunk cost)
- Electricity: ~$15/month for entire homelab (not just data stack)
- Internet: Existing residential connection

**Equivalent Cloud Cost (AWS):**
- RDS Postgres (db.t3.small): ~$30/month
- EC2 for Airflow (t3.medium): ~$30/month
- EC2 for analytics (t3.medium): ~$30/month
- Data transfer: ~$10/month
- **Total: ~$100/month or $1,200/year**

**Learning from Cost Optimization:**
- DuckDB is a legitimate Snowflake alternative for small datasets
- Self-hosting makes sense for dev/test environments
- Understanding infrastructure tradeoffs (cost vs. operational burden)

---

## Related Content

- See `career_chewy.md` for production-scale platform work
- See `career_babylist.md` for modern stack implementation
- See `philosophy_build_vs_buy.md` for DuckDB vs. Snowflake decision framework
- See `skills_data_platforms.md` for Snowflake/Redshift expertise
- See `INTERVIEW_TALKING_POINTS.md` for "How hands-on are you?" response
