import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';

import screenshotHome from '@/assets/screenshots/gearsift-home.webp';
import screenshotCategory from '@/assets/screenshots/gearsift-category.webp';
import screenshotProduct from '@/assets/screenshots/gearsift-product.webp';

interface GearSiftShowcaseProps {
  onClose: () => void;
}

const METRICS = [
  { value: '97', label: 'Test Files' },
  { value: '59', label: 'Migrations' },
  { value: '396', label: 'Products' },
  { value: '9', label: 'Categories' },
];

const PIPELINES = [
  {
    name: 'Amazon (ScrapingDog)',
    description: 'ASIN discovery and product data extraction via ScrapingDog API. 4-stage workflow: discover ASINs, fetch product pages, parse specifications, normalize attributes.',
    icon: 'A',
  },
  {
    name: 'YouTube Reviews',
    description: '20 monitored reviewer channels. Videos classified by product category, matched to catalog entries, and facts extracted for scoring aggregation.',
    icon: 'Y',
  },
  {
    name: 'Web Scraping',
    description: 'REI, Outdoor Gear Lab, Switchback Travel. 3-tier extraction: product listings, detailed specs, and expert verdict summaries.',
    icon: 'W',
  },
  {
    name: 'AvantLink Feeds',
    description: 'REI and Backcountry affiliate product feeds. Automated sync of pricing, availability, and affiliate URLs baked into static HTML at build time.',
    icon: 'F',
  },
  {
    name: 'Reddit Trends',
    description: '6 subreddits monitored. Gemini-powered structured analysis extracts product mentions, sentiment, and emerging category trends.',
    icon: 'R',
  },
];

const SCORERS = [
  'Tents', 'Backpacks', 'Sleeping Bags', 'Sleeping Pads', 'Headlamps',
  'Camp Stoves', 'Water Filtration', 'Cookware', 'Water Bottles',
];

const INFRA = [
  { name: 'Proxmox Self-Hosted Infrastructure', role: 'FastAPI backend, Admin Dashboard, scheduled jobs', detail: 'Dedicated container with systemd timers' },
  { name: 'PostgreSQL 15', role: 'Product catalog, reviews, scores, pipeline state', detail: 'Self-hosted, 59 migrations' },
  { name: 'Apache Airflow', role: 'Pipeline orchestration', detail: 'Scheduled extraction and enrichment DAGs' },
  { name: 'Local Inference Engine', role: 'LLM-powered enrichment', detail: 'Ollama (Qwen 2.5 14B, Qwen 3 8B)' },
  { name: 'ScrapingDog Proxy', role: 'Proxy rotation for Amazon scraping', detail: 'Residential proxies, rate limiting' },
  { name: 'Cloudflare Pages', role: 'Static site CDN', detail: 'gearsift.com' },
  { name: 'Cloudflare R2', role: 'Image storage pipeline', detail: 'WebP conversion + thumbnails' },
  { name: 'Admin Dashboard', role: 'Pipeline control and product management', detail: 'FastAPI + HTMX, data quality monitoring' },
];

const PROD_METRICS = [
  { value: '97', label: 'Test files', sub: 'Models, pipelines, scrapers, admin, scoring, routes' },
  { value: '59', label: 'DB migrations', sub: 'Production-grade schema evolution' },
  { value: '6', label: 'Scheduled jobs', sub: 'Automated extraction and enrichment' },
  { value: '32', label: 'Uptime monitors', sub: 'Uptime Kuma service health checks' },
  { value: '380+', label: 'Static pages', sub: 'Pre-rendered at build time' },
  { value: '20', label: 'YouTube channels', sub: 'Monitored for review content' },
];

const SCREENSHOTS = [
  { src: screenshotHome, label: 'Homepage', desc: 'Hero with category navigation and featured products' },
  { src: screenshotCategory, label: 'Category Page', desc: 'Product grid with filters, sorting, and comparison tools' },
  { src: screenshotProduct, label: 'Product Detail', desc: 'Competitive analysis with "How It Stacks Up" bar charts' },
];

export function GearSiftShowcase({ onClose }: GearSiftShowcaseProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  const { scrollYProgress } = useScroll({ container: scrollRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100]"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Showcase Panel */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 200 }}
        className="absolute inset-x-0 bottom-0 top-8 md:top-12 flex justify-center"
      >
        <div
          ref={scrollRef}
          className="bg-[#2A2622] w-full max-w-[900px] overflow-y-auto rounded-t-[20px] shadow-[0_-8px_40px_rgba(0,0,0,0.5)] relative custom-scrollbar"
        >
          {/* Progress Bar */}
          <motion.div
            className="sticky top-0 left-0 right-0 h-1 bg-[#D4A853] origin-left z-20"
            style={{ scaleX }}
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="sticky top-3 float-right mr-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-[#332F2B] hover:bg-[#4A4440] text-[#FAF7F2] transition-colors cursor-pointer"
          >
            <span className="text-[18px]">&times;</span>
          </button>

          {/* === HERO === */}
          <div className="px-6 md:px-12 pt-10 pb-8">
            <p className="font-['Montserrat',sans-serif] font-medium text-[14px] text-[#D4A853] uppercase tracking-wide mb-2">
              Flagship Project
            </p>
            <h1 className="font-['Montserrat',sans-serif] font-medium text-[36px] md:text-[48px] text-[#FAF7F2] leading-tight mb-3">
              GearSift
            </h1>
            <p className="font-['Montserrat',sans-serif] font-light text-[18px] md:text-[20px] text-[#D4CFC8] max-w-[700px] leading-relaxed mb-8">
              Data-driven outdoor gear advisor. Aggregates expert reviews from YouTube, retailers, and Reddit, then scores products with category-specific algorithms and serves them on a static site with baked affiliate links.
            </p>
            {/* Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {METRICS.map((m) => (
                <div key={m.label} className="bg-[#332F2B] rounded-lg p-4 text-center">
                  <p className="font-['Montserrat',sans-serif] font-semibold text-[28px] text-[#D4A853]">
                    {m.value}
                  </p>
                  <p className="font-['Montserrat',sans-serif] font-light text-[13px] text-[#9C9489]">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* === ARCHITECTURE OVERVIEW === */}
          <div className="px-6 md:px-12 py-8 border-t border-[#FAF7F2]/5">
            <h2 className="font-['Montserrat',sans-serif] font-medium text-[24px] text-[#FAF7F2] mb-6">
              Architecture Overview
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 text-center">
              {['Sources', 'Ingestion', 'Enrichment', 'Scoring', 'Presentation'].map((stage, i) => (
                <React.Fragment key={stage}>
                  <div className="bg-[#4A4440] rounded-lg px-4 py-3 min-w-[100px]">
                    <p className="font-['Montserrat',sans-serif] font-medium text-[14px] text-[#FAF7F2]">
                      {stage}
                    </p>
                    <p className="font-['Montserrat',sans-serif] font-light text-[11px] text-[#9C9489] mt-0.5">
                      {['Amazon, YouTube, REI, Reddit, AvantLink', 'ScrapingDog, APIs, Web Scrapers', 'Ollama, Gemini, Spec Normalization', '9 Category Scorers, Percentile Ranking', 'Astro Static Site, Cloudflare CDN'][i]}
                    </p>
                  </div>
                  {i < 4 && (
                    <span className="text-[#D4A853] font-medium text-[18px] hidden md:block">&rarr;</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* === DATA PIPELINES === */}
          <div className="px-6 md:px-12 py-8 border-t border-[#FAF7F2]/5">
            <h2 className="font-['Montserrat',sans-serif] font-medium text-[24px] text-[#FAF7F2] mb-6">
              Data Pipelines
            </h2>
            <div className="grid gap-4">
              {PIPELINES.map((p) => (
                <div key={p.name} className="bg-[#332F2B] rounded-lg p-5 flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#D4A853]/20 flex items-center justify-center shrink-0">
                    <span className="font-['Montserrat',sans-serif] font-semibold text-[16px] text-[#D4A853]">
                      {p.icon}
                    </span>
                  </div>
                  <div>
                    <p className="font-['Montserrat',sans-serif] font-medium text-[16px] text-[#FAF7F2] mb-1">
                      {p.name}
                    </p>
                    <p className="font-['Montserrat',sans-serif] font-light text-[14px] text-[#D4CFC8] leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* === SCORING ENGINE === */}
          <div className="px-6 md:px-12 py-8 border-t border-[#FAF7F2]/5">
            <h2 className="font-['Montserrat',sans-serif] font-medium text-[24px] text-[#FAF7F2] mb-3">
              Scoring Engine
            </h2>
            <p className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#D4CFC8] mb-6 leading-relaxed">
              Each category has a dedicated scorer with domain-specific criteria and weights. Products receive percentile-based competitive rankings visualized as radar charts. Scores aggregate expert review ratings, spec comparisons, user sentiment, and value-for-money calculations.
            </p>
            <div className="flex flex-wrap gap-2">
              {SCORERS.map((s) => (
                <span
                  key={s}
                  className="bg-[#4A4440] text-[#FAF7F2] px-3 py-1.5 rounded-full text-[13px] font-['Montserrat',sans-serif] font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* === SCREENSHOTS === */}
          <div className="px-6 md:px-12 py-8 border-t border-[#FAF7F2]/5">
            <h2 className="font-['Montserrat',sans-serif] font-medium text-[24px] text-[#FAF7F2] mb-6">
              Screenshots
            </h2>
            {/* Tab buttons */}
            <div className="flex gap-2 mb-4">
              {SCREENSHOTS.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => setActiveScreenshot(i)}
                  className={`px-4 py-1.5 rounded-full text-[13px] font-['Montserrat',sans-serif] font-medium transition-all cursor-pointer ${
                    activeScreenshot === i
                      ? 'bg-[#D4A853] text-[#2A2622]'
                      : 'bg-[#4A4440] text-[#9C9489] hover:text-[#FAF7F2]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            {/* Screenshot display */}
            <div className="bg-[#1A1816] rounded-lg overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeScreenshot}
                  src={SCREENSHOTS[activeScreenshot].src}
                  alt={SCREENSHOTS[activeScreenshot].label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-auto"
                />
              </AnimatePresence>
            </div>
            <p className="font-['Montserrat',sans-serif] font-light text-[13px] text-[#9C9489] mt-3 text-center">
              {SCREENSHOTS[activeScreenshot].desc}
            </p>
          </div>

          {/* === TECH STACK & INFRASTRUCTURE === */}
          <div className="px-6 md:px-12 py-8 border-t border-[#FAF7F2]/5">
            <h2 className="font-['Montserrat',sans-serif] font-medium text-[24px] text-[#FAF7F2] mb-6">
              Tech Stack &amp; Infrastructure
            </h2>
            <div className="grid gap-3">
              {INFRA.map((item) => (
                <div key={item.name} className="bg-[#332F2B] rounded-lg p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-['Montserrat',sans-serif] font-medium text-[14px] text-[#FAF7F2]">
                      {item.name}
                    </p>
                    <p className="font-['Montserrat',sans-serif] font-light text-[13px] text-[#9C9489]">
                      {item.role}
                    </p>
                  </div>
                  <p className="font-['Montserrat',sans-serif] font-light text-[12px] text-[#7A7368] shrink-0">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
            {/* Tech badges */}
            <div className="flex flex-wrap gap-2 mt-6">
              {['Python', 'FastAPI', 'PostgreSQL', 'Airflow', 'Astro 5', 'React 19', 'HTMX', 'Cloudflare', 'Ollama', 'Gemini', 'ScrapingDog', 'Proxmox'].map((tech) => (
                <span
                  key={tech}
                  className="bg-[#D4A853] text-[#2A2622] px-3 py-1 rounded-full text-[13px] font-['Montserrat',sans-serif] font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* === PRODUCTION METRICS === */}
          <div className="px-6 md:px-12 py-8 border-t border-[#FAF7F2]/5">
            <h2 className="font-['Montserrat',sans-serif] font-medium text-[24px] text-[#FAF7F2] mb-6">
              Production Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROD_METRICS.map((m) => (
                <div key={m.label} className="bg-[#332F2B] rounded-lg p-4">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-['Montserrat',sans-serif] font-semibold text-[24px] text-[#D4A853]">
                      {m.value}
                    </span>
                    <span className="font-['Montserrat',sans-serif] font-medium text-[14px] text-[#FAF7F2]">
                      {m.label}
                    </span>
                  </div>
                  <p className="font-['Montserrat',sans-serif] font-light text-[12px] text-[#9C9489]">
                    {m.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* === KEY INSIGHT === */}
          <div className="px-6 md:px-12 py-8 border-t border-[#FAF7F2]/5">
            <div className="bg-[#332F2B] rounded-lg p-6 border-l-4 border-[#D4A853]">
              <h3 className="font-['Montserrat',sans-serif] font-medium text-[16px] text-[#D4A853] mb-2">
                Key Insight
              </h3>
              <p className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#D4CFC8] leading-relaxed italic">
                Static-first architecture with baked-in affiliate links means the revenue-generating pages run on a CDN and survive any homelab outage. The API, scoring engine, and PostgreSQL database are self-hosted dependencies, but the affiliate revenue stream is decoupled from infrastructure availability by design.
              </p>
            </div>
          </div>

          {/* === FOOTER === */}
          <div className="px-6 md:px-12 py-8 border-t border-[#FAF7F2]/5">
            <div className="flex flex-col md:flex-row gap-4">
              <a
                href="https://gearsift.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 h-[44px] bg-[#D4A853] rounded-[50px] flex items-center justify-center font-['Montserrat',sans-serif] font-medium text-[#2A2622] text-[16px] hover:bg-[#E0B864] transition-colors"
              >
                Visit gearsift.com
              </a>
              <button
                onClick={onClose}
                className="flex-1 h-[44px] border border-[#FAF7F2]/30 rounded-[50px] flex items-center justify-center font-['Montserrat',sans-serif] font-medium text-[#FAF7F2] text-[16px] hover:bg-[#FAF7F2]/5 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>

          {/* Bottom padding */}
          <div className="h-8" />
        </div>
      </motion.div>
    </motion.div>
  );
}
