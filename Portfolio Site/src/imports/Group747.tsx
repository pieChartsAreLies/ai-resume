import svgPaths from "./svg-6anrar6boh";
import imgPowerQuality21 from "figma:asset/3e8ffe93bf6ea7d5d128b84169f9fca795318f04.png";
import imgPowerQuality11 from "figma:asset/46436a880e59d1983c65575980b30c3501c30d19.png";

function KeyboardBackspace() {
  return (
    <div className="absolute inset-[95.91%_52.72%_2.13%_43.33%]" data-name="keyboard_backspace">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="keyboard_backspace">
          <path d={svgPaths.p3f70cf00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[263px] top-[1173px]">
      <p className="absolute css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[normal] left-[295px] text-[18px] text-white top-[1174px]">Back</p>
      <KeyboardBackspace />
    </div>
  );
}

function KeyboardBackspace1() {
  return (
    <div className="absolute inset-[2.45%_16.47%_95.58%_79.57%]" data-name="keyboard_backspace">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="keyboard_backspace">
          <path d={svgPaths.p3f70cf00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[483px] top-[30px]">
      <p className="absolute css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[normal] left-[515px] text-[18px] text-white top-[31px]">Back</p>
      <KeyboardBackspace1 />
    </div>
  );
}

export default function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute bg-[#4a4a4a] h-[1223px] left-0 rounded-[16px] shadow-[2px_4px_11px_0px_rgba(0,0,0,0.25)] top-0 w-[607px]" />
      <Group2 />
      <div className="absolute font-['Montserrat:Light',sans-serif] font-light leading-[normal] left-[22px] text-[#d9d9d9] text-[16px] top-[69px] w-[559px]">
        <p className="css-4hzbpn mb-0">{`Problem: Our clients didn’t have a simple way to see where power quality issues were occuring in there electrical systems. These issues lead to unplanned costs in the form of inefficient operations, damaged equipment, and high utility bills. `}</p>
        <p className="css-4hzbpn mb-0">&nbsp;</p>
        <p className="css-4hzbpn">{`Outcome: A graphical interface that resembles the electrical diagrams these users are accustomed to referencing that allows users to see real time and trending data about system performance, as well as AI generated analysis and recommendations. `}</p>
      </div>
      <p className="absolute css-4hzbpn font-['Montserrat:Medium',sans-serif] font-medium leading-[normal] left-[22px] text-[31px] text-white top-[22px] w-[539px]">Power Quality Management</p>
      <Group1 />
      <div className="absolute h-[432px] left-0 top-[714px] w-[607px]" data-name="Power Quality 2 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPowerQuality21} />
      </div>
      <div className="absolute h-[432px] left-0 top-[265px] w-[607px]" data-name="Power Quality 1 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPowerQuality11} />
      </div>
    </div>
  );
}