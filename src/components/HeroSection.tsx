import { motion } from "framer-motion";
import { ArrowDown, Terminal, Database, Brain } from "lucide-react";

const stats = [
  { value: "18+", label: "Years Leading Data Organizations" },
  { value: "3,500+", label: "Self-Service Analytics Users Enabled" },
  { value: "$10M+", label: "Revenue Created from Data Products" },
  { value: "50+", label: "Team Members Hired, Coached, and Developed" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center noise-overlay overflow-hidden">
      {/* Gradient orb */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-4xl">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              <Terminal size={14} />
              VP / Director of Data & Analytics
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-[1.08] mb-6"
          >
            I build the foundation{" "}
            <br className="hidden sm:block" />
            that makes everything else{" "}
            <span className="text-gradient-primary">possible.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            18 years building analytics organizations from scratch, establishing governance that scales, and creating data cultures where teams talk about strategy instead of pipeline fires. First analytics hire at Chewy, where I grew the function to 30 people through an IPO and turned operational data into a $10M+ revenue line. At Babylist, I modernized the data platform, cut costs by 30%, and built the governance programs the team had never had.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <a
              href="#work"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium px-7 py-3.5 rounded-lg hover:bg-primary/90 transition-all duration-200 text-base"
            >
              See What I've Built
              <ArrowDown size={16} />
            </a>
            <a
              href="#ai"
              className="inline-flex items-center justify-center gap-2 border border-border text-foreground font-medium px-7 py-3.5 rounded-lg hover:border-teal/40 hover:text-teal transition-all duration-200 text-base"
            >
              How I Think About AI
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1 + i * 0.1 }}
                className="group"
              >
                <div className="stat-number group-hover:text-accent transition-colors duration-300">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Side icons */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="hidden lg:flex absolute right-12 top-1/2 -translate-y-1/2 flex-col gap-4"
        >
          {[
            { Icon: Database, href: "#work" },
            { Icon: Brain, href: "#ai" },
            { Icon: Terminal, href: "#contact" },
          ].map(({ Icon, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-12 h-12 rounded-xl bg-muted/50 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
            >
              <Icon size={20} />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
