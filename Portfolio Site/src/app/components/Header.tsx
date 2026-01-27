import React, { useState } from 'react';
import { Logo } from '@/app/components/Logo';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activePage: 'home' | 'work' | 'resume' | 'contact';
  onPageChange: (page: 'home' | 'work' | 'resume' | 'contact') => void;
}

export function Header({ activePage, onPageChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'work', label: 'Work' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' },
  ] as const;

  const handlePageChange = (id: 'home' | 'work' | 'resume' | 'contact') => {
    onPageChange(id);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#4a4a4a] shadow-[2px_4px_11px_0px_rgba(0,0,0,0.25)] h-[80px] md:h-[110px] flex items-center md:items-end pb-0 md:pb-6 px-6 md:px-8 lg:px-14">
      {/* Logo and Name Section */}
      <div className="flex items-center md:items-end gap-2 md:gap-4 flex-1">
        <div onClick={() => handlePageChange('home')} className="cursor-pointer md:mb-1">
          <Logo />
        </div>
        <div className="flex flex-col ml-1 md:ml-4">
          <h1 className="font-['Montserrat',sans-serif] font-normal text-[#87b7ff] text-[20px] md:text-[48px] leading-[0.9] whitespace-nowrap">
            Scott Gerstl
          </h1>
          <p className="hidden md:block font-['Montserrat',sans-serif] font-light text-[14px] md:text-[18px] text-white mt-1">
            US and German Citizen | Berlin, Germany
          </p>
        </div>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-col items-start gap-1 md:gap-2">
        <nav className="flex items-center gap-6 md:gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handlePageChange(item.id)}
              className="relative group cursor-pointer"
            >
              <span className={`font-['Montserrat',sans-serif] text-[18px] md:text-[20px] transition-colors duration-200 ${
                activePage === item.id 
                  ? 'text-white font-semibold' 
                  : 'text-[#87b7ff] font-normal hover:text-white'
              }`}>
                {item.label}
              </span>
              {activePage === item.id && (
                <motion.div 
                   layoutId="activeNav"
                  className="absolute -bottom-1 left-0 w-full h-[2px] bg-white" 
                />
              )}
            </button>
          ))}
        </nav>
        <p className="font-['Montserrat',sans-serif] font-light text-[16px] md:text-[20px] text-white">
          UX Leader | Enterprise & Industrial SaaS
        </p>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden p-2 text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[80px] left-0 w-full bg-[#4a4a4a] shadow-lg md:hidden flex flex-col items-center py-8 gap-6 border-t border-white/10"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handlePageChange(item.id)}
                className="w-full text-center py-2"
              >
                <span className={`font-['Montserrat',sans-serif] text-[24px] transition-colors duration-200 ${
                  activePage === item.id 
                    ? 'text-white font-semibold underline underline-offset-8 decoration-2' 
                    : 'text-[#87b7ff] font-normal hover:text-white'
                }`}>
                  {item.label}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
