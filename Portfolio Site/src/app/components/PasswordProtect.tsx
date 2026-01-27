import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock } from 'lucide-react';

interface PasswordProtectProps {
  onAuthenticated: () => void;
}

export function PasswordProtect({ onAuthenticated }: PasswordProtectProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const CORRECT_PASSWORD = 'GerstlPortfolio2026';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      onAuthenticated();
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-[112px] md:pt-[132px] pb-20 px-4 min-h-[60vh]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#4a4a4a] rounded-[16px] shadow-[2px_4px_11px_0px_rgba(0,0,0,0.25)] p-8 md:p-12 max-w-[450px] w-full border border-white/10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#4a4a4a] rounded-[12px] shadow-[2px_2px_10px_3px_rgba(0,0,0,0.25),-2px_-2px_10px_3px_rgba(204,204,204,0.15)] w-[56px] h-[56px] flex items-center justify-center mb-6">
            <Lock className="w-6 h-6 text-[#87b7ff]" />
          </div>
          <h2 className="font-['Montserrat',sans-serif] font-medium text-[24px] text-white text-center">
            Private Portfolio
          </h2>
          <p className="font-['Montserrat',sans-serif] font-light text-[14px] text-[#d9d9d9] text-center mt-2">
            Please enter the password to view Scott's work.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className={`w-full h-[44px] bg-[#3a3a3a] border rounded-[12px] px-4 text-white font-['Montserrat',sans-serif] focus:outline-none transition-colors ${
                error ? 'border-red-500' : 'border-white/20 focus:border-[#87b7ff]'
              }`}
            />
            {error && (
              <p className="text-red-500 text-[12px] font-['Montserrat',sans-serif] mt-1 ml-2">
                Incorrect password. Please try again.
              </p>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full h-[44px] border border-white rounded-[50px] flex items-center justify-center font-['Montserrat',sans-serif] font-medium text-[#87b7ff] text-[16px] hover:bg-white/5 transition-colors cursor-pointer mt-2"
          >
            Access Work
          </button>
        </form>
      </motion.div>
    </div>
  );
}
