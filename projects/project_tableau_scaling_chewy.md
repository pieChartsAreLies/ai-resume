---
category: projects
subcategory: platform_scaling
tags: [tableau, sox_compliance, governance, self_service, scale, path_to_production]
date_range: 2017-06 to 2023-08
relevance_to_vp_role: high
sanitization_status: reviewed
---

# Project: Tableau Server Scaling & SOX Compliance Platform

**Role:** Senior Manager, Business Intelligence & Analytics | **Company:** Chewy | **Timeline:** June 2017 - August 2023 (6 years)

## Executive Summary

Scaled Chewy's business intelligence infrastructure from a single-server Tableau deployment serving 100 users to an 8-node enterprise cluster supporting 3,500+ concurrent users across the organization. This initiative established the foundation for self-service analytics, implemented SOX-compliant development/production separation, and created sustainable governance practices that enabled Chewy's growth from pre-IPO startup to Fortune 500 company. The platform transformation reduced content sprawl by 60%, established clear data lineage for audit compliance, and empowered business users to build trusted analytics independently.

---

## Problem Statement

When I joined Chewy in 2017, the business intelligence infrastructure was typical of a fast-growing startup—functional but unsustainable. The company operated a single Tableau Server reading from a locally-hosted Vertica data warehouse. With approximately 100 users, performance was acceptable, but cracks were already showing.

**Performance Degradation:** As user adoption grew organically, server response times increased. Dashboard load times that were once 2-3 seconds began stretching to 15-20 seconds during peak business hours. Users complained that "data was too slow to be useful."

**Content Chaos:** With no governance framework, the server accumulated 2,000+ pieces of content—dashboards, workbooks, data sources—with no clear ownership, documentation, or quality standards. Business users couldn't find trusted content amid the noise. Critical executive dashboards lived alongside abandoned test workbooks from departed employees.

**Compliance Risk:** As Chewy prepared for IPO (completed 2019), auditors raised concerns about our BI environment. We had no separation between development and production, no audit trails for who accessed sensitive data, and no formal process for promoting content. This created regulatory risk and threatened our ability to go public.

**Scalability Ceiling:** The single-server architecture had hard limits. We couldn't add more users without degrading performance for everyone. The business was growing 40% year-over-year, but our BI infrastructure couldn't keep pace.

The executive team's mandate was clear: build an enterprise-grade analytics platform that could scale with the business while meeting SOX compliance requirements for our IPO and beyond.

---

## Success Criteria

**Performance & Reliability:**
1. Maintain dashboard load times between 3-5 seconds at P95 latency
2. Support 3,500+ concurrent users with room for growth
3. Achieve 99.5% platform uptime

**Compliance & Governance:**
4. Implement SOX-compliant development/production environment separation
5. Establish complete data lineage and metadata for all production content
6. Create automated path-to-production process with quality gates

**Content Quality:**
7. Reduce content sprawl from 2,000+ items to curated, documented production assets
8. Ensure 100% of production dashboards have clear ownership and business purpose
9. Implement query performance standards (optimized explain plans)

**Business Enablement:**
10. Enable self-service analytics across all business units
11. Reduce platform team time spent on content troubleshooting by 50%
12. Support Chewy's IPO readiness timeline (Q2 2019)

---

## Constraints & Challenges

**Technical Constraints:**
- **On-Premise Infrastructure:** All hardware was locally hosted, requiring careful capacity planning. Cloud wasn't an option due to data governance concerns and existing infrastructure investments.
- **Zero Downtime Requirement:** Analytics couldn't go dark. All migrations and upgrades needed to happen with the platform running.
- **Legacy Integrations:** 50+ downstream systems and embedded dashboards depended on existing URLs and data source connections.

**Organizational Constraints:**
- **Budget Limitations:** Capital expenditures for hardware required 6-month planning cycles. Couldn't just "add capacity" on demand.
- **Headcount Freeze:** During IPO prep, we couldn't hire additional platform engineers. Had to scale with existing team.
- **Timeline Pressure:** SOX compliance was required for IPO. Hard deadline, no negotiation.

**Cultural Challenges:**
- **Resistance to Governance:** Users were accustomed to complete freedom. Introducing quality gates and approval processes faced pushback.
- **Skill Variance:** User community ranged from SQL experts to non-technical business analysts. Solutions needed to work for all skill levels.
- **Change Fatigue:** Concurrent projects (IPO prep, platform migrations) created organizational stress. Needed to minimize additional disruption.

---

## Solution Architecture

### Infrastructure Evolution

**Phase 1 (2017-2018): Stabilization**
- Transitioned from single server to 3-node clustered architecture
- Implemented load balancing across nodes
- Upgraded from Vertica to hybrid Vertica + Snowflake architecture
- Built custom monitoring dashboards tracking query performance, server load, and user activity

**Phase 2 (2019-2020): SOX Compliance & Governance**
- Deployed 8-node production cluster with separate 3-node development environment
- Established clear Dev → Prod promotion pathway
- Implemented automated path-to-production pipeline
- Integrated with Alation data catalog for metadata management

**Phase 3 (2021-2023): Optimization & Maturity**
- Refined data extract optimization strategies (live connections vs. extracts)
- Built self-service performance monitoring tools
- Established center of excellence for training and enablement
- Created reusable data models reducing redundant data source creation

### Path-to-Production Process

The SOX compliance requirement became an opportunity to clean up years of technical debt. Rather than simply duplicating content to a "production" environment, we designed a selective promotion process:

**Step 1: Content Nomination**
- Users tagged dashboards they wanted promoted to production
- Required metadata: business owner, purpose, refresh schedule, expected audience

**Step 2: Automated Quality Checks**
- Custom script extracted SQL queries from Tableau workbooks
- Ran EXPLAIN PLAN analysis against database to evaluate query cost
- Flagged expensive queries (>10 second estimated runtime) for optimization

**Step 3: Human Review & Optimization**
- Platform team reviewed flagged content with dashboard creators
- Worked collaboratively to optimize: better filters, aggregations, materialized views
- Documented optimization decisions in Alation

**Step 4: PII & Compliance Mapping**
- Queries were analyzed for PII/PCI data access
- Dashboards accessing sensitive data were tagged and subject to additional access controls
- Created complete lineage: which dashboards query which tables containing regulated data

**Step 5: Automated Promotion**
- Once approved, dashboards automatically promoted to production cluster
- URL structure maintained for backward compatibility
- Metadata published to Alation for discoverability

This process served dual purposes: **compliance** (we could prove to auditors which dashboards contained PII and who accessed them) and **quality** (only optimized, documented content reached end users).

### Technology Stack

**BI Platform:**
- Tableau Server (8-node production cluster, 3-node dev cluster)
- Custom monitoring dashboards (Tableau on Tableau)

**Data Warehouses:**
- Vertica (legacy, phased out 2019-2020)
- Snowflake (primary data warehouse 2019+)

**Orchestration & Automation:**
- Python scripts for path-to-production automation
- Tableau REST API for programmatic content management
- Shell scripts for extract optimization scheduling

**Governance & Metadata:**
- Alation (data catalog)
- Custom metadata repository (PostgreSQL)

---

## Execution & Leadership

### Team Structure

I led this initiative with a lean, cross-functional team:

**Core Platform Team:**
- **Senior Tableau Administrator (DRI):** Day-to-day cluster management, user provisioning, troubleshooting
- **BI Engineers (2):** Data source optimization, extract management, performance tuning
- **Governance Lead (0.5 FTE):** Path-to-production process management, metadata curation

**Extended Support:**
- **Infrastructure Engineers (2, shared):** Hardware procurement, cluster deployment, networking
- **Data Engineers (rotating partnership):** Optimizing upstream data models to improve BI performance

My role was strategic oversight, executive communication, cross-functional alignment, and unblocking. I ran weekly office hours where any user could ask questions or escalate issues. I also served as the primary liaison to audit teams during SOX compliance reviews.

### Key Leadership Decisions

**1. Opportunistic Governance Introduction**

Rather than imposing governance as a "new requirement," we framed it as a benefit: "Moving to production gives you better performance, guaranteed uptime, and visibility to executives." This carrot-first approach reduced resistance. Teams competed to get their content promoted.

**2. Collaborative Optimization Philosophy**

When dashboards failed performance checks, we didn't reject them outright. My team scheduled working sessions with creators to optimize together. This built capability across the organization and positioned the platform team as enablers, not gatekeepers.

**3. Data-Driven Decision Making**

We built monitoring dashboards showing real-time platform performance. When executives questioned infrastructure spending, I could show: "At current growth trajectory, we'll hit capacity limits in 6 months." This earned trust and budget approvals.

**4. Managing Content Sprawl Without Heavy-Handedness**

Rather than deleting old content (which angers users), we created a "archive" environment for non-production workbooks. Users could still access their test work, but it didn't clutter production. This preserved goodwill while achieving cleanup goals.

### Handling Setbacks

**Setback: 2019 Cluster Upgrade Failure**

During a planned upgrade to support SOX requirements, a node failed during migration. Platform went into degraded mode for 6 hours during business hours. My response:

- Immediately communicated status to all users (no hiding the issue)
- Provided hourly updates even when we didn't have new information (reduced anxiety)
- Conducted blameless post-mortem with infrastructure team
- Implemented enhanced pre-upgrade testing protocols
- Personally apologized to impacted executive stakeholders

The transparency preserved trust. Users were frustrated by the outage but appreciated the communication.

---

## Quantifiable Outcomes

### Performance Improvements

**Dashboard Performance:**
- P95 load time: Maintained 3-5 second range despite 35x user growth
- P99 load time: Reduced from 45+ seconds (2017) to <12 seconds (2023)
- Platform uptime: Achieved 99.7% availability (exceeded 99.5% target)

**Capacity & Scale:**
- User growth: 100 → 3,500+ users (35x increase)
- Concurrent user support: Single server → 8-node cluster supporting 500+ simultaneous sessions
- Content volume: 2,000+ unmanaged items → 600 curated production dashboards

### Compliance & Governance

**SOX Compliance:**
- 100% of production content mapped to data sources and PII/PCI exposure
- Complete audit trail of content promotion and access
- Zero audit findings related to BI environment in IPO or post-IPO reviews

**Content Quality:**
- 60% reduction in total content volume (2,000 → 800 total items, 600 in production)
- 100% of production content documented with ownership, purpose, refresh schedule
- Query performance: 95% of production dashboards optimized to <5 second query execution

### Business Enablement

**Self-Service Adoption:**
- Grew from centralized BI team building all content to 15+ business units creating their own dashboards
- Platform team's time on ad-hoc requests dropped from 80% to 30% of capacity
- Training program reached 1,200+ users across beginner, intermediate, and advanced tracks

**Cost Efficiency:**
- Despite 35x user growth, platform team grew only 3 → 5 FTE (7x efficiency improvement)
- Optimized data extracts reduced database query load by 40% (avoided costly database scaling)

### Team Impact

**Team Development:**
- Zero attrition during 6-year scaling project
- All team members advanced one or more levels during tenure
- Created career ladder for "BI Engineer" role adopted company-wide

---

## Lessons Learned

### What Worked Well

**1. Governance Through Enablement, Not Enforcement**

By positioning path-to-production as a value-add (better performance, executive visibility) rather than a requirement, we got buy-in. Users wanted their content promoted, so they willingly met our standards.

**2. Treating Optimization as Teaching**

Rather than rejecting poorly-performing content, we used it as a teaching moment. Hundreds of users learned SQL optimization, data modeling, and Tableau best practices through our collaborative review process. This created a culture of quality.

**3. Investing in Observability Early**

Our custom monitoring dashboards were crucial. They gave us early warning of capacity constraints and provided data-driven justification for infrastructure investment. Leaders trust numbers.

**4. Phased Infrastructure Scaling**

Rather than jumping from 1 node to 8 nodes immediately, we scaled incrementally (1 → 3 → 5 → 8). This allowed us to test, learn, and adjust without massive up-front capital expenditure.

### What Didn't Work

**1. Initial Underestimate of Change Management**

We built the technical solution in 6 months. It took 18 months to get users to adopt the new processes. I underestimated the organizational change effort required. Earlier and more aggressive stakeholder engagement would have accelerated adoption.

**2. Documentation Debt**

We built the platform quickly and documented as we went. But documentation lagged reality. By 2021, we had to dedicate 3 months to "documentation sprint" to catch up. Lesson: Treat documentation as a blocking requirement, not a nice-to-have.

### What I'd Do Differently

**1. Earlier Executive Sponsorship**

We had implicit support but didn't formalize an executive sponsor until Year 2. Having a C-level champion from Day 1 would have accelerated decision-making and resource allocation.

**2. Tighter Integration with Data Engineering**

The BI platform and data engineering teams operated semi-independently. In hindsight, co-locating or merging these teams would have reduced friction around data model design and extract optimization.

**3. Cloud Migration Sooner**

We stayed on-premise due to initial data governance concerns. By 2021, cloud BI (Tableau Cloud) had matured significantly. If I were to do it again, I'd push harder for cloud migration in 2019-2020, which would have reduced operational burden and improved flexibility.

---

## Technologies Used

**Business Intelligence:**
- Tableau Server (on-premise, clustered)
- Tableau Prep (data preparation)
- Custom monitoring dashboards (Tableau on Tableau)

**Data Warehouses:**
- Vertica (legacy, 2017-2020)
- Snowflake (primary, 2019+)

**Orchestration & Automation:**
- Python (path-to-production automation, REST API integrations)
- Bash/Shell scripting (operational automation)
- Tableau REST API
- Tableau Metadata API

**Governance & Cataloging:**
- Alation (data catalog and metadata management)
- PostgreSQL (custom metadata repository)

**Infrastructure:**
- Linux (RHEL) for server hosting
- HAProxy (load balancing)
- On-premise hardware (Dell servers)

---

## Retrospective: Impact on Career

This project taught me that **scaling infrastructure and scaling organizations are inseparable challenges**. The technical work—clustering, optimization, automation—was straightforward. The hard part was aligning hundreds of users around new processes and standards.

The path-to-production process became a case study in "governance without bureaucracy." By focusing on outcomes (quality, performance, compliance) rather than rules (you must do X, Y, Z), we achieved adoption without resentment. This insight has shaped my philosophy: **governance should feel like a service, not a restriction**.

The 6-year timeline also taught me patience. Platforms evolve incrementally. Early wins (3-node cluster, basic governance) built trust that enabled bigger bets later (8-node cluster, full SOX compliance). Forcing the end state too early would have failed.

Finally, this project proved the value of **investing in observability and data-driven decision-making**. The monitoring dashboards we built didn't just help us manage the platform—they became the storytelling mechanism that secured budget, headcount, and executive support. Leaders invest in what they can measure.

---

## Related Content

- See `career_chewy.md` for broader context of this role and Chewy's growth trajectory
- See `philosophy_servant_leadership.md` for leadership approach that enabled this scaling
- See `philosophy_hub_and_spoke.md` for organizational model that supported self-service adoption
- See `skills_data_platforms.md` for detailed expertise in Tableau, Snowflake, and BI infrastructure
- See `project_instrumentation_audit_chewy.md` for related data quality initiative that ensured content accuracy
- See `01_SANITIZATION_CHECKLIST.md` for compliance approach used throughout documentation
