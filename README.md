# Michael Gerstl - Portfolio & AI Career Assistant

A personal portfolio site with an embedded RAG-powered AI assistant. Designed for showcasing professional work, side projects, and enabling recruiters to deeply explore experience through conversational AI.

## Project Structure

```
ai-resume/
├── Portfolio Site/          # React frontend (Vite + TypeScript + Tailwind)
│   └── src/app/components/  # UI components (see Portfolio Site README)
├── knowledge/               # RAG knowledge base (gitignored - private)
│   ├── career/              # Role histories
│   ├── projects/            # Case studies
│   ├── philosophy/          # Leadership approaches
│   ├── skills/              # Technical capabilities
│   └── _templates/          # Content templates
├── app/                     # Chainlit AI assistant app
├── scripts/                 # Ingestion and query utilities
└── landing-page/            # Legacy static site (deprecated)
```

## Quick Start

### Portfolio Site (Local Development)

```bash
cd "Portfolio Site"
npm install
npm run dev
```

### AI Assistant (Remote Server)

The Chainlit app runs on `192.168.2.68:8000` and is embedded in the portfolio via iframe.

```bash
# SSH to server
ssh root@192.168.2.68

# Restart service
cd /opt/ai-resume-app
pkill -f chainlit
nohup venv/bin/chainlit run chainlit_app.py --host 0.0.0.0 --port 8000 > /var/log/ai-resume/chainlit.log 2>&1 &
```

## Architecture

### Frontend Stack

- **Framework:** React 18 + TypeScript
- **Build:** Vite
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Routing:** Single-page with tab-based navigation

### AI Assistant Stack

- **UI:** Chainlit (Python)
- **LLM:** Google Gemini (text generation)
- **Embeddings:** LM Studio / Nomic Embed Text (192.168.2.234)
- **Vector DB:** Qdrant (192.168.2.68)
- **Logging:** PostgreSQL

### Key Features

1. **Portfolio Site**
   - Home page with "What I Do" sections
   - Work gallery with 6 featured projects
   - Timeline-based resume
   - Sliding AI chat panel

2. **AI Assistant**
   - RAG-powered Q&A about professional experience
   - Job description matching (paste a JD, get fit analysis)
   - Source attribution on every response
   - Conversation history within session

## Adding New Projects

### To the Portfolio Site

1. Edit `Portfolio Site/src/app/components/Work.tsx`
   - Add new project to the `projects` array

2. Edit `Portfolio Site/src/app/components/WorkDetailPanel.tsx`
   - Add new `ProjectType` to the union type
   - Add project content to `projectContent` object

### To the Knowledge Base

1. Choose template from `knowledge/_templates/`
2. Create new file in appropriate subfolder
3. Follow sanitization checklist (`knowledge/01_SANITIZATION_CHECKLIST.md`)
4. Re-run ingestion script to update Qdrant

## File Reference

### Main Components

| File | Purpose |
|------|---------|
| `App.tsx` | Main app with navigation and chat panel |
| `Header.tsx` | Navigation bar with logo and AI button |
| `Home.tsx` | Hero section + What I Do cards |
| `Work.tsx` | Project gallery |
| `WorkDetailPanel.tsx` | Detailed project views |
| `Resume.tsx` | Timeline-based resume |
| `Contact.tsx` | Contact info and LinkedIn |
| `ChatPanel.tsx` | Sliding AI assistant panel |
| `Logo.tsx` | MG logo component |

### Backend Files

| File | Purpose |
|------|---------|
| `app/chainlit_gemini_app.py` | Local Chainlit app (reference) |
| `/opt/ai-resume-app/chainlit_app.py` | Production Chainlit app (on server) |
| `/opt/ai-resume-app/query_engine.py` | RAG query engine |

## Environment Variables

Create `.env` in root:

```bash
GOOGLE_API_KEY=your_gemini_api_key
QDRANT_URL=http://192.168.2.68:6333
COLLECTION_NAME=ai_resume
```

## Git Workflow

The `knowledge/` folder is gitignored to prevent committing personal/professional details.

```bash
# Check what will be committed
git status

# Commit changes
git add .
git commit -m "Description of changes"
```

## Deployment

### Portfolio Site

Build and deploy to static hosting:

```bash
cd "Portfolio Site"
npm run build
# Deploy dist/ folder to hosting provider
```

### AI Assistant

The Chainlit app runs on the homelab server. To update:

```bash
# Copy updated app to server
scp app/chainlit_gemini_app.py root@192.168.2.68:/opt/ai-resume-app/chainlit_app.py

# Restart service (SSH to server first)
pkill -f chainlit && cd /opt/ai-resume-app && nohup venv/bin/chainlit run chainlit_app.py --host 0.0.0.0 --port 8000 > /var/log/ai-resume/chainlit.log 2>&1 &
```

## Roadmap

### Near-Term

- [ ] Add AI project showcase section
- [ ] Implement project filtering by category
- [ ] Add "Side Projects" tab for hobby/experimental work

### Future

- [ ] Dark/light theme toggle
- [ ] PDF resume generation from content
- [ ] Analytics dashboard for chat interactions

## License

Personal portfolio - not for commercial use or redistribution.

---

Built with React, Chainlit, Qdrant, and Google Gemini.
