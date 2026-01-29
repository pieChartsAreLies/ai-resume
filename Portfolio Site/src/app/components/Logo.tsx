import React from 'react';

export function Logo() {
  return (
    <div className="relative w-[60px] h-[60px] flex-shrink-0">
      {/* Border box */}
      <div className="absolute border-[2.5px] border-solid border-[#FAF7F2] rounded-[12px] w-[60px] h-[60px] top-0" />

      {/* M letter - positioned top-left quadrant */}
      <span className="absolute font-['Montserrat',sans-serif] font-semibold text-[#D4A853] text-[20px] left-[10px] top-[5px]">
        M
      </span>

      {/* G letter - positioned bottom-right quadrant */}
      <span className="absolute font-['Montserrat',sans-serif] font-semibold text-[#D4A853] text-[20px] right-[10px] bottom-[5px]">
        G
      </span>

      {/* Diagonal accent line - shorter, between the letters */}
      <svg
        className="absolute w-[60px] h-[60px] top-0 left-0"
        viewBox="0 0 60 60"
        fill="none"
      >
        <line
          x1="20"
          y1="40"
          x2="40"
          y2="20"
          stroke="#FAF7F2"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
