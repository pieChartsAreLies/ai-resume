# The Gerstl Interface - Knowledge Base
## RAG-Powered Career Assistant

**Project Status:** Phase 1 Complete ✅  
**Last Updated:** 2026-01-18  
**Owner:** Michael Gerstl

---

## Quick Start

📖 **Start Here:** Read `00_IMPLEMENTATION_GUIDE.md` for complete roadmap

🏗️ **Architecture:** See `00_KNOWLEDGE_BASE_TAXONOMY.md` for content structure

✅ **Compliance:** Review `01_SANITIZATION_CHECKLIST.md` before adding content

🤖 **AI Behavior:** See `02_SYSTEM_PROMPT_TEMPLATE.md` for persona definition

---

## What's Inside

### Core Documentation (4 files)
- `00_KNOWLEDGE_BASE_TAXONOMY.md` - Content organization strategy
- `01_SANITIZATION_CHECKLIST.md` - NDA compliance guide
- `02_SYSTEM_PROMPT_TEMPLATE.md` - AI assistant configuration
- `00_IMPLEMENTATION_GUIDE.md` - Complete build roadmap
- `README.md` - This file

### Templates (7 files in `_templates/`)
Reusable structures for creating new content:
- Career role template
- Philosophy template
- Project case study template
- Architecture deep-dive template
- Skills template

### Content Files (9 files, ~55,000 words)

**Career History:**
- `career/career_chewy.md` (15,000 words) - 6+ years, 3 phases
- `career/career_babylist.md` (4,000 words) - 1 year, PHI governance

**Philosophy:**
- `philosophy/philosophy_servant_leadership.md` (3,500 words) - Leadership approach
- `philosophy/philosophy_build_vs_buy.md` (3,400 words) - Technology decisions

**Projects:**
- `projects/project_instrumentation_audit_chewy.md` (3,700 words) - Mobile re-architecture
- `projects/project_vendor_analytics_platform_chewy.md` (4,200 words) - $10M+ revenue product

**Skills:**
- `skills/skills_data_platforms.md` (4,200 words) - Platform expertise matrix
- `skills/skills_homelab_modern_stack.md` (4,800 words) - Technical depth proof

**Interview Guidance:**
- `INTERVIEW_TALKING_POINTS.md` (5,300 words) - Authentic voice patterns from 40+ interviews

---

## Project Goals

**Technical:** Demonstrate mastery of modern data stack (RAG, vector search, LLMs)

**Strategic:** Treat career history as a data product with governance and quality

**Practical:** Enable recruiters to deeply query experience without scheduling calls

**Differentiator:** "Glass Box" transparency showing retrieval sources and confidence scores

---

## Key Features

✅ **NDA-Compliant:** All proprietary data sanitized (see checklist)

✅ **Semantic Chunking:** Optimized for 256-512 token chunks with overlap

✅ **Servant Leadership Tone:** "Team executed, I enabled" attribution

✅ **Observability:** Every response shows sources and similarity scores

✅ **Zero Trust Security:** Cloudflare Access with email whitelist

---

## Technology Stack

**Inference & Embeddings:**
- Ollama (local LLM - Llama 3)
- Nomic Embed Text (embeddings)

**Vector Database:**
- Qdrant (running on Proxmox)

**Analytics:**
- PostgreSQL (query logs, usage analytics)

**Frontend:**
- Chainlit (Python web UI)

**Infrastructure:**
- Proxmox VE (home lab)
- Cloudflare Tunnel (secure access)
- Cloudflare Access (Zero Trust authentication)

---

## Current Status

### Phase 1: Foundation ✅ COMPLETE

- [x] Taxonomy and folder structure
- [x] Sanitization checklist
- [x] System prompt template
- [x] 7 reusable content templates
- [x] 2 comprehensive career files (Chewy, Babylist)
- [x] 2 philosophy files (servant leadership, build vs. buy)
- [x] 2 signature project case studies
- [x] 1 skills matrix (data platforms)
- [x] Implementation guide with code samples
- [x] Interview talking points (40+ transcripts analyzed)

**Total Content:** ~55,000 words across 20 files

### Phase 2: Content Expansion (In Progress - 70% Complete)

**Completed:**
- ✅ `philosophy/philosophy_build_vs_buy.md`
- ✅ `skills/skills_data_platforms.md`
- ✅ `skills/skills_homelab_modern_stack.md` (technical depth proof)
- ✅ `projects/project_vendor_analytics_platform_chewy.md`
- ✅ `INTERVIEW_TALKING_POINTS.md` (extracted from 40+ interviews)

**Recommended Next:**
1. `projects/project_tableau_scaling.md` (frequently mentioned in interviews)
2. `projects/project_pii_reduction.md` (97% improvement story)
3. `projects/project_data_conference.md` (culture building)
4. `philosophy/philosophy_data_as_product.md` (emerging from vendor platform work)

**Target:** 20-25 total files, ~70,000 words

### Phase 3: Technical Implementation (Week 2-3)

1. Python ingestion script (markdown → Qdrant)
2. Query engine with similarity threshold filtering
3. Chainlit UI with "Glass Box" source display
4. PostgreSQL logging for analytics

### Phase 4: Production Deployment (Week 3-4)

1. Docker containerization
2. Cloudflare Tunnel configuration
3. Cloudflare Access setup (authorized recruiters)
4. Launch at jobs.michaelgerstl.com

---

## Statistics

| Metric | Value |
|--------|-------|
| Files Created | 20 |
| Total Words | ~55,000 |
| Career Timeline | 2017-2025 (8 years) |
| Interview Transcripts Analyzed | 40+ |
| Template Files | 7 |
| Populated Content Files | 9 |
| Interview Insights Extracted | 5,300 words |
| Homelab Documentation | 4,800 words |

---

## Quality Standards

**Content:**
- ✅ 200-400 words per H2 section (optimal chunking)
- ✅ Stoic, objective tone (no hyperbole)
- ✅ Servant leadership attribution
- ✅ NDA-compliant (sanitization checklist applied)
- ✅ Cross-references to related files

**Technical:**
- ✅ YAML frontmatter on every file
- ✅ Semantic H2 headers for chunk boundaries
- ✅ Metadata tags for filtering
- ✅ Sanitization status tracking

---

## Next Steps

### For Content Creation:

1. Choose file type (philosophy, project, skills)
2. Copy relevant template from `_templates/`
3. Fill in sections with content
4. Run sanitization checklist
5. Add YAML frontmatter with proper tags
6. Save in appropriate folder

### For Technical Implementation:

1. Install Python dependencies:
   ```bash
   pip install llama-index qdrant-client chainlit psycopg2-binary
   ```

2. Run ingestion script:
   ```bash
   python scripts/ingest_knowledge_base.py
   ```

3. Test queries:
   ```bash
   python scripts/query_engine.py
   ```

4. Launch UI:
   ```bash
   chainlit run app/chainlit_app.py
   ```

See `00_IMPLEMENTATION_GUIDE.md` for complete code samples.

---

## Interview Insights

Based on 40+ interview transcript analysis (see `INTERVIEW_TALKING_POINTS.md`):

**Top Stories Recruiters Respond To:**
1. Instrumentation audit (124-step process, mobile re-arch)
2. Tableau scaling (100 → 3,500 users, SOX compliance)
3. PII reduction (97% improvement in 6 months)
4. Data conference (grassroots culture building)
5. Vendor analytics product ($10M+ revenue generation)

**Common Questions & Best Answers:**
- "How hands-on are you?" → Strategic technical depth, not tactical IC work
- "Build vs. buy philosophy?" → See `philosophy_build_vs_buy.md`
- "Platform vs. features balance?" → 30-40% platform maintenance non-negotiable
- "Why did you leave Babylist?" → Strategic vs. tactical misalignment
- "30-60-90 day plan?" → Relationships → Team assessment → Roadmap

**Context-Specific Positioning Added:**
- COO/Operations roles (operational visibility focus)
- CEO/Strategic roles (revenue impact, P&L orientation)
- Technical/Engineering roles (modern stack expertise)
- Player-Coach roles (proactive "hands-on" clarification)
- Re-platforming roles (change management, phased delivery)

---

## Support

**Questions?** Reference the implementation guide for troubleshooting.

**Adding Content?** Use templates and sanitization checklist.

**Technical Issues?** Check Python dependencies and Ollama status.

---

## License & Usage

This knowledge base is the intellectual property of Michael Gerstl.

**Authorized Use:**
- Recruiters and hiring managers (via Cloudflare Access)
- Personal portfolio and demonstration purposes

**Unauthorized Use:**
- No scraping or bulk download
- No training other AI models on this content
- No commercial reuse without permission

---

Built with LlamaIndex, Qdrant, Ollama, and Chainlit.  
Deployed on Proxmox home lab infrastructure.  
Secured with Cloudflare Zero Trust.

**"The Glass Box" - Because you deserve to see how the sausage is made.**
