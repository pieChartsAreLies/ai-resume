import svgPaths from "./svg-ylwjefs1p9";

function KeyboardBackspace() {
  return (
    <div className="absolute inset-[3.65%_16.47%_93.44%_79.57%]" data-name="keyboard_backspace">
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
    <div className="absolute contents left-[306px] top-[639px]">
      <div className="absolute border border-solid border-white h-[33px] left-[306px] rounded-[50px] top-[639px] w-[257px]" />
      <div className="absolute flex flex-col font-['Montserrat:Medium',sans-serif] font-medium h-[33px] justify-center leading-[0] left-[434.5px] text-[#87b7ff] text-[16px] text-center top-[655.5px] translate-x-[-50%] translate-y-[-50%] w-[257px]">
        <p className="css-4hzbpn leading-[normal]">View Work</p>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[22px] top-[639px]">
      <div className="absolute border border-solid border-white h-[33px] left-[22px] rounded-[50px] top-[639px] w-[257px]" />
      <div className="absolute flex flex-col font-['Montserrat:Medium',sans-serif] font-medium h-[33px] justify-center leading-[0] left-[150.5px] text-[#87b7ff] text-[16px] text-center top-[655.5px] translate-x-[-50%] translate-y-[-50%] w-[257px]">
        <p className="css-4hzbpn leading-[normal]">Download Resume (pdf)</p>
      </div>
    </div>
  );
}

export default function Group2() {
  return (
    <div className="relative size-full">
      <div className="absolute bg-[#4a4a4a] h-[823px] left-0 rounded-[16px] shadow-[2px_4px_11px_0px_rgba(0,0,0,0.25)] top-0 w-[607px]" />
      <div className="absolute font-['Montserrat:Light',sans-serif] font-light leading-[normal] left-[22px] text-[#d9d9d9] text-[16px] top-[68px] w-[559px]">
        <p className="css-4hzbpn mb-0">{`My management style is really quite simple. `}</p>
        <p className="css-4hzbpn mb-0">&nbsp;</p>
        <p className="css-4hzbpn mb-0">{`I strive to treat people like professionals and as fellow humans, with all of the complexity and nuance needed to dealing with other. `}</p>
        <p className="css-4hzbpn mb-0">&nbsp;</p>
        <p className="css-4hzbpn mb-0">{`When we’ve done our jobs well, we have hired the best people for the job and as such they need to be given the respect and autonomy to do their work with authority and independence. `}</p>
        <p className="css-4hzbpn mb-0">&nbsp;</p>
        <p className="css-4hzbpn">{`I seek to respect my team members for their work, their ambitions, and their humanity. By taking the time to understand another person, their needs, desires, and goals, it is possible to guide them on the path to personal and collective success. `}</p>
      </div>
      <p className="absolute css-ew64yg font-['Montserrat:Medium',sans-serif] font-medium leading-[normal] left-[515px] text-[18px] text-white top-[31px]">Back</p>
      <p className="absolute css-4hzbpn font-['Montserrat:Medium',sans-serif] font-medium leading-[normal] left-[22px] text-[31px] text-white top-[22px] w-[539px]">Team Leadership</p>
      <KeyboardBackspace />
      <Group />
      <Group1 />
    </div>
  );
}