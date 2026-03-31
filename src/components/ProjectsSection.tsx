import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { ExternalLink, ChevronDown } from "lucide-react";
import { useMouseGlow } from "@/hooks/useMouseGlow";

type ProjectCategory = "professional" | "personal";

interface Project {
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory[];
  tags: string[];
  metric?: string;
  metricLabel?: string;
  featured?: boolean;
  link?: string;
  image?: string;
  details?: {
    challenge: string;
    approach: string[];
    outcome: string;
    insight: string;
  };
}

const projects: Project[] = [
  {
    title: "Self-Service Analytics at Scale",
    tagline: "Scaled analytics adoption from silos to 3,500+ self-service users",
    description: "Scaled fragmented analytics into a unified self-service platform supporting 3,500+ users through IPO. Built the SOX-compliant environment, the Center of Excellence, the training programs, and the support model that made it scale. Grew adoption 35x while reclaiming 40 percentage points of warehouse capacity from unmanaged sandbox workloads. The hard part was never the tool. It was changing how people thought about data.",
    category: ["professional"],
    tags: ["Snowflake", "Tableau", "SOX", "Governance"],
    metric: "35x",
    metricLabel: "User Growth",
    featured: true,
    details: {
      challenge: "Pre-IPO, Chewy's analytics environment was creating more problems than it solved: teams were rebuilding the same content independently, metrics didn't match across departments, nothing was discoverable, and duplicate work was rampant. There was no dev/prod separation, so SOX-sensitive reporting had zero protections or auditability. Meanwhile, 70% of our on-prem Vertica warehouse capacity was consumed by sandbox tables and ad-hoc analytics workloads, leaving minimal headroom for critical ETL processes.",
      approach: [
        "Met each team where they were in their analytics journey, providing hands-on optimization support or guardrails and autonomy depending on maturity",
        "Designed dev/prod separation that created SOX auditability while improving content quality and discoverability",
        "Focused on building valuable analytics that surfaced business drivers, not just dashboards that displayed metrics",
        "Established content certification so teams could find and trust existing assets instead of rebuilding from scratch",
      ],
      outcome: "35x user growth (100 to 3,500+) with maintained performance. Warehouse load reduced from 70% to 30% for analytics workloads, freeing capacity for ETL. Zero SOX audit findings through IPO and beyond. Platform team efficiency improved 7x: grew only 3 to 5 FTE despite 35x user growth.",
      insight: "Governance works when you meet people where they are. By supporting each team's unique analytics maturity, users became partners in quality rather than resistors of process.",
    },
  },
  {
    title: "Privacy Compliance at Scale",
    tagline: "97% PII reduction across 30+ engineering teams",
    description: "Led a cross-functional initiative across 30+ engineering teams to reduce PII exposure by 97% across the data warehouse, lake, and event logs. Zero audit findings. This wasn't a technical project. It was a change management project that happened to involve technology. Built data classification policies and production readiness reviews that became company standard.",
    category: ["professional"],
    tags: ["Privacy", "Governance", "GDPR", "CCPA"],
    metric: "97%",
    metricLabel: "PII Reduction",
    details: {
      challenge: "Pre-IPO security audit revealed significant customer PII exposure in Splunk system logs. Engineering teams pushed back constantly, arguing they needed the data for debugging. I had no direct authority over the 30+ teams who needed to change their behavior.",
      approach: [
        "Led through influence: partnered directly with each engineering team to explain the business rationale rather than mandating compliance",
        "Built automated PII detection in Splunk to identify patterns and track remediation progress across all applications",
        "Established data classification policies, production readiness pipeline reviews, and privacy-safe logging standards that became company-wide requirements for all new services",
        "Trained 200+ engineers on privacy-safe logging practices",
      ],
      outcome: "97% reduction in PII across all system logs. Zero audit findings in IPO security reviews. The classification policies and production readiness reviews outlasted the original project and became the standard gate for any new service deployment.",
      insight: "Cross-functional initiatives succeed when you lead with 'why.' Engineers engaged once they understood PII in logs was unnecessary and risky, rather than just hearing compliance rules.",
    },
  },
  {
    title: "Vendor Data Services",
    tagline: "Turning operational data into a revenue product",
    description: "Turned operational data into a revenue-generating product. Designed and launched three external analytics platforms with embedded security controls, giving vendor partners near real-time visibility into product performance while protecting sensitive data. Strengthened vendor relationships and created a new revenue line the company hadn't imagined.",
    category: ["professional"],
    tags: ["Analytics", "Product", "Snowflake", "Tableau"],
    metric: "$10M+",
    metricLabel: "Annual Revenue",
    details: {
      challenge: "Vendor partners had no self-service access to their own performance data. Account managers faced constant pressure to share ad-hoc reports, putting Chewy at risk of sharing unvalidated data or exposing competitive information.",
      approach: [
        "Partnered directly with vendors during development to understand what they actually needed",
        "Designed secure external-facing platform with row-level security ensuring vendors only saw their own data",
        "Established an official, sanctioned channel for vendor data, replacing risky ad-hoc sharing with auditable, validated information",
        "Started with veterinary practice rebate tracking, then expanded as the platform proved value",
      ],
      outcome: "Generated $10M+ annual revenue from data that was previously just operational overhead. Eliminated 90% of ad-hoc vendor data requests. Strengthened vendor relationships by weaving Chewy more tightly into their data ecosystem. Built during my Associate Director tenure (2017-2020), before most of my later governance and org-building work.",
      insight: "Data teams should think like product teams. By partnering with vendors to build what they actually needed, we created a product that deepened relationships while generating revenue.",
    },
  },
  {
    title: "Data Literacy at Scale",
    tagline: "Data Summit and Data Basecamp programs",
    description: "Built two programs from scratch: Data Summit, a company-wide showcase that grew from a 10-person demo to a 4-day, 75-session conference; and Data Basecamp, a curated training curriculum reaching 1,200+ employees. Both became part of the company culture and continued thriving years after I moved on.",
    category: ["professional"],
    tags: ["Education", "Culture", "Data Literacy"],
    metric: "1,200+",
    metricLabel: "Employees Trained",
    details: {
      challenge: "Chewy had invested in analytics infrastructure, but adoption was concentrated within the central BI team. Teams were solving similar problems in isolation with no way to share knowledge. Traditional training based on generic examples wasn't sticking.",
      approach: [
        "Created Data Summit: a platform for team members to showcase their data products and get recognition, building community across departments",
        "Created Data Basecamp: vendor-led training curated specifically to Chewy's environment, with beginner/intermediate/advanced tracks",
        "Built a learning library of recorded sessions based in our actual data stack",
      ],
      outcome: "Grew from a half-day pilot (10 sessions) to a multi-day event (75+ sessions over 4 days). Trained 1,200+ employees over five years. Both programs continued running and growing after my departure, becoming embedded in Chewy's operating rhythm rather than depending on any single person.",
      insight: "Training curated to your environment, using your data, is far more impactful than generic content. Meet people where they are in their learning journey.",
    },
  },
  {
    title: "Product Analytics Audit",
    tagline: "80+ interviews mapping the instrumentation workflow",
    description: "Tapped by the CTO to run a company-wide instrumentation audit. Conducted 80+ interviews across 45 teams, mapped the complete 124-step instrumentation workflow, and identified the gaps holding product measurement back. The findings shifted the entire 2024 product roadmap. Sometimes the most valuable thing you can do is slow everyone down and show them what's actually happening.",
    category: ["professional"],
    tags: ["Analytics", "Product", "Governance"],
    metric: "80+",
    metricLabel: "Interviews",
    details: {
      challenge: "Product teams struggled to measure feature performance because user interaction data was inconsistent across platforms. iOS, Android, and web had evolved independently for years with different schemas, different event names, and different properties for the same actions.",
      approach: [
        "Conducted 80+ interviews across 45 product and engineering teams to map the complete instrumentation workflow",
        "Discovered it took 124 discrete steps across multiple teams to instrument a new feature",
        "Documented how iOS/Android schema divergence made cross-platform customer journey analysis impossible",
        "Quantified business impact: ML models trained on inconsistent data, A/B tests confounded by platform differences",
        "Presented findings to C-suite with three options ranging from incremental fixes to full mobile re-architecture",
      ],
      outcome: "Findings informed roadmap planning for the following year. After my departure, iOS and Android teams were reorganized in favor of a unified architecture.",
      insight: "Sometimes the highest-impact work is making invisible problems visible. The audit gave leadership the evidence and options they needed to make a strategic decision.",
    },
  },
  {
    title: "Data Platform Optimization",
    tagline: "Hands-on Snowflake cost and performance overhaul",
    description: "Inherited a Snowflake environment that was expensive and underperforming. Audited query patterns, converted expensive tables to incremental models, implemented query tagging for team-level cost attribution, and redesigned the data mart architecture. Achieved ~$145K in annual savings and cut P95 query times in half.",
    category: ["professional"],
    tags: ["Snowflake", "dbt", "Airflow", "Cost Optimization"],
    metric: "30%",
    metricLabel: "Cost Reduction",
    details: {
      challenge: "Babylist's Snowflake platform had grown organically during hypergrowth. Costs were escalating faster than business value, P95 query latency was hurting analyst productivity, and the transformation layer was full of anti-patterns.",
      approach: [
        "Conducted hands-on audit of query logs, dbt code, and warehouse metrics",
        "Converted expensive tables to incremental models, refactored anti-patterns, added comprehensive testing",
        "Redesigned data mart architecture with proper clustering and flattened, analysis-ready structures",
        "Implemented cost governance with query tagging and team-level attribution dashboards",
        "Partnered with engineering to optimize Airflow orchestration and reduce redundant runs",
      ],
      outcome: "30% cost reduction (~$145K annual savings). 50% P95 query latency improvement. 50% increase in active data users through better performance and self-service enablement.",
      insight: "Platform optimization is about discipline. The biggest wins came from simple changes done consistently: proper incremental models, right-sized warehouses, query tagging. Fundamentals, applied rigorously.",
    },
  },
  {
    title: "Data Governance & Self-Service Overhaul",
    tagline: "Building governance programs from scratch at a company that had never had them",
    description: "Babylist had no formal data governance when I arrived. Within a year, I designed and launched interconnected programs: a revamped Data Specialist network pushing analytics ownership to business units, an Endorsed Content certification system for trusted dashboards and datasets, data observability improvements, a data catalog rollout (Atlan), and Project Peace Bridge to reconcile unit economics reporting with Finance. Each program reinforced the others.",
    category: ["professional"],
    tags: ["Governance", "Sigma", "Atlan", "Observability"],
    metric: "50%",
    metricLabel: "More Active Users",
    details: {
      challenge: "Babylist's data environment had grown fast without guardrails. There was no data catalog, no formal content certification, inconsistent metric definitions across departments, and the Data Specialist program (business unit data representatives) existed in name but lacked structure, training, or clear expectations. Finance and Merchandising were reporting different numbers for the same metrics.",
      approach: [
        "Ran two company-wide \u201CState of Data\u201D surveys to diagnose the actual pain points rather than assuming them. Survey feedback directly shaped the 2025 data roadmap priorities.",
        "Redesigned the Data Specialist program with tiered training (White/Yellow/Black Belt progression), clear time allocation expectations (10-15% of role), mentorship pairings, and measurable outcomes. Mapped specialists across every major business unit.",
        "Defined and launched the Endorsed Content program: clear criteria for what qualifies as certified, a change management process to protect endorsed assets, and segregated content in Sigma so users could distinguish vetted dashboards from ad-hoc work.",
        "Evaluated and deployed Monte Carlo for data observability. Optimized configuration and alerting, but ultimately deprecated it when cost didn't justify value, transitioning to lighter-weight metrics-based monitoring.",
        "Initiated Atlan data catalog rollout to replace tribal knowledge with searchable, documented data assets.",
        "Stood up Project Peace Bridge: a cross-functional effort with Finance, Merchandising, and Data to reconcile unit economics reporting, define P&L-aligned metric definitions, and build a trusted Sales dataset as the single source of truth for e-commerce metrics.",
      ],
      outcome: "Active data users increased 50%. State of Data survey feedback showed improved trust in endorsed content and data team partnership. Peace Bridge delivered an endorsed Sales dataset with Finance-aligned definitions and variance monitoring. The Data Specialist program had representatives identified across all major business units with structured training underway.",
      insight: "Governance programs work when they're designed as a system, not as isolated projects. The data catalog makes content discoverable, the endorsement program makes it trustworthy, and the specialists make it accessible. Each piece makes the others more valuable.",
    },
  },
  {
    title: "Building an Analytics Organization",
    tagline: "Solo contributor to leading ~30 across BI, Governance, and GRC",
    description: "First BI hire. Built the analytics function from a blank page: hired, trained, and led ~30 people across BI, Data Governance, Splunk operations, and GRC. Scaled the organization through IPO readiness, SOX compliance, and a PE-backed growth phase while the company grew from $2B to $9B in revenue. Delivered zero audit findings.",
    category: ["professional"],
    tags: ["Team Building", "Culture", "Leadership"],
    metric: "0\u219230",
    metricLabel: "Team Growth",
    details: {
      challenge: "When I joined Chewy in 2017 as a staff engineer building dashboards, there was no formal analytics function. The company was scaling rapidly toward its 2019 IPO and needed enterprise-grade analytics capabilities.",
      approach: [
        "Started as staff engineer, became Associate Director, then Director as I took on increasing responsibility",
        "Grew the BI team to 5-6 people focused on platform support and self-service enablement",
        "Took on Data Governance team (4-5 people) as the function matured",
        "Inherited and grew Splunk team from 2 to 6 engineers",
        "Was given GRC (governance, risk, compliance) team when they needed stronger leadership",
      ],
      outcome: "Built and absorbed teams totaling ~30 people across BI, Data Governance, Splunk, and GRC. Supported Chewy through IPO and continued scaling through a PE-backed growth phase that took the company from $2B to $9B in annual revenue. The organizational structure, governance frameworks, and cultural programs I built continued operating after my departure.",
      insight: "Career growth comes from being the trusted leader who gets given teams as you prove yourself. The common thread was governance, compliance, and enabling the organization to use data effectively.",
    },
  },
  {
    title: "Enterprise Data Governance",
    tagline: "Catalog, compliance, and path-to-production from scratch",
    description: "Built governance as a discipline, not a checkbox. Rolled out Alation as the enterprise data catalog, launched a data stewards program, established the Data Governance Council, built SOX-compliant path-to-production processes, and deployed OneTrust for CCPA/GDPR compliance. The through-line: make governance useful enough that people adopt it voluntarily.",
    category: ["professional"],
    tags: ["Governance", "CCPA", "GDPR", "SOX", "Alation"],
    metric: "Zero",
    metricLabel: "Audit Findings",
    featured: true,
    details: {
      challenge: "Pre-IPO, Chewy lacked formal data governance. No data catalog, inconsistent metric definitions across teams, and growing regulatory requirements (CCPA, GDPR, SOX) without systematic controls.",
      approach: [
        "Ran POCs and rolled out Alation as the data catalog, driving adoption across teams",
        "Implemented OneTrust for CCPA compliance, mapping all data and building consent management",
        "Prepared for GDPR with comprehensive data mapping for international expansion",
        "Built SOX-compliant path-to-production process with dev/prod separation for Tableau",
        "Created automated migration process between dev and prod environments that ran explain plans to validate compute impact before promotion, keeping warehouse costs low while maintaining auditability",
      ],
      outcome: "CCPA compliant at launch. GDPR-ready for international expansion. SOX controls validated through multiple audit cycles.",
      insight: "Governance succeeds when it enables rather than restricts. When you make it easier for people to find and trust data, compliance follows naturally.",
    },
  },
  {
    title: "GearSift",
    tagline: "Data-driven outdoor gear advisor",
    description: "Aggregates expert reviews from YouTube, retailers, and Reddit, then scores products with category-specific algorithms. Static site with baked affiliate links for CDN-independent revenue. Built to scratch my own itch of spending too long researching gear.",
    category: ["personal"],
    tags: ["Python", "FastAPI", "PostgreSQL", "Astro", "Ollama"],
    metric: "396",
    metricLabel: "Products Scored",
    featured: true,
    link: "https://gearsift.com",
    image: "/projects/gearsift.png",
    details: {
      challenge: "Outdoor gear research is fragmented: reviews scattered across YouTube, retailer sites, and Reddit with no way to compare products objectively. Affiliate sites rank products by commission rate, not quality.",
      approach: [
        "Built multi-source ingestion pipelines: Amazon product data, YouTube reviews from 20 monitored channels, web scraping from REI/Outdoor Gear Lab, AvantLink affiliate feeds, and Reddit trend analysis",
        "Designed 9 category-specific scoring engines with percentile-based competitive ranking",
        "Built enrichment layer using Ollama for spec normalization and Gemini for Reddit structured analysis",
        "Created Astro 5 static site with React components for interactive radar charts and product comparisons",
        "Baked affiliate URLs into static HTML at build time so revenue generation is independent of API uptime",
      ],
      outcome: "396 active products across 9 categories with normalized specs and aggregated expert scores. Dual revenue model: AvantLink affiliate commissions and display advertising.",
      insight: "Static-first architecture with baked-in affiliate links means the revenue-generating pages survive any homelab outage. Revenue is decoupled from infrastructure availability by design.",
    },
  },
  {
    title: "JobKit",
    tagline: "Automated job search toolkit",
    description: "Scrapes multiple job boards, runs AI scoring with enforced distribution targets (so the model can't just rate everything highly), generates two-pass audited resumes, and tracks outcomes in Obsidian dashboards. Built because job searching at the VP level is a full-time project management exercise.",
    category: ["personal"],
    tags: ["Python", "LLM", "SQLite", "Docker"],
    metric: "72",
    metricLabel: "Roles Scored",
    image: "/projects/jobkit.svg",
    details: {
      challenge: "VP/Director-level job searching is tedious: manually checking multiple boards, evaluating fit against complex criteria, and customizing resumes for each application.",
      approach: [
        "Built multi-board scraping (Indeed, LinkedIn, ZipRecruiter) with deduplication and smart title filtering",
        "Designed AI scoring with enforced distribution targets: only 2-4 of every 20 roles score 8+, preventing score inflation",
        "Implemented two-pass resume generation: LLM writes a custom resume, then a second LLM audits it for fabrication and banned words",
        "Created Obsidian Bases integration for live dashboards with pipeline views and outcome tracking",
      ],
      outcome: "End-to-end job search automation: scrape, score, filter, generate tailored resumes, track outcomes. 72 tests covering the full pipeline.",
      insight: "AI scoring without distribution constraints produces meaningless results. Forcing realistic distributions makes the signal meaningful.",
    },
  },
  {
    title: "Reflection",
    tagline: "Local-first voice journaling with knowledge graphs",
    description: "Voice journaling app with automatic emotion and topic tagging, plus an interactive knowledge graph that reveals patterns across entries. All processing stays on-device. Built because I wanted to understand my own patterns better without sending my thoughts to a cloud.",
    category: ["personal"],
    tags: ["Next.js", "Python", "Whisper", "Ollama"],
    metric: "Local",
    metricLabel: "First",
    image: "/projects/reflection.svg",
    details: {
      challenge: "Voice journaling tools either require cloud subscriptions or lack the intelligence to surface patterns over time. I wanted a local-first app where entries are automatically tagged and visualized through an interactive knowledge graph.",
      approach: [
        "Built browser-based recording with guided templates and free-form modes",
        "Integrated faster-whisper for local transcription with configurable model sizes",
        "Added LLM-powered auto-tagging: emotion tags and topic tags from a structured vocabulary",
        "Created interactive force-directed knowledge graph with custom SVG rendering",
        "Built Obsidian sync with entries saved as markdown with wikilinks and embedded audio",
      ],
      outcome: "Complete voice journaling platform that runs via Docker Compose. All data stays local. The knowledge graph reveals connections between emotions, topics, and time periods.",
      insight: "Voice captures what typing filters out. Pairing raw voice input with automated tagging and graph visualization surfaces patterns that structured journaling misses.",
    },
  },
  {
    title: "HOA Dashboard",
    tagline: "Interactive neighborhood analytics",
    description: "Interactive neighborhood analytics dashboard: Mapbox parcel map, equity calculator, value leaderboards, and sell-scenario modeler. Built from public county records because I was curious about the math behind my neighborhood.",
    category: ["personal"],
    tags: ["Next.js", "Mapbox", "Recharts", "SQLite"],
    metric: "122",
    metricLabel: "Properties",
    link: "https://dashboards.michaelgerstl.com",
    image: "/projects/hoa-dashboard.svg",
    details: {
      challenge: "Our HOA board makes decisions about community investments with limited data on property values, equity positions, or market trends. Public records exist but are scattered across county GIS systems.",
      approach: [
        "Built data pipeline pulling from Palm Beach County PAPA ArcGIS API and Freddie Mac mortgage rate feeds",
        "Created interactive Mapbox parcel map with color-coded overlays for estimated equity and appreciation",
        "Designed equity calculator modeling current positions based on purchase price, estimated value, and amortization",
        "Built leaderboards ranking properties by appreciation, equity percentage, and value per square foot",
        "Added sell scenario modeler and flip detection badges for investment analysis",
      ],
      outcome: "Interactive dashboard covering 122 properties with 723 sale records. Board members can explore data through parcel maps, equity calculators, and 8 analytical chart types.",
      insight: "Local government data is surprisingly rich but locked behind clunky GIS interfaces. A weekend of Python scripting turns public records into a genuinely useful analytical tool.",
    },
  },
  {
    title: "Tautulli Pipeline",
    tagline: "Full modern data stack for Plex analytics",
    description: "Full modern data stack running on my homelab for Plex media analytics. Airflow extraction, dbt transformation, PostgreSQL storage, dual dashboards (Evidence + Metabase). The real point was to run a complete data stack end-to-end on my own infrastructure, because understanding the tools matters even when you're not the one writing production code.",
    category: ["personal"],
    tags: ["Airflow", "dbt", "PostgreSQL", "Evidence"],
    metric: "4",
    metricLabel: "DAGs",
    details: {
      challenge: "Tautulli provides basic Plex watch history, but no deeper analysis capabilities. I wanted a proper data warehouse pipeline as both a practical analytics tool and hands-on practice with the modern data stack.",
      approach: [
        "Built extraction DAGs in Airflow: hourly watch history, daily metadata refresh, and 5-minute real-time activity polling",
        "Designed dbt transformation layer with staging, intermediate, and mart models following analytics engineering best practices",
        "Deployed dual dashboarding: Evidence.dev for code-driven analytics and Metabase for self-service exploration",
        "Distributed across 4 homelab containers with proper service isolation",
      ],
      outcome: "Production data warehouse with ~3,920 watch history records, 4 operational DAGs, and dual dashboard layers. Runs continuously on homelab infrastructure.",
      insight: "Running a full modern data stack on personal infrastructure teaches things enterprise environments hide. Resource constraints force thoughtful architecture and build real debugging intuition.",
    },
  },
  {
    title: "WhisperNotes",
    tagline: "Voice capture to Obsidian vault",
    description: "Cmd+Shift+J captures voice, transcribes locally with Whisper, summarizes with Ollama, and drops it into my Obsidian vault. Built because I kept losing good ideas between my desk and my kitchen.",
    category: ["personal"],
    tags: ["Whisper", "Ollama", "Python"],
    metric: "Daily",
    metricLabel: "Driver",
    details: {
      challenge: "My journaling workflow had too many steps: record audio, transcribe, summarize, create a file, move to Obsidian, link the audio. Too many steps meant I skipped it most days.",
      approach: [
        "Built global hotkeys: Cmd+Shift+J for journaling, Cmd+Shift+R for on-the-fly transcription in any app",
        "Integrated Whisper for local transcription on my homelab",
        "Connected Ollama for automatic summarization and insight extraction",
        "Automated the full workflow: record, transcribe, summarize, template, save to Obsidian vault",
      ],
      outcome: "Used daily. Journal entries now take one hotkey press instead of a 6-step process. The dictation mode is particularly useful for AI chat interfaces.",
      insight: "The best tools solve your own problems first. Building for myself meant I could be honest about what friction actually existed.",
    },
  },
  {
    title: "Bob / NanoClaw",
    tagline: "Claude assistant with WhatsApp/Discord I/O",
    description: "Claude-powered assistant running in containers with WhatsApp and Discord interfaces. Per-group isolation, scheduled tasks, and skills-based extensibility. Small, understandable codebase by design, because the best systems are the ones you can debug at 2am.",
    category: ["personal"],
    tags: ["Claude SDK", "Node.js", "WhatsApp", "Docker"],
    metric: "30+",
    metricLabel: "MCP Tools",
    image: "/projects/bob.svg",
    details: {
      challenge: "I wanted a personal Claude assistant that lives where my conversations already happen (WhatsApp, Discord) with proper container isolation, scheduled tasks, and extensibility.",
      approach: [
        "Built lightweight Node.js bridge connecting WhatsApp (baileys) and Discord (discord.js) to Claude Agent SDK",
        "Designed per-group isolation: each conversation gets its own container sandbox and CLAUDE.md memory file",
        "Implemented scheduled tasks with natural language parsing",
        "Created skills-based extensibility: Gmail, Twitter/X, and other integrations added as transformation skills",
        "Used Apple Container (macOS) or Docker (Linux) for OS-level sandboxing of agent execution",
      ],
      outcome: "Daily-use Claude assistant accessible from any WhatsApp or Discord group. Per-group memory persistence, scheduled tasks for recurring briefings, and 30+ MCP tools.",
      insight: "Agent platforms should be thin orchestration layers. Claude handles reasoning, containers handle isolation, chat platforms handle delivery. Each layer does one thing and is independently replaceable.",
    },
  },
];

const filters: { label: string; value: ProjectCategory }[] = [
  { label: "Professional", value: "professional" },
  { label: "Personal", value: "personal" },
];

function FeaturedProjectCard({ project, isExpanded, onClick }: { project: Project; isExpanded: boolean; onClick: () => void }) {
  const { ref, onMouseMove, onMouseLeave } = useMouseGlow();
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className="relative group rounded-2xl bg-card border border-border overflow-hidden card-glow cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative p-8 md:p-10 z-10">
        <div className="flex items-start justify-between mb-4">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
            Featured
          </span>
          {project.link && (
            <a
              href={project.link}
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
        <h3 className="font-display font-bold text-2xl md:text-3xl mb-2 text-foreground">{project.title}</h3>
        <p className="text-primary font-medium mb-3">{project.tagline}</p>
        <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl">{project.description}</p>
        <div className="flex items-end justify-between">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className="px-3 py-1 rounded-md bg-muted text-muted-foreground text-xs font-medium">
                {t}
              </span>
            ))}
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-muted-foreground ml-3 shrink-0"
          >
            <ChevronDown size={18} />
          </motion.div>
        </div>
        <AnimatePresence>
          {isExpanded && <ExpandedDetails project={project} />}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ProjectCard({ project, isExpanded, onClick }: { project: Project; isExpanded: boolean; onClick: () => void }) {
  const { ref, onMouseMove, onMouseLeave } = useMouseGlow();
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className="group rounded-xl bg-card border border-border p-6 md:p-7 card-glow h-full flex flex-col cursor-pointer"
    >
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          {project.link && (
            <a href={project.link} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <ExternalLink size={16} />
            </a>
          )}
        </div>
        <p className="text-sm text-primary/80 font-medium mb-2">{project.tagline}</p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{project.description}</p>
        <div className="flex items-end justify-between">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span key={t} className="px-2 py-0.5 rounded bg-muted text-muted-foreground text-xs">
                {t}
              </span>
            ))}
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-muted-foreground ml-3 shrink-0"
          >
            <ChevronDown size={16} />
          </motion.div>
        </div>
        <AnimatePresence>
          {isExpanded && <ExpandedDetails project={project} />}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ExpandedDetails({ project }: { project: Project }) {
  if (!project.details) return null;
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div className="mt-4 pt-4 border-t border-border space-y-4">
        {project.image && (
          <div className="-mx-1">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 md:h-56 object-cover object-top rounded-lg"
            />
          </div>
        )}
        <div>
          <h4 className="font-display font-semibold text-sm text-foreground mb-2">The Challenge</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{project.details.challenge}</p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-sm text-foreground mb-2">The Approach</h4>
          <ul className="space-y-1.5">
            {project.details.approach.map((a, j) => (
              <li key={j} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                {a}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold text-sm text-foreground mb-2">The Outcome</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{project.details.outcome}</p>
        </div>
        <div className="pl-4 border-l-2 border-primary/30">
          <h4 className="font-display font-semibold text-sm text-foreground mb-1">Key Insight</h4>
          <p className="text-sm text-muted-foreground leading-relaxed italic">{project.details.insight}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [active, setActive] = useState<ProjectCategory>("professional");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = projects.filter((p) => p.category.includes(active));

  const handleCardClick = (title: string) => {
    setExpanded((prev) => (prev === title ? null : title));
  };

  return (
    <section id="work" className="py-24 md:py-32 relative noise-overlay">
      <div className="section-container relative z-10">
        <ScrollReveal>
          <div className="text-center">
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Portfolio</p>
            <h2 className="section-heading mb-4">What I've Built</h2>
            <p className="section-subheading mb-10 mx-auto">
              From enterprise platforms serving thousands to weekend AI experiments on my homelab — here's what happens when curiosity meets craft.
            </p>
          </div>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActive(f.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active === f.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Featured projects */}
        {(() => {
          const featuredProjects = filtered.filter((p) => p.featured);
          if (featuredProjects.length === 0) return null;
          return (
            <div className="space-y-5 mb-8">
              {featuredProjects.map((feat) => (
                  <ScrollReveal key={feat.title} delay={0.15}>
                    <FeaturedProjectCard
                      project={feat}
                      isExpanded={expanded === feat.title}
                      onClick={() => handleCardClick(feat.title)}
                    />
                  </ScrollReveal>
              ))}
            </div>
          );
        })()}

        {/* Project grid (excludes featured) */}
        <div className="grid md:grid-cols-2 gap-5">
          {filtered
            .filter((p) => !p.featured)
            .map((project, i) => (
              <ScrollReveal key={project.title} delay={0.1 + i * 0.05}>
                <ProjectCard
                  project={project}
                  isExpanded={expanded === project.title}
                  onClick={() => handleCardClick(project.title)}
                />
              </ScrollReveal>
            ))}
        </div>
      </div>
    </section>
  );
}
