---
category: projects
subcategory: governance
tags: [pii, compliance, ccpa, splunk, security, ipo_readiness, cross_functional]
date_range: 2019-01 to 2019-06
relevance_to_vp_role: high
sanitization_status: reviewed
---

# Project: PII Reduction in System Logs (97% Improvement)

**Role:** Senior Manager, Business Intelligence & Analytics | **Company:** Chewy | **Timeline:** January 2019 - June 2019 (6 months)

## Executive Summary

Led a comprehensive initiative to eliminate personally identifiable information (PII) from Chewy's system logs, reducing PII exposure by 97% across the Splunk logging platform. This project was critical for IPO readiness and CCPA compliance, requiring coordination with 30+ engineering teams to modify logging practices across hundreds of applications. The initiative established sustainable logging standards, created audit mechanisms to prevent regression, and positioned Chewy to fulfill data subject access and deletion requests required by privacy regulations.

---

## Problem Statement

In early 2019, as Chewy prepared for its June IPO, our legal and compliance teams conducted a comprehensive data audit. They discovered a significant vulnerability: **personally identifiable information was leaking into our system logs at scale**.

**The Scope of the Problem:**

Our Splunk platform ingested logs from 400+ applications across web, mobile, and backend services. During the audit, we found PII in approximately **35% of all log entries**:

- Customer email addresses in authentication logs
- Physical addresses in shipping service logs
- Phone numbers in customer service application logs
- Payment card data (last 4 digits, sometimes more) in transaction logs
- Social security numbers (partial) in identity verification logs

**Why This Mattered:**

**Compliance Risk:** Under CCPA (California Consumer Privacy Act, effective January 2020), consumers have the right to request deletion of their personal data. But system logs were never designed for selective deletion—they're append-only for security and debugging purposes. We couldn't fulfill deletion requests without compromising system integrity.

**IPO Blocker:** Auditors reviewing our IPO readiness raised PII in logs as a material risk. If we couldn't demonstrate control over personal data, it could delay or derail the IPO.

**Security Exposure:** System logs are often retained longer than transactional data (5+ years for audit purposes). PII sitting in logs represented an expanded attack surface. A breach of our logging infrastructure would expose years of customer data.

**Operational Burden:** Engineering teams relied on logs for debugging. PII in logs meant that granting engineers debug access also granted them access to sensitive customer data, creating unnecessary privilege escalation.

**The Organizational Challenge:**

This wasn't a centralized fix. PII was entering logs from hundreds of code paths across dozens of engineering teams. Each team had different logging frameworks, patterns, and practices. Many engineers didn't realize their logs contained PII—it had just always been that way.

The mandate from our Chief Legal Officer was unambiguous: **eliminate PII from logs before IPO (6-month timeline) or accept significant regulatory and business risk**.

---

## Success Criteria

**Quantitative Goals:**
1. Reduce PII in system logs by >90% (measured by Splunk query sampling)
2. Achieve 100% coverage of Tier 1 applications (customer-facing, payment processing)
3. Establish automated detection to prevent regression
4. Complete remediation before IPO date (June 2019)

**Qualitative Goals:**
5. Create sustainable logging standards adopted organization-wide
6. Build engineering team awareness of PII risks in logging
7. Document remediation process for auditors
8. Establish governance mechanism to prevent future PII leakage

**Compliance Goals:**
9. Enable CCPA-compliant data deletion (no PII in long-term logs)
10. Satisfy IPO audit requirements for PII control
11. Reduce blast radius of potential logging infrastructure breach

---

## Constraints & Challenges

**Technical Constraints:**

**Distributed Logging Architecture:** No centralized logging service. Each application used its own logging library (Log4j, Winston, Python logging, etc.). Fixes had to be implemented application-by-application.

**Backward Compatibility:** Couldn't break existing log parsing. Monitoring tools, alerting systems, and debugging workflows depended on log format consistency.

**Performance Concerns:** Log scrubbing/redaction at write-time could impact application performance. Had to be lightweight.

**Organizational Constraints:**

**Limited Authority:** I didn't manage engineering teams. Couldn't mandate code changes directly—had to persuade and collaborate.

**Competing Priorities:** Engineering teams were focused on IPO readiness features, infrastructure scaling, and other high-priority projects. Logging cleanup felt like a distraction.

**Headcount:** My team included 2 Splunk engineers. We couldn't rewrite logs ourselves—needed 30+ engineering teams to do the work.

**Political Challenges:**

**Engineering Resistance:** Developers don't like touching logs. "If it ain't broke, don't fix it." Modifying logs risks breaking debugging workflows. Significant pushback from teams who viewed this as "compliance overhead."

**Lack of Visibility:** Many engineers genuinely didn't know their logs contained PII. It wasn't malicious—just ignorance of privacy requirements.

**Resource Competition:** This project competed with revenue-generating features for engineering time. Had to build a compelling business case beyond "compliance says so."

---

## Solution Architecture

Rather than attempting a technical solution (log scrubbing infrastructure), we took an **organizational change management approach**. The only sustainable fix was to stop PII from entering logs in the first place.

### Three-Phase Approach

**Phase 1: Discovery & Assessment (Weeks 1-4)**

**1. Automated PII Detection:**
Worked with Splunk engineers to build regex-based detection queries identifying common PII patterns:
- Email addresses (regex: `[\w\.-]+@[\w\.-]+\.\w+`)
- Phone numbers (various formats: `\d{3}-\d{3}-\d{4}`, etc.)
- Credit card numbers (Luhn algorithm validation)
- SSN patterns (`\d{3}-\d{2}-\d{4}`)
- Address patterns (street addresses, zip codes)

**2. Application-Level Analysis:**
Ran detection queries against 90 days of log history, grouped by application. Created heatmap showing:
- Which applications logged PII most frequently
- What types of PII (email, phone, payment, etc.)
- Severity (Tier 1 apps with PCI data flagged highest)

**3. Engineering Team Mapping:**
Identified owners for each application and scheduled 1:1 meetings with 30+ engineering leaders to review findings.

**Phase 2: Remediation & Partnership (Weeks 5-20)**

**1. Created Remediation Playbook:**
Documented standard approaches for common PII logging scenarios:

- **Authentication logs:** Log user ID (UUID), not email address
- **Payment logs:** Log transaction ID, not card numbers (even last 4 digits)
- **Address logs:** Log address ID (foreign key), not full address
- **Error messages:** Scrub user input from exception text

**2. Engineering Partnership Model:**
Rather than mandating fixes, we offered partnership:
- My Splunk engineers scheduled working sessions with each app team
- Reviewed their logging code together
- Proposed fixes (often 5-10 lines of code per application)
- Submitted pull requests or paired with developers to implement

**3. Prioritization by Risk:**
- **Tier 1 (Weeks 5-12):** Payment processing, customer-facing auth, PCI-scope applications
- **Tier 2 (Weeks 13-18):** Backend services, internal tools, non-PCI
- **Tier 3 (Weeks 19-20):** Legacy systems with minimal usage

**Phase 3: Governance & Prevention (Weeks 21-24)**

**1. Automated Regression Detection:**
Deployed daily Splunk queries scanning for PII patterns. Alerts sent to engineering leads if PII detected in their application logs.

**2. Logging Standards Documentation:**
Worked with engineering leadership to formalize PII-safe logging standards:
- Mandatory code review checklist item: "Does this log contain PII?"
- Logging library wrappers with built-in redaction for common PII fields
- Architecture review requirement: "How will this feature log sensitive data?"

**3. Training & Awareness:**
Delivered "Privacy-Safe Logging" training to 200+ engineers during onboarding and quarterly engineering all-hands.

**4. Audit Documentation:**
Created comprehensive remediation report for auditors:
- Before/after PII metrics
- Application-by-application remediation log
- Governance mechanisms to prevent regression
- Evidence of organizational change (training, standards, code review process)

### Technology Approach

Rather than build complex log scrubbing infrastructure, we focused on **simple, sustainable changes**:

**Developer-Friendly Redaction:**
- Python: `logger.info(f"User {user_id} logged in")` instead of `logger.info(f"User {email} logged in")`
- JavaScript: `logger.error({ userId, errorCode })` instead of `logger.error({ email, phone, errorCode })`
- Java: Use structured logging with explicit field allow-lists

**Centralized Detection (Splunk):**
- Splunk queries as "PII smoke tests"
- Automated daily scans with team-specific alerting
- Dashboard showing PII reduction trends over time

**No Performance Impact:**
- No runtime log scrubbing (would add latency)
- Changes were developer-initiated, not infrastructure-imposed
- Applications logged less data, actually improving Splunk ingestion costs

---

## Execution & Leadership

### Team Structure

**Core Team:**
- **Splunk Engineers (2):** Built detection queries, provided technical guidance to engineering teams, implemented monitoring
- **Myself (Project Lead):** Stakeholder management, executive communication, cross-functional coordination

**Extended Collaboration:**
- **Engineering Managers (30+):** Allocated developer time for remediation
- **Legal & Compliance (2):** Defined PII scope, validated remediation, prepared audit documentation
- **Security Team (3):** Provided input on PII risks, validated technical approaches

### My Leadership Role

**1. Building the Coalition**

This project required **persuasion, not authority**. I didn't manage engineering teams—I had to convince them this was worth their time.

**My Approach:**
- Framed as "enabling customer trust" and "IPO readiness" (not "compliance burden")
- Highlighted benefits: reduced security risk, simplified CCPA compliance, cleaner logs for debugging
- Made it easy: we did the analysis, proposed fixes, and partnered on implementation

**2. Managing Resistance**

Several engineering managers pushed back: "This is a waste of time. Logs aren't customer-facing."

**My Response:**
- Escalated selectively: brought in Chief Legal Officer for high-resistance teams
- Demonstrated risk: showed examples of breaches where log exposure caused regulatory fines
- Offered trade-offs: "If you fix Tier 1 apps now, I'll deprioritize Tier 2 apps for next quarter"

**3. Maintaining Momentum**

Six-month projects lose steam. I kept pressure on by:
- Weekly executive updates showing progress (% PII reduction)
- Public recognition for teams who completed remediation early
- Dashboard visible to all engineering leaders showing which teams were "done" vs. "in progress"

**4. Absorbing Organizational Chaos**

My job was to shield the Splunk engineers from politics and context-switching. I handled:
- Negotiating priorities with engineering managers
- Communicating with legal, security, and audit teams
- Escalating blockers to VP/C-level when necessary
- Celebrating wins to maintain morale

The Splunk engineers focused on technical execution. I handled everything else.

---

## Quantifiable Outcomes

### PII Reduction Metrics

**Primary Goal: Achieved 97% Reduction**
- **Baseline (January 2019):** 35% of log entries contained PII
- **Post-Remediation (June 2019):** 1% of log entries contained PII
- **Total Reduction:** 97% improvement

**Application Coverage:**
- **Tier 1 Applications:** 100% remediation (45 applications)
- **Tier 2 Applications:** 95% remediation (120 applications)
- **Tier 3 Applications:** 60% remediation (legacy apps with minimal usage)

**PII Types Eliminated:**
- Email addresses: Reduced by 99%
- Phone numbers: Reduced by 98%
- Payment card data: Reduced by 100% (zero tolerance achieved)
- Physical addresses: Reduced by 96%
- SSN fragments: Reduced by 100%

### Compliance & Risk Reduction

**CCPA Readiness:**
- Enabled compliant data deletion: logs no longer retained PII beyond transactional systems
- Reduced CCPA request processing time from "impossible" to <7 days

**IPO Audit:**
- Zero audit findings related to PII in logs
- Auditors cited PII remediation as "exemplary governance practice"

**Security Posture:**
- Reduced blast radius of potential log breach by 97%
- Simplified engineer access controls: debug access no longer granted PII access

### Organizational Impact

**Engineering Culture Shift:**
- 200+ engineers trained on privacy-safe logging
- PII-in-logs code review checklist adopted organization-wide
- Logging standards formalized in engineering handbook

**Sustainable Governance:**
- Automated detection prevented regression: <5 new PII incidents in 18 months post-launch
- PII-safe logging became default practice for new applications

**Cost Savings (Indirect):**
- Reduced Splunk ingestion volume by 15% (less verbose logging)
- Simplified compliance workflows (fewer systems in scope for CCPA/GDPR)

### Team Impact

**Cross-Functional Collaboration:**
- Built trust with 30+ engineering teams who initially resisted
- Established my team as "partners, not police" for compliance initiatives

**Career Development:**
- Both Splunk engineers promoted during project (recognition of high-impact work)
- Project became case study for "high-leverage, low-authority leadership"

---

## Lessons Learned

### What Worked Well

**1. Partnership Over Mandates**

By offering to do the analysis and propose fixes (rather than just demanding compliance), we built goodwill. Engineering teams appreciated that we made it easy for them.

**2. Prioritization by Risk**

Focusing on Tier 1 applications first gave us quick wins and reduced the highest-severity risks. This built momentum and satisfied auditors early.

**3. Visible Progress Tracking**

The public dashboard showing which teams were "done" created healthy peer pressure. No one wanted to be the last team on the list.

**4. Executive Sponsorship**

Having the Chief Legal Officer's explicit support gave me leverage when teams pushed back. Clear executive mandate made this non-negotiable.

### What Didn't Work

**1. Initial Underestimate of Effort**

We thought this would take 3 months. It took 6. Every application had unique logging patterns. We underestimated the long tail of small applications.

**2. Insufficient Developer Education**

Early in the project, we fixed PII in logs but didn't explain *why*. Result: new features re-introduced PII. Lesson: remediation must be paired with education.

**3. Incomplete Tier 3 Remediation**

We deprioritized legacy systems to hit the IPO deadline. Some Tier 3 apps still contain PII. Acceptable trade-off at the time, but created technical debt.

### What I'd Do Differently

**1. Earlier Engagement with Engineering Leadership**

We spent the first month analyzing the problem before engaging engineering managers. In hindsight, involving them in discovery (Week 1) would have built buy-in earlier.

**2. Automated Remediation Tools**

We manually reviewed every application. Building a static analysis tool to auto-detect PII in code (not just logs) would have accelerated remediation and prevented new PII from being merged.

**3. Stronger Incentives**

Public dashboards created peer pressure, but direct incentives (bonus pool, recognition awards) would have accelerated adoption. We relied too much on goodwill.

---

## Technologies Used

**Logging & Monitoring:**
- Splunk Enterprise (log aggregation and analysis platform)
- Custom Splunk queries (PII detection via regex)
- Splunk dashboards (progress tracking, regression monitoring)

**Programming Languages (for remediation):**
- Python (Django, Flask logging frameworks)
- JavaScript/Node.js (Winston, Bunyan logging libraries)
- Java (Log4j, SLF4J)
- Ruby (Rails logging)

**Collaboration & Documentation:**
- Confluence (remediation playbook, logging standards)
- Jira (tracking remediation tasks per application)
- GitHub (pull requests for logging code changes)

**Compliance & Audit:**
- Internal audit tools (data classification, PII mapping)
- Excel/Tableau (reporting PII reduction metrics to auditors)

---

## Retrospective: Impact on Career

This project taught me the power of **leading without authority**. I couldn't mandate engineering teams to fix their logs—I had to build a coalition, demonstrate value, and make it easy for them to comply.

The biggest lesson: **technical problems are often organizational problems in disguise**. The "solution" to PII in logs wasn't a clever algorithm or infrastructure—it was changing how 200+ engineers thought about privacy. That required storytelling, training, and partnership.

This project also reinforced the importance of **executive sponsorship**. When I had the Chief Legal Officer's backing, resistance melted. When I didn't, progress stalled. High-impact initiatives need high-level champions.

Finally, I learned that **compliance can be a forcing function for quality**. The IPO audit forced us to address PII in logs—but the benefits (simpler debugging, reduced security risk, cleaner logs) extended far beyond compliance. Sometimes external pressure creates the urgency needed to fix long-standing technical debt.

This experience shaped my approach to governance projects: start with the business case (not the rule), make it easy to comply, and celebrate teams who do the right thing. Governance should feel like a service, not a burden.

---

## Related Content

- See `career_chewy.md` for broader context of IPO readiness initiatives
- See `philosophy_servant_leadership.md` for leadership approach that enabled cross-functional collaboration
- See `project_tableau_scaling_chewy.md` for related SOX compliance work on BI platform
- See `skills_data_platforms.md` for Splunk and logging infrastructure expertise
- See `01_SANITIZATION_CHECKLIST.md` for compliance philosophy applied throughout Chewy tenure
