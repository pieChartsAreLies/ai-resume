import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WorkDetailPanel, ProjectType } from '@/app/components/WorkDetailPanel';

export function Work() {
  const [activeProject, setActiveProject] = useState<ProjectType | null>(null);

  const projects = [
    {
      id: 'power-quality' as ProjectType,
      title: "Electrical System Power Quality Management",
      description: "New product feature to monitor power quality in an industrial electrical system.",
    },
    {
      id: 'case-study' as ProjectType,
      title: "Case Study: Manufacturing Admin Dashboard",
      description: "A brief case study of the design and development of an AI powered manufacturing facility administrator dashboard.",
    },
    {
      id: 'demand-response' as ProjectType,
      title: "Utility Response Program Dashboard",
      description: "A dashboard for monitoring the performance of various utility scale peak shaving programs.",
    },
  ];

  const handleNextProject = () => {
    if (!activeProject) return;
    const currentIndex = projects.findIndex(p => p.id === activeProject);
    const nextIndex = (currentIndex + 1) % projects.length;
    setActiveProject(projects[nextIndex].id);
  };

  return (
    <div className="flex flex-col items-center pt-[112px] md:pt-[132px] pb-20 px-4 gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-[#4a4a4a] rounded-[16px] shadow-[2px_4px_11px_0px_rgba(0,0,0,0.25)] p-8 md:p-12 max-w-[800px] w-full"
        >
          <h3 className="font-['Montserrat',sans-serif] font-medium text-[20px] md:text-[23px] text-white mb-4 leading-tight">
            {project.title}
          </h3>
          <p className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#d9d9d9] mb-8 leading-relaxed">
            {project.description}
          </p>
          <div className="flex justify-end">
            <button 
              onClick={() => setActiveProject(project.id)}
              className="w-full md:w-[257px] h-[33px] border border-white rounded-[50px] font-['Montserrat',sans-serif] font-medium text-[#87b7ff] text-[16px] hover:bg-white/5 transition-colors cursor-pointer"
            >
              View Work
            </button>
          </div>
        </motion.div>
      ))}

      <AnimatePresence mode="wait">
        {activeProject && (
          <motion.div key={activeProject} className="fixed inset-0 z-[90]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <WorkDetailPanel 
              type={activeProject} 
              onClose={() => setActiveProject(null)} 
              onNextProject={handleNextProject}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
