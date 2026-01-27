import React from 'react';
import { motion } from 'motion/react';
import svgPaths from '@/imports/svg-bvjz83mqjr';
import { downloadResumeAsPdf } from '@/app/utils/downloadResume';

interface WhatIDoPanelProps {
  type: 'strategy' | 'leadership' | 'solutioning';
  onClose: () => void;
  onNavigateToWork: () => void;
  onNavigateToResume: () => void;
}

export function WhatIDoPanel({ type, onClose, onNavigateToWork, onNavigateToResume }: WhatIDoPanelProps) {
  const content = {
    strategy: {
      title: 'Data Platforms',
      intro: 'I architect and scale data platforms that organizations can trust. The goal is always the same: make data accessible, reliable, and fast enough that teams stop asking "is this right?" and start asking "what should we do?"',
      sections: [
        {
          heading: 'Modern Data Stack',
          text: 'I build on proven patterns: lakehouse architectures on AWS/Snowflake, transformation layers with dbt, orchestration through Airflow, and visualization through Tableau or modern BI tools.\n\nThe stack matters less than the principles: single source of truth, version-controlled transformations, and clear data contracts between producers and consumers.'
        },
        {
          heading: 'Platform Philosophy',
          text: 'Data platforms should be treated as products, not projects.',
          list: [
            { label: 'Self-Service', detail: 'Enable business users to answer their own questions without waiting for analysts.' },
            { label: 'Trust', detail: 'Governance and quality frameworks that give confidence in every metric.' },
            { label: 'Scale', detail: 'Architecture that handles 10x growth without redesign.' },
            { label: 'Speed', detail: 'From question to answer in minutes, not days.' }
          ]
        }
      ]
    },
    leadership: {
      title: 'Team Leadership',
      intro: 'I practice servant leadership—the job of a leader is to remove obstacles and create the conditions for talented people to do their best work.\n\nI\'ve scaled teams from 0 to 30+ across distributed locations, through IPO, and into Fortune 500 operations. The approach is consistent: hire for potential, invest in growth, and build a culture where people want to stay.\n\nThe hub-and-spoke model I developed at Chewy embedded analysts in business units while maintaining central standards and community. This gave us both business context and technical excellence.',
      sections: [
        {
          heading: 'Leadership Principles',
          text: '',
          list: [
            { label: 'Go Slow to Go Fast', detail: 'Building scalable processes upfront enables rapid growth later.' },
            { label: 'Trust Through Transparency', detail: 'When teams understand the "why," they make better autonomous decisions.' },
            { label: 'Data Culture', detail: 'Training, office hours, and conferences that build organization-wide data literacy.' }
          ]
        }
      ]
    },
    solutioning: {
      title: 'Governance & Compliance',
      intro: 'Governance isn\'t about saying no—it\'s about building trust. When stakeholders know the data is accurate, compliant, and secure, they use it more confidently.\n\nI\'ve led data governance through SOX compliance, CCPA requirements, and IPO readiness. The pattern is consistent: clear ownership, automated enforcement where possible, and education everywhere else.',
      sections: [
        {
          heading: 'Key Initiatives',
          text: '',
          list: [
            { label: 'PII Reduction', detail: 'Led cross-functional initiative reducing PII in logs by 97% across 30+ engineering teams.' },
            { label: 'SOX Compliance', detail: 'Built path-to-production processes that satisfied auditors without killing developer velocity.' },
            { label: 'Data Quality', detail: 'Certification frameworks and automated testing that catch issues before they reach dashboards.' }
          ]
        }
      ]
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
      <div className="bg-[#4a4a4a] w-full max-w-[650px] max-h-[90vh] overflow-y-auto rounded-[16px] shadow-[2px_-4px_30px_0px_rgba(0,0,0,0.5)] flex flex-col p-6 md:p-10 relative custom-scrollbar">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-['Montserrat',sans-serif] font-medium text-[31px] text-white">
            {data.title}
          </h2>
          <button 
            onClick={onClose}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path d={svgPaths.p3f70cf00} fill="white" />
              </svg>
            </div>
            <span className="font-['Montserrat',sans-serif] font-medium text-[18px] text-white group-hover:text-[#87b7ff] transition-colors">
              Back
            </span>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6 mb-10">
          <p className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#d9d9d9] whitespace-pre-wrap leading-relaxed">
            {data.intro}
          </p>

          {'sections' in data && data.sections.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <h3 className="font-['Montserrat',sans-serif] font-medium text-[18px] text-white">
                {section.heading}
              </h3>
              <p className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#d9d9d9] whitespace-pre-wrap leading-relaxed">
                {section.text}
              </p>
              {section.list && (
                <div className="flex flex-col gap-3 mt-2">
                  {section.list.map((item, i) => (
                    <p key={i} className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#d9d9d9] leading-relaxed">
                      <span className="font-medium text-white">{item.label}</span> - {item.detail}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Buttons */}
        <div className="mt-auto flex flex-col md:flex-row gap-4 pt-4 border-t border-white/10">
          <button 
            onClick={downloadResumeAsPdf}
            className="flex-1 h-[44px] border border-solid border-white rounded-[50px] flex items-center justify-center font-['Montserrat',sans-serif] font-medium text-[#87b7ff] text-[16px] hover:bg-white/5 transition-colors cursor-pointer"
          >
            Download Resume (pdf)
          </button>
          <button 
            onClick={onNavigateToWork}
            className="flex-1 h-[44px] border border-solid border-white rounded-[50px] flex items-center justify-center font-['Montserrat',sans-serif] font-medium text-[#87b7ff] text-[16px] hover:bg-white/5 transition-colors cursor-pointer"
          >
            View Work
          </button>
        </div>
      </div>
    </motion.div>
  );
}
