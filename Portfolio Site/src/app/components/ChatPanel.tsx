import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[998]"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-[700px] bg-white shadow-2xl z-[999]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
            >
              <span className="text-2xl text-gray-600 leading-none">&times;</span>
            </button>

            {/* Header */}
            <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white p-6 text-center">
              <h2 className="font-['Montserrat',sans-serif] font-semibold text-lg">
                Ask My AI Assistant
              </h2>
              <p className="font-['Montserrat',sans-serif] font-light text-sm mt-1 opacity-90">
                Ask about my projects, experience, or leadership philosophy
              </p>
            </div>

            {/* Chat iframe */}
            <iframe
              src="http://192.168.2.68:8001"
              className="w-full h-[calc(100%-100px)] border-none"
              title="AI Chat Assistant"
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
