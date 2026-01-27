---
category: perspectives
subcategory: product_thinking
tags: [data_products, product_management, platform_thinking, user_experience, data_quality, sustainability]
date_range: ongoing
relevance_to_vp_role: high
sanitization_status: reviewed
---

# Perspective: Treating Data as a Product

## Core Belief Statement

Data teams should think and operate like product teams. Every dataset, dashboard, and data pipeline is a product with users, requirements, quality standards, and a lifecycle. This means: understanding user needs through research, defining clear success metrics, maintaining SLAs, versioning thoughtfully, sunsetting deprecated products, and obsessing over user experience. Data is not "build it and they will come"—it's "build what they need, make it discoverable, document it well, and continuously improve it." Organizations that treat data like infrastructure (plumbing that just works in the background) succeed; those that treat it like a cost center fail.

---

## Origin Story

I came to this perspective through a painful lesson at Babylist. When I joined in 2024, I inherited a data warehouse with 400+ tables, 200+ dashboards, and zero documentation. No one knew which tables were canonical, which dashboards were trusted, or who owned what. The team was overwhelmed with "broken dashboard" tickets but had no systematic way to prioritize fixes. Data was treated as output: "We built it, our job is done."

One day, a finance leader pulled me aside and said, "I don't know which revenue dashboard to use. I have three options, they all show different numbers, and I don't trust any of them." That should never happen.

I realized the root cause: **we hadn't thought about data users as customers**. We built dashboards when asked but didn't consider:
- Who would use them?
- What questions are they trying to answer?
- How will they discover this dashboard exists?
- What happens when underlying data changes?
- When should we retire old dashboards?

This was the opposite of how product teams operate. Imagine if Spotify built a feature, shipped it, and never checked if users found it, used it, or liked it. That would be absurd. Yet that's exactly how many data teams operate.

The turning point came when I introduced "Data Product Reviews"—a lightweight process borrowed from product management:

**For New Data Products (dashboards, datasets, pipelines):**
1. Who is the user? (persona, role, use case)
2. What problem does this solve?
3. How will they find it? (catalog entry, training, documentation)
4. What's the success metric? (usage, satisfaction, business impact)
5. Who owns maintenance and updates?

**For Existing Data Products:**
1. Usage analytics: Is anyone using this?
2. Quality monitoring: Is it accurate and timely?
3. User feedback: Does it meet their needs?
4. Deprecation plan: If unused, when do we sunset it?

Within 6 months at Babylist, we had retired 40% of dashboards (unused or duplicative), documented the remaining 60%, and established clear ownership for all data products. User satisfaction scores jumped from 4.2/10 to 7.8/10.

I learned: **Data without product thinking is just noise. Data with product thinking is leverage.**

---

## Practical Application

### Example 1: Building a Customer LTV Data Product

**Situation:** At Chewy, the finance and marketing teams both needed Customer Lifetime Value (LTV) metrics but calculated them differently, creating confusion and misalignment.

**Product Thinking Applied:**

**User Research:**
- Conducted 1:1 interviews with 5 finance analysts and 5 marketing managers
- Discovered they needed LTV for different purposes:
  - Finance: forecasting annual revenue (backward-looking, actuals-based)
  - Marketing: evaluating campaign ROI (forward-looking, predictive)

**Product Decision:**
Instead of forcing one definition, we built **two LTV data products** with clear names:
- `metric_ltv_actual` (Finance use case: historical, realized revenue)
- `metric_ltv_predicted` (Marketing use case: ML model-based forecast)

Both documented in data catalog with:
- **Purpose:** "Use this metric when..."
- **Limitations:** "This does not include..."
- **Refresh schedule:** Daily at 6 AM ET
- **Owner:** Finance Analytics (actual), Marketing Analytics (predicted)
- **SLA:** <2 hour data freshness

**Outcome:**
- Finance and marketing stopped arguing about "the right LTV"—they understood they needed different products for different jobs
- Usage tracked via Alation: 40+ users accessed these metrics monthly
- Quarterly product review: we added a field requested by 3+ users (customer cohort)

This is product management. We didn't just "build LTV metrics"—we understood user needs, built fit-for-purpose solutions, documented them, maintained them, and iterated based on feedback.

### Example 2: Sunsetting Low-Value Data Products

**Situation:** At Chewy, we had 2,000+ Tableau dashboards on the server. Many were abandoned experiments or one-off analyses. Finding trusted content was like searching a junk drawer.

**Product Thinking Applied:**

**Usage Analytics:**
- Pulled 90 days of Tableau Server logs
- Identified dashboards with <5 views in 90 days (600+ dashboards)

**User Outreach:**
- Emailed dashboard owners: "This hasn't been viewed in 3 months. Still needed?"
- 70% response: "No, you can delete it" or no response
- 30% response: "Yes, I use it quarterly" → tagged as "seasonal"

**Deprecation Process:**
- Moved unused dashboards to "Archive" folder (not deleted—preserving history)
- Published "Trusted Content" catalog with 400 high-quality, maintained dashboards
- Result: Users could actually find relevant content

**Outcome:**
- Reduced content sprawl by 60%
- Time to find relevant dashboard: decreased from 15 minutes to 3 minutes (user survey)
- Server performance improved (less indexing load)

This is product lifecycle management. Not every product lives forever. Sunsetting low-value products improves the experience for remaining users.

### Example 3: SLA-Driven Data Pipeline Design

**Situation:** At Babylist, marketing teams complained that "the data is always wrong" because reporting data didn't match transactional data.

**Root Cause Analysis:**
- Marketing dashboard refreshed daily at 6 AM
- Underlying pipeline ran at 8 AM
- Dashboard was showing yesterday's stale data

**Product Thinking Applied:**

**Defined SLA with Users:**
- Interviewed marketing: "When do you need fresh data?"
- Answer: "By 9 AM, when we review yesterday's campaign performance"

**Designed Pipeline to Meet SLA:**
- Adjusted pipeline schedule: run at 5 AM (finish by 6 AM)
- Built monitoring: alert if pipeline exceeds 60-minute SLA
- Dashboard now shows: "Data as of [timestamp]" so users know freshness

**Outcome:**
- "Data is wrong" complaints dropped to near-zero
- Marketing trusted the dashboard because it consistently met their needs
- We turned a data quality issue into a product design conversation

This is product management. We didn't just "fix the pipeline"—we understood user needs, defined an SLA, and built to that SLA.

### Example 4: User Experience for Data Discovery

**Situation:** At Chewy, users couldn't find dashboards. They'd ask Slack: "Does anyone have a dashboard for...?" even though the dashboard existed.

**Product Thinking Applied:**

**Improved Discoverability:**
- Implemented Alation data catalog with rich metadata:
  - Business purpose: "Use this dashboard to monitor..."
  - Tags: "marketing", "campaigns", "ROI"
  - Related content: "If you need X, see this other dashboard"
- Trained users: "Search Alation first before asking Slack"

**Built Onboarding Experience:**
- New hires received "Data Onboarding Guide" linking to top 10 most-used dashboards for their role
- Each dashboard had a 2-minute video: "How to use this"

**Outcome:**
- Slack "Where is the dashboard for X?" questions: dropped 60%
- Alation adoption: 1,200+ users searching the catalog monthly
- New hire time-to-productivity: reduced by 2 weeks (manager survey)

This is product UX design. We made data discoverable, not just available.

### Example 5: Continuous Improvement via Feedback Loops

**Situation:** At Babylist, we built a "Weekly Active Users" dashboard for the product team. Initial version was used heavily, then usage dropped after 2 months.

**Product Thinking Applied:**

**User Feedback:**
- Reached out to product managers: "We noticed usage dropped. What's missing?"
- Answer: "We need cohort breakdowns (iOS vs. Android vs. Web) but the dashboard only shows totals"

**Iteration:**
- Added cohort filters and breakdowns
- Re-launched with email to product team: "We heard your feedback, here's v2"

**Outcome:**
- Usage rebounded and exceeded initial levels
- Product team cited this as example of "data team listening to users"

This is product iteration. We didn't "build once and walk away"—we monitored usage, gathered feedback, and improved.

---

## Tradeoffs & Boundaries

Treating data as a product introduces overhead. Not everything deserves full product management treatment.

**When to Apply Product Thinking:**

**High-Value, High-Reuse Data Products:**
- Core company metrics (revenue, KPIs)
- Widely-used dashboards (100+ users)
- Critical pipelines (if they break, business stops)

For these: Full product treatment (user research, documentation, SLAs, monitoring, iteration).

**When to Skip Product Thinking:**

**One-Off Analyses:**
- Ad-hoc "What if" questions
- Executive asks: "Can you pull this data for me?"
- Exploratory analysis with no ongoing use

For these: Just deliver the answer. Don't over-engineer.

**The Boundary:**

The key is recognizing when a "one-off" is actually a recurring need disguised as one-off. If three people ask similar questions in 3 months, that's a signal to build a reusable data product.

**Tradeoff: Overhead vs. Sustainability**

Product thinking requires upfront investment: documentation, user research, monitoring. This slows initial delivery. But the payoff comes in sustainability—well-documented, well-maintained data products have longer lifespans and fewer "emergency fix" requests.

Early-stage startups may not have capacity for full product thinking. That's okay. But as organizations scale (500+ employees), the chaos of un-managed data becomes unsustainable. Product thinking becomes essential.

---

## Influence & Sources

This perspective is shaped by:

**Product Management Discipline:**
- Marty Cagan's "Inspired" and "Empowered" (product discovery, user research, iteration)
- Teresa Torres' "Continuous Discovery Habits" (ongoing user feedback loops)

**Data Mesh Movement:**
- Zhamak Dehghani's "Data Mesh" introduced "data as a product" as a core principle
- Key insight: Data products should have owners, SLAs, and user contracts (just like software products)

**Platform Engineering:**
- Cloud providers (AWS, Stripe) treat their APIs as products: well-documented, versioned, supported, iterated based on customer feedback
- Internal data platforms should follow the same model

**Personal Experience:**
- Watching data teams struggle with "build and forget" mentality
- Seeing product teams obsess over user experience while data teams ignore it
- Realizing the gap: product thinking was missing from data world

---

## Application to Future Roles

In a VP role, I would institutionalize "data as a product" through:

**1. Data Product Owners**

Every high-value data product (dashboard, dataset, pipeline) has a designated owner:
- Responsible for quality, documentation, user satisfaction
- Empowered to make improvements or sunset the product
- Held accountable via quarterly product reviews

**2. Product Lifecycle Framework**

Formalize the lifecycle:
- **Discovery:** User research, requirements gathering
- **Build:** Deliver MVP, gather feedback
- **Iterate:** Continuous improvement based on usage and feedback
- **Maintain:** SLA monitoring, incident response
- **Sunset:** Deprecation when no longer needed

**3. Data Product Metrics**

Track product health, not just operational metrics:
- **Usage:** # of active users, frequency of use
- **Quality:** Data freshness, accuracy (monitored via tests)
- **Satisfaction:** Quarterly user surveys (NPS-style)
- **Business Impact:** Tie products to outcomes (e.g., "This dashboard influenced $X decision")

**4. Embedded Product Managers**

For large data organizations (30+ people), embed 1-2 product managers within the data team:
- They don't build data—they manage the product lifecycle
- They conduct user research, prioritize roadmaps, define success metrics
- They ensure data team operates like a product team

**5. Catalog as Product Discovery Layer**

Invest in data catalog (Alation, Collibra, etc.) as the "product storefront":
- Every data product has rich metadata, documentation, and usage examples
- Users can discover, evaluate, and adopt products without Slack questions
- Catalog itself is treated as a product (monitored usage, iterated UX)

---

## Real-World Evidence

At Chewy (2019-2023), applying product thinking to data:

**Before Product Thinking (2019):**
- 2,000+ dashboards, no ownership or documentation
- "Data is broken" tickets: 50+ per month
- User satisfaction: 6.5/10

**After Product Thinking (2023):**
- 600 curated data products, all documented and owned
- "Data is broken" tickets: <10 per month
- User satisfaction: 8.7/10

**Impact:**
- 60% reduction in low-value content (reduced noise)
- 40% reduction in ad-hoc requests (users could self-serve with documented products)
- Data catalog usage: 1,200+ active users monthly

At Babylist (2024-2025), I introduced product thinking but faced resistance. Leadership wanted "more dashboards, faster" and viewed documentation/user research as "slowing us down." I pushed back: "Fast, low-quality data products create more problems than they solve." We couldn't align, which contributed to my decision to leave.

This experience reinforced: **Product thinking requires executive buy-in**. It's a cultural shift, not just a process change.

---

## Counter-Argument Awareness

**Critic:** "This is overkill. Data teams should just deliver what's asked for. Users know what they need."

**Response:** Users often don't know what they need—they know what they want, which isn't the same. Product thinking uncovers the underlying need. Example: A user asks for "a dashboard with all customer data." Product thinking reveals: they actually need "a way to identify high-value customers for targeted campaigns." The solution might be a dashboard, but it could also be a daily email with a curated list. Product thinking finds the right solution, not just the requested solution.

**Critic:** "Product thinking adds bureaucracy. We need speed, not process."

**Response:** Speed without sustainability is just thrashing. Building 100 low-quality dashboards that no one uses is slower than building 20 high-quality data products that users love. Product thinking front-loads investment (user research, documentation) to avoid back-end waste (unused products, rework, support burden). It's "go slow to go fast."

**Critic:** "We don't have capacity for product managers on the data team. This is a luxury."

**Response:** You don't need dedicated PMs initially. Data engineers and analysts can adopt product thinking as a mindset. Start small: require every new data product to answer "Who is the user?" and "How will they find this?" That's 80% of the value with minimal overhead. As the team scales (20+ people), then consider dedicated PMs.

---

## Evolution & Updates

Five years ago, I thought "data as a product" meant "treating data like software"—versioning schemas, writing tests, CI/CD. That's part of it, but I missed the essence: **product thinking is about users, not engineering practices**.

Today, I see "data as a product" as:
- 70% user empathy: understanding needs, gathering feedback, iterating
- 20% lifecycle management: maintaining, sunsetting, owning
- 10% technical practices: versioning, testing, documentation

I'm now exploring how AI changes "data as a product." With LLMs, users might not interact with dashboards—they'll ask natural language questions. This doesn't eliminate product thinking; it shifts it. The "product" becomes the query layer (the AI interface), and the underlying data must be even more carefully governed and documented for the AI to interpret correctly.

**Future hypothesis:** In 5 years, "data as a product" means "data products that AI can consume." Product thinking will focus on making data AI-readable: clear schemas, rich metadata, semantic relationships. The end user experience improves, but the product management work intensifies.

---

## Related Content

- See `philosophy_hub_and_spoke.md` for the organizational model that enables product thinking (hub builds products, spokes consume them)
- See `project_vendor_analytics_platform_chewy.md` for an example of a data product built with product management discipline ($10M/year revenue)
- See `project_tableau_scaling_chewy.md` for how product thinking (path-to-production, quality standards) scaled BI infrastructure
- See `career_babylist.md` for the challenge of implementing product thinking in a resistant culture
- See `philosophy_build_vs_buy.md` for how product thinking informs platform investment decisions
