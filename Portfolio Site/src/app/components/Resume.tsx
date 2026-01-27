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
        'Led data platform strategy for registry and e-commerce platform',
        'Modernized Snowflake architecture achieving 30% cost reduction and 50% query performance improvement',
        'Implemented metric trees as core measurement framework',
        'Established PHI governance for health data partnerships'
      ]
    },
    {
      period: '2022 - 2023',
      role: 'Director of Software Engineering — Analytic Platforms',
      company: 'Chewy',
      highlights: [
        'Owned platform engineering for Fortune 500 analytics infrastructure',
        'Led enterprise data instrumentation audit influencing C-suite mobile architecture consolidation',
        'Architected real-time event pipeline replacing Segment, saving $35K annually'
      ]
    },
    {
      period: '2020 - 2022',
      role: 'Director, Business Intelligence',
      company: 'Chewy',
      highlights: [
        'Scaled team from 14 to 30 people across distributed locations',
        'Established enterprise data governance program supporting SOX compliance',
        'Scaled Tableau from 100 to 3,500+ users',
        'Reduced PII exposure by 97% across all data systems'
      ]
    },
    {
      period: '2017 - 2020',
      role: 'Associate Director, Business Intelligence',
      company: 'Chewy',
      highlights: [
        'First BI hire. Built analytics function from 0 to 14 people supporting IPO readiness',
        'Architected lakehouse data platform on AWS',
        'Launched data governance program and hub-and-spoke analytics model',
        'Founded company data conference'
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
        <div className="bg-[#4a4a4a] rounded-t-[16px] p-8 md:p-12 text-center">
          <h1 className="font-['Montserrat',sans-serif] font-medium text-[32px] md:text-[40px] text-white mb-2">
            Michael Gerstl
          </h1>
          <p className="font-['Montserrat',sans-serif] font-light text-[18px] text-[#87b7ff] mb-4">
            Data Leader & AI Evangelist
          </p>
          <p className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#d9d9d9]">
            South Florida
          </p>
        </div>

        {/* Experience Section */}
        <div className="bg-[#3a3a3a] rounded-b-[16px] p-8 md:p-12">
          <h2 className="font-['Montserrat',sans-serif] font-medium text-[24px] text-white mb-8 border-b border-white/10 pb-4">
            Experience
          </h2>

          <div className="flex flex-col gap-8">
            {experience.map((job, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-4 md:gap-8">
                <div className="md:w-[140px] shrink-0">
                  <p className="font-['Montserrat',sans-serif] font-medium text-[14px] text-[#87b7ff]">
                    {job.period}
                  </p>
                </div>
                <div className="flex-1">
                  <h3 className="font-['Montserrat',sans-serif] font-medium text-[18px] text-white mb-1">
                    {job.role}
                  </h3>
                  <p className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#87b7ff] mb-4">
                    {job.company}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {job.highlights.map((highlight, hidx) => (
                      <li key={hidx} className="font-['Montserrat',sans-serif] font-light text-[14px] text-[#d9d9d9] flex gap-2">
                        <span className="text-[#87b7ff]">•</span>
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
          className="px-8 py-3 border border-white rounded-[50px] font-['Montserrat',sans-serif] font-medium text-[#87b7ff] text-[16px] hover:bg-white/5 transition-colors inline-block"
        >
          View Full Profile on LinkedIn
        </a>
      </div>
    </div>
  );
}
