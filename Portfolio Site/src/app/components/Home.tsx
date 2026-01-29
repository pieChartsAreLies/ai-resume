import React from 'react';
import { motion } from 'motion/react';

interface HomeProps {
  onScrollToWork: () => void;
  onScrollToResume: () => void;
  onOpenChat: () => void;
}

export function Home({ onScrollToWork, onScrollToResume, onOpenChat }: HomeProps) {
  return (
    <div className="flex flex-col items-center pt-[112px] md:pt-[132px] pb-8 px-4">
      {/* Combined Hero + Who I Am Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#4A4440] rounded-[16px] shadow-[2px_4px_11px_0px_rgba(0,0,0,0.25)] p-8 md:p-12 max-w-[800px] w-full"
      >
        <h2 className="font-['Montserrat',sans-serif] font-medium text-[28px] md:text-[36px] text-[#FAF7F2] mb-2">
          Who I Am
        </h2>
        <p className="font-['Montserrat',sans-serif] font-medium text-[18px] text-[#D4A853] mb-6">
          Father. Husband. Data Nerd. AI Enthusiast. Leader.
        </p>
        <div className="flex flex-col gap-5 mb-8">
          <p className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#D4CFC8] leading-relaxed">
            When at work, I'm a data team leader who's learned that strong teams don't happen by accident. They're built deliberately by investing in people, removing friction, and creating the conditions for good work to happen. A lot of my career has been spent helping organizations make sense of their data in ways that are sustainable, not heroic.
          </p>

          <p className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#D4CFC8] leading-relaxed">
            Outside of work, I'm a dad to a 12-year-old and a 7-year-old, which puts everything else in perspective. I run, tinker, read constantly, and on weekends I'm usually slow-smoking something on my Big Green Egg.
          </p>

          <p className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#D4CFC8] leading-relaxed">
            My homelab is a personal space to build things that are actually useful, mostly for my family, sometimes just to satisfy curiosity. It's also how I stay close to the rapidly changing AI and infrastructure landscape. The projects you'll see here reflect how I tend to work: practical systems, built with care, that help people and teams operate a little more smoothly.
          </p>
        </div>

        {/* AI Chat Button - Primary CTA */}
        <button
          onClick={onOpenChat}
          className="w-full h-[52px] bg-gradient-to-r from-[#C4785C] to-[#8B5A3C] rounded-[50px] flex items-center justify-center gap-3 font-['Montserrat',sans-serif] font-medium text-[#FAF7F2] text-[16px] hover:opacity-90 transition-opacity cursor-pointer mb-6 shadow-lg"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          Ask My AI About Me
        </button>

        {/* Divider */}
        <div className="w-full h-px bg-[#FAF7F2]/10 mb-6" />

        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={onScrollToResume}
            className="flex-1 h-[44px] border border-[#FAF7F2]/40 rounded-[50px] flex items-center justify-center font-['Montserrat',sans-serif] font-medium text-[#D4A853] text-[15px] hover:bg-[#FAF7F2]/5 hover:border-[#FAF7F2]/60 transition-all cursor-pointer"
          >
            View Resume
          </button>
          <button
            onClick={onScrollToWork}
            className="flex-1 h-[44px] border border-[#FAF7F2]/40 rounded-[50px] flex items-center justify-center font-['Montserrat',sans-serif] font-medium text-[#D4A853] text-[15px] hover:bg-[#FAF7F2]/5 hover:border-[#FAF7F2]/60 transition-all cursor-pointer"
          >
            View Work
          </button>
        </div>
      </motion.div>
    </div>
  );
}
