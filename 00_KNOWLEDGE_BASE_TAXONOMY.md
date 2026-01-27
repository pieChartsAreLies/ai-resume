# Knowledge Base Taxonomy
## The Gerstl Interface - Data Architecture

**Version:** 1.0
**Owner:** Michael Gerstl
**Purpose:** Define the semantic structure for RAG-optimized career data

---

## Design Principles

1. **Semantic Units Over Chronology**: Each file represents a distinct queryable concept, not a timeline
2. **Optimal Chunk Size**: Files structured for 256-512 token chunks with contextual overlap
3. **Metadata-Rich**: Every file includes structured frontmatter for enhanced retrieval
4. **NDA-Compliant by Design**: Templates enforce sanitization patterns

---

## Primary Categories

### 1. **Career History** (`/career/`)
Strategic-level summaries of roles focusing on business outcomes and architectural decisions.

**Files:**
- `career_chewy.md` - VP Data Platforms (2021-2024)
- `career_babylist.md` - Director of Data (2019-2021)
- `career_[prior_role].md` - [If covering 7+ years]

**Content Focus:**
- Business context and scale
- Team size and growth trajectory
- Key architectural decisions and rationale
- Measurable outcomes (sanitized percentages)
- Technologies introduced and why

### 2. **Technical Architecture** (`/architecture/`)
Deep dives into specific system designs and platform decisions.

**Files:**
- `architecture_cloud_cost_optimization.md`
- `architecture_data_platform_modernization.md`
- `architecture_observability_stack.md`
- `architecture_cicd_pipeline.md`

**Content Focus:**
- Problem statement and constraints
- Architectural patterns chosen
- Technology selection rationale
- Trade-offs and decision framework
- Results and lessons learned

### 3. **Leadership Philosophy** (`/philosophy/`)
Your mental models, decision frameworks, and management approach.

**Files:**
- `philosophy_servant_leadership.md`
- `philosophy_build_vs_buy.md`
- `philosophy_technical_debt.md`
- `philosophy_data_quality.md`
- `philosophy_team_scaling.md`

**Content Focus:**
- Core beliefs and principles
- Decision-making frameworks
- Real-world applications
- Stoic and pragmatic foundations

### 4. **Project Case Studies** (`/projects/`)
Narrative-driven accounts of specific initiatives with clear beginning/middle/end.

**Files:**
- `project_migration_on_prem_to_cloud.md`
- `project_cost_reduction_initiative.md`
- `project_data_governance_implementation.md`

**Content Focus:**
- Context and business drivers
- Approach and execution strategy
- Team dynamics and stakeholder management
- Quantifiable outcomes
- Retrospective insights

### 5. **Technical Skills & Tools** (`/skills/`)
Detailed competency inventories organized by category.

**Files:**
- `skills_data_platforms.md` (Snowflake, Databricks, BigQuery)
- `skills_infrastructure.md` (K8s, Terraform, AWS/GCP/Azure)
- `skills_observability.md` (Datadog, Prometheus, Grafana)
- `skills_languages_frameworks.md` (Python, SQL, dbt, Airflow)

**Content Focus:**
- Tool/technology name
- Years of experience
- Context of usage (scale, complexity)
- Specific accomplishments with the tool

### 6. **Industry Perspectives** (`/perspectives/`)
Forward-looking analysis and opinions on emerging trends.

**Files:**
- `perspective_ai_ml_in_data_platforms.md`
- `perspective_future_of_data_engineering.md`
- `perspective_platform_engineering_evolution.md`

**Content Focus:**
- Current state analysis
- Emerging patterns you're tracking
- Strategic implications
- Your informed predictions

### 7. **Accomplishments & Metrics** (`/accomplishments/`)
Quantified outcomes and recognition (sanitized).

**Files:**
- `accomplishments_cost_savings.md`
- `accomplishments_team_growth.md`
- `accomplishments_reliability_improvements.md`

**Content Focus:**
- Baseline and outcome (relative percentages)
- Timeframe
- Strategic approach
- Attribution to team

---

## Metadata Schema (Frontmatter)

Every markdown file must begin with YAML frontmatter:

```yaml
---
category: [career|architecture|philosophy|projects|skills|perspectives|accomplishments]
subcategory: [specific_area]
tags: [keyword1, keyword2, keyword3]
date_range: [YYYY-MM to YYYY-MM] or [ongoing]
relevance_to_vp_role: [high|medium|low]
sanitization_status: [reviewed|needs_review]
---
```

**Purpose:** Enables advanced filtering during retrieval and helps the ingestion script assign appropriate weights.

---

## File Naming Conventions

- Use lowercase with underscores
- Start with category prefix: `career_`, `project_`, `philosophy_`, etc.
- Be descriptive but concise
- Example: `architecture_multi_cloud_data_lake.md`

---

## Chunking Strategy

Files should be written with natural "semantic breakpoints":

- **Use H2 headers** (`##`) to denote major sections (each becomes a potential chunk)
- **Use H3 headers** (`###`) for sub-concepts within chunks
- **Aim for 200-400 words per H2 section** (optimal for 256-512 token chunks)
- **Include context in each section**: Don't assume sequential reading

---

## Sanitization Levels

### Level 1: Public (Green)
- Generic architectural patterns
- Publicly known technologies
- Industry-standard metrics

### Level 2: Relative (Yellow)
- "Reduced costs by 18%" instead of "$9M to $7.4M"
- "Managed a team of 12" instead of specific names
- "Multi-million dollar budget" instead of exact figures

### Level 3: Forbidden (Red)
- Exact revenue/ARR figures
- Unreleased product features
- Customer-specific implementations
- Vendor contract terms
- Internal codenames or project names under NDA

---

## Query Optimization

Structure content to match likely recruiter queries:

**Expected Query Types:**
1. "Tell me about Michael's experience with Kubernetes"
2. "How did Michael handle cloud cost optimization?"
3. "What is Michael's leadership philosophy?"
4. "Has Michael scaled a data engineering team?"
5. "What's Michael's perspective on build vs. buy?"

**Optimization Strategy:**
- Use natural language phrasing that mirrors questions
- Include synonyms (e.g., "K8s" and "Kubernetes")
- Front-load important keywords in headers and first sentences

---

## Version Control

This taxonomy will evolve. Track changes:

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-17 | Initial taxonomy defined |

---

## Next Steps for Implementation

1. Use this taxonomy to guide CV data extraction
2. Populate templates for each category
3. Run sanitization pass against the checklist
4. Validate chunk sizes (256-512 tokens per section)
5. Ingest into Qdrant with metadata
6. Test retrieval quality with sample queries
