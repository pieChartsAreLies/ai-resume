# Philosophy: Build vs. Buy Decision Framework

---
category: philosophy
subcategory: decision_framework
tags: [build-vs-buy, vendor-selection, tco, platform-strategy]
date_range: ongoing
relevance_to_vp_role: high
sanitization_status: reviewed
---

# Philosophy: Build vs. Buy

## Core Belief Statement

Technology selection is a strategic decision that requires rigorous Total Cost of Ownership (TCO) analysis balancing licensing costs, operational burden, developer productivity, and organizational flexibility. The right answer is rarely "always build" or "always buy"—it depends on context, maturity, and strategic priorities.

I evaluate build-vs-buy decisions through a framework that prioritizes **sustainable value delivery** over ego-driven "not invented here" syndrome or lazy "buy everything" defaults.

---

## Origin Story

Early in my career, I defaulted to "build it ourselves"—viewing custom solutions as proof of technical sophistication. This changed dramatically at Chewy when I inherited a pricing team that had built a complex web scraping system from scratch.

The system worked, technically. But it required constant maintenance as competitor websites changed. Three engineers spent 40% of their time fixing broken scrapers instead of building features. When a vendor approached us with an off-the-shelf solution for 20% of our engineering cost, my ego initially resisted: "We already built this. Why pay for something we have?"

Then our VP of Finance asked a simple question: "What's the opportunity cost? What could those three engineers build if they weren't maintaining scrapers?"

That question reframed everything. We weren't choosing between "build" and "buy"—we were choosing between "invest engineering capacity here" versus "invest it somewhere else." The vendor solution freed three engineers to work on personalization algorithms that directly impacted conversion rates. That was a 10x better investment.

The lesson: **The right question isn't "Can we build this?" but "Should we build this?"**

---

## The Decision Framework

### Step 1: Strategic Alignment Assessment

**Ask:** Is this capability a competitive differentiator or table stakes?

**Competitive Differentiator Examples:**
- Chewy's product recommendation engine (unique to our domain)
- Babylist's registry matching algorithm (core product IP)
- Real-time personalization systems leveraging proprietary data

**Table Stakes Examples:**
- Data warehouse infrastructure (Snowflake, Redshift, BigQuery)
- BI visualization tools (Tableau, Looker)
- Identity and access management systems

**Decision Rule:**
- Competitive differentiator → **Bias toward Build** (assuming you have the capability)
- Table stakes → **Bias toward Buy** (unless vendor economics are prohibitive)

---

### Step 2: Total Cost of Ownership (TCO) Analysis

Most teams only compare licensing costs vs. engineering salaries. This is **incomplete and misleading**.

**Full TCO Includes:**

**For "Buy" Solutions:**
- Licensing fees (annual recurring)
- Implementation costs (professional services, consulting)
- Training and onboarding
- Ongoing support contracts
- Opportunity cost of delayed launch (vendor implementation timeline)
- Switching costs if you outgrow the vendor
- Lock-in risk (what if they raise prices 3x or get acquired?)

**For "Build" Solutions:**
- Engineering time to build (initial)
- Ongoing maintenance (bug fixes, updates, security patches)
- Operational burden (monitoring, scaling, on-call)
- Opportunity cost (what else could those engineers build?)
- Risk of key person dependency ("What if Jane leaves?")
- Technical debt accumulation

**Real Example: Segment vs. Internal Event Pipeline at Chewy**

**Vendor Option (Segment):**
- Cost: ~$175K annually
- Pros: Turnkey, maintained by vendor, integrations already built
- Cons: Limited customization, third-party dependency for critical infrastructure

**Build Option (AWS Kinesis + Lambda):**
- Cost: ~$35K annually (AWS services) + ~3 months engineering time (upfront) + 1 FTE ongoing maintenance
- Pros: Full control, 80% cost reduction, custom features enabled
- Cons: We own the operational burden

**Decision:** We built internally because:
1. Event streaming was core to our ML/AI strategy (competitive differentiator)
2. Team had deep AWS expertise (low risk)
3. Cost savings (~$140K annually) justified the investment
4. Customization enabled features Segment couldn't support

---

### Step 3: Organizational Capability Assessment

**Ask:** Do we have the expertise to build AND maintain this?

**Key Questions:**
- Do we have engineers with domain expertise?
- Can we staff on-call rotation for this system?
- What's our track record maintaining custom platforms?
- How critical is this system? (Outage tolerance)

**Real Example: ThoughtSpot Evaluation at Chewy**

We piloted ThoughtSpot (natural language analytics) as a potential Tableau replacement. After 6 months:

**Result:** Low adoption, user confusion, poor ROI

**Root Cause Analysis:**
- Our analysts were SQL-proficient; ThoughtSpot's "search" paradigm was foreign
- Training required 20+ hours per user; Tableau required 4 hours
- Natural language queries often returned incorrect results, eroding trust
- Cost: $300K annually vs. Tableau's $180K (for equivalent users)

**Decision:** Stuck with Tableau, invested in training instead

**Lesson:** The "best" technology doesn't matter if your organization can't adopt it. Organizational maturity and skills are constraints, not variables.

---

### Step 4: Speed-to-Value Analysis

**Ask:** How quickly do we need this capability?

**Time-to-Value Scenarios:**

**When "Buy" Wins:**
- Regulatory deadline (e.g., GDPR compliance needed in 3 months)
- Competitive pressure (e.g., competitor launched similar feature)
- Uncertain requirements (e.g., "Let's see if users want this before building")

**When "Build" Wins:**
- Vendor solutions don't exist for your niche use case
- Iterative learning required (need to experiment rapidly)
- Long-term strategic bet (5+ year time horizon)

**Real Example: Data Governance Platform at Chewy**

**Need:** SOX compliance before IPO (6-month deadline)

**Build Option:** Custom governance platform
- Timeline: 9-12 months (missed IPO deadline)
- Risk: High (compliance failures delay IPO)

**Buy Option:** Alation (data catalog) + OneTrust (privacy management)
- Timeline: 3 months implementation
- Cost: $400K annually
- Trade-off: Less customization, but proven compliance

**Decision:** Bought Alation + OneTrust

**Rationale:** IPO deadline was non-negotiable. Missing it cost the company millions in market cap. Overpaying for vendors was cheap insurance against that risk.

---

### Step 5: Vendor Risk Assessment

**Ask:** What happens if this vendor fails, raises prices, or gets acquired?

**Vendor Lock-In Considerations:**

**High Lock-In (Dangerous):**
- Proprietary data formats with no export (e.g., some legacy BI tools)
- Deep integration into proprietary APIs (e.g., Salesforce workflows)
- Training investment (e.g., teams built careers on specific tool)

**Low Lock-In (Safer):**
- Open standards (e.g., SQL-based data warehouses)
- API-first architectures (e.g., Fivetran connectors)
- Mature ecosystems with multiple vendors (e.g., cloud providers)

**Real Example: Snowflake vs. Redshift vs. BigQuery**

At Chewy, we chose **Snowflake** despite higher cost because:

1. **Multi-cloud portability:** Not locked into single cloud provider (AWS/GCP/Azure)
2. **SQL standard:** Easy to migrate away if needed
3. **Mature ecosystem:** Multiple tooling partners (dbt, Fivetran, etc.)
4. **Separation of storage/compute:** Could optimize costs independently

**Trade-off Accepted:** ~30% higher cost than Redshift, but flexibility was worth it.

---

## Common Anti-Patterns

### Anti-Pattern 1: "Not Invented Here" Syndrome

**Symptom:** Engineers always want to build, dismissing vendor solutions as "not as good"

**Reality Check:** Your engineers aren't smarter than Snowflake's 1,000-person engineering team. Don't rebuild commodity infrastructure.

**Fix:** Require TCO analysis for every "build" proposal. Force teams to quantify opportunity cost.

---

### Anti-Pattern 2: "Buy Everything" Laziness

**Symptom:** Default to vendors for everything, even core product features

**Reality Check:** SaaS bloat is real. You end up with 47 tools, none integrated, and $2M annual spend on "platforms."

**Fix:** Inventory all SaaS tools quarterly. Consolidate or cancel anything used by <10% of target users.

---

### Anti-Pattern 3: "Sunk Cost" Bias

**Symptom:** "We already spent 6 months building this, we can't switch to a vendor now"

**Reality Check:** Sunk costs are sunk. Future maintenance burden is the real cost.

**Fix:** Evaluate build-vs-buy at project kickoff, midpoint, and completion. Be willing to kill custom solutions if better vendors emerge.

---

### Anti-Pattern 4: Ignoring Operational Burden

**Symptom:** "Building is cheap! It's just 3 months of engineering time"

**Reality Check:** Maintenance is forever. Custom platforms often cost 2-5x initial build effort over 5 years.

**Fix:** Require "operational runbook" for every custom build. Who's on-call? Who patches security vulnerabilities? If you can't answer, don't build.

---

## Application to Specific Technology Categories

### Data Warehouses: **Always Buy**

**Rationale:** Commodity infrastructure with mature vendors. No competitive advantage in custom warehouses.

**Recommended:** Snowflake (multi-cloud), BigQuery (GCP-native), Redshift (AWS-native)

**Never Build:** Unless you're Google/Amazon/Microsoft scale

---

### BI Tools: **Always Buy**

**Rationale:** UI/UX is expensive to build; vendor ecosystems mature; training materials abundant.

**Recommended:** Tableau (enterprise scale), Looker (engineering-centric), Hex (collaborative)

**Never Build:** Custom dashboarding tools become maintenance nightmares

---

### ETL/ELT: **Context-Dependent**

**Buy When:**
- Standard SaaS integrations (Fivetran, Airbyte)
- Fast time-to-value needed
- Small engineering team

**Build When:**
- Custom internal systems with complex APIs
- High data volumes making SaaS cost prohibitive
- Need real-time streaming (Kafka pipelines)

**Real Example at Chewy:** Used Fivetran for standard SaaS connectors (Salesforce, Zendesk); built custom Python/Airflow for internal microservices.

---

### ML/AI Infrastructure: **Start Buy, Evolve to Build**

**Phase 1 (Exploration):** Buy managed services (AWS SageMaker, Databricks)
**Phase 2 (Scale):** Build custom pipelines when patterns emerge
**Phase 3 (Maturity):** Hybrid (vendor for compute, custom for orchestration)

**Rationale:** ML infrastructure is rapidly evolving. Bet on vendors early; build when your use cases diverge from generic patterns.

---

### Event Streaming: **Build If You Have Expertise**

**Buy When:**
- Small scale (<1M events/day)
- Team unfamiliar with Kafka/streaming
- Budget for managed Kafka (Confluent Cloud)

**Build When:**
- High scale (>10M events/day) makes vendor costs prohibitive
- Team has deep Kafka/Kinesis expertise
- Custom features needed (complex event processing)

**Real Example at Chewy:** Built internal Kafka + Flink pipeline at 2B events/day scale. Vendor costs would have been $500K+/year; our cost was ~$100K/year.

---

## Evolution & Updates

My thinking has shifted over time:

**10 Years Ago (Early Chewy):**
- Bias: "Build everything, vendors are expensive"
- Reality: Wasted engineering time on commodity problems

**5 Years Ago (Mid Chewy):**
- Bias: "Buy infrastructure, build differentiators"
- Reality: Better, but still underestimated operational burden

**Today:**
- Framework: Rigorous TCO analysis **including opportunity cost**
- Key Insight: The best engineers want to work on hard, novel problems—not maintain commodity infrastructure. Vendors free them to do that.

**Future Evolution:**
As AI/ML commoditizes more infrastructure (e.g., natural language interfaces, automated observability), the "build" bar will keep rising. Only build what you can maintain **and** what delivers unique competitive value.

---

## Related Content

- See `career_chewy.md` for Segment replacement case study
- See `career_babylist.md` for vendor evaluation examples
- See `philosophy_servant_leadership.md` for empowering teams to make these decisions
- See `projects/project_instrumentation_audit_chewy.md` for consequences of building without strategy
