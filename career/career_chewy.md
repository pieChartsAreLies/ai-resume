# VP-Level Leadership at Chewy (Fortune 500 Scale)

---
category: career
subcategory: chewy
tags: [fortune-500, ipo, team-scaling, governance, platform-engineering, cost-optimization]
date_range: 2017-02 to 2023-10
relevance_to_vp_role: high
sanitization_status: reviewed
---

# Enterprise Analytics & Platform Leadership at Chewy

**Duration:** February 2017 - October 2023 (6+ years) | **Location:** Plantation, FL

## Company Context

Chewy is a Fortune 500 e-commerce retailer specializing in pet products and pharmaceuticals with over \$8 billion in annual revenue. The company went public via IPO in June 2019 (NYSE: CHWY) and operates at massive scale—millions of customers, billions of transactions annually, petabyte-scale data infrastructure.

I joined Chewy in February 2017 as a solo Business Intelligence practitioner and grew with the company through its IPO and post-public company maturation, eventually leading 30+ people across analytics, data engineering, governance, and platform functions. My tenure spanned three distinct phases, each with different strategic focus and scope.

---

## Career Progression at Chewy

### Phase 1: Associate Director, Business Intelligence (Feb 2017 - Feb 2020)
**Focus:** Building from 0 to 1 — Foundation, culture, IPO readiness

### Phase 2: Director, Business Intelligence (Feb 2020 - Dec 2022)
**Focus:** Scaling operations — Governance, compliance, self-service expansion

### Phase 3: Director of Software Engineering — Analytic Platforms (Dec 2022 - Oct 2023)
**Focus:** Platform engineering — Real-time infrastructure, data quality, ML enablement

---

# Phase 3: Director of Software Engineering — Analytic Platforms
## December 2022 - October 2023

### Strategic Focus

This role shift reflected Chewy's maturation from "build analytics capabilities" to "engineer reliable platforms." I moved from managing BI/analytics teams to owning the underlying platform infrastructure, data quality frameworks, and real-time event pipelines powering ML/AI and product analytics at Fortune 500 scale.

The scope included enterprise data platform reliability, instrumentation governance, real-time event streaming, and analytics infrastructure supporting petabyte-scale workloads. This was platform engineering with executive-level strategic impact, not just operations.

---

## Key Initiative 1: Enterprise Data Instrumentation Audit

**Context:** Chewy's rapid growth had resulted in fragmented data instrumentation across 30+ product and engineering teams. Mobile app data (iOS/Android) showed inconsistencies, event schemas were misaligned, and teams were tracking excessive metrics that created cost and complexity without business value.

**Approach:** I led a comprehensive 4-month instrumentation audit across the entire product and engineering organization, systematically documenting:
- Platform complexity and technical debt
- Schema misalignments between iOS and Android implementations
- Critical data integrity issues affecting analytics and ML pipelines
- Organizational structure gaps creating accountability problems

This was forensic data archeology at scale—reverse-engineering how 30 teams instrumented events, identifying where reality diverged from documentation, and assessing the business impact of data quality issues.

**Outcome:** The audit exposed mobile data integrity issues stemming from years of iOS/Android schema drift. These findings drove a C-suite decision to consolidate mobile architecture, a transformation that resolved systemic data integrity problems affecting \$8B+ operations. The work informed long-term governance strategy and platform priorities.

**Executive Impact:** This audit became a strategic inflection point. It shifted executive perception of data quality from "analytics problem" to "product engineering problem" and secured multi-year investment in instrumentation governance.

---

## Key Initiative 2: Real-Time Event Pipeline (Segment Replacement)

**Context:** Chewy was spending significant budget on Segment for event streaming, but the platform had limitations for real-time personalization and ML use cases. Additionally, reliance on third-party event infrastructure created vendor lock-in and data flow visibility challenges.

**Approach:** I architected and evangelized adoption of an internally-built real-time event pipeline using native AWS services (Kinesis, Lambda, S3) as a cost-effective Segment alternative. This required:
- Designing the technical architecture for reliable, low-latency event streaming
- Building business case demonstrating 80% cost reduction
- Securing engineering leadership buy-in across multiple teams
- Establishing patterns for event schema validation and quality monitoring

The team built the pipeline; I enabled the work by removing organizational blockers, designing the architecture, and championing the build-vs-buy decision at the executive level.

**Outcome:** Replaced Segment at approximately 20% of the original cost (saving ~\$35K annually), reduced event latency enabling real-time personalization and ML use cases, and eliminated third-party dependencies for critical data infrastructure.

**Technologies:** AWS Kinesis, AWS Lambda, S3, custom event ingestion framework

---

## Key Initiative 3: Regression Testing Framework for Instrumented Events

**Context:** Front-end code changes frequently broke instrumented events, causing "metric drift" where the same business metric calculated differently over time due to inconsistent tracking. This created distrust in analytics and corrupted ML model inputs used for personalization and forecasting.

**Approach:** I designed a regression testing framework adopted organization-wide that validated instrumented events across web, iOS, and Android platforms. The framework automatically detected when code changes altered event schemas or introduced tracking gaps, preventing issues from reaching production.

This required collaboration across Product Engineering, QA, and Analytics teams to integrate data quality checks into CI/CD pipelines. The framework became standard practice across the engineering organization.

**Outcome:** Prevented metric drift across revenue-critical metrics and safeguarded ML model inputs. The testing framework provided confidence that data pipelines remained consistent even as product code evolved rapidly. Engineering teams adopted "data quality as code" mindset.

**Strategic Value:** Transformed data quality from reactive firefighting to proactive prevention, freeing the platform team to focus on innovation rather than incident response.

---

## Key Initiative 4: ML/AI Infrastructure Enablement

**Context:** Data Science and ML teams struggled with inconsistent data quality, lack of standardized model deployment patterns, and fragmented feature engineering workflows. This slowed productionalization of ML models for personalization, forecasting, and operational optimization.

**Approach:** I led advanced analytics infrastructure initiatives focused on:
- Data quality assurance for ML model inputs
- Repeatable model deployment frameworks
- Feature store architecture patterns (Snowflake-based)
- Monitoring and observability for ML pipelines

Partnered closely with Data Science teams to understand pain points and translate requirements into platform capabilities, maintaining focus on reliability and reproducibility over bleeding-edge tooling.

**Outcome:** Accelerated ML model deployment cycles and improved model reliability through better data quality. Enabled predictive analytics applications across marketing (propensity models), product (recommendation systems), and operations (demand forecasting).

---

## Key Initiative 5: Cost Management & ROI Tracking

**Context:** As Chewy's data infrastructure scaled to support petabyte workloads, cloud spending (AWS, Snowflake) grew significantly. Executive leadership needed visibility into whether these investments delivered measurable business value.

**Approach:** I established ROI tracking for analytics programs by:
- Analyzing cloud spending patterns and Snowflake credit consumption
- Implementing cost allocation by department and use case
- Creating dashboards showing "cost per query" and "cost per business outcome"
- Building business cases connecting data investments to revenue impact

This work required translating technical metrics (queries/sec, TB scanned) into business language (cost to serve marketing analytics, ROI of personalization platform).

**Outcome:** Ensured data investments were accountable for driving positive business outcomes. Enabled informed decision-making on where to optimize costs versus where to invest for growth. Platform spend remained within budget while supporting 30%+ YoY transaction growth.

---

# Phase 2: Director, Business Intelligence
## February 2020 - December 2022

### Strategic Focus

This phase was about **scaling operations**: growing the team from 14 to 30 people, establishing enterprise governance for public company requirements, and democratizing analytics through self-service platforms. The role expanded to include unexpected GRC (Governance, Risk, Compliance) responsibilities typically owned by dedicated compliance teams.

---

## Key Initiative 1: Team Scaling (14 to 30 People)

**Context:** Chewy's post-IPO growth required scaling the data organization across multiple functions: analytics engineering, BI development, data engineering, and governance. The team was distributed across four locations (Seattle, Minneapolis, Boston, Plantation).

**Approach:** I built and managed a 30-person distributed organization with clear team charters, work ingestion and prioritization frameworks, development standards, and operational processes. Focus areas included:
- Hiring for cultural fit and growth potential
- Establishing career development frameworks and mentorship programs
- Creating communication rhythms for distributed teams
- Defining functional specializations (Analytics Engineering vs. BI vs. Platform)

The org structure evolved from generalists to specialists as the team matured, allowing deeper expertise while maintaining collaboration across functions.

**Outcome:** Successfully scaled the organization while maintaining 95%+ retention and improving delivery velocity by approximately 40%. The team consistently received high engagement scores in company-wide surveys, indicating strong culture despite rapid growth.

**Attribution:** The team executed the work; I created the systems, processes, and culture that enabled sustainable scaling.

---

## Key Initiative 2: Enterprise Data Governance Program

**Context:** As a newly public company, Chewy faced regulatory requirements (SOX, CCPA) and needed governance frameworks that didn't exist. I unexpectedly inherited enterprise GRC responsibilities typically owned by dedicated compliance teams, including managing relationships with PwC and Internal Audit.

**Approach:** I launched Chewy's enterprise Data Governance program from scratch, establishing:
- **Data classification frameworks** defining PII, sensitive data, and public data categories
- **Access control standards** with role-based permissions and least-privilege principles
- **Compliance frameworks** supporting CCPA compliance and GDPR readiness
- **Tooling implementation:** Alation for data discovery/catalog, OneTrust for privacy management
- **Audit management:** Personally drove PCI audits, SOX compliance validation, and served as primary contact for PwC and Internal Audit

This work required translating regulatory requirements into technical implementations while maintaining business velocity.

**Outcome:** Enabled IPO readiness and established governance posture necessary for public company operations. Successfully navigated multiple SOX audit cycles and PCI compliance validations. Improved stakeholder data trust scores from 45% to 85% in annual surveys (based on internal metrics).

**Recognition:** Named to 2021 Drexel Lebow Analytics 50 for Data Governance leadership; received 2021 Ventana Research Digital Leadership Award for Data Catalog implementation.

---

## Key Initiative 3: Self-Service Analytics Expansion (Tableau)

**Context:** Tableau adoption had grown organically to ~100 users but lacked governance, standards, or compliance controls necessary for SOX requirements. Executive leadership wanted to democratize analytics but needed confidence in data integrity and access controls.

**Approach:** I architected a SOX-compliant Tableau Server environment with:
- **Dev/Prod separation** ensuring tested content before production deployment
- **Role-based access controls** with audit logging for compliance
- **Governance frameworks** including content certification, data source standards, and publishing workflows
- **Enablement programs** providing training, office hours, and tiered support

This required balancing governance rigor with user accessibility—too much control would kill adoption; too little would create compliance risk.

**Outcome:** Scaled Tableau from 100 to 3,500+ users (35x growth) while maintaining SOX compliance. Transformed analytics from centralized bottleneck to democratized capability across the enterprise. Reduced ad-hoc data requests by 60% as users became self-sufficient.

**Strategic Impact:** Self-service analytics became a competitive advantage, enabling faster decision-making across all business functions without proportional growth in the analytics headcount.

---

## Key Initiative 4: KPI Standardization & Cross-Functional Alignment

**Context:** Different teams (Finance, Marketing, Product, Operations) calculated core business metrics differently, leading to "data arguments" in executive meetings and eroding trust in analytics.

**Approach:** I led a cross-functional governance initiative partnering with Finance, Marketing, and Product leadership to:
- Document and reconcile KPI definition conflicts
- Establish "single source of truth" metric definitions
- Build reusable data models with certified calculations
- Create governance process for managing metric changes

This was as much organizational change management as technical work—required facilitating difficult conversations where teams had to agree on "the" definition rather than "their" definition.

**Outcome:** Reduced reporting inconsistencies by 85% (based on stakeholder surveys). Accelerated dashboard development by providing pre-built, tested metric calculations. Most importantly, executive meetings shifted from debating numbers to making decisions based on trusted data.

---

## Key Initiative 5: PII Exposure Reduction

**Context:** Legacy data pipelines had accumulated PII (Personally Identifiable Information) across data warehouse, data lake, event logging, and system logs without consistent controls. This created compliance risk under CCPA and potential GDPR regulations.

**Approach:** I established strong PII management processes including:
- Automated data classification identifying PII across all systems
- Retention policies with automated purging of aged sensitive data
- Access controls restricting PII visibility to need-to-know basis
- Data masking and anonymization for analytics and test environments
- Cross-departmental collaboration ensuring pipelines aligned with privacy regulations

This required systematic audit of every data pipeline, retroactive classification of legacy data, and cultural shift toward "privacy by design."

**Outcome:** Reduced instances of errant PII by 97% over a 6-month period across all data systems (data warehouse, data lake, event logging, system logs). Established compliance posture protecting the company from regulatory risk and customer trust violations.

---

## Key Initiative 6: Enterprise Platform Management

**Scope Expansion:** Beyond analytics, I inherited ownership of enterprise platforms including:
- **Splunk infrastructure:** Scaled from 2TB to 8TB daily ingest
- **GRC systems:** Compliance and risk management platforms
- **BI tool portfolio:** Tableau, ThoughtSpot (evaluation), Looker (evaluation)

This expansion reflected trust in my ability to manage complex, mission-critical enterprise systems beyond traditional "analytics" scope.

---

# Phase 1: Associate Director, Business Intelligence
## February 2017 - February 2020

### Strategic Focus

This was the **0 to 1 phase**: building Chewy's BI and analytics function from scratch, establishing platforms, governance, and compliance programs to support the company's 2019 IPO and transition to public markets.

---

## Key Initiative 1: Building the Team (0 to 14 People)

**Context:** I joined Chewy as a solo BI practitioner reporting to the SVP of Finance. There was no analytics team, no governance, no data platform—just ad-hoc Excel and SQL queries supporting a rapidly scaling business (growing from \$2B toward \$6B revenue).

**Approach:** I built the analytics function from ground up:
- Established hiring standards and interview processes
- Defined roles: Analytics Engineers, BI Developers, Data Engineers
- Created onboarding programs and career development frameworks
- Implemented quarterly goal frameworks (OKRs) and data-backed performance evaluations

Grew the team from solo operation to 14-member unit over 3 years while supporting Chewy's rapid revenue growth and IPO preparation.

**Outcome:** Built a high-performing team with strong retention and culture of learning. The team became the foundation for the 30-person organization that followed.

**Cultural Foundation:** Established principles that persisted long after my departure: bias toward self-service, documentation-first mindset, governance-by-design.

---

## Key Initiative 2: Analytics Platform Architecture (Lakehouse Implementation)

**Context:** Chewy had fragmented data sources (Vertica on-prem data warehouse, various SQL databases, scattered Excel files) with no unified analytics layer. The infrastructure couldn't support the analytical complexity needed for IPO readiness.

**Approach:** I architected the initial data platform implementing a lakehouse architecture:
- **Storage layer:** S3 data lake for raw and processed data
- **Warehouse layer:** Amazon Redshift for structured analytics
- **Transformation layer:** dbt for SQL-based transformations with version control
- **Semantic layer:** Central metric definitions feeding self-service reporting

Built data integration pipelines from Salesforce, Marketo, Zendesk, NetSuite, web/mobile applications, and internal systems. Established foundational practices including version control for SQL/dashboards, automated testing, and deployment standards.

**Outcome:** Created unified analytics foundation supporting business intelligence, regulatory reporting, and IPO readiness. The platform architecture became the blueprint for Chewy's enterprise-scale operations in subsequent years.

**Technologies:** AWS (S3, Redshift, Glue), dbt, Python, Apache Airflow (orchestration)

---

## Key Initiative 3: Data Governance for IPO Compliance

**Context:** Public companies face strict SOX compliance requirements around financial reporting and data controls. Chewy had no formal governance program as the IPO approached.

**Approach:** I launched Chewy's first Data Governance program establishing:
- Data classification and sensitivity frameworks
- Access control standards with audit trails
- Data quality monitoring and alerting
- Stewardship model defining ownership and accountability
- Documentation standards for compliance audits

This work directly supported Chewy's June 2019 IPO by demonstrating to auditors that data controls were in place.

**Outcome:** Successfully navigated IPO audits with zero material findings related to data governance. Established governance foundation that scaled through Chewy's growth as a public company.

---

## Key Initiative 4: Organizational Transformation (Hub-and-Spoke Model)

**Context:** As Chewy grew, the centralized BI team became a bottleneck. Every analytics request queued through a central team, creating weeks-long backlogs and frustrating business stakeholders.

**Approach:** I spearheaded transformation from centralized data team to hub-and-spoke analytics model:
- **Hub:** Central platform team maintaining standards, tools, and infrastructure
- **Spokes:** Embedded analysts within business units (Sales, Marketing, Operations, Product)
- **Enablement:** Multi-tiered support framework with 200+ hours of training content

This required building comprehensive enablement programs (SQL fundamentals, BI tool certification, analytics best practices) to ensure embedded analysts could operate independently while maintaining quality standards.

**Outcome:** Reduced ad-hoc request volume by 60% while scaling data maturity across business functions. Embedded analysts delivered localized insights faster than centralized model could, while hub maintained governance and platform reliability.

**Cultural Impact:** Transformed analytics from "service organization" to "capability enablement" mindset that persisted as the operating model for years.

---

## Key Initiative 5: Data Conference & Culture Building

**Context:** Data literacy was low across the organization, and teams didn't understand what was possible with data and analytics.

**Approach:** I founded and scaled Chewy's Data Conference from a 10-person internal demo day to a 4-day, 75-session annual event with recorded content library. The conference included:
- Technical sessions on analytics techniques and tools
- Business case studies showing data-driven wins
- Vendor workshops on emerging technologies
- Networking and community building

Also launched sister "Data Summits" with more focused vendor workshops and technical deep-dives.

**Outcome:** Built enterprise-wide data literacy and analytics culture. The programs continued thriving years after my departure, becoming part of Chewy's identity as a data-driven organization. Established Chewy's reputation as a company that invests in learning and testing culture, driving product innovation.

**Personal Pride:** This grassroots initiative—starting as a small demo day—became an institutional program that outlived my tenure. It demonstrated the power of community building in organizational transformation.

---

## Key Initiative 6: Multi-Tiered Enablement & Training

**Context:** Self-service analytics only works if users have the skills and support to use tools effectively.

**Approach:** I created a comprehensive enablement program including:
- 200+ hours of recorded training content (SQL, Tableau, data concepts)
- Weekly office hours for Q&A and troubleshooting
- Tiered support model: documentation → peer support → analytics team → escalation
- Certification programs for Tableau proficiency

This infrastructure reduced dependency on the central team while maintaining quality standards.

**Outcome:** Elevated self-service adoption from 10% to 60% of business users. Employees could answer their own questions rather than waiting for analysts. The training library became a long-term asset continuously used by new hires.

---

## Cumulative Impact Across All Phases

### Scale & Growth
- Built Chewy's analytics function from solo contributor to 30+ people through IPO and beyond
- Scaled Tableau users from 100 to 3,500+ (35x growth)
- Supported company growth from \$2B to \$8B+ in revenue
- Managed data operations at petabyte scale processing billions of events daily

### Cost & Efficiency
- \$35K annual savings replacing Segment with internal event pipeline
- Significant cost optimizations through right-sizing and query performance improvements
- 60% reduction in ad-hoc requests through self-service enablement
- 50% improvement in P95 query latency through platform optimizations

### Quality & Reliability
- 97% reduction in PII exposure across all data systems
- Prevented metric drift through regression testing frameworks
- Established SOX-compliant development workflows and audit processes
- Implemented comprehensive data quality monitoring and alerting

### Organizational Impact
- Led company through IPO data readiness (June 2019)
- Established enterprise governance programs from scratch
- Built hub-and-spoke analytics operating model adopted company-wide
- Created data culture through conferences, training, and community building

---

## Technologies & Tools (Comprehensive List)

**Data Platforms:**
- Snowflake (cloud warehouse)
- Amazon Redshift (cloud warehouse)
- HP Vertica (on-prem legacy warehouse)
- S3 data lake architecture

**Orchestration & Transformation:**
- Apache Airflow (workflow orchestration)
- dbt (data transformations & testing)
- Python (ETL, automation, integrations)

**Real-Time & Streaming:**
- AWS Kinesis (event streaming)
- Kafka (distributed messaging)
- Custom event ingestion frameworks

**Analytics & BI:**
- Tableau (primary BI platform)
- ThoughtSpot (evaluated, limited adoption)
- KNIME (citizen data science)

**Observability & Quality:**
- Monte Carlo (data observability)
- Custom regression testing frameworks
- dbt unit tests

**Governance & Compliance:**
- Alation (data catalog)
- OneTrust (privacy management)
- GRC platforms (audit and compliance)
- Splunk (log aggregation, 2TB-8TB daily ingest)

**Integration Sources:**
- Salesforce (CRM)
- Marketo (marketing automation)
- Zendesk (customer support)
- NetSuite (finance)
- Braze (customer engagement)
- Google Analytics (web analytics)
- Internal product event streams

---

## Departure Context

I departed Chewy in October 2023 as part of a personal decision to explore new opportunities after 6+ years of growth with the company. The data organization, platforms, and cultural programs I built remain in production and continue to operate with the principles and patterns established during my tenure.

The role progression from solo IC to director-level leadership of 30+ people demonstrated my ability to scale organizations, navigate IPO complexity, and deliver at Fortune 500 scale while maintaining strong team culture and technical excellence.

---

## Related Content

- See `project_migration_vertica_to_snowflake.md` for cloud migration case study
- See `project_real_time_event_pipeline.md` for Segment replacement deep-dive
- See `project_data_governance_ipo.md` for IPO readiness governance program
- See `architecture_lakehouse_implementation.md` for platform architecture details
- See `philosophy_hub_and_spoke_model.md` for organizational transformation approach
- See `philosophy_servant_leadership.md` for team scaling and culture philosophy
- See `accomplishments_team_growth.md` for detailed scaling lessons learned
