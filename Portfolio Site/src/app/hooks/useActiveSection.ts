import { useState, useEffect } from 'react';

interface UseActiveSectionOptions {
  sectionIds: string[];
  offset?: number;
}

export function useActiveSection({
  sectionIds,
  offset = 120
}: UseActiveSectionOptions): string {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '');

  useEffect(() => {
    const handleScroll = () => {
      // Get the midpoint of the viewport (50% of screen height)
      const viewportMid = window.scrollY + window.innerHeight * 0.5;

      let currentSection = sectionIds[0];

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = window.scrollY + rect.top - offset;

          // If the section's top is above the viewport midpoint, it becomes active
          if (elementTop <= viewportMid) {
            currentSection = id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    // Run on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
}
