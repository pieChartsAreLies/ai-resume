---
category: philosophy
subcategory: organizational_model
tags: [hub_and_spoke, centralized_governance, distributed_execution, self_service, platform_thinking, scalability]
date_range: ongoing
relevance_to_vp_role: high
sanitization_status: reviewed
---

# Philosophy: Hub & Spoke Model for Data Organizations

## Core Belief Statement

A centralized data team should function as the "hub"—building platforms, defining standards, and providing strategic direction—while business units act as "spokes"—owning their domain-specific analytics, consumption patterns, and content creation. The hub enables; the spokes execute. This model scales far better than fully centralized (hub becomes a bottleneck) or fully decentralized (chaos, inconsistency, duplicated effort) approaches. The hub's job is to create **leverage** through shared infrastructure and governance, not to become a service desk fulfilling every request.

---

## Origin Story

I learned this philosophy the hard way at Chewy. When I joined in 2017, we operated as a fully centralized BI team. Every dashboard, every query, every analysis request flowed through my team of 15 analysts. We were "the data team," and the organization treated us as such.

This worked initially. We had control, consistency, and quality. But as Chewy grew from 1,000 employees to 10,000+ employees, our centralized model collapsed. We became a bottleneck. Backlog of requests grew from 50 to 200 to 400. Wait times stretched from days to weeks to months. Stakeholders were frustrated. My team was burned out. And despite being overwhelmed with work, we were seen as *slow* and *unresponsive*.

I realized the problem: **we were optimizing for control, not scale.** By owning all data work, we created a single point of failure. Every business unit's velocity was limited by our capacity.

The turning point came in 2019. The VP of Merchandising pulled me aside and said, "Michael, I need to hire my own analyst because I can't wait 6 weeks for a dashboard." My first instinct was defensive: "If you hire someone without training, they'll build inconsistent, low-quality work." But then I paused. What if we could enable them to hire *and* maintain quality?

That insight led to the hub-and-spoke model. We stopped trying to do all the work ourselves. Instead, we focused on:
- Building platforms (Tableau, Snowflake, dbt) that anyone could use
- Defining governance standards (metric definitions, data models, access controls)
- Training and enabling embedded analysts in business units
- Providing strategic direction (what should we measure? how should we measure it?)

Within 18 months, we went from 0 embedded analysts to 15+ across business units. Our backlog dropped from 400 to 120 requests—not because we hired more people on the central team, but because we **multiplied capacity** by enabling others.

---

## Practical Application

### Example 1: Enabling Merchandising Team to Self-Serve

**Situation:** The Merchandising team needed daily dashboards showing product performance, inventory levels, and pricing changes. They were submitting 20+ ad-hoc requests per month to my central BI team.

**Application:** Rather than build 20 dashboards for them, we:
1. Built a curated "Merchandising Data Mart" in Snowflake with pre-joined tables, clear column definitions, and optimized query performance
2. Created a Tableau "Starter Workbook" with reusable templates and best practices
3. Trained their business analyst (2-day workshop on Tableau + SQL)
4. Embedded documentation in Alation data catalog explaining data lineage and field meanings
5. Established weekly "office hours" where their analyst could ask questions

**Outcome:** Within 3 months, the Merchandising analyst was building 80% of their team's dashboards independently. Our central team's time spent on Merchandising requests dropped from 40 hours/month to 5 hours/month. More importantly, Merchandising got faster answers because they weren't waiting on us.

### Example 2: Supply Chain Analytics Hub

**Situation:** Supply Chain wanted a dedicated analytics team but worried about data inconsistency and duplication of effort.

**Application:** We used the hub-and-spoke model to balance autonomy with governance:
1. **Hub Provided:** Centralized data pipelines (Airflow), core data models (dbt), governance standards (metric tree), shared infrastructure (Snowflake, Tableau)
2. **Spoke Owned:** Domain-specific dashboards, ad-hoc analyses, business user training, stakeholder relationships
3. **Hybrid Governance:** Supply Chain's analyst attended our bi-weekly "Data Platform Sync" to stay aligned on changes, standards, and best practices

**Outcome:** Supply Chain moved 3x faster (no backlog waiting on central team) while maintaining data consistency (same definitions, same sources). When Supply Chain built "Days of Inventory" metric, it matched Finance's calculation because both used the same hub-provided data model.

### Example 3: Preventing Chaos with Governance Layer

**Situation:** As embedded analysts proliferated, we started seeing inconsistencies: Finance calculated "Revenue" one way, Marketing calculated it differently. Risk of chaos.

**Application:** The hub enforced governance without stifling autonomy:
1. Created "Metric Tree" defining company-wide KPIs (e.g., "Revenue" had one canonical definition)
2. Built "Certified Data Models" in Snowflake that all spoke teams were required to use for shared metrics
3. Established "Data Product Review" process: embedded analysts could build whatever they wanted, but if it involved company-wide metrics, it had to pass a lightweight review
4. Used Alation to document all certified content so spokes could discover and reuse each other's work

**Outcome:** We achieved the balance: **flexibility in execution, consistency in outcomes**. Embedded analysts had autonomy to innovate within their domains, but shared metrics remained aligned.

### Example 4: Platform Investment Prioritization

**Situation:** Multiple business units requested different features: Finance wanted dbt Cloud, Marketing wanted Looker, Supply Chain wanted Monte Carlo for data quality monitoring.

**Application:** The hub acted as strategic arbiter:
1. Evaluated requests based on cross-functional value (not just one team's needs)
2. Prioritized investments that created leverage for all spokes (e.g., dbt Cloud benefited everyone)
3. Said "no" to tools that fragmented the ecosystem (e.g., we standardized on Tableau instead of adding Looker)

**Outcome:** We avoided tool sprawl. The spoke teams didn't always get their first choice, but they got a **cohesive, well-supported platform** rather than a fragmented mess of point solutions.

### Example 5: Crisis Response - IPO Data Audit

**Situation:** During IPO prep, auditors required a comprehensive audit of all dashboards containing PII or PCI data. Embedded analysts had built 600+ dashboards. Impossible for central team to review all of them.

**Application:** The hub-and-spoke model enabled distributed accountability:
1. Hub team created the audit framework and checklist
2. Each spoke team audited their own dashboards (they knew their content best)
3. Hub team spot-checked for quality and compiled results for auditors

**Outcome:** We completed the audit in 3 weeks (would have taken 6+ months if central team did it alone). Auditors were impressed by clear ownership and accountability.

---

## Tradeoffs & Boundaries

The hub-and-spoke model isn't universally applicable. It works best for **mature, scaled organizations** with sufficient data literacy. Here's where it struggles:

**Tradeoff 1: Requires Baseline Data Literacy**

If business units don't have basic SQL/BI skills, they can't effectively operate as spokes. In early-stage companies or low-data-maturity organizations, a centralized model may be necessary initially to build foundational capabilities.

**Response:** The hub should invest in training and enablement (see `project_data_culture_conferences_chewy.md`). Transition from centralized to hub-and-spoke over time as literacy grows.

**Tradeoff 2: Governance Overhead**

Maintaining standards, conducting reviews, and preventing drift requires ongoing effort. The hub can't just "build platforms and walk away"—it needs continuous engagement.

**Response:** Treat governance as a program, not a project. Allocate 30-40% of hub team capacity to governance activities (metric definitions, data quality, platform maintenance).

**Tradeoff 3: Risk of Fragmentation**

If the hub is too hands-off, spokes will diverge. Finance uses Snowflake one way, Marketing uses it another way, and suddenly you have duplication and inconsistency.

**Response:** The hub must enforce non-negotiable standards (e.g., "all revenue metrics must use the certified `fact_revenue` table") while allowing flexibility on non-shared metrics.

**Tradeoff 4: Uneven Capability Across Spokes**

Some business units have skilled analysts; others don't. This creates uneven service levels: Merchandising moves fast, Customer Service is stuck.

**Response:** The hub should provide tiered support—higher-touch for less mature teams, lighter-touch for advanced teams. Over time, invest in upskilling lagging teams.

**Boundary: When to Override Autonomy**

Autonomy isn't absolute. The hub must override when:
- Spokes violate security/compliance (e.g., exposing PII)
- Spokes create technical debt that impacts others (e.g., inefficient queries crashing shared database)
- Spokes build mission-critical content without documentation/ownership (creates operational risk)

In these cases, the hub has veto power. Autonomy is earned through demonstrated responsibility.

---

## Influence & Sources

This philosophy draws from multiple disciplines:

**Technology:** The hub-and-spoke model mirrors platform engineering principles. Cloud providers (AWS, GCP) act as hubs—building infrastructure, APIs, and standards—while customers (spokes) build applications on top. Similarly, internal platform teams should enable, not execute.

**Management:** Andy Grove's "High Output Management" influenced my thinking on leverage. Grove argues that a manager's output is the output of their org. The hub-and-spoke model maximizes leverage—the hub builds platforms that multiply the output of many spokes.

**Systems Thinking:** Donella Meadows' "Thinking in Systems" shaped my view that centralized control creates fragile, bottlenecked systems. Distributed systems with strong interfaces (hub-defined standards) are more resilient and scalable.

**Personal Experience:** Watching Chewy's transformation from centralized (2017-2019) to hub-and-spoke (2019-2023) provided empirical validation. Our team's impact grew exponentially despite flat headcount.

---

## Application to Future Roles

In a VP-level role, I would operationalize the hub-and-spoke model through:

**1. Clear Charter for Hub Team:**
- 60% capacity: platform engineering (data pipelines, infrastructure, tooling)
- 30% capacity: governance (standards, reviews, metric definitions)
- 10% capacity: enablement (training, documentation, office hours)

**2. Formal Spoke Onboarding:**
- When business units hire embedded analysts, the hub provides 30-day onboarding covering platform, governance, and support channels
- Establishes expectation that spokes have autonomy *within guardrails*

**3. Lightweight Governance Mechanisms:**
- Bi-weekly "Data Platform Sync" (hub + all spokes) for coordination
- "Data Product Review" for content involving shared metrics
- "Metric Tree" published in data catalog as single source of truth

**4. Proactive Platform Investment:**
- Annual survey of spokes to understand pain points and feature requests
- Prioritize investments that create leverage for multiple spokes
- Say "no" to single-team requests that don't generalize

**5. Success Metrics Tied to Leverage:**
- Track "dashboards built by spokes" vs. "dashboards built by hub" (higher ratio = better leverage)
- Measure "time-to-insight" for business units (faster = hub is enabling well)
- Monitor spoke satisfaction scores (hub viewed as enabler, not bottleneck)

The goal: create a self-sustaining ecosystem where the hub's impact scales exponentially with headcount.

---

## Real-World Evidence

At Chewy (2017-2023), I transformed a centralized BI team into a hub-and-spoke model:

**2017 (Fully Centralized):**
- Central team: 15 people
- Embedded analysts: 0
- Ad-hoc request backlog: 200+
- Stakeholder satisfaction: 6.5/10

**2023 (Hub & Spoke):**
- Central team: 18 people (20% growth)
- Embedded analysts: 40+ across 15 business units
- Ad-hoc request backlog: 120 (despite 3x organizational growth)
- Stakeholder satisfaction: 8.7/10

**Impact:**
- Total analytics capacity grew 3.2x (18 + 40 = 58 people doing data work vs. 15 centralized)
- Central team's leverage improved 5x: supporting 3,500 Tableau users (vs. 100 in 2017) with only 20% headcount growth
- Embedded analysts reported 85% satisfaction with hub support (annual survey)

At Babylist (2024-2025), I attempted to implement hub-and-spoke but leadership resisted. They wanted a centralized model with all analysts reporting into my team. When I pushed back—explaining that centralized doesn't scale—we couldn't find alignment. This experience reinforced my belief: **hub-and-spoke requires executive buy-in**. It's a cultural shift, not just an org chart change.

---

## Counter-Argument Awareness

**Critic:** "Hub-and-spoke creates silos. Each business unit builds its own thing, leading to duplication and waste. Full centralization is more efficient."

**Response:** Efficiency and effectiveness are different. Centralized teams are efficient at doing work themselves but ineffective at scaling. A bottlenecked centralized team delays 10 projects; a hub-and-spoke model enables 10 projects to progress in parallel. Yes, there's some duplication (two teams might build similar dashboards), but the velocity gain outweighs the duplication cost. The hub's job is to minimize wasteful duplication (through governance) while accepting healthy duplication (spokes iterating independently).

**Critic:** "This only works if business units can hire skilled analysts. Most companies struggle to find good data talent."

**Response:** True, and that's why the hub must invest in enablement. If spokes lack capability, the hub provides training (see `project_data_culture_conferences_chewy.md`). The hub can also loan analysts to business units temporarily to bootstrap capability. Over time, upskill existing business analysts into data analysts. The alternative—keeping all analytics centralized—doesn't solve the talent problem; it just concentrates it.

**Critic:** "What if spokes ignore governance and build bad content?"

**Response:** That's a governance failure, not a model failure. The hub must enforce non-negotiable standards (e.g., certified data models, PII controls) while allowing autonomy on everything else. If a spoke builds a low-quality dashboard that only they use, that's fine—it doesn't harm others. If they violate security or use wrong metrics, the hub intervenes. The key is proportional governance: strict on shared assets, lenient on local experiments.

---

## Evolution & Updates

Five years ago, I believed hub-and-spoke was binary: either you adopt it fully or you don't. I now see it as a **maturity spectrum**:

**Stage 1 (Fully Centralized):** Appropriate for small companies (<500 employees) or low data maturity. Central team builds everything.

**Stage 2 (Hub Emerging):** Central team starts building platforms (data warehouse, BI tools) while still fulfilling most requests. Begins training users.

**Stage 3 (Hybrid):** Central team builds platforms AND embeds analysts in a few business units. Learns what governance is needed.

**Stage 4 (Mature Hub & Spoke):** Central team is pure platform/governance. All content creation is spoke-driven. Hub rarely fulfills ad-hoc requests.

**Stage 5 (Future: AI-Enabled Self-Service):** With LLMs and natural language interfaces, the "spokes" become end users directly (not dedicated analysts). The hub builds AI-powered query layers that enable anyone to ask questions of data without SQL or BI tools. This is where I believe the field is heading in 5-10 years.

I'm actively experimenting with LLMs (see `skills_homelab_modern_stack.md`) to understand how they change the hub-and-spoke model. Early hypothesis: AI doesn't eliminate the hub—it makes the hub's governance role *more* critical. LLMs need clean, well-defined data to work properly.

---

## Related Content

- See `career_chewy.md` for the organizational transformation that implemented this model
- See `philosophy_servant_leadership.md` for the leadership approach that enables hub-and-spoke (enablement over control)
- See `project_tableau_scaling_chewy.md` for the platform infrastructure that supported the hub
- See `project_data_culture_conferences_chewy.md` for the training/enablement that upskilled the spokes
- See `philosophy_build_vs_buy.md` for the decision framework used by the hub to evaluate platform investments
- See `perspective_data_as_product.md` for the mindset that drives hub-and-spoke design
