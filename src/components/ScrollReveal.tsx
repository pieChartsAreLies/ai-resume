import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
}

export default function ScrollReveal({ children, delay = 0, direction = "up", className }: ScrollRevealProps) {
  const initial = direction === "up"
    ? { opacity: 0, y: 32 }
    : direction === "left"
    ? { opacity: 0, x: -32 }
    : direction === "right"
    ? { opacity: 0, x: 32 }
    : { opacity: 0 };

  const animate = { opacity: 1, y: 0, x: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
