import { useInView } from "framer-motion";
import { useRef } from "react";

export function useScrollReveal(options?: { once?: boolean; margin?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: options?.once ?? true,
    margin: (options?.margin ?? "-80px") as any,
  });
  return { ref, isInView };
}
