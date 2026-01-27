# Skills: Modern Data Platforms & Warehousing

---
category: skills
subcategory: data_platforms
tags: [snowflake, redshift, bigquery, vertica, data-warehouse, cloud-architecture]
date_range: 2015-present
relevance_to_vp_role: high
sanitization_status: reviewed
---

# Skills: Cloud Data Platforms & Warehousing

## Overview

Deep expertise in modern cloud data warehousing spanning architecture, cost optimization, governance, and performance tuning at petabyte scale. Hands-on experience across multiple platforms (Snowflake, Redshift, BigQuery, Vertica) with strategic focus on Total Cost of Ownership (TCO), operational simplicity, and team productivity rather than raw performance benchmarks.

I evaluate data platforms through a **"build sustainable systems"** lens: What's the TCO over 3 years? Can the team operate it without heroics? Does it enable or constrain future growth?

---

## Platform Experience Matrix

| Platform | Experience Level | Years | Scale | Primary Use Cases |
|----------|-----------------|-------|-------|-------------------|
| **Snowflake** | Expert | 5+ years | Multi-TB | Primary warehouse at Chewy & Babylist |
| **Amazon Redshift** | Advanced | 4 years | Petabyte | Legacy at Chewy, migrated away |
| **Vertica (on-prem)** | Advanced | 3 years | Hundreds of TB | Legacy at Chewy, decommissioned |
| **BigQuery** | Proficient | 2 years | TB scale | Evaluation, cross-cloud comparisons |
| **PostgreSQL** | Proficient | 8+ years | GB-TB | Operational databases, feature stores |

---

## Snowflake: Deep Dive

### Competency Level: Expert

**Context of Usage:**
Primary data warehouse at both Chewy (Fortune 500, petabyte-scale) and Babylist (pre-IPO unicorn, multi-terabyte). Responsibilities included architecture design, warehouse sizing strategy, cost optimization, governance frameworks, and performance tuning.

### Specific Accomplishments

**1. Cost Optimization (Babylist)**
- Reduced Snowflake compute costs by 30% (~$145K annually) through systematic optimization
- **Approach:**
  - Implemented query profiling dashboards showing cost-per-query and cost-per-team
  - Right-sized warehouses based on actual concurrency patterns (many teams over-provisioned)
  - Introduced clustering keys on high-traffic tables reducing scan volumes by 60%
  - Created materialized views for frequently-joined dimension tables
  - Established Resource Monitors with automatic suspension to prevent runaway queries

**2. Multi-Cluster Warehouse Strategy (Chewy)**
- Architected isolation strategy serving 200+ data consumers with 99.9% uptime
- **Design:**
  - Separate warehouses for: (1) BI/reporting, (2) Data science/ML, (3) ETL/batch processing, (4) Ad-hoc analysis
  - Auto-scaling configuration: BI warehouse scaled 2-8 clusters based on queue depth
  - Query tagging by team/project enabled cost attribution and chargeback conversations
- **Outcome:** Eliminated "noisy neighbor" problems where heavy ML queries impacted dashboard performance

**3. Zero-Copy Cloning for Dev/Test (Chewy)**
- Implemented zero-copy cloning strategy reducing development environment costs by 40%
- **Pattern:**
  - Production database cloned nightly to `PROD_SNAPSHOT`
  - Developers clone from snapshot (not prod) → instant, no storage cost until writes occur
  - Automated cleanup: clones >7 days old automatically dropped
- **Result:** Developers got production-scale data without impacting prod or exploding storage costs

**4. Data Sharing for External Vendors (Chewy)**
- Designed secure data sharing model enabling vendors to query Chewy data without data movement
- **Use Case:** Supply chain vendors needed real-time inventory visibility
- **Implementation:**
  - Created dedicated database with views (no direct table access)
  - Row-level security via Snowflake's row access policies
  - Audit logging captured all vendor queries for compliance
- **Business Value:** Enabled $10M+ in vendor analytics revenue

### Advanced Features Used

**Performance Optimization:**
- Clustering keys on high-cardinality columns (e.g., `event_date`, `user_id`)
- Search optimization service for point lookups
- Materialized views for complex aggregations
- Result caching strategies (24-hour cache for static queries)

**Governance & Security:**
- Role-based access control (RBAC) with 50+ roles mapped to AD groups
- Column-level encryption for PII/PHI fields
- Dynamic data masking for sensitive columns
- Network policies restricting access to specific IP ranges

**Cost Management:**
- Resource Monitors with quota alerts and automatic suspension
- Query profiling and cost attribution by team/project
- Automated warehouse suspension (5-minute idle timeout)
- Storage lifecycle policies (time-travel reduced from 90 days to 7 days for non-critical data)

### When I Recommend Snowflake

**Ideal For:**
- Multi-cloud or cloud-agnostic strategies (works on AWS, Azure, GCP)
- Teams without dedicated DBAs (operational simplicity)
- Mixed workloads (BI, ML, ETL) needing isolation
- Organizations valuing vendor support and ecosystem maturity
- Compliance-heavy environments (SOC 2, HIPAA, GDPR built-in)

**Trade-Offs:**
- **Cost:** ~30% more expensive than Redshift for equivalent workloads
- **Lock-In:** While SQL-standard, migrating away still requires effort
- **Less Control:** Can't tune underlying infrastructure (that's a feature for most, limitation for some)

---

## Amazon Redshift: Migration Away Story

### Competency Level: Advanced

**Context:** Primary warehouse at Chewy from 2017-2020; migrated to Snowflake in 2020-2021

### Why We Migrated

**1. Operational Burden**
- **Cluster Management:** Manual node provisioning, resizing required multi-hour downtime
- **Vacuum & Analyze:** Required weekly maintenance windows impacting 24/7 operations
- **Workload Management:** Query queues needed constant tuning; no auto-scaling

**2. Cost Structure**
- **Fixed Capacity:** Paid for peak capacity 24/7 even though 60% of usage was 9am-5pm EST
- **Resizing Pain:** Scaling up required creating new cluster, data copy, DNS swap (4-6 hour process)
- **Storage Coupling:** Couldn't independently scale storage and compute

**3. Team Velocity**
- **DBA Dependency:** Required dedicated engineer for performance tuning and maintenance
- **Slower Innovation:** Team spent time on cluster management vs. building features

### What Redshift Did Well

**Performance:**
- Excellent for steady-state workloads with predictable access patterns
- Columnar storage and zone maps provided fast scans on properly-designed schemas

**Cost (At Small Scale):**
- For <5TB workloads with consistent usage, Redshift was cost-competitive
- Reserved instances provided 30-40% savings for committed capacity

**AWS Integration:**
- Native integration with S3, Glue, Lambda, Kinesis
- VPC isolation simplified security model

### When I'd Still Recommend Redshift

**Ideal For:**
- AWS-committed organizations (already using EC2, RDS, etc.)
- Cost-sensitive startups with <10TB data and dedicated DBA
- Workloads with consistent, predictable usage patterns
- Teams comfortable with infrastructure management

**Not Ideal For:**
- Variable workloads (spiky traffic)
- Teams without DBA expertise
- Multi-cloud strategies
- Organizations prioritizing developer productivity over cost

---

## Vertica (On-Premise): Legacy Experience

### Competency Level: Advanced (historical)

**Context:** Inherited at Chewy in 2017; decommissioned by 2019 in favor of cloud platforms

### Why We Migrated Away

**1. On-Premise Burden**
- **Hardware Failures:** Physical node failures required emergency replacements
- **Capacity Planning:** Lead time for new hardware: 8-12 weeks (couldn't scale with business)
- **Data Center Costs:** Fixed costs ~$2.1M annually (hardware, power, cooling, space)

**2. Cloud-Native Features Missing**
- No elastic compute scaling
- Limited integration with modern cloud tools (Fivetran, dbt, etc.)
- Expensive professional services for updates and maintenance

**3. Operational Complexity**
- Projections (Vertica's indexing) required careful design; mistakes caused performance disasters
- K-safety configuration (replication) was complex and error-prone
- Database tuning required deep Vertica-specific expertise (small talent pool)

### What Vertica Did Well (In Its Time)

**Performance:**
- Columnar storage with aggressive compression (10:1 ratios common)
- Excellent for analytical workloads on structured data
- Fast aggregations on properly-projected schemas

**Cost (Capital vs. OpEx):**
- For orgs with existing data centers, capital costs were predictable
- No "cloud bill shock" (fixed annual cost)

### Migration to Cloud

**Approach:** Strangler Fig pattern over 18 months
- Phase 1: New workloads → Snowflake (don't add to Vertica)
- Phase 2: Migrate high-value, low-complexity tables
- Phase 3: Migrate complex, business-critical pipelines
- Phase 4: Decommission Vertica cluster

**Outcome:** Zero downtime, zero data loss; freed team from hardware management

---

## BigQuery: Evaluation & Comparison

### Competency Level: Proficient

**Context:** Evaluated at Chewy (2021) and Babylist (2024) as alternative to Snowflake

### Key Differences vs. Snowflake

| Dimension | BigQuery | Snowflake | Winner |
|-----------|----------|-----------|---------|
| **Pricing Model** | Pay-per-query (TB scanned) | Pay-per-compute-second | Depends on usage pattern |
| **Optimization Required** | High (cost driven by scans) | Medium (warehouse sizing) | Snowflake (simpler) |
| **GCP Integration** | Excellent | Good | BigQuery |
| **Multi-Cloud** | GCP-only | AWS/Azure/GCP | Snowflake |
| **SQL Dialect** | Standard SQL | ANSI SQL (mostly) | Tie |
| **Learning Curve** | Steep (partitions, clustering) | Gentle | Snowflake |

### When BigQuery Wins

**Ideal For:**
- GCP-native organizations (using GCS, Cloud Functions, Dataflow)
- Highly variable workloads (pay-per-query model rewards sporadic usage)
- Integration with Google Analytics 360, Firebase
- Teams with strong data engineering culture (can optimize partitioning/clustering)

**Example Use Case:** Startup with 10 analysts running 50 queries/day
- BigQuery: ~$200/month (pay only for queries)
- Snowflake: ~$1,500/month (warehouse running 8 hours/day)
- **Winner:** BigQuery (by 7x)

**Counter-Example:** Enterprise with 200 analysts running 5,000 queries/day
- BigQuery: ~$12,000/month (scans add up fast)
- Snowflake: ~$8,000/month (flat warehouse cost)
- **Winner:** Snowflake

### Why We Didn't Choose BigQuery

**At Chewy:**
- Multi-cloud strategy (AWS + GCP); Snowflake provided portability
- Team already trained on Snowflake (retraining cost: ~200 hours)
- BigQuery's partition pruning required rewriting 1,000+ queries

**At Babylist:**
- Existing Snowflake investment; migration cost outweighed benefits
- Team lacked GCP expertise

---

## PostgreSQL: Operational & Feature Store Usage

### Competency Level: Proficient

**Context:** Not a data warehouse replacement, but critical for:
1. Operational analytics (low-latency point queries)
2. Feature stores for ML models
3. Metadata catalogs (Airflow, dbt, custom tooling)

### When PostgreSQL is the Right Choice

**Real-Time Feature Serving:**
- Snowflake: P95 latency ~500ms (too slow for API calls)
- PostgreSQL: P95 latency ~10ms (acceptable for real-time)

**Example at Chewy:** Product recommendation API
- Features precomputed in Snowflake (batch)
- Features written to PostgreSQL (indexed by `user_id`, `product_id`)
- API reads from PostgreSQL (<<100ms latency)

**Cost Consideration:**
- Snowflake: $2/hour for smallest warehouse (overkill for point queries)
- RDS PostgreSQL: $0.50/hour for equivalent traffic

---

## Comparative Analysis: When to Choose Each

### Decision Matrix

```
IF (multi-cloud OR ease-of-use priority) → Snowflake
ELSE IF (AWS-committed AND have DBA) → Redshift
ELSE IF (GCP-committed AND variable workload) → BigQuery
ELSE IF (real-time/operational queries) → PostgreSQL
ELSE IF (on-premise required) → Consider Databricks or cloud-hybrid
```

### Total Cost of Ownership Framework

**3-Year TCO for 100TB warehouse, 50 users:**

**Snowflake:**
- Licensing: $300K-$400K/year = $900K-$1.2M
- Operations: 0.25 FTE DBA = $75K
- Training: Minimal (mature ecosystem)
- **Total:** ~$1M-$1.3M

**Redshift:**
- Licensing: $200K-$300K/year = $600K-$900K
- Operations: 1 FTE DBA = $300K
- Training: Moderate (less mature ecosystem)
- **Total:** ~$900K-$1.2M

**BigQuery:**
- Licensing: $250K-$500K/year (query-dependent) = $750K-$1.5M
- Operations: 0.5 FTE (optimization required) = $150K
- Training: Steep (partition/cluster optimization)
- **Total:** ~$900K-$1.65M

**Key Insight:** At scale, operational burden dominates licensing costs. Snowflake's simplicity often wins on TCO despite higher sticker price.

---

## Red Flags & Anti-Patterns

### Anti-Pattern 1: Over-Provisioned Warehouses

**Symptom:** X-Large warehouse running 24/7 with 10% average utilization

**Fix:**
- Right-size based on actual concurrency (not peak query duration)
- Implement auto-suspend (5-10 minute idle timeout)
- Use auto-scaling for variable workloads

**Real Example at Babylist:**
- Found 4 warehouses over-provisioned by 3-4 sizes
- Downsizing saved $8K/month (~$96K annually)

---

### Anti-Pattern 2: No Query Cost Attribution

**Symptom:** Snowflake bill grows 30% YoY, no visibility into which teams/queries drive cost

**Fix:**
- Implement query tagging (e.g., `-- TEAM: Marketing, PROJECT: Campaign Analysis`)
- Build cost dashboards showing spend by team/project
- Establish chargeback or showback model

---

### Anti-Pattern 3: Treating Cloud Warehouse Like On-Prem

**Symptom:** Heavily normalized 3NF schemas, no denormalization

**Fix:**
- Cloud warehouses reward wide, denormalized tables (storage is cheap)
- Use star schema or denormalized fact tables
- Aggressive joining is fast and cheap; normalize only for data quality

---

### Anti-Pattern 4: Ignoring Clustering/Partitioning

**Symptom:** Full table scans on multi-TB tables, slow queries, high costs

**Fix:**
- Implement clustering keys on commonly-filtered columns
- Use table partitioning (BigQuery) or micro-partitions (Snowflake)
- Monitor query profiles; optimize high-cost queries first (Pareto principle)

---

## Evolution of Expertise

**2015-2017 (Early Chewy):**
- Focus: Raw performance, schema design, indexing
- Tools: On-premise Vertica, manual capacity planning

**2017-2020 (Mid Chewy):**
- Focus: Cloud migration, Redshift optimization, operational simplicity
- Tools: Redshift, S3 data lake, nascent Snowflake

**2020-2023 (Late Chewy, Babylist):**
- Focus: Cost optimization, multi-cloud strategy, developer productivity
- Tools: Snowflake (primary), BigQuery (evaluation), TCO frameworks

**2024-Present:**
- Focus: Platform as product, self-service enablement, observability
- Emerging: Lakehouse architectures (Databricks), query federation, real-time OLAP

**Future Outlook:**
The line between data warehouses and data lakes is blurring (Iceberg, Delta Lake, Hudi). Next generation will likely be **lakehouse architectures** with unified storage and multiple compute engines. I'm actively learning Databricks and Iceberg patterns.

---

## Certifications & Training

**Formal:**
- Snowflake SnowPro Core Certification (2022)
- AWS Certified Solutions Architect – Associate (2021)

**Informal:**
- 200+ hours hands-on production experience at petabyte scale
- Attended Snowflake Summit (2022, 2023)
- Active in Snowflake Community Slack and dbt Community

**Philosophy:** Much of my expertise comes from production problem-solving at scale rather than formal training. I'm a strong believer in learning by doing, supported by official documentation and community resources.

---

## Related Content

- See `career_chewy.md` for Vertica → Snowflake migration case study
- See `career_babylist.md` for Snowflake cost optimization details
- See `philosophy_build_vs_buy.md` for vendor selection framework
- See `projects/project_migration_vertica_to_snowflake.md` (to be created) for technical deep-dive
- See `architecture_data_platform_modernization.md` (to be created) for platform design patterns
