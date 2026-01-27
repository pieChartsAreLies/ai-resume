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
      title: 'Design Strategy',
      intro: 'Listed below are a couple of tools that I use as part of a design and product delivery strategy. The underlying principle is that the most effective product teams seek to solve problems for their customers and clients and don’t use feature delivery as the driving force for roadmapping nor a metric of success.',
      sections: [
        {
          heading: '3-in-a-box',
          text: 'This is a principle simple in concept, but sometimes difficult in practice. The three disciplines of product, design, and engineering should be involved in each stage of the product development lifecycle...from ideation to delivery.\n\nThis shortens time to market by limiting the disconnects that often happen in handoffs, and minimizing surprises that can happen then one discipline isn’t full informed by the others.'
        },
        {
          heading: 'POMA',
          text: 'POMA is a basic framework used to define a problem space and set the scope of the solution.',
          list: [
            { label: 'Problem', detail: 'Define the problem to be solved for the client or end user.' },
            { label: 'Outcome', detail: 'What is practical benefit it we solve the defined problem?' },
            { label: 'Measurement', detail: 'Set a predefined measurement that can be used to define success once the solution is delivered.' },
            { label: 'Alignment', detail: 'What is the business goal or objective that this solution helps achieve?' }
          ]
        }
      ]
    },
    leadership: {
      title: 'Team Leadership',
      intro: 'My management style is really quite simple.\n\nI strive to treat people like professionals and as fellow humans, with all of the complexity and nuance needed to dealing with other.\n\nWhen we’ve done our jobs well, we have hired the best people for the job and as such they need to be given the respect and autonomy to do their work with authority and independence.\n\nI seek to respect my team members for their work, their ambitions, and their humanity. By taking the time to understand another person, their needs, desires, and goals, it is possible to guide them on the path to personal and collective success.'
    },
    solutioning: {
      title: 'Solutioning',
      intro: 'I’ve been working in technology, software development, and product design for the past 15 years. In that time I’ve been fortunate to see how organizations fail and how they succeed.\n\nWhen product and engineering teams are enabled to do their best work, to use their massive skill sets to solve the clients biggest and most challenging problems, you end up with a winning product.\n\nHaving a world class product that solves real-world problems is the foundation for enabling success at all levels of the organization from sales to support to marketing.'
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
