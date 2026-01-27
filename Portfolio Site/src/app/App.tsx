import React, { useState } from 'react';
import { Header } from '@/app/components/Header';
import { Home } from '@/app/components/Home';
import { Work } from '@/app/components/Work';
import { Resume } from '@/app/components/Resume';
import { Contact } from '@/app/components/Contact';
import { ChatPanel } from '@/app/components/ChatPanel';
import { motion, AnimatePresence } from 'motion/react';

type Page = 'home' | 'work' | 'resume' | 'contact';

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const Motion = motion;

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home onNavigateToWork={() => setActivePage('work')} onNavigateToResume={() => setActivePage('resume')} />;
      case 'work':
        return <Work />;
      case 'resume':
        return <Resume />;
      case 'contact':
        return <Contact />;
      default:
        return <Home onNavigateToWork={() => setActivePage('work')} onNavigateToResume={() => setActivePage('resume')} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#404040] text-white selection:bg-[#87b7ff] selection:text-white overflow-x-hidden">
      <Header activePage={activePage} onPageChange={setActivePage} />

      <main className="relative">
        <AnimatePresence mode="wait">
          <Motion.div
            key={activePage}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {renderPage()}
          </Motion.div>
        </AnimatePresence>
      </main>

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#87b7ff,transparent_70%)]" />
      </div>

      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-gradient-to-b from-[#667eea] to-[#764ba2] text-white py-6 px-4 rounded-l-lg shadow-lg z-50 hover:px-5 transition-all duration-200 font-['Montserrat',sans-serif] font-bold text-[14px] tracking-widest"
        style={{ writingMode: 'vertical-rl' }}
      >
        ASK MY AI
      </button>

      {/* Chat Panel */}
      <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
