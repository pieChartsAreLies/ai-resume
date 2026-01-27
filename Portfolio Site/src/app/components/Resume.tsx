import React from 'react';
import { motion } from 'motion/react';
import { downloadResumeAsPdf } from '@/app/utils/downloadResume';
import imgSgResume20261 from "figma:asset/2e23e526f99f02e650d476e1bae403557646f141.png";

export function Resume() {
  const Motion = motion;

  return (
    <div className="flex flex-col items-center pt-[112px] md:pt-[132px] pb-20 px-4">
      <Motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-[800px] w-full bg-white shadow-2xl rounded-sm overflow-hidden"
      >
        <img 
          src={imgSgResume20261} 
          alt="Scott Gerstl Resume" 
          className="w-full h-auto block"
        />
      </Motion.div>
      <div className="mt-8">
        <button 
          onClick={downloadResumeAsPdf}
          className="px-8 py-3 border border-white rounded-[50px] font-['Montserrat',sans-serif] font-medium text-[#87b7ff] text-[16px] hover:bg-white/5 transition-colors cursor-pointer"
        >
          Download PDF Version
        </button>
      </div>
    </div>
  );
}
