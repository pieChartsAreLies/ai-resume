import imgSgResume20261 from "figma:asset/2e23e526f99f02e650d476e1bae403557646f141.png";

function Component() {
  return (
    <div className="absolute h-[24px] left-[830px] top-[25px] w-[433px]" data-name="Component 1">
      <p className="absolute css-4hzbpn font-['Montserrat:Regular',sans-serif] font-normal inset-[0_81.99%_0_0] leading-[normal] text-[#87b7ff] text-[20px]">Home</p>
      <p className="absolute css-4hzbpn font-['Montserrat:Regular',sans-serif] font-normal inset-[0_60.05%_0_24.48%] leading-[normal] text-[#87b7ff] text-[20px]">Work</p>
      <p className="absolute css-4hzbpn font-['Montserrat:SemiBold',sans-serif] font-semibold inset-[0_29.56%_0_46.42%] leading-[normal] text-[20px] text-white">Resume</p>
      <p className="absolute css-4hzbpn font-['Montserrat:Regular',sans-serif] font-normal inset-[0_0_0_76.91%] leading-[normal] text-[#87b7ff] text-[20px]">Contact</p>
      <div className="absolute inset-[95.83%_34.18%_4.17%_46.88%]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 82 1">
            <line id="Line 2" stroke="var(--stroke-0, white)" x2="82" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[54px] top-[4px]">
      <p className="absolute css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[normal] left-[61px] text-[#87b7ff] text-[48px] top-[4px]">S</p>
      <p className="absolute css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[normal] left-[93px] text-[#87b7ff] text-[48px] top-[36px]">G</p>
      <div className="absolute border-3 border-solid border-white left-[54px] rounded-[16px] size-[84px] top-[8px]" />
      <div className="absolute h-0 left-[99px] top-[31px] w-[26px]">
        <div className="absolute inset-[-1px_-3.85%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 2">
            <path d="M1 1H27" id="Line 3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[65px] top-[66px] w-[23px]">
        <div className="absolute inset-[-1px_-4.35%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 2">
            <path d="M1 1H24" id="Line 4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function MacBookAir() {
  return (
    <div className="bg-[#404040] relative size-full" data-name="MacBook Air - 6">
      <div className="absolute bg-[#4a4a4a] h-[100px] left-[-1px] shadow-[2px_4px_11px_0px_rgba(0,0,0,0.25)] top-0 w-[1280px]" />
      <Component />
      <p className="absolute css-ew64yg font-['Montserrat:Regular',sans-serif] font-normal leading-[normal] left-[167px] text-[#87b7ff] text-[48px] top-[4px]">Scott Gerstl</p>
      <p className="absolute css-ew64yg font-['Montserrat:Light',sans-serif] font-light leading-[normal] left-[167px] text-[20px] text-white top-[63px]">US and German Citizen | Berlin, Germany</p>
      <p className="absolute css-ew64yg font-['Montserrat:Light',sans-serif] font-light leading-[normal] left-[830px] text-[20px] text-white top-[63px]">{`UX Leader | Enterprise & Industrial SaaS`}</p>
      <Group />
      <div className="absolute h-[1455px] left-[335px] top-[124px] w-[609px]" data-name="SG Resume 2026 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSgResume20261} />
      </div>
    </div>
  );
}