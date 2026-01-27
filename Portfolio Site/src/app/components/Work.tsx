import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WorkDetailPanel, ProjectType } from '@/app/components/WorkDetailPanel';

export function Work() {
  const [activeProject, setActiveProject] = useState<ProjectType | null>(null);

  const projects = [
    {
      id: 'tableau-scale' as ProjectType,
      title: "Tableau @ Scale",
      description: "Scaled enterprise BI platform from 100 to 3,500 users through IPO with SOX-compliant governance.",
      company: "Chewy",
      metrics: "35x user growth | 8-node cluster | SOX-compliant"
    },
    {
      id: 'pii-reduction' as ProjectType,
      title: "PII Reduction Initiative",
      description: "Led cross-functional initiative to reduce PII in system logs by 97%, enabling IPO readiness.",
      company: "Chewy",
      metrics: "97% PII reduction | 30+ teams | IPO-critical"
    },
    {
      id: 'vendor-analytics' as ProjectType,
      title: "Vendor Analytics Platform",
      description: "Built external analytics platform used by 200+ vendors generating $10M+ annual revenue.",
      company: "Chewy",
      metrics: "$10M+ revenue | 200+ vendors | 3 business units"
    },
    {
      id: 'data-culture' as ProjectType,
      title: "Data Culture Conferences",
      description: "Launched Data Summit and Data Basecamp conferences, training 1,200+ employees.",
      company: "Chewy",
      metrics: "1,200+ trained | 200+ sessions | Company-wide"
    },
    {
      id: 'metric-trees' as ProjectType,
      title: "Metric Trees Framework",
      description: "Implemented metric trees as core measurement framework aligning business units to company objectives.",
      company: "Babylist",
      metrics: "Company-wide alignment | Clear prioritization"
    },
    {
      id: 'modern-stack' as ProjectType,
      title: "Modern Data Stack Homelab",
      description: "Personal infrastructure running Airflow, dbt, Qdrant, and LLM inference for continuous learning.",
      company: "Homelab",
      metrics: "Airflow | dbt | Qdrant | LM Studio"
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
          <p className="font-['Montserrat',sans-serif] font-medium text-[14px] text-[#87b7ff] mb-2 uppercase tracking-wide">
            {project.company}
          </p>
          <h3 className="font-['Montserrat',sans-serif] font-medium text-[20px] md:text-[23px] text-white mb-4 leading-tight">
            {project.title}
          </h3>
          <p className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#d9d9d9] mb-4 leading-relaxed">
            {project.description}
          </p>
          <p className="font-['Montserrat',sans-serif] font-light text-[14px] text-[#999] mb-8 italic">
            {project.metrics}
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => setActiveProject(project.id)}
              className="w-full md:w-[257px] h-[33px] border border-white rounded-[50px] font-['Montserrat',sans-serif] font-medium text-[#87b7ff] text-[16px] hover:bg-white/5 transition-colors cursor-pointer"
            >
              View Details
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
