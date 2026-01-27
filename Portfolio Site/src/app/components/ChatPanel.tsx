import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Reset states when panel opens
  useEffect(() => {
    if (isOpen) {
      setIframeLoaded(false);
      setIframeError(false);
    }
  }, [isOpen]);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

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
            className="fixed right-0 top-0 h-full w-full md:w-[700px] bg-white shadow-2xl z-[999] flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
            >
              <span className="text-2xl text-gray-600 leading-none">&times;</span>
            </button>

            {/* Header */}
            <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white p-6 text-center shrink-0">
              <h2 className="font-['Montserrat',sans-serif] font-semibold text-lg">
                Ask My AI Assistant
              </h2>
              <p className="font-['Montserrat',sans-serif] font-light text-sm mt-1 opacity-90">
                Ask about my projects, experience, or leadership philosophy
              </p>
            </div>

            {/* Chat iframe container */}
            <div className="flex-1 relative">
              {/* Loading state */}
              {!iframeLoaded && !iframeError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#667eea] mx-auto mb-4"></div>
                    <p className="text-gray-600 font-['Montserrat',sans-serif]">Loading AI Assistant...</p>
                  </div>
                </div>
              )}

              {/* Iframe */}
              <iframe
                src={import.meta.env.VITE_CHAINLIT_URL || "http://192.168.2.68:8000"}
                className="w-full h-full border-none"
                title="AI Chat Assistant"
                onLoad={handleIframeLoad}
                allow="microphone"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
