import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { Briefcase, Award, Download, ExternalLink, ChevronDown } from "lucide-react";
import { useMouseGlow } from "@/hooks/useMouseGlow";

interface Role {
  company: string;
  title: string;
  period: string;
  metrics: { value: string; label: string }[];
  highlights: string[];
  expandedDetails: string[];
  icon: typeof Briefcase;
}

const roles: Role[] = [
  {
    company: "Babylist",
    title: "Director of Business Intelligence and Data Engineering",
    period: "2024 – 2025",
    icon: Briefcase,
    metrics: [
      { value: "30%", label: "Cost Reduction" },
      { value: "50%", label: "Faster P95" },
    ],
    highlights: [
      "Owned BI and data engineering for registry and e-commerce platform serving millions of families",
      "Modernized Snowflake architecture: 30% cost reduction (~$145K annual savings) and 50% P95 query performance improvement",
      "Designed and launched interconnected governance programs: Endorsed Content certification, Data Specialist network revamp, data observability improvements, and Atlan data catalog rollout",
      "Ran company-wide \u201CState of Data\u201D surveys that directly shaped the 2025 data strategy and investment priorities",
      "Led Project Peace Bridge, reconciling unit economics reporting with Finance through a trusted, endorsed Sales dataset",
      "Negotiated vendor accountability for a failing A/B testing rollout, securing three months of premium support and putting the engagement on stronger footing",
      "Established PHI governance framework for health data partnerships",
      "Championed AI adoption company-wide with hands-on workshops",
    ],
    expandedDetails: [
      "Inherited a Snowflake environment that had grown organically during hypergrowth. Conducted hands-on audit of query logs, dbt code, and warehouse metrics. Converted expensive tables to incremental models, refactored anti-patterns, and redesigned the data mart architecture with proper clustering and analysis-ready structures.",
      "Built cost governance with query tagging and team-level attribution dashboards, partnered with engineering to optimize Airflow orchestration and reduce redundant runs. The biggest wins came from simple changes done consistently: proper incremental models, right-sized warehouses, and query tagging.",
      "Babylist had no formal data governance when I arrived. Designed the 2025 Data Strategy around four pillars: platform performance, metric trust, self-service enablement, and governance. Ran two State of Data surveys to measure whether our work was actually landing, and used the feedback to reprioritize. Launched the Endorsed Content program to certify trusted dashboards and datasets, revamped the Data Specialist program with structured training tiers and clear expectations, deployed Monte Carlo for data observability (later deprecated when cost didn't justify value, replaced with lighter-weight metrics monitoring), and initiated the Atlan data catalog.",
      "Led the company's first structured AI adoption initiative, running hands-on workshops that moved teams from curiosity to practical application. Established evaluation frameworks so teams could assess AI tools with the same rigor they'd apply to any vendor decision.",
    ],
  },
  {
    company: "Chewy",
    title: "Director of Software Engineering — Analytic Platforms",
    period: "2022 – 2023",
    icon: Briefcase,
    metrics: [
      { value: "7", label: "Teams Led" },
      { value: "80+", label: "Interviews" },
    ],
    highlights: [
      "Led 7 teams spanning software engineering, data governance, analytics, GRC, and pricing",
      "Conducted company-wide analytics audit: 80+ interviews across 45 teams, mapped 124-step instrumentation process that shifted the 2024 product roadmap",
      "Architected real-time event pipeline (Kafka, Amazon MSK, Flink) processing 120M events/day, replacing Segment and saving $35K annually",
      "Deployed Anodot as data observability platform, establishing monitoring standards and bringing cross-functional teams onto shared data quality controls",
    ],
    expandedDetails: [
      "Tapped by the CTO to run a company-wide instrumentation audit after product teams struggled to measure feature performance. iOS, Android, and web had evolved independently for years with different schemas, event names, and properties for the same user actions.",
      "Discovered it took 124 discrete steps across multiple teams to instrument a new feature. Documented how platform schema divergence made cross-platform customer journey analysis impossible and quantified the business impact on ML models and A/B tests.",
      "Presented findings to C-suite with three options ranging from incremental fixes to full mobile re-architecture. After my departure, iOS and Android teams were reorganized in favor of a unified architecture based on these findings.",
    ],
  },
  {
    company: "Chewy",
    title: "Director, Business Intelligence",
    period: "2020 – 2022",
    icon: Briefcase,
    metrics: [
      { value: "3,500+", label: "Users" },
      { value: "97%", label: "PII Reduction" },
    ],
    highlights: [
      "Scaled organization from 14 to 30 people across BI, Data Governance, Splunk, and GRC teams",
      "Grew Tableau platform from 100 to 3,500+ users (35x) while maintaining performance and SOX compliance",
      "Reduced PII exposure by 97% across all system logs through cross-functional initiative with 30+ engineering teams",
      "Rolled out Alation data catalog and built SOX-compliant path-to-production process",
      "Expanded scope to include enterprise GRC responsibilities, executing PCI audits, SOX compliance validation, and managing PwC/Internal Audit relationships",
      "Built Data Summit (75+ sessions) and Data Basecamp programs, training 1,200+ employees",
      "2021 Drexel LeBow Analytics 50 — Data Governance",
      "2021 Ventana Research Digital Leadership Award — Data Catalog",
    ],
    expandedDetails: [
      "The PII reduction was a change management project that happened to involve technology. Led through influence across 30+ engineering teams with no direct authority, building automated PII detection in Splunk and training 200+ engineers on privacy-safe logging practices.",
      "Built governance as a discipline, not a checkbox. Rolled out Alation as the enterprise data catalog, launched a data stewards program, established the Data Governance Council, and deployed OneTrust for CCPA/GDPR compliance. The through-line: make governance useful enough that people adopt it voluntarily.",
      "Data Summit grew from a half-day pilot (10 sessions) to a multi-day event (75+ sessions over 4 days). Data Basecamp was vendor-led training curated specifically to Chewy's environment with beginner, intermediate, and advanced tracks. Both programs became part of Chewy's culture.",
    ],
  },
  {
    company: "Chewy",
    title: "Associate Director / Manager, Business Intelligence",
    period: "2017 – 2020",
    icon: Briefcase,
    metrics: [
      { value: "$10M+", label: "Revenue" },
      { value: "0→14", label: "Team" },
    ],
    highlights: [
      "First BI hire. Built analytics function from zero to 14 people supporting IPO readiness",
      "Architected self-service analytics platform, leading migration from on-prem Vertica to Snowflake and reducing analytics warehouse load from 70% to 30%",
      "Drove transformation from centralized BI team to hub-and-spoke analytics model, embedding analysts within business units while maintaining central governance standards",
      "Created vendor data services platform generating $10M+ annual revenue",
      "Founded Data Summit conference and Data Basecamp training program",
      "Delivered zero SOX audit findings through IPO",
    ],
    expandedDetails: [
      "Joined as a staff engineer building dashboards when there was no formal analytics function. The company was scaling rapidly toward its 2019 IPO and needed enterprise-grade analytics capabilities. Built and grew the BI team, took on Data Governance, inherited Splunk, and was given GRC as each function matured.",
      "Turned operational data into a revenue-generating product. Designed and launched three external analytics platforms with row-level security, giving vendor partners near real-time visibility into product performance. Started with veterinary practice rebate tracking, then expanded as the platform proved value.",
      "Led the shift from a centralized data team to a hub-and-spoke model, embedding analysts within business units while maintaining central platform standards and governance. Designed dev/prod separation that created SOX auditability while improving content quality and discoverability. Met each team where they were in their analytics journey, providing hands-on optimization support or guardrails and autonomy depending on maturity.",
    ],
  },
  {
    company: "3CInteractive (Cisco)",
    title: "Manager, Business Intelligence",
    period: "2012 \u2013 2016",
    icon: Briefcase,
    metrics: [
      { value: "5", label: "Person Team" },
      { value: "Fortune 500", label: "Clients" },
    ],
    highlights: [
      "Built and led a cross-functional team of 5 developers supporting internal analytics and customer-facing data products for a SaaS SMS marketing platform",
      "Deployed clustered Tableau environment and automated customer data mart creation, reducing deployment time by 50% per new client",
      "Established analytics foundation serving Fortune 500 retail and CPG clients",
    ],
    expandedDetails: [],
  },
];

function CareerCard({ role, isExpanded, onToggle }: { role: Role; isExpanded: boolean; onToggle: () => void }) {
  const { ref, onMouseMove, onMouseLeave } = useMouseGlow();

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onToggle}
      className="rounded-xl bg-card border border-border p-6 md:p-7 card-glow cursor-pointer"
    >
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
          <div>
            <h3 className="font-display font-bold text-lg text-foreground">{role.title}</h3>
            <span className="text-muted-foreground font-medium text-sm mt-1">{role.company}</span>
          </div>
          <div className="flex items-center gap-2 mt-1 sm:mt-0">
            <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">{role.period}</span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={16} className="text-muted-foreground" />
            </motion.div>
          </div>
        </div>

        {/* Metrics */}
        {role.metrics.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-4">
            {role.metrics.map((m) => (
              <div key={m.label} className="flex items-baseline gap-1.5">
                <span className="font-display font-bold text-xl text-primary">{m.value}</span>
                <span className="text-xs text-muted-foreground">{m.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Highlights */}
        <ul className="space-y-1.5">
          {role.highlights.map((h, j) => (
            <li key={j} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
              {h}
            </li>
          ))}
        </ul>

        {/* Expanded details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-border space-y-3">
                {role.expandedDetails.map((detail, j) => (
                  <p key={j} className="text-sm text-muted-foreground leading-relaxed">{detail}</p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function CareerSection() {
  const [expandedRole, setExpandedRole] = useState<number | null>(null);

  return (
    <section id="career" className="py-24 md:py-32 relative">
      <div className="section-container">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16">
            <div>
              <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Experience</p>
              <h2 className="section-heading">Career Timeline</h2>
            </div>
            <div className="flex gap-3 mt-4 sm:mt-0">
              <a
                href="https://linkedin.com/in/michaelgerstl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink size={14} /> LinkedIn
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <Download size={14} /> Resume PDF
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Education & Awards */}
        <ScrollReveal delay={0.05} className="mb-12">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Education */}
            <div className="flex items-start gap-3 px-5 py-4 rounded-xl bg-card border border-border">
              <div className="h-8 w-8 mt-0.5 rounded bg-white p-0.5 shrink-0">
                <img src={`${import.meta.env.BASE_URL}logos/columbia.png`} alt="Columbia University" className="h-full w-full object-contain" />
              </div>
              <div>
                <p className="font-display font-semibold text-sm text-foreground">Columbia University</p>
                <p className="text-xs text-muted-foreground">BA, Economics and Political Science</p>
                <p className="text-xs text-muted-foreground mt-1">Varsity Wrestling, Team Captain, Academic All-American</p>
              </div>
            </div>

            {/* Awards - stacked */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary/5 border border-primary/15">
                <Award size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">2021 Drexel LeBow Analytics 50</span>
                <span className="text-xs text-muted-foreground ml-1">Data Governance</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary/5 border border-primary/15">
                <Award size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">Ventana Research Digital Leadership Award</span>
                <span className="text-xs text-muted-foreground ml-1">Data Catalog</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-px bg-teal/30" />

          <div className="space-y-8">
            {roles.map((role, i) => (
              <ScrollReveal key={`${role.company}-${role.title}`} delay={0.1 + i * 0.08}>
                <div className="relative pl-12 md:pl-16 group">
                  {/* Dot */}
                  <div className="absolute left-[14px] md:left-[18px] top-2 w-[11px] h-[11px] rounded-full border-2 border-teal bg-background group-hover:bg-teal transition-colors duration-300" />

                  <CareerCard
                    role={role}
                    isExpanded={expandedRole === i}
                    onToggle={() => setExpandedRole(expandedRole === i ? null : i)}
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
