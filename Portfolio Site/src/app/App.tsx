import React, { useState } from 'react';
import { Header } from '@/app/components/Header';
import { Home } from '@/app/components/Home';
import { Work } from '@/app/components/Work';
import { Resume } from '@/app/components/Resume';
import { Contact } from '@/app/components/Contact';
import { ChatPanel } from '@/app/components/ChatPanel';
import { useActiveSection } from '@/app/hooks/useActiveSection';

const SECTION_IDS = ['home', 'work', 'resume', 'contact'];

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const activeSection = useActiveSection({
    sectionIds: SECTION_IDS,
    offset: 120
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#3D3632] text-[#FAF7F2] selection:bg-[#D4A853] selection:text-[#2A2622] overflow-x-hidden">
      <Header activeSection={activeSection} onSectionClick={scrollToSection} />

      <main className="flex flex-col">
        <section id="home" className="scroll-mt-[80px] md:scroll-mt-[110px]">
          <Home onScrollToWork={() => scrollToSection('work')} onScrollToResume={() => scrollToSection('resume')} onOpenChat={() => setIsChatOpen(true)} />
        </section>

        <section id="work" className="scroll-mt-[80px] md:scroll-mt-[110px]">
          <Work />
        </section>

        <section id="resume" className="scroll-mt-[80px] md:scroll-mt-[110px]">
          <Resume />
        </section>

        <section id="contact" className="scroll-mt-[80px] md:scroll-mt-[110px]">
          <Contact />
        </section>
      </main>

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#D4A853,transparent_70%)]" />
      </div>

      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-gradient-to-b from-[#C4785C] to-[#8B5A3C] text-white py-6 px-4 rounded-l-lg shadow-lg z-50 hover:px-5 transition-all duration-200 font-['Montserrat',sans-serif] font-bold text-[14px] tracking-widest"
        style={{ writingMode: 'vertical-rl' }}
      >
        ASK MY AI
      </button>

      {/* Chat Panel */}
      <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
