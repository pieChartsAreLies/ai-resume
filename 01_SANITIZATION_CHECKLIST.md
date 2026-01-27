# Data Sanitization Checklist
## NDA-Compliant Knowledge Base Build

**Version:** 1.0
**Owner:** Michael Gerstl
**Purpose:** Ensure all markdown files are legally compliant and strategically sound

---

## Overview

This checklist guides the transformation of your raw CV data into RAG-optimized, NDA-compliant semantic units. The goal is to **retain architectural truth while eliminating proprietary specifics**.

---

## Three-Pass Sanitization Process

### Pass 1: Raw Data Extraction
✅ Extract all content from CV sources
✅ Organize by semantic unit (not chronological order)
✅ Flag any obvious NDA-sensitive content

### Pass 2: Compliance Review
✅ Apply sanitization rules (see below)
✅ Convert absolute metrics to relative percentages
✅ Remove proprietary terms and codenames
✅ Verify no vendor contract terms are exposed

### Pass 3: Strategic Framing
✅ Ensure "team execution, VP strategy" attribution
✅ Validate tone is stoic and objective
✅ Confirm technical depth matches target level (strategic + hands-on)
✅ Add cross-references to related markdown files

---

## Sanitization Rules by Category

### 🔴 FORBIDDEN (Never Include)

These items are **always prohibited**, even if requested:

| Category | Examples | Why |
|----------|----------|-----|
| **Exact Financial Data** | "$9.2M annual revenue", "\$12.4M budget" | Proprietary, NDA violation |
| **Unreleased Features** | "Project X launching Q3 2024", "New AI chatbot code-named Apollo" | Competitive intelligence |
| **Vendor Contract Terms** | "Snowflake discounted rate: $2.40/credit" | Legal violation |
| **Customer-Specific Data** | "Walmart integration", "Pfizer ML model" | Client confidentiality |
| **Security Details** | "Primary DB password stored in...", "Firewall rules allow..." | Security risk |
| **Internal Codenames** | "Project Chimera", "Operation Falcon" | May be NDA-protected |
| **Employee Names** | "Hired Sarah Johnson as lead engineer" | Privacy concerns |
| **Exact Headcount** | "Team grew from 14 to 31" is OK; "Fired 3 in 2023" is NOT | Sensitive HR data |

---

### 🟡 SANITIZE (Convert to Relative Terms)

These items can be included if converted to safe alternatives:

| Original (Forbidden) | Sanitized (Safe) | Notes |
|---------------------|-----------------|-------|
| "Reduced Snowflake spend from \$480K to \$335K" | "Reduced Snowflake costs by 30% (~\$145K annual savings)" | Use percentages + "~" for approximation |
| "Managed \$12M infrastructure budget" | "Managed a multi-million dollar infrastructure budget" | Use vague scale descriptors |
| "Scaled from 8 to 15 engineers" | "Scaled team by ~88% while maintaining 95%+ retention" | Percentage growth is fine |
| "Chewy processes 4.2M orders/day" | "Managed platform serving millions of daily transactions" | Generic scale language |
| "Reduced P95 query latency from 8.2s to 1.4s" | "Improved P95 query latency by 83% (from ~8s to <2s)" | Rough ranges + percentage |
| "Migrated 840TB of data" | "Migrated petabyte-scale data volumes" | Use industry-standard scale terms |
| "Snowflake cluster: 4x-large with 128 cores" | "Right-sized Snowflake compute for peak workloads" | Describe approach, not config |
| "Used Databricks job cluster with 20 nodes" | "Leveraged autoscaling Spark clusters for distributed processing" | Generic technical truth |

---

### 🟢 SAFE (Use As-Is)

These items are always safe to include:

| Category | Examples | Notes |
|----------|----------|-------|
| **Publicly Known Companies** | "Chewy", "Babylist" | If it's on LinkedIn, it's public |
| **Public Technologies** | "Snowflake", "Kubernetes", "Databricks" | Industry-standard tools |
| **Architectural Patterns** | "Strangler Fig migration", "Lambda architecture" | Generic best practices |
| **Generic Metrics** | "P95 latency", "uptime SLA", "MTTD/MTTR" | Standard industry terms |
| **Publicly Disclosed Data** | "Chewy: \$8B+ revenue" (from SEC filings) | If in 10-K, it's fair game |
| **Your Job Title** | "VP of Data Platforms", "Director of BI" | From LinkedIn |
| **Timeframes** | "Feb 2017 - Oct 2023" | Dates are public |
| **Industry Challenges** | "Technical debt from hypergrowth", "IPO readiness" | Common business context |

---

## Specific Scenarios & How to Handle

### Scenario 1: Cost Savings
**Bad:** "Saved \$380K by migrating from Segment to internal AWS pipeline"
**Good:** "Reduced third-party event streaming costs by 80% (~\$35K annually) by building internal AWS-based pipeline using Kinesis and Lambda"

**Rationale:** Specific vendor pricing reveals contract terms. Percentage + approximation preserves impact without legal risk.

---

### Scenario 2: Team Scaling
**Bad:** "Grew team from 14 to 30; hired Alice (senior engineer), Bob (analyst), Carol (governance lead)"
**Good:** "Scaled organization from 14 to 30 across data engineering, analytics, and governance functions while maintaining 95% retention"

**Rationale:** Names violate privacy; exact headcount changes are sensitive. Focus on growth rate and retention signal.

---

### Scenario 3: Data Breach or Incident
**Bad:** "Discovered 12,000 SSNs exposed in S3 bucket due to misconfigured IAM policy"
**Good:** "Reduced PII exposure by 97% through implementation of automated data classification, retention policies, and access controls"

**Rationale:** Never admit specific security incidents. Frame as proactive improvement, not reactive fix.

---

### Scenario 4: Failed Projects
**Bad:** "ThoughtSpot implementation failed after 9 months and \$200K spend due to poor user adoption"
**Good:** "Evaluated ThoughtSpot for natural language analytics; pivoted to Tableau + training investment after assessing user readiness and adoption patterns"

**Rationale:** Avoid blame language. Frame as strategic decision-making, not failure.

---

### Scenario 5: Vendor Performance Issues
**Bad:** "Fivetran's connector kept failing; we had 40 outages in Q2 2023"
**Good:** "Implemented comprehensive observability for ELT pipelines using Monte Carlo, reducing data downtime incidents by 60%"

**Rationale:** Don't disparage vendors publicly. Focus on your solution, not their problem.

---

### Scenario 6: Layoffs or Terminations
**Bad:** "Laid off 5 engineers in 2023 due to budget cuts"
**Good:** "Navigated organizational restructuring during market downturn while maintaining team morale and key platform deliverables"

**Rationale:** HR data is sensitive. Generic language preserves dignity.

---

### Scenario 7: Regulatory Findings
**Bad:** "SOX audit found 14 control deficiencies in our Tableau environment"
**Good:** "Architected SOX-compliant Tableau environment with Dev/Prod separation, RBAC, and audit logging"

**Rationale:** Never admit audit failures. Present the remediated state.

---

## Strategic Attribution Framework

Every accomplishment must follow this pattern:

### Formula: `The team executed X, which I enabled through Y`

**Examples:**

❌ **Bad (Sounds Arrogant):**
"I built a real-time event pipeline that saved \$380K annually"

✅ **Good (Servant Leadership):**
"The team delivered a real-time event pipeline using AWS Kinesis and Lambda, which I enabled by securing executive buy-in, designing the architecture, and removing cross-functional blockers. This reduced third-party costs by 80%."

---

❌ **Bad (Vague):**
"Improved data quality"

✅ **Good (Specific + Attributed):**
"The engineering team implemented dbt test cases and Monte Carlo monitoring, which I enabled by establishing data quality standards, allocating sprint capacity, and training on testing frameworks. This reduced data quality incidents by 60%."

---

## Tone Checklist

For every markdown file, verify:

✅ **Stoic:** No hyperbole ("game-changing", "revolutionary")
✅ **Objective:** Quantified outcomes, not opinions
✅ **Concise:** 200-400 words per semantic chunk
✅ **Humble:** "The team delivered X" not "I delivered X"
✅ **Confident:** Don't hedge with "tried to", "attempted"
✅ **Pragmatic:** Acknowledge trade-offs and constraints

---

## Pre-Ingest Validation

Before ingesting any markdown file into Qdrant, verify:

### Legal Compliance
- [ ] No exact revenue/budget figures (unless public)
- [ ] No unreleased product features
- [ ] No vendor contract terms
- [ ] No customer names (unless public case study)
- [ ] No employee names
- [ ] No security vulnerabilities disclosed

### Strategic Framing
- [ ] Team gets credit for execution
- [ ] You get credit for strategy, architecture, enablement
- [ ] Tone is stoic and professional
- [ ] Failures are framed as "lessons learned" or "pivots"

### Technical Accuracy
- [ ] All technologies mentioned are accurate
- [ ] Metrics are truthful (even if sanitized)
- [ ] No hallucinated accomplishments
- [ ] Dates and titles match LinkedIn

### RAG Optimization
- [ ] File has proper YAML frontmatter
- [ ] Headers (H2) create natural chunk boundaries
- [ ] Each section is 200-400 words (256-512 tokens)
- [ ] Cross-references to related files included

---

## Example: Before & After Sanitization

### Before (Raw CV Content)
```
Led migration of Chewy's on-prem Vertica cluster (840TB, 18 nodes,
$2.1M annual maintenance cost) to Snowflake (4X-Large warehouse,
$480K annual spend initially). Reduced costs to $335K after 6 months
through query optimization. Project code-named "Iceberg". Hired
Jane Doe as lead engineer. Customer data included PII for 40M users.
Vendor contract with Snowflake: $2.40/credit under Enterprise Agreement.
```

### After (Sanitized)
```
## Cloud Data Warehouse Migration

**Context:** Chewy's legacy on-premise columnar data warehouse
had become a scaling bottleneck, with fixed infrastructure costs
and limited elasticity for variable workloads.

**Approach:** I designed a phased "Strangler Fig" migration strategy
to Snowflake, prioritizing low-risk workloads first to build stakeholder
confidence. The team executed the migration of petabyte-scale data
volumes over 9 months with zero downtime.

**Optimization:** Post-migration, I led query optimization initiatives
that reduced Snowflake compute costs by approximately 30% (~$145K annual
savings) through warehouse right-sizing, clustering key selection, and
materialized view implementation.

**Outcome:** The platform now supports elastic scaling for variable
workloads while reducing total infrastructure costs. The team successfully
maintained 99.9% uptime throughout the migration.

**Technologies:** Snowflake, Vertica (legacy), dbt, Airflow, AWS S3
```

---

## Common Mistakes to Avoid

| Mistake | Why It's Bad | Fix |
|---------|-------------|-----|
| "I saved the company \$500K" | Arrogant + exact figure | "The team's optimization work reduced costs by ~40%" |
| "Tableau is terrible; we switched to Hex" | Disparages vendor | "Evaluated multiple BI tools; selected Hex for collaborative workflows" |
| "The CEO demanded we..." | Implies lack of autonomy | "Executive leadership prioritized..." |
| "This was a disaster that I fixed" | Creates liability | "Inherited technical debt; implemented systematic remediation" |
| "We had 500 production incidents in 2023" | Exposes reliability issues | "Improved platform reliability by 60% through observability investments" |

---

## Final Checklist Before Marking "sanitization_status: reviewed"

For each markdown file:

1. **Read it aloud.** Does it sound defensive, arrogant, or vague?
2. **Ask: "Would my former employer sue me over this?"** If maybe, sanitize more.
3. **Ask: "Does this prove I can lead at VP level?"** If no, add strategic depth.
4. **Ask: "Could this be a blog post?"** If yes, it's probably public enough.
5. **Verify cross-references.** Every claim should link to supporting evidence in other files.

---

## Approval Workflow

| Status | Meaning | Action Required |
|--------|---------|-----------------|
| `needs_review` | Raw content, not yet sanitized | Apply sanitization rules |
| `reviewed` | Sanitization complete, ready for ingestion | Ingest into Qdrant |
| `flagged` | Contains potentially sensitive data | Re-review before use |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-17 | Initial checklist created |

---

**Next Step:** Use this checklist to sanitize each markdown file in the knowledge base before ingesting into Qdrant.
