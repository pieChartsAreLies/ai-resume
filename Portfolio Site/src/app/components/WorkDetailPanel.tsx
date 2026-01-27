import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export type ProjectType = 'tableau-scale' | 'pii-reduction' | 'vendor-analytics' | 'data-culture' | 'metric-trees' | 'modern-stack';

interface WorkDetailPanelProps {
  type: ProjectType;
  onClose: () => void;
  onNextProject?: () => void;
}

export function WorkDetailPanel({ type, onClose, onNextProject }: WorkDetailPanelProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    container: scrollContainerRef
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const content = {
    'tableau-scale': {
      title: 'Tableau @ Scale',
      company: 'Chewy',
      challenge: 'When I joined Chewy in 2017, Tableau adoption had grown organically to around 100 users but lacked governance, standards, or compliance controls necessary for SOX requirements. The company was rapidly scaling toward its June 2019 IPO.',
      approach: [
        'Implemented Dev/Prod environment separation ensuring content was tested before production deployment',
        'Designed granular role-based access controls with audit logging for compliance',
        'Established content certification processes, data source standards, and publishing workflows',
        'Scaled to 8-node cluster architecture supporting 3,500+ concurrent users',
        'Created comprehensive training programs, office hours, and tiered support'
      ],
      outcome: 'The platform scaled from 100 to 3,500+ users (35x growth) while maintaining SOX compliance through multiple audit cycles. Self-service analytics became a competitive advantage, enabling faster decision-making across all business functions.',
      keyInsight: 'The counterintuitive lesson was that stronger governance actually accelerated adoption. When users trust the data and know where to find certified content, they engage more confidently.',
      technologies: ['Tableau Server', 'Amazon Redshift', 'Snowflake', 'dbt', 'Apache Airflow', 'AWS']
    },
    'pii-reduction': {
      title: 'PII Reduction Initiative',
      company: 'Chewy',
      challenge: 'Pre-IPO security audit revealed significant PII exposure in system logs across engineering teams. This represented compliance risk for SOX and CCPA, and needed remediation before going public.',
      approach: [
        'Partnered with Security and Compliance to define PII categories and detection rules',
        'Built automated scanning tools to identify PII patterns in Splunk logs',
        'Created remediation playbooks for 30+ engineering teams',
        'Established governance framework for ongoing PII monitoring',
        'Implemented pre-commit hooks and CI/CD checks to prevent new PII logging'
      ],
      outcome: '97% reduction in PII across all monitored systems. Zero material findings in IPO security audits related to data exposure. Framework became standard practice for all new services.',
      keyInsight: 'Cross-functional initiatives succeed when you make compliance easy. The automated detection and clear playbooks meant teams could self-remediate without constant oversight.',
      technologies: ['Splunk', 'Python', 'Regular Expressions', 'AWS Lambda', 'Jenkins']
    },
    'vendor-analytics': {
      title: 'Vendor Analytics Platform',
      company: 'Chewy',
      challenge: 'Chewy\'s vendor partners needed visibility into their product performance but had no self-service access to sales data. Manual reporting was consuming analyst time and limiting vendor relationships.',
      approach: [
        'Designed secure external-facing analytics platform with row-level security',
        'Built automated data pipelines delivering daily vendor-specific metrics',
        'Created self-service dashboards for inventory, sales, and customer insights',
        'Scaled from vet services pilot to 3 business units',
        'Implemented feedback loops to continuously improve vendor experience'
      ],
      outcome: 'Platform used by 200+ vendors generating $10M+ in annual revenue through improved vendor relationships and data-driven negotiations. Reduced analyst time on vendor reporting by 80%.',
      keyInsight: 'External analytics platforms are products, not projects. Treating vendors as customers—with onboarding, support, and continuous improvement—drove adoption and revenue.',
      technologies: ['Tableau Server', 'Snowflake', 'dbt', 'Airflow', 'Row-Level Security']
    },
    'data-culture': {
      title: 'Data Culture Conferences',
      company: 'Chewy',
      challenge: 'Analytics adoption was limited by data literacy. Business users wanted to be self-sufficient but lacked training. Traditional training programs weren\'t scaling with the organization.',
      approach: [
        'Launched "Data Summit" - annual company-wide data conference with 50+ sessions',
        'Created "Data Basecamp" - quarterly hands-on training workshops',
        'Built library of 200+ recorded sessions for on-demand learning',
        'Established certification programs for Tableau and SQL proficiency',
        'Recruited internal speakers to share domain-specific use cases'
      ],
      outcome: '1,200+ employees trained across all business functions. Self-service adoption increased 60%, reducing ad-hoc analyst requests. Program became model for other internal learning initiatives.',
      keyInsight: 'Data culture isn\'t built through mandates—it\'s built through community. Internal conferences created peer learning and celebrated data wins across the organization.',
      technologies: ['Tableau', 'SQL', 'Zoom', 'Confluence', 'Internal LMS']
    },
    'metric-trees': {
      title: 'Metric Trees Framework',
      company: 'Babylist',
      challenge: 'Business units had competing definitions of success metrics. OKRs weren\'t connected to operational metrics, making it hard to prioritize analytics work or measure true business impact.',
      approach: [
        'Mapped company objectives to metric hierarchies showing causal relationships',
        'Defined single source of truth for each metric with clear ownership',
        'Connected OKRs to operational metrics through explicit driver relationships',
        'Created prioritization framework for analytics requests based on metric impact',
        'Built executive dashboards showing metric tree health'
      ],
      outcome: 'Company-wide alignment on key metrics. Analytics team could prioritize work based on objective business impact. Reduced metric definition debates by 80%.',
      keyInsight: 'Metric trees force clarity. When you have to draw the causal chain from an operational metric to a company objective, fuzzy thinking becomes visible immediately.',
      technologies: ['Snowflake', 'dbt', 'Hex', 'Notion', 'Figjam']
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
      <div className="bg-[#4a4a4a] w-full max-w-[650px] max-h-[90vh] overflow-y-auto rounded-[16px] shadow-[2px_-4px_30px_0px_rgba(0,0,0,0.5)] flex flex-col relative custom-scrollbar" ref={scrollContainerRef}>
        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-[#87b7ff] origin-left z-[110]"
          style={{ scaleX, position: 'absolute' }}
        />

        {/* Header */}
        <div className="sticky top-0 bg-[#4a4a4a] z-10 px-6 md:px-10 pt-6 md:pt-10 pb-4 border-b border-white/5">
          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="font-['Montserrat',sans-serif] font-medium text-[14px] text-[#87b7ff] mb-2 uppercase tracking-wide">
                {data.company}
              </p>
              <h2 className="font-['Montserrat',sans-serif] font-medium text-[24px] md:text-[31px] text-white leading-tight">
                {data.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="flex items-center gap-2 group cursor-pointer shrink-0"
            >
              <span className="font-['Montserrat',sans-serif] font-medium text-[18px] text-white group-hover:text-[#87b7ff] transition-colors">
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
              <h3 className="font-['Montserrat',sans-serif] font-medium text-[18px] text-white mb-3">
                The Challenge
              </h3>
              <p className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#d9d9d9] leading-relaxed">
                {data.challenge}
              </p>
            </div>

            {/* Approach */}
            <div>
              <h3 className="font-['Montserrat',sans-serif] font-medium text-[18px] text-white mb-3">
                The Approach
              </h3>
              <ul className="flex flex-col gap-2">
                {data.approach.map((item, idx) => (
                  <li key={idx} className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#d9d9d9] leading-relaxed flex gap-2">
                    <span className="text-[#87b7ff]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Outcome */}
            <div>
              <h3 className="font-['Montserrat',sans-serif] font-medium text-[18px] text-white mb-3">
                The Outcome
              </h3>
              <p className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#d9d9d9] leading-relaxed">
                {data.outcome}
              </p>
            </div>

            {/* Key Insight */}
            <div className="bg-[#3a3a3a] rounded-lg p-6 border-l-4 border-[#87b7ff]">
              <h3 className="font-['Montserrat',sans-serif] font-medium text-[16px] text-[#87b7ff] mb-2">
                Key Insight
              </h3>
              <p className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#d9d9d9] leading-relaxed italic">
                {data.keyInsight}
              </p>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="font-['Montserrat',sans-serif] font-medium text-[18px] text-white mb-3">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.technologies.map((tech, idx) => (
                  <span key={idx} className="bg-[#87b7ff] text-[#1a1a1a] px-3 py-1 rounded-full text-[14px] font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="mt-10 flex flex-col md:flex-row gap-4 pt-8 border-t border-white/10">
            <button
              onClick={onClose}
              className="flex-1 h-[44px] border border-white/30 rounded-[50px] flex items-center justify-center font-['Montserrat',sans-serif] font-medium text-white text-[16px] hover:bg-white/5 transition-colors"
            >
              Close
            </button>
            {onNextProject && (
              <button
                onClick={onNextProject}
                className="flex-1 h-[44px] border border-[#87b7ff] rounded-[50px] flex items-center justify-center font-['Montserrat',sans-serif] font-medium text-[#87b7ff] text-[16px] hover:bg-[#87b7ff]/10 transition-colors"
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
