import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';

// Screenshot imports
import reflectionRecord from '@/assets/screenshots/reflection-record.webp';
import reflectionTags from '@/assets/screenshots/reflection-tags.webp';
import hoaAnalytics from '@/assets/screenshots/hoa-analytics.webp';
import hoaLeaderboards from '@/assets/screenshots/hoa-leaderboards.webp';

export type ProjectType = 'self-service-analytics' | 'pii-reduction' | 'vendor-analytics' | 'data-culture' | 'modern-stack' | 'gearsift' | 'jobkit' | 'reflection' | 'hoa-dashboard' | 'tautulli-pipeline' | 'whisper-notes' | 'nanoclaw' | 'instrumentation-audit' | 'data-platform-babylist' | 'team-scaling' | 'data-governance';

interface WorkDetailPanelProps {
  type: ProjectType;
  onClose: () => void;
  onNextProject?: () => void;
}

interface SecurityTest {
  name: string;
  status: 'passed' | 'blocked';
  description: string;
}

interface ProjectContent {
  title: string;
  company: string;
  challenge: string;
  approach: string[];
  outcome: string;
  keyInsight: string;
  technologies: string[];
  // Extended fields for AI projects
  architecture?: {
    title: string;
    components: { name: string; description: string }[];
  };
  security?: {
    title: string;
    description: string;
    tests: SecurityTest[];
  };
  github?: string;
  screenshots?: { label: string; src: string }[];
}

export function WorkDetailPanel({ type, onClose, onNextProject }: WorkDetailPanelProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  const { scrollYProgress } = useScroll({
    container: scrollContainerRef
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const content: Record<ProjectType, ProjectContent> = {
    'self-service-analytics': {
      title: 'Self-Service Analytics at Scale',
      company: 'Chewy',
      challenge: 'Pre-IPO, Chewy\'s analytics environment was creating more problems than it solved: teams were rebuilding the same content independently, metrics didn\'t match across departments, nothing was discoverable, and duplicate work was rampant. There was no dev/prod separation, so SOX-sensitive reporting had zero protections or auditability. Meanwhile, 70% of our on-prem Vertica warehouse capacity was consumed by sandbox tables and ad-hoc analytics workloads, leaving minimal headroom for critical ETL processes. As Associate Director, I was accountable for transforming this into a governed, scalable self-service platform before IPO.',
      approach: [
        'Met each team where they were in their analytics journey—some needed hands-on optimization support, others just needed guardrails and autonomy',
        'Designed dev/prod separation that created SOX auditability while improving content quality and discoverability',
        'Focused on building valuable analytics that surfaced business drivers, not just dashboards that displayed metrics',
        'Established content certification so teams could find and trust existing assets instead of rebuilding from scratch'
      ],
      outcome: '35x user growth (100 to 3,500+) with maintained performance. Warehouse load reduced from 70% to 30% for analytics workloads, freeing capacity for ETL. Zero SOX audit findings through IPO and beyond. Platform team efficiency improved 7x—grew only 3 to 5 FTE despite 35x user growth.',
      keyInsight: 'Governance works when you meet people where they are. By supporting each team\'s unique analytics maturity rather than imposing one-size-fits-all rules, users became partners in quality rather than resistors of process.',
      technologies: ['Tableau Server', 'Vertica', 'Snowflake', 'AWS']
    },
    'pii-reduction': {
      title: 'Privacy Compliance at Scale',
      company: 'Chewy',
      challenge: 'Pre-IPO security audit revealed significant customer PII exposure in Splunk system logs—a compliance risk for SOX and CCPA that needed remediation before going public. As Director, I was accountable for eliminating this exposure, but engineering teams didn\'t want anything to do with it. They argued they needed the data for debugging, it slowed them down, and they pushed back constantly. I had no direct authority over the 30+ teams who needed to change their behavior.',
      approach: [
        'Led through influence, not authority—partnered directly with each engineering team to explain the "why" rather than mandating compliance',
        'Made the case that PII in logs was unnecessary, a privacy risk, and simply not best practice—winning over resistant teams by explaining business rationale',
        'Built automated PII detection in Splunk to identify patterns and track remediation progress across all applications',
        'Established sustainable governance mechanisms and trained 200+ engineers on privacy-safe logging practices'
      ],
      outcome: '97% reduction in PII across all system logs. Zero audit findings related to data exposure in IPO security reviews. Framework became standard practice for all new services, shifting engineering culture toward privacy-safe logging.',
      keyInsight: 'Cross-functional initiatives succeed when you lead with "why." Engineers resisted because they saw it as overhead—winning them over required explaining that PII in logs was unnecessary and risky, not just citing compliance rules.',
      technologies: ['Splunk', 'Tableau', 'Vertica', 'Snowflake', 'AWS']
    },
    'vendor-analytics': {
      title: 'Vendor Data Services',
      company: 'Chewy',
      challenge: 'Chewy\'s vendor partners had no self-service access to their own performance data. Without an official conduit, account managers faced constant pressure to share ad-hoc reports—putting Chewy at risk of sharing unvalidated data or exposing competitive information. As Director of BI & Data Governance, I saw an opportunity to treat data as a product: turn operational data into a revenue stream while establishing proper governance.',
      approach: [
        'Partnered directly with vendors during development to understand what they actually needed—their feedback shaped the product and built stronger relationships',
        'Designed secure external-facing platform with row-level security ensuring vendors only saw their own data',
        'Established an official, sanctioned channel for vendor data—replacing risky ad-hoc sharing with auditable, validated information',
        'Started with veterinary practice rebate tracking, then expanded to additional business units as the platform proved value'
      ],
      outcome: 'Generated $10M+ annual revenue from data that was previously just operational overhead. Eliminated 90% of ad-hoc vendor data requests. Platform eventually rolled into Vendor 360 portal. Strengthened vendor relationships by weaving Chewy more tightly into their data ecosystem.',
      keyInsight: 'Data teams should think like product teams. By partnering with vendors to build what they actually needed—not what we assumed—we created a product that deepened relationships while generating revenue. The official platform also served as a governance mechanism, protecting Chewy from the risks of ad-hoc data sharing.',
      technologies: ['Snowflake', 'Tableau']
    },
    'data-culture': {
      title: 'Data Literacy at Scale',
      company: 'Chewy',
      challenge: 'Chewy had invested in robust analytics infrastructure, but adoption was concentrated within the central BI team. Teams were solving similar problems in isolation with no way to share knowledge. Traditional training didn\'t stick because it wasn\'t based in our data environment. As Director of BI & Data Governance, I needed to build data literacy and community to enable the self-service analytics strategy.',
      approach: [
        'Created Data Summit—a platform for team members to showcase their data products and get recognition, building community and discoverability across departments',
        'Created Data Basecamp—vendor-led training curated specifically to Chewy\'s environment, with beginner/intermediate/advanced tracks based on topics users wanted to learn',
        'Leveraged vendor relationships to deliver high-quality content (vendors wanted to be more deeply embedded in our usage)',
        'Built a learning library of recorded sessions based in our actual data stack—not generic examples'
      ],
      outcome: 'Grew from a half-day pilot (10 sessions) to a multi-day event (75+ sessions over 4 days). Trained 1,200+ employees over five years. Built learning library of Chewy-specific content. Programs became something people looked forward to—part of Chewy\'s culture.',
      keyInsight: 'Meet people where they are. Not everyone learns the same way—some want office hours, some want videos. But training curated to your environment, using your data, is far more impactful than generic content.',
      technologies: ['Tableau', 'Snowflake', 'Alation', 'SQL', 'Zoom']
    },
    'instrumentation-audit': {
      title: 'Product Analytics Audit',
      company: 'Chewy',
      challenge: 'Product teams struggled to measure feature performance because user interaction data was inconsistent across platforms. iOS, Android, and web had evolved independently for years—different schemas, different event names, different properties for the same actions. No one understood the full picture, and people blamed bots for the measurement inconsistencies. As Director, I was asked to figure out what was actually going on.',
      approach: [
        'Conducted 80+ interviews across 30 product and engineering teams to map the complete instrumentation workflow',
        'Discovered it took 124 discrete steps across multiple teams to instrument a new feature—creating months-long delays',
        'Documented how iOS/Android schema divergence made cross-platform customer journey analysis impossible',
        'Quantified business impact: ML models trained on inconsistent data, A/B tests confounded by platform differences',
        'Presented findings to C-suite with three options ranging from incremental fixes to full mobile re-architecture'
      ],
      outcome: 'The audit painted a clear picture of how broken things were—something no one had fully understood before. Findings informed roadmap planning for the following year. After my departure, iOS and Android teams were dissolved in favor of a unified web-flexible architecture.',
      keyInsight: 'Sometimes the highest-impact work is making invisible problems visible. The audit didn\'t fix anything directly—it gave leadership the evidence and options they needed to make a strategic decision.',
      technologies: ['SQL', 'Snowflake', 'Splunk']
    },
    'data-platform-babylist': {
      title: 'Data Platform Optimization',
      company: 'Babylist',
      challenge: 'Babylist\'s Snowflake platform had grown organically during hypergrowth—costs were escalating faster than business value, P95 query latency was hurting analyst productivity, and the transformation layer was full of anti-patterns. As Director of BI & Data Engineering, I inherited a platform that needed modernization before it became a bottleneck for both daily operations and IPO readiness.',
      approach: [
        'Conducted hands-on audit of query logs, dbt code, and warehouse metrics—didn\'t delegate the investigation work',
        'Optimized dbt transformation layer: converted expensive tables to incremental models, refactored anti-patterns, added comprehensive testing',
        'Redesigned data mart architecture with proper clustering and flattened, analysis-ready structures',
        'Implemented cost governance with query tagging and team-level attribution dashboards',
        'Partnered with engineering to optimize Airflow orchestration and reduce redundant runs'
      ],
      outcome: '30% cost reduction (~$145K annual savings) through architectural optimization. 50% P95 query latency improvement enabling faster interactive analytics. 50% increase in active data users through better performance and self-service enablement.',
      keyInsight: 'Platform optimization is about discipline, not technology. The biggest wins came from simple changes done consistently—proper incremental models, right-sized warehouses, query tagging. No fancy technology, just fundamentals that had been skipped during hypergrowth.',
      technologies: ['Snowflake', 'dbt', 'Airflow', 'Hex', 'Monte Carlo']
    },
    'team-scaling': {
      title: 'Building an Analytics Organization',
      company: 'Chewy',
      challenge: 'When I joined Chewy in 2017 as a staff engineer building dashboards, there was no formal analytics function. The company was scaling rapidly toward its 2019 IPO and needed enterprise-grade analytics capabilities. I quickly became the platform owner as we moved to self-service, and over six years was given increasing responsibility as I proved myself—eventually leading multiple teams across BI, data governance, Splunk, and GRC.',
      approach: [
        'Started as staff engineer, became Associate Director, then Director as I took on more responsibility',
        'Grew the BI team to 5-6 people focused on platform support and self-service enablement',
        'Took on Data Governance team (4-5 people) as the function matured',
        'Inherited and grew Splunk team from 2 to 6 engineers',
        'Was given GRC (governance, risk, compliance) team when they needed stronger leadership'
      ],
      outcome: 'Built and absorbed teams totaling ~30 people across BI, Data Governance, Splunk, and GRC. Supported Chewy through IPO and continued scaling. Became a trusted leader who was given teams as the organization needed them.',
      keyInsight: 'Career growth isn\'t always about building one team from scratch—sometimes it\'s about being the trusted leader who gets given teams as you prove yourself. The common thread was governance, compliance, and enabling the organization to use data effectively.',
      technologies: ['Tableau', 'Snowflake', 'Splunk', 'Alation']
    },
    'data-governance': {
      title: 'Enterprise Data Governance',
      company: 'Chewy',
      challenge: 'Pre-IPO, Chewy lacked formal data governance. There was no data catalog, inconsistent metric definitions across teams, and growing regulatory requirements (CCPA, GDPR, SOX) without systematic controls. As Director of BI & Data Governance, I owned building this capability from scratch.',
      approach: [
        'Ran POCs and rolled out Alation as the data catalog—even during the pandemic, got teams to fill it out',
        'Implemented OneTrust for CCPA compliance, mapping all our data and building consent management',
        'Prepared for GDPR with comprehensive data mapping for international expansion',
        'Built SOX-compliant path-to-production process with dev/prod separation for Tableau',
        'Created automated migration process that ran explain plans to keep compute costs low'
      ],
      outcome: 'CCPA compliant at launch. GDPR-ready for international expansion. SOX controls validated through multiple audit cycles. The catalog and governance tooling made compliance a byproduct of better infrastructure.',
      keyInsight: 'Governance succeeds when it enables rather than restricts. When you make it easier for people to find and trust data, compliance follows naturally.',
      technologies: ['Alation', 'OneTrust', 'Snowflake', 'Tableau', 'Splunk']
    },
    'modern-stack': {
      title: 'Modern Data Stack Homelab',
      company: 'Homelab',
      challenge: 'Staying current with rapidly evolving data and AI technologies requires hands-on experimentation. Enterprise environments move slowly; personal infrastructure enables fast iteration.',
      approach: [
        'Built local Kubernetes cluster running modern data stack components',
        'Implemented Airflow for orchestration, dbt for transformations',
        'Deployed Qdrant vector database for semantic search experiments',
        'Set up LM Studio for local LLM inference and RAG pipelines',
        'Created personal analytics on home automation and fitness data'
      ],
      outcome: 'Continuous learning environment for emerging technologies. Direct experience with tools before recommending them professionally. Content for technical discussions and interviews.',
      keyInsight: 'The best way to evaluate technology is to use it on real problems. Homelabs provide the freedom to experiment without enterprise constraints.',
      technologies: ['Airflow', 'dbt', 'Qdrant', 'LM Studio', 'Docker', 'Kubernetes', 'Python']
    },
    'gearsift': {
      title: 'GearSift',
      company: 'Personal Project',
      challenge: 'Outdoor gear research is fragmented: reviews scattered across YouTube, retailer sites, and Reddit with no way to compare products objectively. Affiliate sites rank products by commission rate, not quality. I wanted a data-driven approach that aggregates expert opinions, normalizes specifications, and scores products by category-specific criteria.',
      approach: [
        'Built multi-source ingestion pipelines: Amazon product data via ScrapingDog, YouTube reviews from 20 monitored channels, web scraping from REI/Outdoor Gear Lab/Switchback Travel, AvantLink affiliate feeds, and Reddit trend analysis from 6 subreddits',
        'Designed 9 category-specific scoring engines (tents, backpacks, sleeping bags, pads, headlamps, stoves, water filtration, cookware, bottles) with percentile-based competitive ranking',
        'Built enrichment layer using Ollama for spec normalization and Gemini for Reddit structured analysis',
        'Created Astro 5 static site with React components for interactive radar charts and product comparisons',
        'Implemented admin dashboard (FastAPI + HTMX) for pipeline orchestration, product CRUD, and review fact extraction',
        'Baked affiliate URLs into static HTML at build time so revenue generation is independent of API uptime'
      ],
      outcome: '396 active products across 9 categories with normalized specs and aggregated expert scores. 97 test files, 59 database migrations, 32 uptime monitors. Dual revenue model: AvantLink affiliate commissions (REI, Backcountry) and display advertising.',
      keyInsight: 'Static-first architecture with baked-in affiliate links means the revenue-generating pages run on a CDN and survive any homelab outage. The API and PostgreSQL are self-hosted dependencies, but affiliate revenue is decoupled from infrastructure availability by design.',
      technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Astro', 'React', 'Cloudflare', 'Ollama', 'HTMX'],
      architecture: {
        title: 'Data Pipeline Architecture',
        components: [
          { name: 'Ingestion Layer', description: 'Multi-source data collection: ScrapingDog (Amazon), YouTube API, web scrapers (REI, OGL, Switchback), AvantLink feeds, Reddit via Gemini.' },
          { name: 'Enrichment Engine', description: 'Ollama-powered spec normalization, YouTube video classification, and review fact extraction.' },
          { name: 'Scoring Engine', description: '9 category-specific scorers with percentile ranking and radar chart visualization.' },
          { name: 'Admin Dashboard', description: 'FastAPI + HTMX interface for pipeline control, product management, and data quality monitoring.' },
          { name: 'Static Site', description: 'Astro 5 with React islands, deployed to Cloudflare Pages. 380+ pre-rendered pages with baked affiliate links.' },
          { name: 'Infrastructure', description: 'CT 260 (API) and CT 201 (PostgreSQL) on Proxmox, Cloudflare R2 for images, 32 uptime monitors.' }
        ]
      }
    },
    'jobkit': {
      title: 'JobKit',
      company: 'Personal Project',
      challenge: 'VP/Director-level job searching is tedious: manually checking multiple boards, evaluating fit against a complex set of criteria, and customizing resumes for each application. I wanted to automate the pipeline from discovery through application materials while keeping everything local and private.',
      approach: [
        'Built multi-board scraping (Indeed, LinkedIn, ZipRecruiter) with deduplication and smart title filtering',
        'Designed AI scoring with enforced distribution targets: only 2-4 of every 20 roles score 8+, preventing score inflation',
        'Implemented two-pass resume generation: LLM writes a custom resume, then a second LLM call audits it for fabrication, passive voice, and banned words',
        'Created Obsidian Bases integration for live dashboards with pipeline views, apply queue, and outcome tracking',
        'Made everything privacy-first: all processing local, CV and profiles never leave the device'
      ],
      outcome: 'End-to-end job search automation: scrape, score, filter, generate tailored resumes and cover letters, track outcomes. 72 tests covering the full pipeline. Obsidian integration turns job search data into a personal CRM.',
      keyInsight: 'AI scoring without distribution constraints is useless because everything scores 8+. Forcing realistic distributions (most roles score 4-6, few score 8+) makes the signal meaningful.',
      technologies: ['Python', 'SQLite', 'Docker', 'LLM', 'Typer', 'WeasyPrint'],
      github: 'https://github.com/pieChartsAreLies/JobKit',
      architecture: {
        title: 'System Architecture',
        components: [
          { name: 'Scraper Engine', description: 'Multi-board collection via JobSpy with deduplication, title filtering, and rate-limited queuing.' },
          { name: 'AI Scorer', description: 'LLM-based role evaluation with enforced distribution targets and customizable rubrics.' },
          { name: 'Resume Generator', description: 'Two-pass system: generation then audit. Checks for fabrication, style violations, and JD alignment.' },
          { name: 'Obsidian Integration', description: 'Live Bases dashboards with pipeline views, apply queue, and outcome tracking.' },
          { name: 'CLI Interface', description: 'Typer + Rich terminal UI with 8 commands covering the full job search workflow.' }
        ]
      }
    },
    'reflection': {
      title: 'Reflection',
      company: 'Personal Project',
      challenge: 'Voice journaling tools either require cloud subscriptions or lack the intelligence to surface patterns over time. I wanted a local-first app where I could speak freely, have entries automatically tagged by emotion and topic, and visualize patterns through an interactive knowledge graph.',
      approach: [
        'Built browser-based recording with guided templates and free-form modes',
        'Integrated faster-whisper for local transcription with configurable model sizes (tiny to large-v3)',
        'Added LLM-powered auto-tagging: emotion tags (anxious, grateful) and topic tags (work, family) from a structured vocabulary',
        'Created interactive force-directed knowledge graph with Barnes-Hut quadtree simulation (custom SVG, no D3)',
        'Built Obsidian sync with entries saved as markdown with [[wikilinks]] and embedded audio players',
        'Added LLM chat: ask questions about journal history, get summaries and pattern analysis'
      ],
      outcome: 'Complete voice journaling platform that runs in 5 minutes via Docker Compose. All data stays local under ~/.reflection/. The knowledge graph reveals connections between emotions, topics, and time periods that text-only journaling misses.',
      keyInsight: 'Voice captures what typing filters out. People self-edit when they type but speak more honestly. Pairing that raw input with automated tagging and graph visualization surfaces patterns that structured journaling never would.',
      technologies: ['Next.js', 'Python', 'Whisper', 'Ollama', 'SQLite'],
      screenshots: [
        { label: 'Recording', src: reflectionRecord },
        { label: 'Tags', src: reflectionTags },
      ],
      architecture: {
        title: 'System Architecture',
        components: [
          { name: 'Recording UI', description: 'Browser-based audio capture with guided templates, pacing prompts, and real-time status.' },
          { name: 'Transcription Worker', description: 'Python worker with faster-whisper, polling for new recordings and processing locally.' },
          { name: 'AI Tagger', description: 'Local LLM extracts emotion and topic tags from transcribed entries using structured vocabulary.' },
          { name: 'Knowledge Graph', description: 'Custom force-directed SVG visualization with Barnes-Hut optimization showing entry connections.' },
          { name: 'Obsidian Sync', description: 'Entries exported as markdown with [[wikilinks]], frontmatter tags, and embedded audio players.' }
        ]
      }
    },
    'hoa-dashboard': {
      title: 'HOA Dashboard',
      company: 'Personal Project',
      challenge: 'Our HOA board makes decisions about community investments with no data on property values, equity positions, or market trends. Public records exist but are scattered across county GIS systems and require manual lookup. I wanted an interactive tool that makes neighborhood-level real estate analytics accessible to non-technical board members.',
      approach: [
        'Built data pipeline pulling from Palm Beach County PAPA ArcGIS API and Freddie Mac mortgage rate feeds',
        'Created interactive Mapbox parcel map with color-coded overlays for estimated equity, appreciation, and sale history',
        'Designed equity calculator modeling current positions based on purchase price, estimated value, and amortization schedules',
        'Built leaderboards ranking properties by appreciation, equity percentage, and value per square foot',
        'Added sell scenario modeler and flip detection badges for investment analysis',
        'Packaged as Docker container for homelab deployment with embedded SQLite'
      ],
      outcome: 'Interactive dashboard covering 122 properties with 723 sale records. Parcel map, equity calculator, value leaderboards, and 8 analytical chart types. Board members can explore data without technical skills.',
      keyInsight: 'Local government data is surprisingly rich but locked behind clunky GIS interfaces. A weekend of Python scripting turns public records into a genuinely useful analytical tool.',
      technologies: ['Next.js', 'Mapbox', 'Recharts', 'SQLite', 'Python', 'Docker'],
      screenshots: [
        { label: 'Analytics', src: hoaAnalytics },
        { label: 'Leaderboards', src: hoaLeaderboards },
      ],
      github: 'https://github.com/pieChartsAreLies/hoa-dashboard',
      architecture: {
        title: 'System Architecture',
        components: [
          { name: 'Data Pipeline', description: 'Python scripts pulling from PAPA ArcGIS REST API and Freddie Mac PMMS for property and rate data.' },
          { name: 'Interactive Map', description: 'Mapbox GL JS with parcel overlays, metric-based coloring, and property detail tooltips.' },
          { name: 'Analytics Engine', description: '8 chart types via Recharts: appreciation curves, equity distribution, bedroom analysis, holding period scatter.' },
          { name: 'Equity Calculator', description: 'Amortization modeling with current rate assumptions and sell scenario projections.' },
          { name: 'Deployment', description: 'Dockerized Next.js with standalone build, embedded SQLite, homelab hosting via Cloudflare Tunnel.' }
        ]
      }
    },
    'tautulli-pipeline': {
      title: 'Tautulli Pipeline',
      company: 'Personal Project',
      challenge: 'Tautulli provides basic Plex watch history, but no way to do deeper analysis: viewing patterns over time, library utilization, user behavior trends. I wanted a proper data warehouse pipeline as both a practical analytics tool and a hands-on exercise with the modern data stack.',
      approach: [
        'Built extraction DAGs in Airflow: hourly watch history, daily metadata refresh, and 5-minute real-time activity polling',
        'Designed dbt transformation layer with staging, intermediate, and mart models following analytics engineering best practices',
        'Deployed dual dashboarding: Evidence.dev for code-driven analytics and Metabase for self-service exploration',
        'Distributed across 4 homelab containers: Airflow (CT 203), dbt (CT 202), PostgreSQL (CT 201), Evidence (CT 185)'
      ],
      outcome: 'Production data warehouse with ~3,920 watch history records, 4 operational DAGs, and dual dashboard layers. Runs continuously on homelab infrastructure with minimal maintenance.',
      keyInsight: 'Running a full modern data stack on personal infrastructure teaches you things enterprise environments hide: resource constraints force thoughtful architecture, and operating your own Airflow/dbt/warehouse builds real debugging intuition.',
      technologies: ['Airflow', 'dbt', 'PostgreSQL', 'Python', 'Evidence', 'Metabase'],
      architecture: {
        title: 'Pipeline Architecture',
        components: [
          { name: 'Extraction (Airflow)', description: '4 DAGs: hourly history, daily metadata, 5-min realtime polling, daily dbt transform trigger.' },
          { name: 'Transformation (dbt)', description: 'Staging → intermediate → mart models with tests and documentation following analytics engineering patterns.' },
          { name: 'Storage (PostgreSQL)', description: 'Dedicated database on CT 201 with structured schema for watch events, media metadata, and user activity.' },
          { name: 'Dashboards', description: 'Evidence.dev for code-driven reports, Metabase for interactive self-service exploration.' }
        ]
      }
    },
    'whisper-notes': {
      title: 'WhisperNotes',
      company: 'Personal Project',
      challenge: 'My journaling workflow was friction-heavy: record audio, transcribe it, summarize it, create a file, move it to Obsidian, link the audio. Too many steps meant I didn\'t do it consistently. I also wanted voice input for AI interfaces that don\'t natively support it—talk to the AI without having it talk back.',
      approach: [
        'Built global hotkeys: Cmd+Shift+J for journaling, Cmd+Shift+R for on-the-fly transcription in any app',
        'Integrated Whisper for local transcription—already running on my homelab, so leveraged existing services',
        'Connected Ollama for automatic summarization and insight extraction',
        'Automated the full workflow: record → transcribe → summarize → template → save to Obsidian vault',
        'Added menu bar integration for status and quick access'
      ],
      outcome: 'I use this daily. Journal entries now take one hotkey press instead of a 6-step process. The Cmd+Shift+R dictation is particularly useful for AI chat interfaces—Claude and other LLMs are excellent at understanding flowing speech, and sometimes you want to talk without the AI speaking back.',
      keyInsight: 'The best tools solve your own problems first. Building for myself meant I could be honest about what friction actually existed—and now I use it every day.',
      technologies: ['Python', 'Whisper', 'Ollama', 'PyObjC', 'Markdown', 'Apple Silicon'],
      github: 'https://github.com/pieChartsAreLies/WhisperNotes',
      architecture: {
        title: 'System Architecture',
        components: [
          { name: 'Capture', description: 'Global hotkey listener (Cmd+Shift+R/J) for instant recording from any app.' },
          { name: 'Transcription', description: 'Whisper model running locally for accurate speech-to-text conversion.' },
          { name: 'Summarization', description: 'Ollama with local LLMs for journal summaries and insight extraction.' },
          { name: 'Storage', description: 'Markdown files with YAML frontmatter, linked to original audio recordings.' },
          { name: 'Interface', description: 'Menu bar app with recording status, quick access, and system integration.' }
        ]
      }
    },
    'nanoclaw': {
      title: 'NanoClaw (Bob)',
      company: 'Personal Project',
      challenge: 'I wanted a personal Claude assistant that lives where my conversations already happen (WhatsApp, Discord) but runs securely in containers with proper isolation. Most chat-based AI wrappers are single-user toys. I needed group-aware isolation, scheduled tasks, and skills-based extensibility without a bloated codebase.',
      approach: [
        'Built a lightweight Node.js process that bridges WhatsApp (baileys) or Discord (discord.js) to Claude Agent SDK',
        'Designed per-group isolation: each conversation gets its own container sandbox, filesystem mount, and CLAUDE.md memory file',
        'Implemented scheduled tasks with natural language parsing ("send a briefing every Monday at 8am")',
        'Created skills-based extensibility: Gmail, Twitter/X, and other integrations added as transformation skills, not hard-coded features',
        'Used Apple Container (macOS) or Docker (Linux) for true OS-level sandboxing of agent execution',
        'Kept the codebase intentionally small and understandable, opposite of framework-heavy approaches'
      ],
      outcome: 'Daily-use Claude assistant accessible from any WhatsApp or Discord group. Per-group memory persistence means context carries across conversations. Scheduled tasks handle recurring briefings and monitoring. The small codebase is easy to extend and debug.',
      keyInsight: 'Agent platforms should be thin orchestration layers, not frameworks. Claude handles reasoning, containers handle isolation, chat platforms handle delivery. Each layer does one thing and is independently replaceable. The result is a system you can actually understand and maintain.',
      technologies: ['Node.js', 'Claude SDK', 'WhatsApp', 'Discord', 'Docker', 'SQLite'],
      architecture: {
        title: 'System Architecture',
        components: [
          { name: 'Chat Bridge', description: 'WhatsApp (baileys) or Discord (discord.js) message polling with platform-agnostic routing.' },
          { name: 'Agent Execution', description: 'Claude Agent SDK running in isolated containers (Apple Container on macOS, Docker on Linux).' },
          { name: 'Group Isolation', description: 'Per-group directories with mounted CLAUDE.md files for persistent, sandboxed memory.' },
          { name: 'Scheduler', description: 'Cron-like task system with natural language parsing for recurring automated actions.' },
          { name: 'Skills System', description: 'Extensible integrations (Gmail, X/Twitter, Telegram) added as transformation skills.' },
          { name: 'Data Layer', description: 'SQLite for message history and group state with rolling context window.' }
        ]
      }
    }
  };

  const data = content[type];

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-x-0 bottom-0 z-[100] flex justify-center px-4 pb-4"
    >
      <div className="bg-[#4A4440] w-full max-w-[650px] max-h-[90vh] overflow-y-auto rounded-[16px] shadow-[2px_-4px_30px_0px_rgba(0,0,0,0.5)] flex flex-col relative custom-scrollbar" ref={scrollContainerRef}>
        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-[#D4A853] origin-left z-[110]"
          style={{ scaleX, position: 'absolute' }}
        />

        {/* Header */}
        <div className="sticky top-0 bg-[#4A4440] z-10 px-6 md:px-10 pt-6 md:pt-10 pb-4 border-b border-[#FAF7F2]/5">
          <div className="flex justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <p className="font-['Montserrat',sans-serif] font-medium text-[14px] text-[#D4A853] uppercase tracking-wide">
                  {data.company}
                </p>
                {(type === 'gearsift' || type === 'jobkit' || type === 'reflection' || type === 'hoa-dashboard' || type === 'tautulli-pipeline' || type === 'modern-stack' || type === 'nanoclaw' || type === 'whisper-notes') && (
                  <span className="bg-[#8B5A3C] text-[#FAF7F2] text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                    AI/ML
                  </span>
                )}
              </div>
              <h2 className="font-['Montserrat',sans-serif] font-medium text-[24px] md:text-[31px] text-[#FAF7F2] leading-tight">
                {data.title}
              </h2>
              {data.github && (
                <a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 font-['Montserrat',sans-serif] font-medium text-[13px] text-[#9C9489] hover:text-[#D4A853] transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  View on GitHub
                </a>
              )}
            </div>
            <button
              onClick={onClose}
              className="flex items-center gap-2 group cursor-pointer shrink-0"
            >
              <span className="font-['Montserrat',sans-serif] font-medium text-[18px] text-[#FAF7F2] group-hover:text-[#D4A853] transition-colors">
                ← Back
              </span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-col p-6 md:p-10 pt-6 md:pt-6">
          <div className="flex flex-col gap-8">
            {/* Challenge */}
            <div>
              <h3 className="font-['Montserrat',sans-serif] font-medium text-[18px] text-[#FAF7F2] mb-3">
                The Challenge
              </h3>
              <p className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#D4CFC8] leading-relaxed">
                {data.challenge}
              </p>
            </div>

            {/* Approach */}
            <div>
              <h3 className="font-['Montserrat',sans-serif] font-medium text-[18px] text-[#FAF7F2] mb-3">
                The Approach
              </h3>
              <ul className="flex flex-col gap-2">
                {data.approach.map((item, idx) => (
                  <li key={idx} className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#D4CFC8] leading-relaxed flex gap-2">
                    <span className="text-[#D4A853]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architecture (AI projects only) */}
            {data.architecture && (
              <div>
                <h3 className="font-['Montserrat',sans-serif] font-medium text-[18px] text-[#FAF7F2] mb-3">
                  {data.architecture.title}
                </h3>
                <div className="grid gap-3">
                  {data.architecture.components.map((component, idx) => (
                    <div key={idx} className="bg-[#332F2B] rounded-lg p-4">
                      <p className="font-['Montserrat',sans-serif] font-medium text-[14px] text-[#D4A853] mb-1">
                        {component.name}
                      </p>
                      <p className="font-['Montserrat',sans-serif] font-light text-[14px] text-[#D4CFC8]">
                        {component.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Screenshots */}
            {data.screenshots && data.screenshots.length > 0 && (
              <div>
                <h3 className="font-['Montserrat',sans-serif] font-medium text-[18px] text-[#FAF7F2] mb-3">
                  Screenshots
                </h3>
                {data.screenshots.length > 1 && (
                  <div className="flex gap-2 mb-3">
                    {data.screenshots.map((shot, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveScreenshot(idx)}
                        className={`px-3 py-1.5 rounded-full text-[13px] font-['Montserrat',sans-serif] font-medium transition-colors cursor-pointer ${
                          activeScreenshot === idx
                            ? 'bg-[#D4A853] text-[#2A2622]'
                            : 'bg-[#332F2B] text-[#9C9489] hover:text-[#FAF7F2]'
                        }`}
                      >
                        {shot.label}
                      </button>
                    ))}
                  </div>
                )}
                <div className="rounded-lg overflow-hidden bg-[#2A2622]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeScreenshot}
                      src={data.screenshots[activeScreenshot].src}
                      alt={data.screenshots[activeScreenshot].label}
                      className="w-full h-auto"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Security (AI projects only) */}
            {data.security && (
              <div>
                <h3 className="font-['Montserrat',sans-serif] font-medium text-[18px] text-[#FAF7F2] mb-3">
                  {data.security.title}
                </h3>
                <p className="font-['Montserrat',sans-serif] font-light text-[14px] text-[#D4CFC8] mb-4">
                  {data.security.description}
                </p>
                <div className="bg-[#2A2622] rounded-lg overflow-hidden">
                  <div className="grid grid-cols-[auto_1fr] text-[12px]">
                    {data.security.tests.map((test, idx) => (
                      <React.Fragment key={idx}>
                        <div className={`px-3 py-2 flex items-center justify-center border-b border-[#332F2B] ${
                          test.status === 'blocked' ? 'bg-green-900/30' : 'bg-blue-900/30'
                        }`}>
                          <span className={`font-medium ${
                            test.status === 'blocked' ? 'text-green-400' : 'text-blue-400'
                          }`}>
                            {test.status === 'blocked' ? '🛡️' : '✓'}
                          </span>
                        </div>
                        <div className="px-3 py-2 border-b border-[#332F2B]">
                          <p className="font-['Montserrat',sans-serif] font-medium text-[#FAF7F2] text-[13px]">
                            {test.name}
                          </p>
                          <p className="font-['Montserrat',sans-serif] font-light text-[#9C9489] text-[11px]">
                            {test.description}
                          </p>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <p className="font-['Montserrat',sans-serif] font-light text-[12px] text-[#7A7368] mt-3 italic">
                  25+ unique prompt injection techniques tested. All blocked or handled appropriately.
                </p>
              </div>
            )}

            {/* Outcome */}
            <div>
              <h3 className="font-['Montserrat',sans-serif] font-medium text-[18px] text-[#FAF7F2] mb-3">
                The Outcome
              </h3>
              <p className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#D4CFC8] leading-relaxed">
                {data.outcome}
              </p>
            </div>

            {/* Key Insight */}
            <div className="bg-[#332F2B] rounded-lg p-6 border-l-4 border-[#D4A853]">
              <h3 className="font-['Montserrat',sans-serif] font-medium text-[16px] text-[#D4A853] mb-2">
                Key Insight
              </h3>
              <p className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#D4CFC8] leading-relaxed italic">
                {data.keyInsight}
              </p>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="font-['Montserrat',sans-serif] font-medium text-[18px] text-[#FAF7F2] mb-3">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.technologies.map((tech, idx) => (
                  <span key={idx} className="bg-[#D4A853] text-[#2A2622] px-3 py-1 rounded-full text-[14px] font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="mt-10 flex flex-col md:flex-row gap-4 pt-8 border-t border-[#FAF7F2]/10">
            <button
              onClick={onClose}
              className="flex-1 h-[44px] border border-[#FAF7F2]/30 rounded-[50px] flex items-center justify-center font-['Montserrat',sans-serif] font-medium text-[#FAF7F2] text-[16px] hover:bg-[#FAF7F2]/5 transition-colors"
            >
              Close
            </button>
            {onNextProject && (
              <button
                onClick={onNextProject}
                className="flex-1 h-[44px] border border-[#D4A853] rounded-[50px] flex items-center justify-center font-['Montserrat',sans-serif] font-medium text-[#D4A853] text-[16px] hover:bg-[#D4A853]/10 transition-colors"
              >
                Next Project →
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
