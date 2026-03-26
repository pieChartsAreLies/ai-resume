import React from 'react';
import { motion } from 'motion/react';

export function Resume() {
  const Motion = motion;

  const experience = [
    {
      period: '2024 - 2025',
      role: 'Director of Business Intelligence and Data Engineering',
      company: 'Babylist',
      highlights: [
        'Owned BI and data engineering for registry and e-commerce platform serving millions of families',
        'Modernized Snowflake architecture: 30% cost reduction (~$145K annual savings) and 50% P95 query performance improvement',
        'Reimagined self-service analytics roadmap, reducing ad-hoc data requests and team dependency by redesigning how business users interact with data tools',
        'Revamped work intake, on-call triage, and data project shaping processes for the data and analytics engineering team',
        'Implemented metric trees as core measurement framework tying product KPIs to business outcomes',
        'Established PHI governance framework for health data partnerships, documenting data ownership across the organization',
        'Championed AI adoption company-wide with hands-on workshops demonstrating practical applications for day-to-day work'
      ]
    },
    {
      period: '2022 - 2023',
      role: 'Director of Software Engineering — Analytic Platforms',
      company: 'Chewy',
      highlights: [
        'Led 7 teams spanning software engineering, data governance, analytics, GRC, and pricing within IT',
        'Conducted company-wide analytics audit: 80+ interviews across 40 teams, mapping a 124-step instrumentation process that influenced C-suite mobile architecture consolidation',
        'Onboarded 5 applications from POC through full rollout impacting thousands of users across analytics, governance, and compliance',
        'Led PCI compliance audit as a cross-functional governance initiative',
        'Architected real-time event pipeline replacing Segment, saving $35K annually',
        'Named to HotTopics Global CDO/Data Leaders Top 100'
      ]
    },
    {
      period: '2020 - 2022',
      role: 'Director, Business Intelligence',
      company: 'Chewy',
      highlights: [
        'Scaled organization from 14 to 30 people across BI, Data Governance, Splunk, and GRC teams',
        'Grew Tableau platform from 100 to 3,500+ users (35x) while maintaining performance and SOX compliance',
        'Reduced PII exposure by 97% across all system logs through cross-functional initiative influencing 30+ engineering teams',
        'Rolled out Alation data catalog and built SOX-compliant path-to-production process with automated migration testing',
        'Implemented OneTrust for CCPA compliance at launch and GDPR readiness for international expansion',
        'Built Data Summit (75+ sessions) and Data Basecamp programs, training 1,200+ employees over multiple years'
      ]
    },
    {
      period: '2017 - 2020',
      role: 'Associate Director, Business Intelligence',
      company: 'Chewy',
      highlights: [
        'First BI hire. Built analytics function from zero to 14 people supporting IPO readiness across the full data lifecycle',
        'Architected self-service analytics platform on AWS (Vertica to Snowflake), reducing analytics warehouse load from 70% to 30%',
        'Created vendor data services platform generating $10M+ annual revenue from operational data',
        'Founded Data Summit conference and Data Basecamp training program that became recurring company traditions',
        'Established hub-and-spoke analytics model enabling business units to self-serve while maintaining governance standards',
        'Delivered zero SOX audit findings through IPO and beyond with team growing from 3 to 5 FTE (7x efficiency improvement)'
      ]
    }
  ];

  return (
    <div className="flex flex-col items-center pt-[112px] md:pt-[132px] pb-20 px-4">
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[800px] w-full"
      >
        {/* Resume Header */}
        <div className="bg-[#4A4440] rounded-t-[16px] p-8 md:p-12 text-center">
          <h1 className="font-['Montserrat',sans-serif] font-medium text-[32px] md:text-[40px] text-[#FAF7F2] mb-2">
            Michael Gerstl
          </h1>
          <p className="font-['Montserrat',sans-serif] font-light text-[18px] text-[#D4A853] mb-4">
            Data Leader & AI Evangelist
          </p>
          <p className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#D4CFC8]">
            South Florida
          </p>
        </div>

        {/* Experience Section */}
        <div className="bg-[#332F2B] rounded-b-[16px] p-8 md:p-12">
          <h2 className="font-['Montserrat',sans-serif] font-medium text-[24px] text-[#FAF7F2] mb-8 border-b border-[#FAF7F2]/10 pb-4">
            Experience
          </h2>

          <div className="flex flex-col gap-8">
            {experience.map((job, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-4 md:gap-8">
                <div className="md:w-[140px] shrink-0">
                  <p className="font-['Montserrat',sans-serif] font-medium text-[14px] text-[#D4A853]">
                    {job.period}
                  </p>
                </div>
                <div className="flex-1">
                  <h3 className="font-['Montserrat',sans-serif] font-medium text-[18px] text-[#FAF7F2] mb-1">
                    {job.role}
                  </h3>
                  <p className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#D4A853] mb-4">
                    {job.company}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {job.highlights.map((highlight, hidx) => (
                      <li key={hidx} className="font-['Montserrat',sans-serif] font-light text-[14px] text-[#D4CFC8] flex gap-2">
                        <span className="text-[#D4A853]">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Motion.div>

      <div className="mt-8">
        <a
          href="https://linkedin.com/in/michael-gerstl"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 border border-[#FAF7F2] rounded-[50px] font-['Montserrat',sans-serif] font-medium text-[#D4A853] text-[16px] hover:bg-[#FAF7F2]/5 transition-colors inline-block"
        >
          View Full Profile on LinkedIn
        </a>
      </div>
    </div>
  );
}
