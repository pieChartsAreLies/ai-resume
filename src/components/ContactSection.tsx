import ScrollReveal from "./ScrollReveal";
import { Calendar, Mail, Linkedin, Github, Laptop, Flame, BookOpen } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-32 relative section-light">

      <div className="section-container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-sm font-medium text-teal uppercase tracking-widest mb-3">Get In Touch</p>
            <h2 className="section-heading mb-6">Let's Talk</h2>
            <p className="section-subheading mx-auto mb-4">
              I'm looking for my next challenge: a VP or Director of Data role at a company where the leadership team treats data infrastructure as a strategic investment, not a cost center. Companies with real product-market fit that are ready to invest in governance, platform maturity, and the foundational work that makes everything else possible.
            </p>
            <p className="text-muted-foreground mb-10">
              If you're building something that needs a leader who will get the foundations right first, then accelerate on top of them, I'd like to hear about it.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <a
              href="https://calendly.com/michaelgerstl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-xl text-lg hover:bg-primary/90 transition-all duration-200 mb-8"
            >
              <Calendar size={20} />
              Book a Conversation
            </a>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="flex items-center justify-center gap-6 mb-12">
              <a
                href="https://linkedin.com/in/michaelgerstl"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin size={18} /> LinkedIn
              </a>
              <a
                href="mailto:michael@michaelgerstl.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail size={18} /> Email
              </a>
              <a
                href="https://github.com/pieChartsAreLies"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Github size={18} /> GitHub
              </a>
            </div>
          </ScrollReveal>

          {/* Currently */}
          <ScrollReveal delay={0.2}>
            <div className="inline-flex flex-wrap items-center justify-center gap-4 px-6 py-3 rounded-xl bg-card border border-border text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Laptop size={14} className="text-accent" /> Tinkering and Building</span>
              <span className="text-border">·</span>
              <span className="flex items-center gap-1.5"><Flame size={14} className="text-primary" /> Smoking brisket</span>
              <span className="text-border">·</span>
              <span className="flex items-center gap-1.5"><BookOpen size={14} className="text-teal" /> Always reading</span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
