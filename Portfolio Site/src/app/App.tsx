import React, { useState } from 'react';
import { Header } from '@/app/components/Header';
import { Home } from '@/app/components/Home';
import { Work } from '@/app/components/Work';
import { Resume } from '@/app/components/Resume';
import { Contact } from '@/app/components/Contact';
import { PasswordProtect } from '@/app/components/PasswordProtect';
import { motion, AnimatePresence } from 'motion/react';

type Page = 'home' | 'work' | 'resume' | 'contact';

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const Motion = motion;

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home onNavigateToWork={() => setActivePage('work')} onNavigateToResume={() => setActivePage('resume')} />;
      case 'work':
        return isAuthenticated ? <Work /> : <PasswordProtect onAuthenticated={() => setIsAuthenticated(true)} />;
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

      {/* Background Decor (optional, based on design feel) */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#87b7ff,transparent_70%)]" />
      </div>
    </div>
  );
}
