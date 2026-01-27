# Project: Enterprise Instrumentation Audit at Chewy

---
category: projects
subcategory: data_quality
tags: [instrumentation, product-analytics, audit, organizational-transformation, mobile-architecture]
date_range: 2023-01 to 2023-05
relevance_to_vp_role: high
sanitization_status: reviewed
---

# Project: Company-Wide Instrumentation Audit & Mobile Re-Architecture

**Role:** Director of Software Engineering - Analytic Platforms | **Company:** Chewy
**Timeline:** January 2023 - May 2023 (4 months) | **Scale:** 30 teams, 80+ interviews

## Executive Summary

Led a comprehensive 4-month forensic audit of Chewy's data instrumentation across 30 product and engineering teams, exposing critical mobile data integrity issues that drove a C-suite decision to consolidate mobile architecture (iOS/Android → web-only). The audit uncovered that launching new product features with instrumentation required 124 discrete steps across multiple teams, creating months-long delays and systemic data quality problems affecting \$8B+ operations.

The project transformed executive perception of data quality from "analytics problem" to "product engineering problem" and secured multi-year investment in instrumentation governance.

---

## Problem Statement

### Business Context

Chewy's rapid growth from startup to Fortune 500 company (IPO 2019) had resulted in fragmented data instrumentation across a sprawling product and engineering organization. Product teams struggled to assess feature performance because getting analytics data was prohibitively complex and time-consuming.

### Key Pain Points

**1. Excessive Complexity**
- New product launches requiring instrumentation involved 124 distinct steps across multiple teams
- No single team owned the end-to-end instrumentation process
- Approval workflows created months-long bottlenecks

**2. Mobile Data Integrity Crisis**
- iOS and Android teams had independently evolved over years
- Event schemas were misaligned between platforms
- The same user action triggered different events on different platforms
- Customer journey analysis across platforms was impossible

**3. Organizational Structure Gaps**
- No clear accountability for instrumentation quality
- Product engineers viewed analytics as "someone else's problem"
- Analytics team had no authority to enforce instrumentation standards

**4. Scale**
- Petabyte-scale data volumes
- Millions of daily active users
- Billions of events daily
- 30+ product teams independently instrumenting features

###Success Criteria

- Document the complete "as-is" state of instrumentation across the organization
- Identify root causes of data quality issues
- Quantify business impact of instrumentation complexity
- Deliver actionable roadmap to C-suite
- Drive executive-level strategic decisions

---

## Approach & Execution

### Phase 1: Stakeholder Discovery (Weeks 1-8)

**Method:** Conducted 80+ structured interviews across 35 teams including:
- Product managers defining instrumentation requirements
- iOS and Android engineers implementing tracking
- Analytics engineers consuming event data
- Data scientists using events for ML models
- Backend engineers managing event pipelines

**Key Activities:**
- Mapped the complete 124-step workflow from "we want to track this" to "data is available"
- Documented decision points, approval gates, and handoffs
- Identified where processes broke down most frequently
- Collected real-world examples of instrumentation failures

**Leadership Approach:**
I personally conducted these interviews to ensure consistency and build trust. Teams were more candid one-on-one about pain points than they would have been with junior researchers. This was high-leverage use of executive time—the insights shaped the entire C-suite strategy.

---

### Phase 2: Technical Archeology (Weeks 4-12)

**Method:** Deep-dive analysis of event schemas, data pipelines, and quality metrics.

**Discoveries:**

**Mobile Schema Divergence:**
- iOS team used `camelCase` event naming; Android used `snake_case`
- Same business event (e.g., "Add to Cart") had different property structures
- iOS emitted 47 unique properties for checkout flow; Android emitted 39 (only 28 matched)
- Historical technical debt from years of independent evolution

**Data Quality Impact:**
- Customer journey funnels showed ~15% drop-off that was actually iOS→Android platform switches, not real churn
- ML personalization models trained on inconsistent data performed 12% worse than expected
- A/B test results were confounded by platform-specific instrumentation bugs

**Root Cause:**
Originally, iOS and Android teams operated as separate cost centers with independent roadmaps. Each optimized for their platform's conventions. No one had authority to enforce cross-platform standards. By the time the problem was recognized, technical debt was massive.

---

### Phase 3: C-Suite Presentation (Week 13)

**Deliverable:** 45-slide deck with three sections:

1. **Current State:** Visual map of the 124-step process with bottlenecks highlighted
2. **Business Impact:** Quantified cost of instrumentation complexity (months of delayed product launches, degraded ML model performance, unreliable metrics)
3. **Roadmap:** Three options with cost/benefit analysis

**Three Strategic Options Presented:**

**Option 1: Incremental Improvement** (Low cost, low impact)
- Standardize event naming conventions
- Create shared documentation
- Cost: ~$200K in engineering time
- Timeline: 6-9 months
- **Risk:** Doesn't address root cause; mobile teams still diverge

**Option 2: Mobile Convergence** (Medium cost, high impact)
- Force iOS and Android teams to align on unified schema
- Implement schema validation in CI/CD pipelines
- Cost: ~$1.5M in engineering time
- Timeline: 12-18 months
- **Risk:** Political resistance from mobile teams; requires ongoing enforcement

**Option 3: Mobile Re-Architecture** (High cost, transformative impact)
- Consolidate to web-only platform served via mobile webviews
- Eliminate iOS/Android code divergence entirely
- Cost: ~$5M in engineering investment
- Timeline: 18-24 months
- **Benefit:** Solves instrumentation AND reduces long-term mobile engineering costs by 40%

**My Recommendation:** Option 3, with clear acknowledgment that this was a multi-year strategic bet, not a quick fix.

---

### Phase 4: Post-Presentation Impact (Months 5-12)

**Executive Decision:**
C-suite chose Option 3—full mobile re-architecture. This was a rare case where data quality concerns drove a major architectural decision affecting the entire engineering organization.

**My Role Post-Audit:**
- Served as subject matter expert for mobile re-architecture planning
- Defined instrumentation requirements for the new unified platform
- Built regression testing framework (separate project) to prevent recurrence

---

## Quantifiable Outcomes

### Immediate Impact

**Strategic Clarity:**
- Shifted executive perception: instrumentation is product engineering responsibility, not analytics cleanup
- Secured multi-year funding for instrumentation governance program
- Elevated data quality to C-suite priority

**Roadmap Influence:**
- Mobile re-architecture became #1 tech priority for 2024
- Engineering roadmap reprioritized around data integrity

### Long-Term Impact (Post-Departure)

Based on follow-up conversations with former colleagues:
- Mobile re-architecture launched Q2 2024
- Instrumentation consistency improved >90% after consolidation
- Product teams reported 60% reduction in time-to-instrumentation
- ML model performance improved as training data quality increased

---

## Key Lessons & Retrospective

### What Worked Well

**1. Executive-Led Investigation**
Conducting interviews personally (rather than delegating) built trust and credibility. Teams knew their feedback would reach the C-suite accurately, not filtered through layers.

**2. Quantified Business Impact**
I didn't present this as a "data team problem." I framed it as "product velocity problem costing millions in delayed launches." That resonated with executives focused on revenue impact.

**3. Options, Not Mandates**
Presenting three costed options with trade-offs (not a single recommendation) respected executive decision-making authority while providing data-driven analysis.

### What Didn't Work

**1. Timeline Optimism**
I underestimated how long the discovery phase would take. Originally scoped at 6 weeks; took 12 weeks because every interview uncovered 3 new edge cases to investigate.

**2. Political Resistance**
Mobile engineering leaders initially viewed this as blame assignment. I should have involved them earlier as co-investigators rather than subjects of investigation. Lesson: frame audits as "we're solving this together" not "I'm documenting your failures."

### Patterns I'd Replicate

**"Forensic Audit" Approach:**
Treating this as a systematic investigation (not a survey) uncovered root causes that stakeholders themselves didn't fully understand. Everyone knew instrumentation was broken; no one knew *why* until we mapped the complete workflow.

**Cross-Functional Lens:**
Including product, engineering, and analytics perspectives prevented single-team bias. The 124-step workflow was invisible to any single team—each only saw their 15-20 steps.

---

## Skills Demonstrated

### Strategic

- **Executive Communication:** Translated technical complexity into business language (cost, velocity, risk)
- **Change Management:** Drove organizational transformation through data-driven storytelling
- **Political Navigation:** Managed stakeholder resistance from mobile teams whose work was being scrutinized

### Technical

- **Data Archeology:** Reverse-engineered years of technical debt to identify root causes
- **Systems Thinking:** Understood how 30 independent teams' decisions created emergent dysfunction
- **Forensic Analysis:** Mapped complex workflows across organizational boundaries

### Leadership

- **Stakeholder Engagement:** 80+ interviews demonstrating patience and active listening
- **Strategic Framing:** Positioned data quality as business priority, not IT problem
- **Credibility Building:** Earned trust across product and engineering organizations

---

## Technologies & Tools

**Analysis Tools:**
- SQL (querying event logs to identify schema inconsistencies)
- Python (analyzing event property distributions across platforms)
- Looker (visualizing data quality metrics for executives)

**Documentation:**
- Lucidchart (process flow mapping for 124-step workflow)
- Google Slides (C-suite presentation)
- Confluence (detailed technical findings documentation)

**Data Sources:**
- Kafka event streams (real-time event data)
- Snowflake data warehouse (historical event analysis)
- GitHub (code archaeology of iOS/Android instrumentation)

---

## Retrospective: Impact on Career

This project taught me that **the highest-leverage work for a data leader isn't building dashboards—it's uncovering organizational truths that no one else can see**.

The audit required three capabilities:
1. **Technical depth** to understand schema design and data pipelines
2. **Business acumen** to quantify impact in revenue/velocity terms
3. **Political skill** to present uncomfortable truths without blame

Most importantly, it demonstrated that data leadership means being willing to tell the C-suite hard truths backed by evidence. Not every data leader has the credibility or courage to say "we need to spend $5M and 18 months to fix this." That moment defined my value as a strategic advisor, not just a platform operator.

---

## Related Content

- See `career_chewy.md` for broader role context
- See `project_regression_testing_framework.md` for follow-on work preventing recurrence
- See `philosophy_servant_leadership.md` for how I absorbed political fallout to protect team
- See `skills_data_platforms.md` for technical instrumentation expertise
- See `perspective_data_quality_as_product.md` for the mindset that guided this work
