import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Michael is the data leader you want. He is a high-trust manager skilled at process improvement and team organization. He both coaches and practices radical candor, giving actionable feedback in a clear, concise way that makes it known he wants the best for you and your career.",
    name: "Athena Casarotto",
    title: "Analytics Engineer",
    company: "Babylist",
  },
  {
    quote: "Michael came in with a clear vision, took ownership, and immediately brought structure, momentum, and fresh energy to our work. He empowers the people around him, drives measurable outcomes, and makes the work better and more enjoyable for everyone involved.",
    name: "Brad Wettig",
    title: "Data Engineer",
    company: "Babylist",
  },
  {
    quote: "Michael's strength as a problem-solver stems from his ability to dissect the symptoms from the root cause and drive towards effective solutions. He excels at resolving complex or long-standing issues, methodically thinking through potential impediments and breaking down obstacles into manageable components.",
    name: "Anis Raja",
    title: "Senior Director of Software Engineering",
    company: "Chewy",
  },
  {
    quote: "For the first time in my career, I had a leader who would not only provide clear directions but would also give us the full freedom to explore, own the product, and make decisions related to it. His guidance has had a significant impact on my growth both personally and professionally.",
    name: "Maninder Singh",
    title: "Data Engineer III",
    company: "Chewy",
  },
  {
    quote: "Michael stood out as a key figure in nurturing the data culture at Chewy. His leadership in organizing events like the Data Summit and his ability to engage teams in meaningful conversations about data best practices fostered a community of learning and collaboration that resonated throughout our data teams.",
    name: "Gabe Schenz",
    title: "Software Engineering Manager",
    company: "Chewy",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [paused, setPaused] = useState(false);

  // Auto-scroll every 5 seconds, unless paused by user interaction
  useEffect(() => {
    if (paused) return;
    autoScrollRef.current = setInterval(() => {
      setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
    }, 5000);
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [paused]);

  // Clean up pause timeout on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  // Pause auto-scroll on user interaction, resume after 10s of inactivity
  const handleUserInteraction = () => {
    setPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => setPaused(false), 10000);
  };

  const prev = () => {
    handleUserInteraction();
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  };

  const next = () => {
    handleUserInteraction();
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
  };

  return (
    <section id="testimonials" className="py-24 md:py-32 relative section-light">

      <div className="section-container relative z-10">
        <ScrollReveal>
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">Testimonials</p>
          <h2 className="section-heading mb-16">What People Say</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Quote size={40} className="text-teal/30 mb-4" />
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={current}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="quote-accent mb-8 min-h-[12rem]"
                >
                  {testimonials[current].quote}
                </motion.blockquote>
              </AnimatePresence>
              <div className="mb-8">
                <p className="font-display font-semibold text-foreground">{testimonials[current].name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonials[current].title}, {testimonials[current].company}
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                  aria-label="Previous"
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        handleUserInteraction();
                        setCurrent(i);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === current ? "bg-primary w-6" : "bg-muted-foreground/30"
                      }`}
                      aria-label={`Testimonial ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                  aria-label="Next"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
