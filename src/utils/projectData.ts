export interface Project {
  id: string;
  title: string;
  category: string; // 'systems' | 'web' | 'data' | 'ai' | 'tools'
  role: string;
  description: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl: string;
  metrics?: { label: string; value: string }[];
}

export const projectsData: Project[] = [
  {
    id: "nyaya-ai",
    title: "NyayaAI",
    category: "ai",
    role: "Indian Legal Intelligence Platform",
    description:
      "A privacy-first, self-hosted legal drafting engine that runs 100% offline. Drafts court-ready documents for Indian courts, maps deprecated IPC sections to BNS equivalents, and handles scanned PDF ingestion with OCR.",
    tech: ["Python", "FastAPI", "llama.cpp", "SQLite", "PyMuPDF", "Tesseract OCR", "React", "Vite"],
    githubUrl: "https://github.com/LovekeshAnand/nyaya-ai",
    imageUrl: "/images/nyaya_ai.png",
    metrics: [
      { label: "PRIVACY", value: "100% OFFLINE" },
      { label: "OCR ACCURACY", value: "98.4%" },
      { label: "LATENCY", value: "< 240ms" }
    ]
  },
  {
    id: "service-flow",
    title: "ServiceFlow",
    category: "web",
    role: "Feedback & Service Management Platform",
    description:
      "A modern feedback platform that helps businesses engage users, track bugs, collect feature requests, and manage service quality. Users upvote requests, discuss in threads, and watch issues move through status tags in real time.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS"],
    githubUrl: "https://github.com/LovekeshAnand/service-flow",
    liveUrl: "https://serviceflow-five.vercel.app/",
    imageUrl: "/images/serviceflow.png",
    metrics: [
      { label: "AVAILABILITY", value: "99.9% LIVE" },
      { label: "AUTH", value: "JWT SECURED" },
      { label: "DEPLOYMENT", value: "VERCEL" }
    ]
  },
  {
    id: "vocabrawl",
    title: "VocaBrawl",
    category: "web",
    role: "Real-Time Multiplayer Word Arena",
    description:
      "A premium real-time multiplayer word game platform with ranked 1v1 duels, party modes, and solo gauntlet challenges. Features ELO ranking, live drawing, and sub-100ms Socket.io gameplay.",
    tech: ["Next.js 15", "TypeScript", "Socket.io", "MongoDB", "JWT", "Framer Motion", "Zustand"],
    githubUrl: "https://github.com/LovekeshAnand/Vocabrawl",
    liveUrl: "https://vocabrawl.vercel.app/",
    imageUrl: "/images/serviceflow.png",
    metrics: [
      { label: "LATENCY", value: "< 100ms WS" },
      { label: "GAME MODES", value: "3 MODES" },
      { label: "RANKING", value: "GLOBAL ELO" }
    ]
  },
  {
    id: "newstrace",
    title: "NewsTrace",
    category: "tools",
    role: "Enterprise Media Intelligence Platform",
    description:
      "A high-performance media intelligence platform that scrapes news outlets, profiles journalists, discovers contact details, and synthesizes media coverage via a Perplexity-style research engine backed by real citations.",
    tech: ["React", "Vite", "Node.js", "Express.js", "MongoDB", "Puppeteer", "Natural.js", "JWT"],
    githubUrl: "https://github.com/LovekeshAnand/NewsTrace",
    liveUrl: "https://news-trace-sigma.vercel.app/",
    imageUrl: "/images/nyaya_ai.png",
    metrics: [
      { label: "SCRAPING", value: "HEADLESS JS" },
      { label: "SECURITY", value: "JWT + HELMET" },
      { label: "NLP", value: "COMPROMISE.JS" }
    ]
  },
  {
    id: "epsilon-engine",
    title: "Epsilon IDE Engine",
    category: "ai",
    role: "Three-Tier Local AI Coding Assistant",
    description:
      "A fully local AI coding assistant with automatic model routing across fast (1.5B), balanced (7B), and deep (33B) tiers. No internet, no API keys — runs on your own GPU with persistent conversation memory and file writing tools.",
    tech: ["Python", "llama.cpp", "FastAPI", "CUDA", "Telegram Bot API", "SQLite", "TF-IDF"],
    githubUrl: "https://github.com/LovekeshAnand/epsilon-ide/tree/master/engine/v2",
    imageUrl: "/images/nyaya_ai.png",
    metrics: [
      { label: "FAST TIER", value: "1-2s GPU" },
      { label: "DEEP TIER", value: "33B PARAMS" },
      { label: "PRIVACY", value: "100% LOCAL" }
    ]
  },
  {
    id: "love-authentication",
    title: "LoveAuthentication",
    category: "tools",
    role: "Ready-to-Use Auth & User Management Package",
    description:
      "An npm package providing a complete JWT-based authentication system with pre-defined Mongoose user models, middleware, structured routes, and utility functions for API errors, responses, and async handling.",
    tech: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "bcrypt", "dotenv"],
    githubUrl: "https://github.com/LovekeshAnand/love-authentication",
    imageUrl: "/images/serviceflow.png",
    metrics: [
      { label: "PACKAGE", value: "NPM READY" },
      { label: "AUTH", value: "JWT + BCRYPT" },
      { label: "LICENSE", value: "MIT OPEN" }
    ]
  }
];
