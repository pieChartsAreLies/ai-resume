# Project: Vendor Analytics Platform (Revenue-Generating Data Product)

---
category: projects
subcategory: data_products
tags: [revenue-generation, external-analytics, snowflake-data-sharing, vendor-management, row-level-security]
date_range: 2019-06 to 2023-10
relevance_to_vp_role: high
sanitization_status: reviewed
---

# Project: Vendor Analytics Platform - $10M+ Annual Revenue

**Role:** Director of Software Engineering - Analytic Platforms | **Company:** Chewy
**Timeline:** June 2019 - October 2023 (ongoing through tenure) | **Revenue Impact:** $10M+ annually

## Executive Summary

Transformed a recurring internal request pattern (vendors constantly asking for sales/inventory data) into a revenue-generating external analytics platform. Built secure, scalable Snowflake data sharing infrastructure that allowed Chewy's vendor partners (manufacturers, supply chain partners) to access real-time sales and inventory insights through self-service dashboards.

This project demonstrated **data as a product** mindset—treating data not just as an internal operational asset but as a monetizable business capability. The platform required sophisticated security architecture (row-level security, audit logging, view-only access) to protect Chewy's competitive data while delivering vendor value.

---

## Problem Statement

### Business Context

Chewy operates a two-sided marketplace: consumers purchasing pet products, and vendors (manufacturers, distributors) supplying inventory. Vendors had limited visibility into how their products performed on Chewy's platform—relying on monthly reports or ad-hoc data requests.

### Key Pain Points

**1. Constant Data Requests**
- Vendors repeatedly requested: "How are my products selling? What's my inventory position? Which SKUs are trending?"
- Chewy's account managers became the bottleneck, manually pulling reports
- Requests were ad-hoc, inconsistent, and time-consuming

**2. Competitive Differentiation**
- Amazon and other e-commerce platforms offered vendor portals with analytics
- Chewy lacked parity, putting vendor relationships at risk
- Opportunity to differentiate by offering *better* insights than competitors

**3. Revenue Opportunity**
- Vendors expressed willingness to pay for deeper insights
- Data access could become a value-added service, not just operational overhead
- Potential to offset data platform costs by monetizing data products

**4. Security & Governance Complexity**
- Vendors should only see *their* data, not competitors' performance
- Must prevent data leakage (no raw table access, no exports to competitors)
- Required audit trail for compliance (who accessed what, when)

### Success Criteria

- Deliver self-service vendor analytics without manual report generation
- Generate measurable revenue (target: offset 50%+ of data platform operating costs)
- Maintain strict data security (zero data breaches, complete vendor isolation)
- Scale to 100+ vendors without linear operational overhead
- Achieve 80%+ vendor adoption within 12 months

---

## Initial Scope & Evolution

**Original Business Driver: Veterinary Practice Support**

The platform originated from a specific need within Chewy's veterinary services division. Chewy partnered with veterinary practices to provide prescription medications and specialized pet food. These vet practices needed visibility into:
- Customer purchases of prescribed products
- Compliance with rebate programs (manufacturers offering vet incentives)
- Patient adherence to prescribed treatment plans

The initial MVP focused exclusively on this veterinary use case, providing practices with dashboards showing prescription fulfillment rates and rebate tracking.

**Platform Expansion**

After proving value with veterinary practices, the platform was recognized as a reusable capability. Over the following 2 years, we expanded to serve **two additional business units** (specific units sanitized per NDA):

1. **Business Unit 2:** Wholesale/distribution partners requiring inventory visibility and demand forecasting
2. **Business Unit 3:** Marketing partners (agencies, affiliates) needing campaign performance and attribution data

Each expansion followed the same pattern:
- Understand business unit's data access needs
- Build secure views specific to their data permissions
- Create tailored dashboards for their use cases
- Establish pricing tiers based on data freshness and API access

By 2023, the platform served **three distinct external constituencies** with a unified underlying architecture, demonstrating the scalability of the Snowflake Data Sharing model.

---

## Approach & Execution

### Phase 1: Discovery & Validation (Months 1-2)

**Stakeholder Interviews:**
Partnered with Chewy's Vendor Management team to understand:
- What vendors asked for most frequently
- What competing platforms (Amazon Vendor Central) offered
- What vendors would pay for enhanced insights
- What data Chewy could legally/competitively share

**Key Findings:**
- Vendors primarily wanted: sales velocity by SKU, inventory levels, days-on-hand, geographic trends
- Competitive intel (other vendors' performance) was explicitly off-limits
- Vendors valued *timeliness* (daily updates) over *depth* (complex analytics)
- Pricing model: annual subscription tiers based on data freshness and granularity

**Technical Feasibility:**
- Snowflake supported **Secure Data Sharing** (zero-copy, no data movement)
- Could enforce row-level security through secure views
- Audit logging built into Snowflake (QUERY_HISTORY, ACCESS_HISTORY)

**Business Case:**
- Estimated 50-100 vendor partners would subscribe at $100K-$200K/year
- Platform build cost: ~$500K (6 months, 3 engineers + BI developer)
- Break-even: 5-10 vendors in Year 1
- ROI: 3:1 by Year 2 if adoption targets hit

---

### Phase 2: Security Architecture Design (Months 2-3)

**Core Security Principles:**

1. **No Raw Table Access** - Vendors only access curated **secure views**
2. **Row-Level Security** - Each vendor sees only their own SKUs (enforced via `CURRENT_USER()` function)
3. **No Exports** - Disable bulk data downloads to prevent competitive intelligence sharing
4. **Audit Everything** - Log every query, every access, every user session
5. **Immutable History** - Vendors cannot modify or delete data (read-only)

**Snowflake Data Sharing Model:**

```sql
-- Secure View Example (Simplified)
CREATE SECURE VIEW vendor_sales_analytics AS
SELECT
    date,
    sku_id,
    product_name,
    units_sold,
    revenue,
    inventory_on_hand,
    days_inventory_remaining,
    region
FROM core.fact_sales
WHERE vendor_id = (
    SELECT vendor_id
    FROM vendor_mapping
    WHERE snowflake_user = CURRENT_USER()
)
AND date >= DATEADD('day', -90, CURRENT_DATE()); -- 90-day rolling window
```

**Key Design Decisions:**

- **Secure Views Only:** Prevents vendors from seeing underlying table structures or joining across datasets
- **CURRENT_USER() Filtering:** Automatically enforces row-level security without manual user management
- **Time-Bound Data:** Limit historical access (e.g., 90 days) to control data volume and competitive risk
- **Aggregation Layer:** Some views pre-aggregated to prevent reverse-engineering of Chewy's total volume

---

### Phase 3: Data Product Development (Months 3-6)

**Data Modeling:**

Built a **vendor-specific data mart** with these core tables/views:

1. **Sales Performance** (daily SKU-level sales, revenue, units)
2. **Inventory Position** (current on-hand, in-transit, days-of-supply)
3. **Geographic Trends** (sales by region/state)
4. **Product Performance** (top/bottom SKUs, growth trends)
5. **Promotional Impact** (sales lift during promotions)

**BI Dashboard Development:**

Partnered with Tableau to build vendor-facing dashboards:
- Executive Summary (KPIs, trends, alerts)
- SKU Deep-Dive (individual product performance)
- Inventory Management (reorder recommendations)
- Competitive Benchmarking (anonymized category trends—*not* competitor-specific data)

**Data Refresh Cadence:**
- **Daily refresh** for standard tier ($100K/year)
- **Near real-time** (hourly) for premium tier ($200K/year)
- Orchestrated via Airflow, refreshed from core data warehouse

---

### Phase 4: Commercialization & Launch (Months 6-9)

**Pricing Strategy:**

| Tier | Price/Year | Data Freshness | Features |
|------|-----------|----------------|----------|
| **Standard** | $100K | Daily | 90-day history, core metrics, Tableau dashboards |
| **Premium** | $200K | Hourly | 12-month history, API access, custom reporting |
| **Enterprise** | Custom | Real-time | Unlimited history, dedicated support, white-glove onboarding |

**Go-To-Market:**

- **Pilot Program:** Launched with 5 strategic vendors (free for 3 months)
- **Feedback Loop:** Iterated dashboards based on pilot feedback
- **Vendor Management Sales:** Account managers pitched during quarterly business reviews
- **Contract Integration:** Data access bundled into annual vendor agreements

**Adoption Metrics (First 12 Months):**

- **25 vendors signed** (Year 1 target: 20)
- **$3.2M revenue** (Year 1 target: $2M)
- **85% retention rate** (vendors renewed after Year 1)
- **Zero security incidents** (no data breaches, no competitor leakage)

---

## Quantifiable Outcomes

### Financial Impact

**Revenue Generation:**
- **Year 1:** $3.2M
- **Year 2:** $7.5M (as platform matured, added API access tier)
- **Year 3+:** $10M+ annually (by time of departure)
- **Total ROI:** 20:1 (initial $500K investment, $10M+ annual recurring revenue)

**Cost Offset:**
- Chewy's data platform operating costs: ~$15M/year
- Vendor platform revenue offset: ~67% of platform costs by Year 3
- Transformed data from pure cost center to revenue contributor

### Operational Efficiency

**Manual Reporting Reduction:**
- **Before:** Vendor Management team spent ~200 hours/month on manual reports
- **After:** Self-service eliminated 90% of ad-hoc requests
- **Productivity Gain:** Vendor Management refocused on strategic partnerships vs. data pulls

**Scalability:**
- Platform scaled from 5 pilot vendors to 50+ vendors with zero additional headcount
- Automated onboarding process reduced time-to-value from 4 weeks to 3 days

### Strategic Impact

**Vendor Satisfaction:**
- Net Promoter Score (NPS) for vendor services increased 18 points post-launch
- Vendors cited data transparency as top reason for deepening Chewy partnership

**Competitive Differentiation:**
- Chewy's vendor platform rated higher than Amazon Vendor Central in annual survey
- Several vendors increased inventory commitments citing improved visibility

---

## Key Lessons & Retrospective

### What Worked Well

**1. Product Thinking Over Platform Thinking**

Treated this as a **product**, not just "data access." That meant:
- Understanding vendor jobs-to-be-done ("I need to forecast demand")
- Designing for self-service, not expert users
- Iterating based on usage data (which dashboards actually get used?)

**2. Security by Design, Not Bolted On**

Snowflake's Secure Data Sharing was architectural—not a governance afterthought. This prevented the "oops, we leaked competitor data" scenario that kills trust.

**3. Pilot-Driven Iteration**

5-vendor pilot surfaced critical gaps:
- Vendors wanted inventory *projections*, not just current levels → added predictive modeling
- Dashboard navigation was too complex → simplified to 3 core views
- Some vendors had unique SKU naming → built SKU mapping tool

**4. Commercialization Strategy**

Pricing based on *value delivered* (data freshness, API access) not *cost incurred* (compute, storage). Vendors paid for business outcomes, not infrastructure.

### What Didn't Work

**1. API Adoption Lower Than Expected**

Only 20% of vendors used API access (Premium tier feature). Most preferred dashboards. Overbuilt technical complexity for limited demand.

**Learning:** Ship MVPs for unproven features. APIs should have been Year 2 add-on after validating demand.

**2. Custom Reporting Requests Still Emerged**

Despite self-service, some vendors wanted bespoke analysis (e.g., "Compare my performance to top 10% of category"). Required custom work.

**Solution:** Built "Insights as a Service" premium tier where analysts handled custom requests—charged $50K extra annually.

**3. Data Quality Issues Impacted Vendor Trust**

One vendor identified discrepancy in reported sales (due to return processing lag). Eroded trust temporarily.

**Solution:** Implemented **data quality SLAs** with documented calculation methodologies. Transparency rebuilt trust faster than perfection.

### Patterns to Replicate

**"Data as Product" Checklist:**

1. **User Research:** What decisions does this data enable? (not "what data do they want?")
2. **Security First:** Can data leak? What's the worst-case breach scenario?
3. **Self-Service Default:** Assume zero analyst support post-launch
4. **Monetization Model:** Charge for value/outcomes, not cost recovery
5. **Feedback Loop:** Instrument usage (what gets queried, when, by whom?)

---

## Skills Demonstrated

### Strategic

- **Product Management:** Treated data as a product with pricing, packaging, go-to-market strategy
- **Commercialization:** Turned internal operational cost into external revenue stream
- **Stakeholder Management:** Aligned Vendor Management, Legal, Data teams around shared vision

### Technical

- **Snowflake Data Sharing:** Secure view architecture, row-level security, audit logging
- **Data Security:** Designed multi-tenant isolation without separate databases
- **Data Modeling:** Built vendor-specific dimensional models optimized for self-service BI

### Leadership

- **Cross-Functional Collaboration:** Partnered with Sales, Legal, Product to launch revenue product
- **Change Management:** Shifted vendor expectations from "ask for reports" to "self-serve insights"
- **Team Enablement:** Trained Vendor Management team to onboard vendors and troubleshoot access

---

## Technologies & Tools

**Data Platform:**
- **Snowflake:** Secure Data Sharing, secure views, row-level security
- **dbt:** Data transformation, business logic layer
- **Airflow:** Orchestration, scheduled refreshes

**BI & Visualization:**
- **Tableau:** Vendor-facing dashboards (embedded in vendor portal)
- **Looker:** Internal analytics (track vendor usage patterns)

**Security & Governance:**
- **Snowflake RBAC:** User provisioning, role-based access control
- **QUERY_HISTORY / ACCESS_HISTORY:** Audit logging for compliance
- **OneTrust:** PII mapping (ensure no vendor access to customer PII)

**Monitoring:**
- **SELECT:** Snowflake cost monitoring (track vendor compute usage)
- **Custom Alerting:** Slack alerts for anomalous query patterns (potential security issues)

---

## Retrospective: Impact on Career

This project solidified my philosophy that **data teams should think like product teams**, not just service organizations.

The skills I developed here—commercialization strategy, security architecture, self-service product design—are directly applicable to any organization asking:
- "How do we monetize our data?"
- "How do we build external-facing analytics?"
- "How do we scale data access without scaling headcount?"

**Most Importantly:** It demonstrated to executives that data is not just operational overhead—it's a strategic business capability that can generate revenue, differentiate competitively, and deepen customer/partner relationships.

This was my first experience building a **data product** (not just data infrastructure), and it fundamentally changed how I approach data leadership: always ask "What's the business outcome?" not just "What's the technical requirement?"

---

## Related Content

- See `career_chewy.md` for broader role context
- See `philosophy_build_vs_buy.md` for decision framework on Snowflake vs. custom build
- See `skills_data_platforms.md` for Snowflake technical expertise
- See `projects/project_instrumentation_audit_chewy.md` for another strategic initiative
