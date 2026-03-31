import { useCallback, useRef } from "react";

export function useMouseGlow() {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Normalize cursor position to -1..1 range from center
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    // Distance from center (0 at center, 1 at edge) drives intensity
    const dist = Math.min(1, Math.sqrt(nx * nx + ny * ny));
    // Shadow follows cursor direction, max ~18px offset
    el.style.setProperty("--glow-ox", `${nx * 18}px`);
    el.style.setProperty("--glow-oy", `${ny * 18}px`);
    // Stronger near edges (0.4 base + up to 0.6 more)
    el.style.setProperty("--glow-intensity", `${0.4 + dist * 0.6}`);
    el.style.setProperty("--glow-opacity", "1");
  }, []);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--glow-opacity", "0");
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
