import ScrollReveal from "./ScrollReveal";
import { Users, Shield, Target } from "lucide-react";
import { useMouseGlow } from "@/hooks/useMouseGlow";

const beliefs = [
  {
    title: "Hire well, then get out of the way",
    desc: "Great teams come from clear expectations, removed obstacles, and the trust to let talented people own their work. At Chewy, my platform team grew from 3 to 5 people while supporting 35x user growth because we hired right and built the systems to scale without headcount.",
    icon: Users,
  },
  {
    title: "Governance is the accelerator",
    desc: "Governance is the thing that lets you stop slowing down. At Chewy, adding SOX-compliant controls and content certification to Tableau didn't slow adoption. It's what enabled 3,500 people to trust and use it.",
    icon: Shield,
  },
  {
    title: "Measure what matters",
    desc: "Define success criteria upfront, track outcomes honestly, and let the results speak. At Babylist, I ran company-wide \u201CState of Data\u201D surveys to measure whether the programs we were building actually changed how people worked. The feedback shaped the entire 2025 data roadmap.",
    icon: Target,
  },
];

function BeliefCard({ belief }: { belief: typeof beliefs[number] }) {
  const { ref, onMouseMove, onMouseLeave } = useMouseGlow();

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="rounded-lg bg-primary/5 border border-primary/15 p-6 md:p-7 h-full card-glow"
    >
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <belief.icon size={16} className="text-primary" />
          <h4 className="font-display font-semibold text-sm text-foreground">{belief.title}</h4>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{belief.desc}</p>
      </div>
    </div>
  );
}

export default function HowILeadSection() {
  return (
    <section id="leadership" className="py-24 md:py-32 relative noise-overlay">
      <div className="section-container relative z-10">
        {/* Header */}
        <ScrollReveal>
          <p className="text-sm font-medium text-teal uppercase tracking-widest mb-3">Leadership</p>
          <h2 className="section-heading mb-4">How I Lead</h2>
        </ScrollReveal>

        {/* Intro paragraphs */}
        <ScrollReveal delay={0.1}>
          <p className="text-muted-foreground leading-relaxed mb-5">
            My career has followed a consistent pattern: walk into ambiguity, build the foundation everyone skipped, and leave behind something that works without me.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-5">
            At Chewy, that meant building a 30-person analytics org from a blank page through an IPO. At Babylist, it meant modernizing a data platform and establishing governance for a team that had never had either.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I built my career from individual contributor to people leader, and the through-line has always been the same: recruit exceptional talent, equip them with the right tools and governance, set clear expectations, and get out of the way. That's where I deliver the most value.
          </p>
        </ScrollReveal>

        {/* Beliefs */}
        <ScrollReveal delay={0.15}>
          <h3 className="font-display font-semibold text-lg text-foreground mb-4 mt-10">What I believe</h3>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-4">
          {beliefs.map((belief, i) => (
            <ScrollReveal key={belief.title} delay={0.15 + i * 0.05}>
              <BeliefCard belief={belief} />
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
