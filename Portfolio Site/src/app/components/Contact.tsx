import React from 'react';
import { motion } from 'motion/react';

export function Contact() {
  const Motion = motion;

  return (
    <div className="flex flex-col items-center pt-[112px] md:pt-[132px] pb-20 px-4">
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#4a4a4a] rounded-[16px] shadow-[2px_4px_11px_0px_rgba(0,0,0,0.25)] p-8 md:p-12 max-w-[800px] w-full"
      >
        <h2 className="font-['Montserrat',sans-serif] font-medium text-[23px] text-white mb-6 leading-tight">
          Let's Connect
        </h2>
        <p className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#d9d9d9] mb-12 leading-relaxed">
          I'm selective about what's next—looking for VP/Director roles where I can build and scale data organizations at companies with strong product-market fit. Healthcare tech, AI-driven products, and high-growth consumer platforms are particularly interesting.
        </p>

        <div className="flex flex-col gap-4 items-center">
          <a
            href="https://linkedin.com/in/michael-gerstl"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-[257px] h-[44px] border border-white rounded-[50px] flex items-center justify-center font-['Montserrat',sans-serif] font-medium text-[#87b7ff] text-[16px] hover:bg-white/5 transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </Motion.div>
    </div>
  );
}
