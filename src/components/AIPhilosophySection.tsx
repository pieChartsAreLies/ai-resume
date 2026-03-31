import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useMouseGlow } from "@/hooks/useMouseGlow";

const pullQuotes = [
  "The skills that make someone effective with AI are the same ones that have always defined good data leadership: judgment, ownership, critical evaluation, and a commitment to measuring what actually works.",
  "AI doesn't transform an organization on day one. It compounds through consistent iteration, honest monitoring, and teams that are growing their capabilities together, not in silos.",
  "Build, buy, or integrate, the answer changes as the team matures. What doesn't change is the discipline: define success criteria, measure outcomes, and course-correct continuously.",
];

const capabilities = [
  {
    title: "Governance-First Thinking",
    description: "My career has been built on getting the foundations right before doing the advanced work. SOX compliance, CCPA/GDPR programs, 97% PII reduction, data quality frameworks spanning 45 teams. AI governance is the same discipline applied to a new category of risk: bias monitoring, performance drift, deployment accountability, and defined success criteria before models go live.",
  },
  {
    title: "Technical Fluency, Strategic Application",
    description: "I run a homelab where I deploy and test the tools I'd be making decisions about at work: RAG pipelines, local LLM deployments, vector databases, multi-agent workflows. A VP doesn't need to write production code, but understanding how the technology actually works makes me a better decision-maker and a more credible partner to engineering teams.",
  },
  {
    title: "Specification and Evaluation Rigor",
    description: "I build agents with structured behavioral rules, tool definitions, and explicit guardrails. I use adversarial review workflows where competing models catch what single-model approaches miss. 18 years of data quality governance taught me that the hardest part of any system is knowing whether it's working. That applies to AI more than anything that came before it.",
  },
  {
    title: "Cost and Resource Discipline",
    description: "I treat AI spend with the same rigor as cloud infrastructure costs. Model routing (fast models for simple tasks, capable models for complex reasoning), token optimization, and honest TCO analysis before committing to build-or-buy decisions. The $145K I saved on Snowflake at Babylist came from the same mindset: measure it, understand it, then optimize it.",
  },
  {
    title: "Trust and Security by Default",
    description: "I've spent my career building security into data systems from the start. At Chewy, I identified that OneTrust's centralized manual process wouldn't scale and worked with engineering to design an SNS-based architecture that pushed opt-out requests to platform owners, shifting accountability to the teams that owned the data. I built SOX-compliant data architectures with segregated environments, ran PII reduction programs across 30+ engineering teams, and established production readiness reviews that became company standard. I apply the same principles to AI: path containment, knowledge base isolation, access controls, and blast radius analysis before anything goes live.",
  },
];

function CapabilityCard({ cap, index, expandedCap, setExpandedCap }: {
  cap: typeof capabilities[number];
  index: number;
  expandedCap: number | null;
  setExpandedCap: (v: number | null) => void;
}) {
  const { ref, onMouseMove, onMouseLeave } = useMouseGlow();
  return (
    <ScrollReveal delay={0.15 + index * 0.05}>
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="rounded-xl bg-card border border-border p-6 md:p-7 cursor-pointer card-glow"
        onClick={() => setExpandedCap(expandedCap === index ? null : index)}
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <h4 className="font-display font-semibold text-lg text-foreground">{cap.title}</h4>
            <motion.div
              animate={{ rotate: expandedCap === index ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={18} className="text-muted-foreground" />
            </motion.div>
          </div>
          <AnimatePresence>
            {expandedCap === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="text-muted-foreground leading-relaxed mt-3">{cap.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function AIPhilosophySection() {
  const [activeQuote, setActiveQuote] = useState(0);
  const [expandedCap, setExpandedCap] = useState<number | null>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    autoRef.current = setInterval(() => {
      setActiveQuote((q) => (q === pullQuotes.length - 1 ? 0 : q + 1));
    }, 6000);
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, []);

  const handleQuoteClick = (i: number) => {
    setActiveQuote(i);
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setActiveQuote((q) => (q === pullQuotes.length - 1 ? 0 : q + 1));
    }, 6000);
  };

  return (
    <section id="ai" className="py-24 md:py-32 relative section-light">
      {/* Grid texture background */}
      <div className="absolute inset-0 grid-texture opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="section-container relative z-10">
        <ScrollReveal>
          <p className="text-sm font-medium text-teal uppercase tracking-widest mb-3">Philosophy</p>
          <h2 className="section-heading mb-4">How I Think About AI</h2>
          <p className="section-subheading mb-16">
            I evaluate technology with a builder's eye and a leader's accountability. Here's the operating system.
          </p>
        </ScrollReveal>

        {/* Pull quotes */}
        <ScrollReveal delay={0.1} className="mb-20">
          <div className="max-w-3xl mx-auto">
            <blockquote className="quote-accent text-center mb-8 min-h-[10rem]">
              "{pullQuotes[activeQuote]}"
            </blockquote>
            <div className="flex justify-center gap-2">
              {pullQuotes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleQuoteClick(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === activeQuote ? "bg-primary scale-125" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Quote ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* What I Bring to AI Leadership */}
        <ScrollReveal delay={0.15}>
          <h3 className="font-display font-semibold text-xl mb-8 text-foreground">What I Bring to AI Leadership</h3>
        </ScrollReveal>
        <div className="space-y-6">
          {capabilities.map((cap, i) => (
            <CapabilityCard key={cap.title} cap={cap} index={i} expandedCap={expandedCap} setExpandedCap={setExpandedCap} />
          ))}
        </div>
      </div>
    </section>
  );
}
