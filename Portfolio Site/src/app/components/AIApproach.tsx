import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SkillCard {
  skill: string;
  evidence: string;
}

interface ToolkitCard {
  title: string;
  summary: string;
  detail: string;
}

const skills: SkillCard[] = [
  {
    skill: 'Specification Precision',
    evidence: '200+ lines of structured rules governing agent behavior. System prompts, tool definitions, persona specifications. Every agent interaction starts with precise intent.',
  },
  {
    skill: 'Evaluation & Quality Judgment',
    evidence: 'Adversarial review workflow: Claude designs, Gemini critiques, iterate before building. 15 years of data quality governance (SOX, CCPA audits with zero findings). AI output gets treated like it has my name on it.',
  },
  {
    skill: 'Multi-Agent Decomposition',
    evidence: 'Bob (NanoClaw): planner agent with 30+ MCP tools and persona isolation. Claude Code: sub-agent delegation across Explore, Plan, Build, and Test phases. Sizing work to match the agentic harness.',
  },
  {
    skill: 'Failure Pattern Recognition',
    evidence: 'Context degradation handling through tiered memory that prevents window pollution. Circuit breakers in media monitoring (2 attempts per item per 24h). Debug journal capturing failure patterns across projects.',
  },
  {
    skill: 'Trust & Security Design',
    evidence: 'Enterprise governance career: SOX controls, CCPA/GDPR compliance, PII reduction programs. In AI: path containment security, knowledge base isolation, blast radius analysis before agent actions.',
  },
  {
    skill: 'Context Architecture',
    evidence: 'Tiered memory system (L0 routing index, L1 topic files, L2 full reference). SQLite FTS5 knowledge bases. Data catalog rollout (Alation) serving 3,500+ users. Building the library that agents search through is what I have done for 15 years.',
  },
  {
    skill: 'Cost & Token Economics',
    evidence: 'RTK (Rust Token Killer): 60-90% token savings through intelligent output filtering. Model routing decisions (Haiku for fast tasks, Opus for complex reasoning). Cost governance experience ($145K Snowflake savings at Babylist).',
  },
];

const toolkit: ToolkitCard[] = [
  {
    title: 'Adversarial Review',
    summary: 'Competing models catch what single-model workflows miss.',
    detail: 'Every design doc and implementation plan gets reviewed by a competing model before build starts. Claude designs; Gemini finds the holes. This catches blind spots that single-model workflows miss.',
  },
  {
    title: 'Tiered Memory Architecture',
    summary: 'Agents pick up where they left off, not from zero.',
    detail: 'Persistent cross-session context organized in L0/L1/L2 tiers. Routing tables, topic files, full references. Agents don\'t start from zero; they pick up where they left off.',
  },
  {
    title: 'Multi-Model Routing',
    summary: 'Right model for the right job. Cost-aware, not model-loyal.',
    detail: 'Haiku for quick searches, Sonnet/Opus for complex reasoning, Gemini for adversarial review. Every task gets the model that fits its complexity and cost profile.',
  },
  {
    title: 'Specification-Driven Agents',
    summary: 'Agents follow precise specifications, not guesswork.',
    detail: '200+ lines of behavioral rules, tool definitions, and guardrails. Agents don\'t guess intent; they follow precise specifications with explicit constraints and failure handling.',
  },
];

export function AIApproach() {
  const [expandedToolkit, setExpandedToolkit] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center pt-[112px] md:pt-[132px] pb-20 px-4 gap-12">
      {/* Section Header */}
      <div className="text-center max-w-[800px]">
        <h2 className="font-['Montserrat',sans-serif] font-medium text-[28px] md:text-[36px] text-[#FAF7F2] mb-3">
          How I Work with AI
        </h2>
        <p className="font-['Montserrat',sans-serif] font-light text-[14px] text-[#9C9489]">
          The principles, skills, and methods behind effective AI practice
        </p>
      </div>

      {/* Section A: Philosophy Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        className="bg-[#4A4440] rounded-[16px] shadow-[2px_4px_11px_0px_rgba(0,0,0,0.25)] p-8 md:p-12 max-w-[800px] w-full"
      >
        <h3 className="font-['Montserrat',sans-serif] font-medium text-[22px] md:text-[26px] text-[#FAF7F2] mb-6">
          Point of View
        </h3>
        <div className="flex flex-col gap-5">
          <p className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#D4CFC8] leading-relaxed">
            The skills that make someone effective with AI are the same ones that have always defined good data leadership: judgment, ownership, critical evaluation, and knowing how to use tools to minimize complexity while maximizing value.
          </p>
          <p className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#D4CFC8] leading-relaxed">
            AI is the most powerful tool to arrive in a generation. But a tool is only as good as the person directing it. The same rigor you'd apply to a data pipeline, a governance framework, or a team's output applies to AI output. Own it. Stand behind it. If you wouldn't put your name on it, it's not done.
          </p>
          <p className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#D4CFC8] leading-relaxed">
            Don't tell me you used AI. If you aren't using it, you're falling behind. If you are, it's expected. AI slop exists because nobody with good judgment stopped to read, evaluate, and refine. That's a leadership and quality problem, not a technology problem.
          </p>
        </div>
      </motion.div>

      {/* Section B: Skills in Practice */}
      <div className="w-full max-w-[1200px]">
        <h3 className="font-['Montserrat',sans-serif] font-medium text-[22px] md:text-[26px] text-[#FAF7F2] mb-6 text-center">
          Skills in Practice
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((card, index) => (
            <motion.div
              key={card.skill}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#4A4440] rounded-[16px] shadow-[2px_4px_11px_0px_rgba(0,0,0,0.25)] p-6 md:p-8"
            >
              <h4 className="font-['Montserrat',sans-serif] font-semibold text-[16px] md:text-[18px] text-[#D4A853] mb-3">
                {card.skill}
              </h4>
              <p className="font-['Montserrat',sans-serif] font-light text-[14px] md:text-[15px] text-[#D4CFC8] leading-relaxed">
                {card.evidence}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section C: My AI Toolkit */}
      <div className="w-full max-w-[1200px]">
        <h3 className="font-['Montserrat',sans-serif] font-medium text-[22px] md:text-[26px] text-[#FAF7F2] mb-6 text-center">
          My AI Toolkit
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {toolkit.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#4A4440] rounded-[16px] shadow-[2px_4px_11px_0px_rgba(0,0,0,0.25)] p-6 md:p-8 cursor-pointer hover:bg-[#524E49] transition-colors"
              onClick={() => setExpandedToolkit(expandedToolkit === index ? null : index)}
            >
              <h4 className="font-['Montserrat',sans-serif] font-semibold text-[16px] md:text-[18px] text-[#D4A853] mb-2">
                {card.title}
              </h4>
              <p className="font-['Montserrat',sans-serif] font-light text-[14px] text-[#9C9489] mb-3">
                {card.summary}
              </p>
              <AnimatePresence>
                {expandedToolkit === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="font-['Montserrat',sans-serif] font-light text-[14px] md:text-[15px] text-[#D4CFC8] leading-relaxed overflow-hidden"
                  >
                    {card.detail}
                  </motion.p>
                )}
              </AnimatePresence>
              <span className="font-['Montserrat',sans-serif] text-[12px] text-[#9C9489] mt-2 block">
                {expandedToolkit === index ? 'Click to collapse' : 'Click to expand'}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
