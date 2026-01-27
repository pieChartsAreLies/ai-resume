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

// All unique tags across projects
const ALL_TAGS = [
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
      id: 'tableau-scale' as ProjectType,
      title: "Tableau @ Scale",
      description: "Scaled enterprise BI platform from 100 to 3,500 users through IPO with SOX-compliant governance.",
      company: "Chewy",
      metrics: "35x user growth | 8-node cluster | SOX-compliant",
      category: 'professional',
      tags: ['Tableau', 'SOX', 'Governance', 'Team Building']
    },
    {
      id: 'pii-reduction' as ProjectType,
      title: "PII Reduction Initiative",
      description: "Led cross-functional initiative to reduce PII in system logs by 97%, enabling IPO readiness.",
      company: "Chewy",
      metrics: "97% PII reduction | 30+ teams | IPO-critical",
      category: 'professional',
      tags: ['PII', 'Governance', 'CCPA', 'Python']
    },
    {
      id: 'vendor-analytics' as ProjectType,
      title: "Vendor Analytics Platform",
      description: "Built external analytics platform used by 200+ vendors generating $10M+ annual revenue.",
      company: "Chewy",
      metrics: "$10M+ revenue | 200+ vendors | 3 business units",
      category: 'professional',
      tags: ['Tableau', 'Snowflake', 'dbt', 'Airflow']
    },
    {
      id: 'data-culture' as ProjectType,
      title: "Data Culture Conferences",
      description: "Launched Data Summit and Data Basecamp conferences, training 1,200+ employees.",
      company: "Chewy",
      metrics: "1,200+ trained | 200+ sessions | Company-wide",
      category: 'professional',
      tags: ['Culture', 'Team Building', 'Tableau']
    },
    {
      id: 'event-pipeline' as ProjectType,
      title: "Real-Time Event Pipeline",
      description: "Built Kafka-based event streaming platform replacing third-party vendor, enabling ML/AI use cases at fraction of cost.",
      company: "Chewy",
      metrics: "Significant cost reduction | Real-time | ML-ready",
      category: 'professional',
      tags: ['Kafka', 'Real-time', 'AWS', 'Python']
    },
    {
      id: 'instrumentation-audit' as ProjectType,
      title: "Mobile Instrumentation Audit",
      description: "Conducted 4-month audit across 30 teams exposing iOS/Android schema misalignment, driving mobile re-architecture.",
      company: "Chewy",
      metrics: "30 teams audited | C-suite decision | $8B+ impact",
      category: 'professional',
      tags: ['Governance', 'Real-time', 'Python']
    },
    {
      id: 'data-platform-babylist' as ProjectType,
      title: "Data Platform Optimization",
      description: "Architected Snowflake platform with dbt transformations, significantly reducing costs while improving P95 latency 50%.",
      company: "Babylist",
      metrics: "Major cost savings | 50% faster | 50% more users",
      category: 'professional',
      tags: ['Snowflake', 'dbt', 'Airflow', 'Hex']
    },
    {
      id: 'metric-trees' as ProjectType,
      title: "Metric Trees Framework",
      description: "Implemented metric trees as core measurement framework aligning business units to company objectives.",
      company: "Babylist",
      metrics: "Company-wide alignment | Clear prioritization",
      category: 'professional',
      tags: ['Snowflake', 'dbt', 'Governance']
    },
    {
      id: 'team-scaling' as ProjectType,
      title: "Analytics Org 0→30",
      description: "Built Chewy's analytics function from solo contributor to 30-person org across 4 locations through IPO.",
      company: "Chewy",
      metrics: "0→30 people | 4 locations | IPO-ready",
      category: 'professional',
      tags: ['Team Building', 'Culture', 'Governance']
    },
    {
      id: 'data-governance' as ProjectType,
      title: "Enterprise Data Governance",
      description: "Launched enterprise governance program with Alation catalog and OneTrust privacy, supporting CCPA/GDPR compliance.",
      company: "Chewy",
      metrics: "CCPA compliant | GDPR ready | SOX controls",
      category: 'professional',
      tags: ['Governance', 'CCPA', 'GDPR', 'SOX', 'PII']
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
    {
      id: 'modern-stack' as ProjectType,
      title: "Modern Data Stack Homelab",
      description: "Personal infrastructure running Airflow, dbt, Qdrant, and LLM inference for continuous learning.",
      company: "Homelab",
      metrics: "Airflow | dbt | Qdrant | LM Studio",
      category: 'personal',
      tags: ['Airflow', 'dbt', 'DuckDB', 'PostgreSQL', 'Proxmox', 'Qdrant']
    },
    {
      id: 'voice-clone' as ProjectType,
      title: "Voice Clone Studio",
      description: "Privacy-first voice cloning with Qwen3-TTS, real-time effects, and multi-language support running entirely local.",
      company: "Personal Project",
      metrics: "Qwen3-TTS | mlx-Whisper | 7 voice effects | Apple Silicon",
      category: 'personal',
      tags: ['LLM', 'Whisper', 'Python']
    },
    {
      id: 'whisper-notes' as ProjectType,
      title: "WhisperNotes",
      description: "Local-first dictation and AI journaling with global hotkeys, Whisper transcription, and Ollama summarization.",
      company: "Personal Project",
      metrics: "Whisper | Ollama | Global hotkeys | Privacy-first",
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
      <div className="flex gap-2 bg-[#3a3a3a] p-1 rounded-full">
        <button
          onClick={() => handleCategoryChange('professional')}
          className={`px-6 py-2 rounded-full font-['Montserrat',sans-serif] font-medium text-[14px] transition-all ${
            activeCategory === 'professional'
              ? 'bg-[#87b7ff] text-[#1a1a1a]'
              : 'text-white hover:bg-white/10'
          }`}
        >
          Professional
        </button>
        <button
          onClick={() => handleCategoryChange('personal')}
          className={`px-6 py-2 rounded-full font-['Montserrat',sans-serif] font-medium text-[14px] transition-all ${
            activeCategory === 'personal'
              ? 'bg-[#87b7ff] text-[#1a1a1a]'
              : 'text-white hover:bg-white/10'
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
        className="font-['Montserrat',sans-serif] font-light text-[14px] text-[#999] text-center max-w-[600px]"
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
        className="flex flex-wrap justify-center gap-2 max-w-[800px]"
      >
        {categoryTags.map(tag => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`px-3 py-1 rounded-full text-[12px] font-['Montserrat',sans-serif] font-medium transition-all ${
              selectedTags.includes(tag)
                ? 'bg-[#87b7ff] text-[#1a1a1a]'
                : 'bg-[#3a3a3a] text-[#999] hover:text-white hover:bg-[#4a4a4a]'
            }`}
          >
            {tag}
          </button>
        ))}
        {selectedTags.length > 0 && (
          <button
            onClick={clearTags}
            className="px-3 py-1 rounded-full text-[12px] font-['Montserrat',sans-serif] font-medium bg-transparent text-[#ff8787] hover:text-[#ff6b6b] transition-all"
          >
            Clear filters
          </button>
        )}
      </motion.div>

      {/* Project Count */}
      {selectedTags.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-['Montserrat',sans-serif] font-light text-[12px] text-[#666]"
        >
          Showing {filteredProjects.length} of {projects.filter(p => p.category === activeCategory).length} projects
        </motion.p>
      )}

      {/* Projects */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeCategory}-${selectedTags.join(',')}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex flex-col items-center gap-8 w-full"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#4a4a4a] rounded-[16px] shadow-[2px_4px_11px_0px_rgba(0,0,0,0.25)] p-8 md:p-12 max-w-[800px] w-full"
            >
              <div className="flex items-center gap-3 mb-2">
                <p className="font-['Montserrat',sans-serif] font-medium text-[14px] text-[#87b7ff] uppercase tracking-wide">
                  {project.company}
                </p>
                {project.category === 'personal' && (
                  <span className="bg-[#667eea] text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                    AI/ML
                  </span>
                )}
              </div>
              <h3 className="font-['Montserrat',sans-serif] font-medium text-[20px] md:text-[23px] text-white mb-4 leading-tight">
                {project.title}
              </h3>
              <p className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#d9d9d9] mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Project Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className={`px-2 py-0.5 rounded text-[11px] font-['Montserrat',sans-serif] ${
                      selectedTags.includes(tag)
                        ? 'bg-[#87b7ff]/30 text-[#87b7ff]'
                        : 'bg-[#3a3a3a] text-[#888]'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

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
