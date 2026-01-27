#

 Director of Business Intelligence and Data Engineering at Babylist

---
category: career
subcategory: babylist
tags: [pre-ipo, snowflake, data-platform, phigovernance, ml-ops, cost-optimization]
date_range: 2024-04 to 2025-04
relevance_to_vp_role: high
sanitization_status: reviewed
---

# Director -- Business Intelligence and Data Engineering at Babylist

**Duration:** April 2024 - April 2025 (1 year) | **Location:** Remote

## Business Context & Scale

Babylist is a fast-growing digital registry and commerce platform serving expectant parents, operating in the highly competitive baby products market. The company was experiencing 30% year-over-year growth and scaling toward IPO readiness when I joined as Director of BI and Data Engineering.

The business operates at multi-terabyte scale with complex data challenges spanning e-commerce transactions, user-generated content, marketplace dynamics, supply chain coordination, and Protected Health Information (PHI) from insurance reimbursement partnerships. The company serves millions of users and processes significant transaction volume across web and mobile platforms.

My reporting structure placed me within the broader data organization, with responsibility for both the data platform architecture and the analytics/BI functions. The role required balancing rapid feature delivery to support growth with foundational platform work necessary for IPO compliance and scale.

---

## Core Responsibilities

- **Platform Strategy & Architecture:** Owned the Snowflake-based data platform architecture, modernizing ingestion pipelines, storage patterns, and governance frameworks to support real-time analytics, ML workloads, and BI enablement at scale.

- **Team Leadership:** Led combined Data Engineering and Analytics teams, fostering a culture of platform reliability, data quality, and stakeholder accessibility while maintaining focus on business impact.

- **Data Governance & Compliance:** Established comprehensive PHI governance framework ensuring HIPAA-like controls for health data, implementing data classification, privacy-first design, and preparing the platform for ethical AI initiatives.

- **ML/AI Infrastructure:** Partnered with Data Science teams to improve MLOps infrastructure, developing repeatable model deployment frameworks and ensuring data quality for model inputs across predictive analytics applications.

- **Executive Partnership:** Served as key advisor to executive leadership on data-driven product decisions, growth initiatives, and data strategy alignment with business objectives.

---

## Key Architectural Decisions

### Decision 1: Snowflake Platform Modernization

**Context:** The existing data platform had grown organically during hypergrowth, resulting in fragmented data sources, inconsistent quality, and limited observability. Query performance was degrading as data volumes grew, and the platform lacked the governance structure needed for IPO readiness.

**Approach:** I architected an "always-on" Snowflake-based platform with clear separation of concerns: ingestion layer (30+ source systems), transformation layer (dbt), semantic layer (Common Data Model), and serving layer (optimized data marts). The design prioritized observability, testability, and self-service access.

Partnered with engineering teams to implement comprehensive monitoring using Monte Carlo for data observability and dbt unit test cases for transformation logic. This provided early warning of data quality issues before they impacted downstream consumers.

**Outcome:** The modernization improved P95 query latency by 50% through hands-on dbt, Airflow, and Snowflake optimizations. Platform reliability increased significantly, reducing "data firefighting" and allowing the team to focus on feature development rather than incident response.

**Technologies:** Snowflake, dbt, Apache Airflow, Monte Carlo (data observability), Hex (analytics), AWS (supporting infrastructure)

---

### Decision 2: Common Data Model & KPI Standardization

**Context:** Different business units (Marketing, Finance, Supply Chain, Product) were calculating core metrics differently, leading to "data arguments" in executive meetings and eroding trust in analytics. The lack of a unified semantic layer meant every analyst was reinventing metric definitions.

**Approach:** I designed a Common Data Model with standardized KPI metric trees that unified business definitions across all functions. This involved significant stakeholder negotiation—getting Marketing and Finance to agree on "customer acquisition cost" required documenting edge cases, business rules, and calculation logic.

The semantic layer was exposed through Snowflake APIs for downstream consumption, ensuring a "single source of truth" that could feed into BI tools, ML pipelines, and operational systems. Built analytics platform architecture with a data mart layer pulling from this central semantic layer to deliver flattened, performance-optimized structures.

**Outcome:** Eliminated 85% of reporting inconsistencies (based on stakeholder feedback). Accelerated dashboard development time by providing pre-built, tested metric calculations. Most importantly, restored executive trust in data—meetings shifted from debating numbers to making decisions.

**Attribution:** The analytics engineering team executed the technical implementation, which I enabled by facilitating cross-functional alignment, documenting requirements, and prioritizing this foundational work over feature requests.

---

### Decision 3: PHI Governance Framework

**Context:** Babylist's partnership with insurance providers for reimbursement programs meant the platform handled Protected Health Information. The existing architecture lacked the controls necessary for HIPAA-like compliance, creating both legal risk and barriers to expanding health-related product features.

**Approach:** I implemented a comprehensive PHI governance framework including:
- **Data sensitivity classification** system tagging all tables and columns by PII/PHI level
- **Privacy-first design principles** enforced through automated validation in CI/CD pipelines
- **Access controls** with role-based permissions and audit logging for all PHI access
- **AI-readiness considerations** ensuring future ML models could operate on de-identified data

This work required collaboration across Legal, Product, Engineering, and Security teams. I served as the subject matter expert translating regulatory requirements into technical architecture decisions.

**Outcome:** Established compliance posture necessary for insurance partnerships and future health-related product expansion. Prepared the platform for ethical AI initiatives by proactively addressing privacy concerns in ML training data.

The framework positioned Babylist to confidently pursue health-related product strategies that competitors without strong governance would struggle to execute.

---

## Team Growth & Leadership

I led a hybrid team of data engineers and analytics professionals, focusing on three cultural pillars:

1. **Platform Performance:** Shifted mindset from "move fast and fix later" to "build it right the first time" through investment in testing frameworks, observability, and code review standards.

2. **Data Reliability:** Embedded "governance-by-design" into development workflows, making data quality and compliance checks automatic rather than manual audit processes.

3. **Stakeholder Accessibility:** Prioritized self-service analytics adoption, reducing dependency on the data team for routine reporting while maintaining high-quality standards.

The team successfully navigated the transition from startup-mode rapid iteration to pre-IPO operational discipline without sacrificing velocity. Retention remained strong despite the additional rigor, indicating successful cultural evolution rather than imposed bureaucracy.

---

## Quantifiable Outcomes

### Performance & Cost Efficiency
- **Snowflake Cost Reduction:** Achieved 30% reduction in Snowflake compute costs, delivering approximately \$145K in annual savings through architectural optimization, query performance improvements, and warehouse right-sizing.

- **Query Performance:** Improved P95 query latency by 50% through hands-on optimization work in partnership with engineering teams, transforming user experience for interactive analytics.

- **Platform Adoption:** Increased active data users by 50%, demonstrating successful self-service enablement and platform accessibility improvements.

### Business Enablement
- **Real-Time Capabilities:** Enabled real-time ingestion and analytics where previously only 24-hour batch processing existed, unlocking new product use cases and operational efficiencies.

- **A/B Testing Infrastructure:** Implemented experimentation infrastructure and measurement frameworks adopted across the product organization, standardizing how teams evaluate feature success.

- **ML Infrastructure:** Accelerated ML model deployment through standardized frameworks, reducing environment provisioning time and improving model productionalization velocity.

### Compliance & Governance
- **PHI Governance:** Successfully established HIPAA-like controls for Protected Health Information, enabling insurance partnership expansion and health-related product development.

- **Data Quality:** Comprehensive observability implementation using Monte Carlo and dbt testing reduced data quality incidents and prevented metric drift across web, iOS, and Android platforms.

---

## Key Lessons & Retrospective

### What Worked Well

**1. Stakeholder Engagement Strategy**
My approach of bi-weekly "Office Hours" where any team could ask questions or voice concerns about data initiatives built trust and uncovered edge cases early. This transparency reduced resistance to platform changes that might have otherwise faced pushback.

**2. PHI Governance as Competitive Advantage**
Proactively establishing robust health data controls—even before strictly required—positioned Babylist to move faster on insurance partnerships than competitors who treated governance as a checkbox compliance exercise.

**3. Platform Optimization Delivering Business Value**
The Snowflake cost reduction work demonstrated that platform engineering isn't just "keeping the lights on"—it directly impacts P&L. This reframed platform work as strategic investment rather than overhead.

### What Didn't Work

**1. Initial A/B Testing Vendor Selection**
I underestimated the complexity of enterprise A/B testing platform rollouts. The initial vendor selection required significant course correction, eventually securing three months of premium support through executive escalation to stabilize the implementation. Lesson: deeper technical diligence during POC phase, particularly around edge cases and integration patterns.

**2. Timeline Optimism on Governance Rollout**
Implementing PHI classification across the entire data platform took longer than projected due to the archeology required to understand legacy data flows and business logic. Should have allocated more buffer for "unknown unknowns" in foundational governance work.

### Pattern I'd Replicate

The **"Common Data Model first"** approach—investing significant upfront effort in metric standardization before scaling self-service analytics—paid massive dividends. Teams that skip this step end up with chaos: hundreds of dashboards calculating the same metric differently. The pain of cross-functional alignment early is worth it.

---

## Technologies & Tools

**Data Platform & Orchestration:**
- Snowflake (cloud data warehouse)
- dbt (data transformations & testing)
- Apache Airflow (workflow orchestration)
- AWS services (supporting infrastructure)

**Analytics & BI:**
- Hex (collaborative analytics platform)
- Sigma (self-service BI - evaluation)

**Data Quality & Observability:**
- Monte Carlo (data observability)
- dbt unit tests (transformation validation)

**ML/AI Infrastructure:**
- Python (model deployment frameworks)
- Snowflake (feature store patterns)

**Governance & Compliance:**
- Custom data classification system
- Snowflake access controls and audit logging
- Privacy-first design patterns

---

## Transition Context

I departed Babylist in April 2025 as part of a broader organizational restructuring driven by market conditions and strategic pivots. The data platform and governance frameworks I established remain in production, and the team continues to operate with the cultural principles and architectural patterns put in place.

The role demonstrated my ability to operate in pre-IPO environments where the balance between velocity and governance is critical, and where executive leadership needs confident technical guidance on strategic data investments.

---

## Related Content

- See `project_phi_governance_implementation.md` for deep dive on health data compliance framework
- See `architecture_snowflake_platform_modernization.md` for technical architecture details
- See `philosophy_data_quality.md` for the quality-first mindset that guided platform decisions
- See `skills_data_platforms.md` for Snowflake-specific technical expertise
- See `accomplishments_cost_savings.md` for detailed breakdown of Snowflake optimization work
