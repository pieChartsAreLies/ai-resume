# Portfolio Site - React Frontend

React-based portfolio site for Michael Gerstl. Built with Vite, TypeScript, and Tailwind CSS.

Original Figma design: https://www.figma.com/design/Iaub7K8nv1zo3fKvjD2Xa6/Portfolio-Site

## Quick Start

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Component Architecture

### Layout

```
App.tsx
├── Header.tsx            # Navigation + AI chat toggle
│   └── Logo.tsx          # MG logo
├── [Active View]
│   ├── Home.tsx          # Hero + What I Do
│   │   └── WhatIDoPanel.tsx
│   ├── Work.tsx          # Project gallery
│   │   └── WorkDetailPanel.tsx
│   ├── Resume.tsx        # Timeline resume
│   └── Contact.tsx       # Contact info
└── ChatPanel.tsx         # Sliding AI assistant (iframe)
```

### Component Details

| Component | File | Description |
|-----------|------|-------------|
| **App** | `src/app/App.tsx` | Root component, handles navigation state and chat panel |
| **Header** | `src/app/components/Header.tsx` | Fixed header with nav tabs and "Ask My AI" button |
| **Logo** | `src/app/components/Logo.tsx` | MG initials in bordered box with diagonal accent |
| **Home** | `src/app/components/Home.tsx` | Landing page with hero and three "What I Do" cards |
| **WhatIDoPanel** | `src/app/components/WhatIDoPanel.tsx` | Expandable detail panels for skills |
| **Work** | `src/app/components/Work.tsx` | Grid of project cards |
| **WorkDetailPanel** | `src/app/components/WorkDetailPanel.tsx` | Full-screen project details |
| **Resume** | `src/app/components/Resume.tsx` | Timeline-based career history |
| **Contact** | `src/app/components/Contact.tsx` | Contact info and LinkedIn link |
| **ChatPanel** | `src/app/components/ChatPanel.tsx` | Sliding panel with embedded Chainlit iframe |

## Adding New Projects

### 1. Update Work.tsx

Add to the `projects` array:

```typescript
{
  id: 'your-project-id' as ProjectType,
  title: "Project Title",
  description: "One-line description",
  company: "Company or 'Side Project'",
  metrics: "Key metric 1 | Key metric 2 | Key metric 3"
}
```

### 2. Update WorkDetailPanel.tsx

Add the new type to the union:

```typescript
export type ProjectType =
  | 'existing-projects'
  | 'your-project-id';  // Add here
```

Add content to `projectContent`:

```typescript
'your-project-id': {
  title: "Full Project Title",
  company: "Company",
  timeline: "Date Range",
  challenge: "Problem statement",
  approach: [
    "Approach item 1",
    "Approach item 2"
  ],
  outcome: "Results and metrics",
  keyInsight: "One key takeaway"
}
```

## Adding New Sections

### New Navigation Tab

1. Add view state option in `App.tsx`:

```typescript
type View = 'home' | 'work' | 'resume' | 'contact' | 'new-section';
```

2. Add navigation button in `Header.tsx`

3. Create new component in `src/app/components/`

4. Add to view switch in `App.tsx`

## Styling

### Theme Colors

| Purpose | Color | Tailwind |
|---------|-------|----------|
| Background | `#363636` | `bg-[#363636]` |
| Cards | `#4a4a4a` | `bg-[#4a4a4a]` |
| Accent Blue | `#87b7ff` | `text-[#87b7ff]` |
| Text Primary | `#ffffff` | `text-white` |
| Text Secondary | `#d9d9d9` | `text-[#d9d9d9]` |
| Text Muted | `#999999` | `text-[#999]` |

### Typography

Font: Montserrat (via Google Fonts)

```css
font-['Montserrat',sans-serif]
```

### Animation

Uses Framer Motion (`motion/react`):

```typescript
import { motion, AnimatePresence } from 'motion/react';
```

## AI Chat Integration

The chat panel embeds a Chainlit app via iframe:

```typescript
// ChatPanel.tsx
<iframe
  src="http://192.168.2.68:8000"
  className="w-full h-full border-none"
  title="AI Chat Assistant"
/>
```

To change the AI backend URL, update `ChatPanel.tsx`.

## Project Structure

```
src/
├── app/
│   ├── App.tsx                    # Main app component
│   ├── components/
│   │   ├── ui/                    # Shadcn UI components
│   │   ├── Header.tsx
│   │   ├── Logo.tsx
│   │   ├── Home.tsx
│   │   ├── WhatIDoPanel.tsx
│   │   ├── Work.tsx
│   │   ├── WorkDetailPanel.tsx
│   │   ├── Resume.tsx
│   │   ├── Contact.tsx
│   │   └── ChatPanel.tsx
│   ├── utils/
│   │   └── downloadResume.ts      # Resume download handler
│   └── lib/
│       └── utils.ts               # Utility functions
├── imports/                       # Generated Figma assets
├── main.tsx                       # App entry point
└── index.css                      # Global styles + Tailwind
```

## Development Notes

### TypeScript Paths

Configured in `tsconfig.json`:

```json
{
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

### Vite Config

See `vite.config.ts` for build configuration.
