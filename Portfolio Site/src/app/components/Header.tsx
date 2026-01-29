import React, { useState } from 'react';
import { Logo } from '@/app/components/Logo';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

export function Header({ activeSection, onSectionClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'work', label: 'Work' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' },
  ] as const;

  const handleNavClick = (id: string) => {
    onSectionClick(id);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#4A4440] shadow-[2px_4px_11px_0px_rgba(0,0,0,0.25)] h-[80px] md:h-[110px] flex items-center md:items-end pb-0 md:pb-6 px-6 md:px-8 lg:px-14">
      {/* Logo and Name Section */}
      <div className="flex items-center md:items-end gap-3 md:gap-4 flex-1">
        <div onClick={() => handleNavClick('home')} className="cursor-pointer md:mb-1">
          <Logo />
        </div>
        <div className="flex flex-col ml-1 md:ml-3">
          <span className="font-['Raleway',sans-serif] font-medium text-[#FAF7F2] text-[22px] md:text-[36px] tracking-wide">
            Michael Gerstl
          </span>
          <span className="hidden md:block font-['Montserrat',sans-serif] font-light text-[#D4A853] text-[13px] md:text-[14px] tracking-widest uppercase">
            Data Leader
          </span>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-col items-start gap-1 md:gap-2">
        <nav className="flex items-center gap-6 md:gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="relative group cursor-pointer"
            >
              <span className={`font-['Montserrat',sans-serif] text-[18px] md:text-[20px] transition-colors duration-200 ${
                activeSection === item.id
                  ? 'text-[#FAF7F2] font-semibold'
                  : 'text-[#D4A853] font-normal hover:text-[#FAF7F2]'
              }`}>
                {item.label}
              </span>
              {activeSection === item.id && (
                <motion.div
                   layoutId="activeNav"
                  className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#FAF7F2]"
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 text-[#FAF7F2]"
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
            className="absolute top-[80px] left-0 w-full bg-[#4A4440] shadow-lg md:hidden flex flex-col items-center py-8 gap-6 border-t border-[#FAF7F2]/10"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="w-full text-center py-2"
              >
                <span className={`font-['Montserrat',sans-serif] text-[24px] transition-colors duration-200 ${
                  activeSection === item.id
                    ? 'text-[#FAF7F2] font-semibold underline underline-offset-8 decoration-2'
                    : 'text-[#D4A853] font-normal hover:text-[#FAF7F2]'
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
