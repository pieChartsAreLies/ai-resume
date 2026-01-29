import React from 'react';
import { motion } from 'motion/react';
import portraitImage from '@/assets/portrait.png';

export function Contact() {
  const Motion = motion;

  return (
    <div className="flex flex-col items-center pt-[112px] md:pt-[132px] pb-20 px-4">
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#4A4440] rounded-[16px] shadow-[2px_4px_11px_0px_rgba(0,0,0,0.25)] p-8 md:p-12 max-w-[800px] w-full"
      >
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
          {/* Portrait */}
          <Motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="flex-shrink-0"
          >
            <img
              src={portraitImage}
              alt="Michael Gerstl"
              className="w-[180px] h-[180px] md:w-[200px] md:h-[200px] rounded-full object-cover object-top shadow-[2px_4px_15px_0px_rgba(0,0,0,0.3)]"
            />
          </Motion.div>

          {/* Content */}
          <div className="flex flex-col text-center md:text-left">
            <h2 className="font-['Montserrat',sans-serif] font-medium text-[23px] text-[#FAF7F2] mb-6 leading-tight">
              Let's Connect
            </h2>
            <p className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#D4CFC8] mb-8 leading-relaxed">
              I'm selective about what's next—looking for VP/Director roles where I can build and scale data organizations at companies with strong product-market fit. Healthcare tech, AI-driven products, and high-growth consumer platforms are particularly interesting.
            </p>

            <div className="flex flex-col gap-4 items-center md:items-start">
              <a
                href="https://linkedin.com/in/michael-gerstl"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-[257px] h-[44px] border border-[#FAF7F2] rounded-[50px] flex items-center justify-center font-['Montserrat',sans-serif] font-medium text-[#D4A853] text-[16px] hover:bg-[#FAF7F2]/5 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </Motion.div>
    </div>
  );
}
