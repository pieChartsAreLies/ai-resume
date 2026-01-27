import React from 'react';

export function Logo() {
  return (
    <div className="relative w-[60px] h-[60px] flex-shrink-0">
      <p className="absolute font-['Montserrat',sans-serif] font-normal leading-[normal] left-[5px] text-[#87b7ff] text-[34px] top-[-3px]">S</p>
      <p className="absolute font-['Montserrat',sans-serif] font-normal leading-[normal] left-[28px] text-[#87b7ff] text-[34px] top-[20px]">G</p>
      <div className="absolute border-[2.5px] border-solid border-white rounded-[12px] w-[60px] h-[60px] top-0" />
      <div className="absolute h-0 left-[32px] top-[16px] w-[19px]">
        <svg className="block w-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 2">
          <path d="M1 1H27" stroke="white" strokeLinecap="round" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute h-0 left-[8px] top-[41px] w-[16px]">
        <svg className="block w-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 2">
          <path d="M1 1H24" stroke="white" strokeLinecap="round" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}
