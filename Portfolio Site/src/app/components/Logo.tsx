import React from 'react';

export function Logo() {
  return (
    <div className="relative w-[60px] h-[60px] flex-shrink-0">
      {/* Border box */}
      <div className="absolute border-[2.5px] border-solid border-white rounded-[12px] w-[60px] h-[60px] top-0" />

      {/* M letter - positioned top-left area */}
      <span className="absolute font-['Montserrat',sans-serif] font-semibold text-[#87b7ff] text-[26px] left-[6px] top-[2px]">
        M
      </span>

      {/* G letter - positioned bottom-right area */}
      <span className="absolute font-['Montserrat',sans-serif] font-semibold text-[#87b7ff] text-[26px] right-[6px] bottom-[2px]">
        G
      </span>

      {/* Diagonal accent line */}
      <svg
        className="absolute w-[60px] h-[60px] top-0 left-0"
        viewBox="0 0 60 60"
        fill="none"
      >
        <line
          x1="18"
          y1="42"
          x2="42"
          y2="18"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
