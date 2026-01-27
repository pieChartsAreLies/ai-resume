import svgPaths from "./svg-rt2t7w7a9v";
import imgResponseDashboard21 from "figma:asset/f1665a531d9140b1a9311b972bdcfbdea41d04ba.png";
import imgResponseDashboard11 from "figma:asset/a32d1ee4e55004126758cc18e732132207447af5.png";

function KeyboardBackspace() {
  return (
    <div className="absolute inset-[87.21%_52.72%_11%_43.33%]" data-name="keyboard_backspace">
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
    <div className="absolute contents left-[263px] top-[1173px]">
      <p className="absolute css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[normal] left-[295px] text-[18px] text-white top-[1174px]">Back</p>
      <KeyboardBackspace />
    </div>
  );
}

function KeyboardBackspace1() {
  return (
    <div className="absolute inset-[2.23%_16.47%_95.99%_79.57%]" data-name="keyboard_backspace">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="keyboard_backspace">
          <path d={svgPaths.p3f70cf00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[483px] top-[30px]">
      <p className="absolute css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[normal] left-[515px] text-[18px] text-white top-[31px]">Back</p>
      <KeyboardBackspace1 />
    </div>
  );
}

export default function Group2() {
  return (
    <div className="relative size-full">
      <div className="absolute bg-[#4a4a4a] h-[1345px] left-0 rounded-[16px] shadow-[2px_4px_11px_0px_rgba(0,0,0,0.25)] top-0 w-[607px]" />
      <Group1 />
      <div className="absolute font-['Montserrat:Light',sans-serif] font-light leading-[normal] left-[22px] text-[#d9d9d9] text-[16px] top-[69px] w-[559px]">
        <p className="css-4hzbpn mb-0">{`Problem: Our industrial clients didn’t have a simple way to view the performance of energy curtailment actions across facilities. Adherence to these programs can save a single facility hundreds of thousands of dollars per year, so it is crucial to monitor all aspects of these porgrams in real time. `}</p>
        <p className="css-4hzbpn mb-0">&nbsp;</p>
        <p className="css-4hzbpn">{`Outcome: A graphical interface that shows pertinent information like predictive analysis of peak energy use days and times, cross-facility comparisons, and performance metrics. This data can be drilled into for more detail about a specific facility’s performance, and allows regional managers to find problem facilities to address, or outstanding facilities to study. `}</p>
      </div>
      <div className="absolute flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] left-[22px] text-[27px] text-white top-[39.5px] translate-y-[-50%] w-[539px]">
        <p className="css-4hzbpn leading-[normal]">Demand Response Dashboard</p>
      </div>
      <Group />
      <div className="absolute h-[470px] left-0 top-[810px] w-[607px]" data-name="Response Dashboard 2 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[100.02%] left-0 max-w-none top-[-0.01%] w-[100.67%]" src={imgResponseDashboard21} />
        </div>
      </div>
      <div className="absolute h-[470px] left-0 top-[323px] w-[607px]" data-name="Response Dashboard 1 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[104.03%] left-0 max-w-none top-0 w-[100.62%]" src={imgResponseDashboard11} />
        </div>
      </div>
    </div>
  );
}