import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WorkDetailPanel, ProjectType } from '@/app/components/WorkDetailPanel';

type ProjectCategory = 'professional' | 'personal';

interface Project {
  id: ProjectType;
  title: string;
  description: string;
  company: string;
  metrics: string;
  category: ProjectCategory;
  tags: string[];
}

// Domain-level tags (shown first)
const DOMAIN_TAGS = ['Analytics', 'Data Engineering', 'Product'] as const;

// All unique tags across projects
const ALL_TAGS = [
  // Domains (first row)
  ...DOMAIN_TAGS,
  // Data Platforms
  'Snowflake', 'Redshift', 'DuckDB', 'PostgreSQL',
  // Orchestration & Transform
  'Airflow', 'dbt', 'n8n',
  // BI & Analytics
  'Tableau', 'Hex',
  // AI/ML
  'RAG', 'LLM', 'Qdrant', 'Ollama', 'Whisper', 'Gemini',
  // Streaming & Events
  'Kafka', 'Real-time',
  // Governance & Security
  'SOX', 'GDPR', 'CCPA', 'PII', 'Governance',
  // Cloud & Infra
  'AWS', 'Proxmox', 'Python',
  // Leadership
  'Team Building', 'Culture',
] as const;

export function Work() {
  const [activeProject, setActiveProject] = useState<ProjectType | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('professional');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const projects: Project[] = [
    // Professional Projects
    {
      id: 'self-service-analytics' as ProjectType,
      title: "Self-Service Analytics at Scale",
      description: "Transformed analytics from organizational friction to self-service platform supporting 3,500+ users through IPO.",
      company: "Chewy",
      metrics: "35x user growth | 70%→30% warehouse load | Zero SOX findings",
      category: 'professional',
      tags: ['Analytics', 'Product', 'SOX', 'Governance']
    },
    {
      id: 'pii-reduction' as ProjectType,
      title: "Privacy Compliance at Scale",
      description: "Led cross-functional initiative through influence, not authority—changing behavior across 30+ resistant engineering teams to achieve 97% PII reduction.",
      company: "Chewy",
      metrics: "97% PII reduction | 30+ teams | Zero audit findings",
      category: 'professional',
      tags: ['Data Engineering', 'Governance', 'GDPR', 'CCPA']
    },
    {
      id: 'vendor-analytics' as ProjectType,
      title: "Vendor Data Services",
      description: "Turned operational data into a revenue-generating product—partnering with vendors to build self-service analytics that strengthened relationships.",
      company: "Chewy",
      metrics: "$10M+ revenue | 90% fewer ad-hoc requests | Data as Product",
      category: 'professional',
      tags: ['Analytics', 'Product', 'Snowflake', 'Tableau']
    },
    {
      id: 'data-culture' as ProjectType,
      title: "Data Literacy at Scale",
      description: "Built two complementary programs—Data Summit for showcasing work and Data Basecamp for curated training—that became part of Chewy's culture.",
      company: "Chewy",
      metrics: "1,200+ trained | 10→75+ sessions | 5 years",
      category: 'professional',
      tags: ['Analytics', 'Team Building', 'Culture']
    },
    {
      id: 'instrumentation-audit' as ProjectType,
      title: "Product Analytics Audit",
      description: "Conducted 80+ interviews across 30 teams to map the complete instrumentation workflow, exposing why measurement was broken and informing strategic decisions.",
      company: "Chewy",
      metrics: "80+ interviews | 124-step process mapped | C-suite presentation",
      category: 'professional',
      tags: ['Analytics', 'Product', 'Governance']
    },
    {
      id: 'data-platform-babylist' as ProjectType,
      title: "Data Platform Optimization",
      description: "Hands-on optimization of Snowflake platform—audited queries, refactored dbt, implemented cost governance—turning hypergrowth chaos into disciplined performance.",
      company: "Babylist",
      metrics: "30% cost reduction (~$145K) | 50% faster P95 | 50% more users",
      category: 'professional',
      tags: ['Data Engineering', 'Snowflake', 'dbt', 'Airflow']
    },
    {
      id: 'team-scaling' as ProjectType,
      title: "Building an Analytics Organization",
      description: "Started as staff engineer, became a trusted leader given teams as I proved myself—growing from solo contributor to leading ~30 people across BI, Governance, Splunk, and GRC.",
      company: "Chewy",
      metrics: "0→30 people | BI + Governance + Splunk + GRC | IPO-ready",
      category: 'professional',
      tags: ['Analytics', 'Team Building', 'Culture']
    },
    {
      id: 'data-governance' as ProjectType,
      title: "Enterprise Data Governance",
      description: "Built governance capability from scratch—data catalog rollout, CCPA/GDPR compliance, SOX controls, and automated path-to-production processes.",
      company: "Chewy",
      metrics: "CCPA compliant | GDPR ready | SOX validated",
      category: 'professional',
      tags: ['Data Engineering', 'Governance', 'CCPA', 'GDPR', 'SOX']
    },
    // Personal Projects
    {
      id: 'ai-resume' as ProjectType,
      title: "AI Career Assistant",
      description: "RAG-powered portfolio with conversational AI, job matching, and security hardening against prompt injection.",
      company: "Personal Project",
      metrics: "25+ security tests | Gemini + Qdrant | React + Chainlit",
      category: 'personal',
      tags: ['RAG', 'LLM', 'Qdrant', 'Gemini', 'Python']
    },
    // TODO: Uncomment when Palm Beach County real estate project is ready
    // {
    //   id: 'modern-stack' as ProjectType,
    //   title: "Modern Data Stack Homelab",
    //   description: "Personal infrastructure running Airflow, dbt, Qdrant, and LLM inference for continuous learning.",
    //   company: "Homelab",
    //   metrics: "Airflow | dbt | Qdrant | LM Studio",
    //   category: 'personal',
    //   tags: ['Airflow', 'dbt', 'DuckDB', 'PostgreSQL', 'Proxmox', 'Qdrant']
    // },
    {
      id: 'voice-clone' as ProjectType,
      title: "Voice Clone Studio",
      description: "Weekend build: saw Qwen3-TTS release, shipped a working voice cloning app by Sunday. From 'interesting new model' to functional product in 48 hours.",
      company: "Personal Project",
      metrics: "48-hour build | Qwen3-TTS + mlx-Whisper | 7 voice effects",
      category: 'personal',
      tags: ['LLM', 'Whisper', 'Python']
    },
    {
      id: 'whisper-notes' as ProjectType,
      title: "WhisperNotes",
      description: "Built to fix my own workflow: Cmd+Shift+J captures voice, transcribes locally, summarizes with Ollama, and drops it into my Obsidian vault. I use it daily.",
      company: "Personal Project",
      metrics: "Daily driver | Cmd+Shift+R/J hotkeys | Zero cloud dependencies",
      category: 'personal',
      tags: ['Whisper', 'Ollama', 'LLM', 'Python']
    },
    {
      id: 'obsidian-rag' as ProjectType,
      title: "Obsidian Knowledge RAG",
      description: "Semantic search across 3,000+ notes using n8n workflows, Qdrant vectors, and local Ollama embeddings.",
      company: "Personal Project",
      metrics: "3,000+ files | n8n | Qdrant | Batch ETL pipeline",
      category: 'personal',
      tags: ['RAG', 'Qdrant', 'Ollama', 'n8n', 'Proxmox']
    },
  ];

  // Get tags relevant to current category
  const categoryTags = useMemo(() => {
    const categoryProjects = projects.filter(p => p.category === activeCategory);
    const tagSet = new Set<string>();
    categoryProjects.forEach(p => p.tags.forEach(t => tagSet.add(t)));
    return ALL_TAGS.filter(tag => tagSet.has(tag));
  }, [activeCategory]);

  // Filter projects by category and selected tags
  const filteredProjects = useMemo(() => {
    let filtered = projects.filter(p => p.category === activeCategory);
    if (selectedTags.length > 0) {
      filtered = filtered.filter(p =>
        selectedTags.some(tag => p.tags.includes(tag))
      );
    }
    return filtered;
  }, [activeCategory, selectedTags]);

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearTags = () => setSelectedTags([]);

  const handleCategoryChange = (category: ProjectCategory) => {
    setActiveCategory(category);
    setSelectedTags([]); // Clear tags when switching categories
  };

  const handleNextProject = () => {
    if (!activeProject) return;
    const currentIndex = filteredProjects.findIndex(p => p.id === activeProject);
    const nextIndex = (currentIndex + 1) % filteredProjects.length;
    setActiveProject(filteredProjects[nextIndex].id);
  };

  return (
    <div className="flex flex-col items-center pt-[112px] md:pt-[132px] pb-20 px-4 gap-6">
      {/* Category Toggle */}
      <div className="flex gap-2 bg-[#332F2B] p-1 rounded-full">
        <button
          onClick={() => handleCategoryChange('professional')}
          className={`px-6 py-2 rounded-full font-['Montserrat',sans-serif] font-medium text-[14px] transition-all ${
            activeCategory === 'professional'
              ? 'bg-[#D4A853] text-[#2A2622]'
              : 'text-[#FAF7F2] hover:bg-[#FAF7F2]/10'
          }`}
        >
          Professional
        </button>
        <button
          onClick={() => handleCategoryChange('personal')}
          className={`px-6 py-2 rounded-full font-['Montserrat',sans-serif] font-medium text-[14px] transition-all ${
            activeCategory === 'personal'
              ? 'bg-[#D4A853] text-[#2A2622]'
              : 'text-[#FAF7F2] hover:bg-[#FAF7F2]/10'
          }`}
        >
          Personal / AI
        </button>
      </div>

      {/* Category Description */}
      <motion.p
        key={activeCategory}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-['Montserrat',sans-serif] font-light text-[14px] text-[#9C9489] text-center max-w-[600px]"
      >
        {activeCategory === 'professional'
          ? 'Enterprise data platform and analytics leadership projects'
          : 'AI experiments, homelab infrastructure, and side projects'
        }
      </motion.p>

      {/* Tag Cloud Filter */}
      <motion.div
        key={`tags-${activeCategory}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-3 max-w-[800px]"
      >
        {/* Domain Tags - Top Row */}
        <div className="flex flex-wrap justify-center gap-2">
          {DOMAIN_TAGS.filter(tag => categoryTags.includes(tag)).map(tag => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-4 py-1.5 rounded-full text-[13px] font-['Montserrat',sans-serif] font-semibold transition-all ${
                selectedTags.includes(tag)
                  ? 'bg-[#D4A853] text-[#2A2622]'
                  : 'bg-[#4A4440] text-[#FAF7F2] hover:bg-[#D4A853] hover:text-[#2A2622]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Other Tags - Second Row */}
        <div className="flex flex-wrap justify-center gap-2">
          {categoryTags.filter(tag => !DOMAIN_TAGS.includes(tag as typeof DOMAIN_TAGS[number])).map(tag => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-1 rounded-full text-[12px] font-['Montserrat',sans-serif] font-medium transition-all ${
                selectedTags.includes(tag)
                  ? 'bg-[#D4A853] text-[#2A2622]'
                  : 'bg-[#332F2B] text-[#9C9489] hover:text-[#FAF7F2] hover:bg-[#4A4440]'
              }`}
            >
              {tag}
            </button>
          ))}
          {selectedTags.length > 0 && (
            <button
              onClick={clearTags}
              className="px-3 py-1 rounded-full text-[12px] font-['Montserrat',sans-serif] font-medium bg-transparent text-[#C4785C] hover:text-[#D4A853] transition-all"
            >
              Clear filters
            </button>
          )}
        </div>
      </motion.div>

      {/* Project Count */}
      {selectedTags.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-['Montserrat',sans-serif] font-light text-[12px] text-[#7A7368]"
        >
          Showing {filteredProjects.length} of {projects.filter(p => p.category === activeCategory).length} projects
        </motion.p>
      )}

      {/* Projects Header */}
      <h2 className="font-['Montserrat',sans-serif] font-medium text-[24px] md:text-[28px] text-[#FAF7F2] mt-4">
        Projects
      </h2>

      {/* Projects */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeCategory}-${selectedTags.join(',')}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-[1200px]"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#4A4440] rounded-[16px] shadow-[2px_4px_11px_0px_rgba(0,0,0,0.25)] p-6 md:p-8 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-2">
                <p className="font-['Montserrat',sans-serif] font-medium text-[14px] text-[#D4A853] uppercase tracking-wide">
                  {project.company}
                </p>
                {project.category === 'personal' && (
                  <span className="bg-[#8B5A3C] text-[#FAF7F2] text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                    AI/ML
                  </span>
                )}
              </div>
              <h3 className="font-['Montserrat',sans-serif] font-medium text-[20px] md:text-[23px] text-[#FAF7F2] mb-4 leading-tight">
                {project.title}
              </h3>
              <p className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#D4CFC8] mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Project Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className={`px-2 py-0.5 rounded text-[11px] font-['Montserrat',sans-serif] ${
                      selectedTags.includes(tag)
                        ? 'bg-[#D4A853]/30 text-[#D4A853]'
                        : 'bg-[#332F2B] text-[#9C9489]'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="font-['Montserrat',sans-serif] font-light text-[13px] text-[#9C9489] mb-6 italic">
                {project.metrics}
              </p>
              <div className="flex justify-end mt-auto">
                <button
                  onClick={() => setActiveProject(project.id)}
                  className="w-full h-[33px] border border-[#FAF7F2] rounded-[50px] font-['Montserrat',sans-serif] font-medium text-[#D4A853] text-[14px] hover:bg-[#FAF7F2]/5 transition-colors cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

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
