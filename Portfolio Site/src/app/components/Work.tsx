import React, { useState, useMemo, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WorkDetailPanel, ProjectType } from '@/app/components/WorkDetailPanel';

const GearSiftShowcase = lazy(() => import('@/app/components/GearSiftShowcase').then(m => ({ default: m.GearSiftShowcase })));

type ProjectCategory = 'professional' | 'personal';

interface Project {
  id: ProjectType;
  title: string;
  description: string;
  company: string;
  metrics: string;
  category: ProjectCategory;
  tags: string[];
  github?: string;
  featured?: boolean;
}

// Domain-level tags (shown first)
const DOMAIN_TAGS = ['Analytics', 'Data Engineering', 'Product'] as const;

// All unique tags across projects
const ALL_TAGS = [
  // Domains (first row)
  ...DOMAIN_TAGS,
  // Data Platforms
  'Snowflake', 'Redshift', 'DuckDB', 'PostgreSQL', 'SQLite',
  // Orchestration & Transform
  'Airflow', 'dbt',
  // BI & Analytics
  'Tableau', 'Hex', 'Recharts', 'Mapbox', 'Evidence', 'Metabase',
  // AI/ML
  'LLM', 'Ollama', 'Whisper', 'Gemini', 'Claude SDK', 'FastAPI',
  // Streaming & Events
  'Kafka', 'Real-time',
  // Governance & Security
  'SOX', 'GDPR', 'CCPA', 'PII', 'Governance',
  // Cloud & Infra
  'AWS', 'Proxmox', 'Python', 'Docker', 'Cloudflare', 'Astro',
  // Frontend
  'Next.js', 'Node.js',
  // Communication
  'WhatsApp', 'Discord',
  // Leadership
  'Team Building', 'Culture',
] as const;

export function Work() {
  const [activeProject, setActiveProject] = useState<ProjectType | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('professional');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showGearSift, setShowGearSift] = useState(false);

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
      id: 'gearsift' as ProjectType,
      title: "GearSift",
      description: "Outdoor gear advisor that aggregates expert reviews from YouTube, retailers, and Reddit, then scores products with category-specific algorithms. Static site with baked affiliate links for CDN-independent revenue.",
      company: "Personal Project",
      metrics: "396 products | 9 scoring engines | 97 tests | 59 migrations",
      category: 'personal',
      tags: ['LLM', 'Python', 'PostgreSQL', 'Astro', 'Cloudflare', 'FastAPI'],
      featured: true
    },
    {
      id: 'jobkit' as ProjectType,
      title: "JobKit",
      description: "Automated job search toolkit: scrapes multiple boards, AI-scores roles with enforced distribution targets, generates two-pass audited resumes, and tracks outcomes in Obsidian dashboards.",
      company: "Personal Project",
      metrics: "72 tests | 8 CLI commands | Two-pass resume audit",
      category: 'personal',
      tags: ['Python', 'LLM', 'SQLite', 'Docker'],
      github: 'https://github.com/pieChartsAreLies/JobKit'
    },
    {
      id: 'reflection' as ProjectType,
      title: "Reflection",
      description: "Local-first voice journaling app with automatic emotion/topic tagging and an interactive knowledge graph that reveals patterns across entries. All processing stays on-device.",
      company: "Personal Project",
      metrics: "5-min Docker setup | Knowledge graph | Obsidian sync",
      category: 'personal',
      tags: ['Next.js', 'Python', 'Whisper', 'Ollama', 'SQLite'],
    },
    {
      id: 'hoa-dashboard' as ProjectType,
      title: "HOA Dashboard",
      description: "Interactive neighborhood analytics dashboard: Mapbox parcel map, equity calculator, value leaderboards, and sell scenario modeler built from public county records.",
      company: "Personal Project",
      metrics: "122 properties | 723 sales | 8 chart types | Mapbox",
      category: 'personal',
      tags: ['Next.js', 'Mapbox', 'Recharts', 'SQLite', 'Docker'],
      github: 'https://github.com/pieChartsAreLies/hoa-dashboard'
    },
    {
      id: 'tautulli-pipeline' as ProjectType,
      title: "Tautulli Pipeline",
      description: "End-to-end data warehouse for Plex media analytics: Airflow extraction, dbt transformation, PostgreSQL storage, dual dashboards (Evidence + Metabase). Full modern data stack on homelab.",
      company: "Personal Project",
      metrics: "4 DAGs | dbt models | Dual dashboards | ~3,920 records",
      category: 'personal',
      tags: ['Airflow', 'dbt', 'PostgreSQL', 'Evidence', 'Metabase']
    },
    {
      id: 'whisper-notes' as ProjectType,
      title: "WhisperNotes",
      description: "Built to fix my own workflow: Cmd+Shift+J captures voice, transcribes locally, summarizes with Ollama, and drops it into my Obsidian vault. I use it daily.",
      company: "Personal Project",
      metrics: "Daily driver | Cmd+Shift+R/J hotkeys | Zero cloud dependencies",
      category: 'personal',
      tags: ['Whisper', 'Ollama', 'LLM', 'Python'],
      github: 'https://github.com/pieChartsAreLies/WhisperNotes'
    },
    {
      id: 'nanoclaw' as ProjectType,
      title: "NanoClaw (Bob)",
      description: "Claude assistant in containers with WhatsApp/Discord I/O. Per-group isolation, scheduled tasks, and skills-based extensibility. Small, understandable codebase by design.",
      company: "Personal Project",
      metrics: "Per-group isolation | Scheduled tasks | Skills system",
      category: 'personal',
      tags: ['Claude SDK', 'Node.js', 'WhatsApp', 'Discord', 'Docker'],
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

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const regularProjects = filteredProjects.filter(p => !p.featured);

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
          : 'Hands-on AI builds that demonstrate working methods, not just ideas'
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

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <AnimatePresence mode="wait">
          <motion.div
            key={`featured-${activeCategory}-${selectedTags.join(',')}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-[1200px]"
          >
            {featuredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-[#4A4440] to-[#3A3632] rounded-[16px] shadow-[2px_4px_20px_0px_rgba(0,0,0,0.35)] p-8 md:p-10 flex flex-col border border-[#D4A853]/20"
              >
                <div className="flex items-center gap-3 mb-2">
                  <p className="font-['Montserrat',sans-serif] font-medium text-[14px] text-[#D4A853] uppercase tracking-wide">
                    {project.company}
                  </p>
                  <span className="bg-[#D4A853]/20 text-[#D4A853] text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-['Montserrat',sans-serif] font-semibold">
                    Featured
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-['Montserrat',sans-serif] font-medium text-[24px] md:text-[28px] text-[#FAF7F2] mb-4 leading-tight">
                    {project.title}
                  </h3>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#9C9489] hover:text-[#D4A853] transition-colors shrink-0 mt-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                    </a>
                  )}
                </div>
                <p className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#D4CFC8] mb-4 leading-relaxed">
                  {project.description}
                </p>
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
                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={() => project.id === 'gearsift' ? setShowGearSift(true) : setActiveProject(project.id)}
                    className="flex-1 h-[40px] bg-[#D4A853] rounded-[50px] font-['Montserrat',sans-serif] font-medium text-[#2A2622] text-[14px] hover:bg-[#E0B864] transition-colors cursor-pointer"
                  >
                    {project.id === 'gearsift' ? 'Explore GearSift' : 'View Details'}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Regular Projects Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeCategory}-${selectedTags.join(',')}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-[1200px]"
        >
          {regularProjects.map((project, index) => (
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
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-['Montserrat',sans-serif] font-medium text-[20px] md:text-[23px] text-[#FAF7F2] mb-4 leading-tight">
                  {project.title}
                </h3>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9C9489] hover:text-[#D4A853] transition-colors shrink-0 mt-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  </a>
                )}
              </div>
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

      {/* Detail Panel Overlay */}
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

      {/* GearSift Showcase Overlay */}
      <AnimatePresence>
        {showGearSift && (
          <Suspense fallback={null}>
            <GearSiftShowcase onClose={() => setShowGearSift(false)} />
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
}
