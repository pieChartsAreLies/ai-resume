import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import svgPaths from '@/imports/svg-dre28hzu2m';
import { WhatIDoPanel } from '@/app/components/WhatIDoPanel';
import { downloadResumeAsPdf } from '@/app/utils/downloadResume';

interface HomeProps {
  onNavigateToWork: () => void;
  onNavigateToResume: () => void;
}

export function Home({ onNavigateToWork, onNavigateToResume }: HomeProps) {
  const [activePanel, setActivePanel] = useState<'strategy' | 'leadership' | 'solutioning' | null>(null);

  return (
    <div className="flex flex-col items-center pt-[112px] md:pt-[132px] pb-20 px-4 gap-8">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#4a4a4a] rounded-[16px] shadow-[2px_4px_11px_0px_rgba(0,0,0,0.25)] p-8 md:p-12 max-w-[800px] w-full"
      >
        <h2 className="font-['Montserrat',sans-serif] font-medium text-[28px] md:text-[31px] text-white mb-6 leading-tight">
          Creating Design Clarity from Chaos and Complexity.
        </h2>
        <p className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#d9d9d9] mb-10 leading-relaxed">
          UX Leader with a track record of guiding and growing teams, simplifying systems, and creating useful and profitable designs for enterprise and industrial clients.
        </p>
        
        <div className="flex flex-col md:flex-row gap-6">
          <button 
            onClick={downloadResumeAsPdf}
            className="flex-1 h-[44px] border border-white rounded-[50px] flex items-center justify-center font-['Montserrat',sans-serif] font-medium text-[#87b7ff] text-[16px] hover:bg-white/5 transition-colors cursor-pointer"
          >
            Download Resume (pdf)
          </button>
          <button 
            onClick={onNavigateToWork}
            className="flex-1 h-[44px] border border-white rounded-[50px] flex items-center justify-center font-['Montserrat',sans-serif] font-medium text-[#87b7ff] text-[16px] hover:bg-white/5 transition-colors cursor-pointer"
          >
            View Work
          </button>
        </div>
      </motion.div>

      {/* What I Do Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#4a4a4a] rounded-[16px] shadow-[2px_4px_11px_0px_rgba(0,0,0,0.25)] p-8 md:p-12 max-w-[800px] w-full"
      >
        <h2 className="font-['Montserrat',sans-serif] font-medium text-[28px] md:text-[31px] text-white mb-4">
          What I Do...
        </h2>
        <p className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#d9d9d9] mb-12 leading-relaxed">
          I help SaaS and industrial tech teams create better products by aligning UX strategy with the real-world complexity of user and business needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-stretch">
          {/* Design Strategy */}
          <div className="flex flex-col items-center text-center">
            <h3 className="font-['Montserrat',sans-serif] font-medium text-[18px] text-white mb-6">Design Strategy</h3>
            <div className="bg-[#4a4a4a] rounded-[8px] shadow-[2px_2px_10px_3px_rgba(0,0,0,0.25),-2px_-2px_10px_3px_rgba(204,204,204,0.25)] w-[42px] h-[42px] flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                <path d={svgPaths.p6338880} fill="white" />
              </svg>
            </div>
            <p className="font-['Montserrat',sans-serif] font-light text-[14px] text-[#d9d9d9] mb-6 flex-grow">
              3-in-a-box, POMA, and close collaboration deliver results
            </p>
            <button 
              onClick={() => setActivePanel('strategy')}
              className="w-full h-[33px] border border-white rounded-[50px] font-['Montserrat',sans-serif] font-medium text-[#87b7ff] text-[14px] hover:bg-white/5 transition-colors cursor-pointer mt-auto"
            >
              View More
            </button>
          </div>

          {/* Team Leadership */}
          <div className="flex flex-col items-center text-center">
            <h3 className="font-['Montserrat',sans-serif] font-medium text-[18px] text-white mb-6">Team Leadership</h3>
            <div className="bg-[#4a4a4a] rounded-[8px] shadow-[2px_2px_10px_3px_rgba(0,0,0,0.25),-2px_-2px_10px_3px_rgba(204,204,204,0.25)] w-[42px] h-[42px] flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                <path d={svgPaths.p38ec8380} fill="white" />
              </svg>
            </div>
            <p className="font-['Montserrat',sans-serif] font-light text-[14px] text-[#d9d9d9] mb-6 flex-grow">
              Enablement, coaching, development, and purpose drive motivation
            </p>
            <button 
              onClick={() => setActivePanel('leadership')}
              className="w-full h-[33px] border border-white rounded-[50px] font-['Montserrat',sans-serif] font-medium text-[#87b7ff] text-[14px] hover:bg-white/5 transition-colors cursor-pointer mt-auto"
            >
              View More
            </button>
          </div>

          {/* Solutioning */}
          <div className="flex flex-col items-center text-center">
            <h3 className="font-['Montserrat',sans-serif] font-medium text-[18px] text-white mb-6">Solutioning</h3>
            <div className="bg-[#4a4a4a] rounded-[8px] shadow-[2px_2px_10px_3px_rgba(0,0,0,0.25),-2px_-2px_10px_3px_rgba(204,204,204,0.25)] w-[42px] h-[42px] flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                <path d={svgPaths.p2f78fd00} fill="white" />
                <path d={svgPaths.p21dbc80} fill="white" />
              </svg>
            </div>
            <p className="font-['Montserrat',sans-serif] font-light text-[14px] text-[#d9d9d9] mb-6 flex-grow">
              Enablement, coaching, development, and purpose drive motivation
            </p>
            <button 
              onClick={() => setActivePanel('solutioning')}
              className="w-full h-[33px] border border-white rounded-[50px] font-['Montserrat',sans-serif] font-medium text-[#87b7ff] text-[14px] hover:bg-white/5 transition-colors cursor-pointer mt-auto"
            >
              View More
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {activePanel && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePanel(null)}
              className="fixed inset-0 bg-black/60 z-[90] backdrop-blur-sm"
            />
            <WhatIDoPanel 
              type={activePanel} 
              onClose={() => setActivePanel(null)} 
              onNavigateToWork={() => {
                setActivePanel(null);
                onNavigateToWork();
              }}
              onNavigateToResume={() => {
                setActivePanel(null);
                onNavigateToResume();
              }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
