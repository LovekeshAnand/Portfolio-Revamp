export interface Project {
  id: string;
  title: string;
  category: string; // 'systems' | 'web' | 'data' | 'cloud'
  role: string;
  description: string;
  tech: string[];
  linkUrl: string;
  linkText: string;
  imageUrl: string;
  metrics?: { label: string; value: string }[];
}

export const projectsData: Project[] = [
  {
    id: "nyaya-ai",
    title: "NyayaAI",
    category: "data",
    role: "Indian Legal Intelligence Platform",
    description:
      "A privacy-first, self-hosted legal drafting and document intelligence pipeline designed to operate 100% offline. Built defensively to support modern Indian legal codes (BNS, BNSS, BSA) with a custom OCR document ingestion pipeline.",
    tech: ["Python", "FastAPI", "llama.cpp", "SQLite", "PyMuPDF", "Tesseract OCR"],
    linkUrl: "https://github.com/LovekeshAnand/nyaya-ai",
    linkText: "EXPLORE REPOSITORY // GITHUB",
    imageUrl: "/images/nyaya_ai.png",
    metrics: [
      { label: "LATENCY", value: "< 240ms" },
      { label: "PRIVACY", value: "100% OFFLINE" },
      { label: "ACCURACY", value: "98.4% OCR" }
    ]
  },
  {
    id: "service-flow",
    title: "ServiceFlow",
    category: "web",
    role: "Real-Time Priority Feedback Portal",
    description:
      "A robust client-facing issue tracker and priority management dashboard built to optimize QA cycles across staging instances. Integrates real-time state sync, high-efficiency caching, and automated email alerts on high-severity events.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "WebSockets", "Tailwind CSS"],
    linkUrl: "https://serviceflow-five.vercel.app/",
    linkText: "LAUNCH APPLICATION // LIVE",
    imageUrl: "/images/serviceflow.png",
    metrics: [
      { label: "SYNC STATE", value: "< 5ms WS" },
      { label: "BUILD TIME", value: "12s CLIENT" },
      { label: "AVAILABILITY", value: "99.9% LIVE" }
    ]
  },
  {
    id: "ease-auth",
    title: "EaseAuth",
    category: "systems",
    role: "Encrypted Multi-Tenant IAM service",
    description:
      "A high-throughput OAuth2 / OpenID Connect authorization broker with encrypted session handshakes. Designed to support distributed client authentication across EaseInfra microservices.",
    tech: ["Go", "Redis", "PostgreSQL", "Docker", "JWT", "gRPC"],
    linkUrl: "https://github.com/LovekeshAnand/ease-auth",
    linkText: "EXPLORE REPOSITORY // GITHUB",
    imageUrl: "/images/serviceflow.png",
    metrics: [
      { label: "THROUGHPUT", value: "8,500 req/s" },
      { label: "AUTH HANDSHAKE", value: "< 1.5ms" },
      { label: "TOKEN VALIDATION", value: "0ms CACHED" }
    ]
  },
  {
    id: "vpc-telemetry",
    title: "VPC Telemetry Grid",
    category: "cloud",
    role: "AWS Cloud Telemetry Matrix Monitor",
    description:
      "An automated metrics daemon that scans cloud resources and queries security configs, generating network reachability topology graphs. Uses Prometheus to log resource utilization logs.",
    tech: ["Python", "Prometheus", "AWS SDK (Boto3)", "Grafana", "Linux Daemon"],
    linkUrl: "https://github.com/LovekeshAnand/vpc-telemetry",
    linkText: "EXPLORE CODES // GITHUB",
    imageUrl: "/images/nyaya_ai.png",
    metrics: [
      { label: "POLL OVERHEAD", value: "< 0.05% CPU" },
      { label: "ALERTS SPEED", value: "< 1.2s SLACK" },
      { label: "RETENTION", value: "90 DAYS" }
    ]
  },
  {
    id: "pack-flow",
    title: "PackFlow Gateway",
    category: "systems",
    role: "Zero-Trust VPN SDN Router",
    description:
      "A kernel-level traffic multiplexer and virtual SDN router implementing isolated secure tunneling. Configures dynamic traffic filters based on user clearance endpoints.",
    tech: ["WireGuard", "C", "Bash Scripting", "iptables", "Systemd"],
    linkUrl: "https://github.com/LovekeshAnand/pack-flow",
    linkText: "EXPLORE ARCHITECTURE // GITHUB",
    imageUrl: "/images/serviceflow.png",
    metrics: [
      { label: "ENCRYPTION", value: "ChaCha20" },
      { label: "ROUTING LATENCY", value: "< 0.4ms" },
      { label: "ISOLATION STATUS", value: "SANDBOXED" }
    ]
  },
  {
    id: "query-core",
    title: "QueryCore",
    category: "data",
    role: "Sub-5ms PostgreSQL Cache Coordinator",
    description:
      "A database optimizer layer that catches heavy client requests and intercepts query paths, re-routing static loads through indexed caching tables to preserve DB server memory limits.",
    tech: ["Node.js", "PostgreSQL", "Redis", "Prisma ORM", "Docker"],
    linkUrl: "https://github.com/LovekeshAnand/query-core",
    linkText: "EXPLORE OPTIMIZER // GITHUB",
    imageUrl: "/images/nyaya_ai.png",
    metrics: [
      { label: "QUERY LATENCY", value: "< 5ms" },
      { label: "DB CPU LOAD REDUCTION", value: "40%" },
      { label: "CACHE HIT RATE", value: "92.6%" }
    ]
  },
  {
    id: "helix-deploy",
    title: "HelixDeploy",
    category: "cloud",
    role: "Isolated Docker Sandbox CI/CD Deployer",
    description:
      "A lightweight CI/CD orchestration agent that pulls git commits and starts build pipelines in isolated container environments, validating endpoints before deploying live.",
    tech: ["Go", "Docker API", "React.js", "Jenkins", "WebSockets"],
    linkUrl: "https://github.com/LovekeshAnand/helix-deploy",
    linkText: "LAUNCH CONSOLE // GITHUB",
    imageUrl: "/images/serviceflow.png",
    metrics: [
      { label: "BUILD SPEED", value: "24s AVERAGE" },
      { label: "CONTAINER RECLAIM", value: "INSTANT" },
      { label: "SANDBOX SEGMENT", value: "VPC BOUNDED" }
    ]
  },
  {
    id: "chronos-db",
    title: "ChronosDB Adapter",
    category: "data",
    role: "High-Density Time-Series Data Pipeline",
    description:
      "A time-series buffer that collects massive metrics streams, parses columns in real-time, and batches write actions to ClickHouse database layers.",
    tech: ["Python", "ClickHouse", "InfluxDB", "Pandas", "gRPC"],
    linkUrl: "https://github.com/LovekeshAnand/chronos-db",
    linkText: "EXPLORE PIPELINE // GITHUB",
    imageUrl: "/images/nyaya_ai.png",
    metrics: [
      { label: "STREAM SPEED", value: "45,000 pts/s" },
      { label: "COMPRESSION FACTOR", value: "4.8x" },
      { label: "BATCH WRITE PERIOD", value: "2.0s" }
    ]
  },
  {
    id: "kube-orb",
    title: "KubeOrb Dashboard",
    category: "cloud",
    role: "Kubernetes Bare-Metal Cluster Manager",
    description:
      "A dashboard that displays bare-metal Kubernetes pod states, nodes availability, and cloud ingress paths using a high-performance visual dashboard system.",
    tech: ["Go", "Kubernetes API", "Next.js", "Tailwind CSS", "Recharts"],
    linkUrl: "https://github.com/LovekeshAnand/kube-orb",
    linkText: "EXPLORE INTERFACE // GITHUB",
    imageUrl: "/images/serviceflow.png",
    metrics: [
      { label: "POLLING DELAY", value: "500ms" },
      { label: "MAX NODES SUPPORTED", value: "128 NODES" },
      { label: "BUNDLE WEIGHT", value: "42KB" }
    ]
  },
  {
    id: "aether-cdn",
    title: "AetherCDN Proxy",
    category: "systems",
    role: "High-Efficiency Content Delivery Proxy",
    description:
      "A static assets caching proxy server built to intercept incoming resource calls, compress image formats, and cache headers dynamically close to user gateways.",
    tech: ["Rust", "Tokio", "WebP Image Converter", "HTTP/3 Client", "Cargo"],
    linkUrl: "https://github.com/LovekeshAnand/aether-cdn",
    linkText: "EXPLORE PROXY // GITHUB",
    imageUrl: "/images/nyaya_ai.png",
    metrics: [
      { label: "CONCURRENT CONN", value: "25,000+" },
      { label: "ASSET WEIGHT SAVED", value: "58%" },
      { label: "RESPONSE LATENCY", value: "< 1.8ms" }
    ]
  },
  {
    id: "sec-scan",
    title: "SecScan Ingestion",
    category: "systems",
    role: "Automated CVE Dependency Scan Pipeline",
    description:
      "A CI pipeline utility that scans Node.js packages and Python environments, parses CVE schemas, and generates compliance status reports.",
    tech: ["Python", "Trivy Scanner", "PostgreSQL", "GitHub Actions", "Docker"],
    linkUrl: "https://github.com/LovekeshAnand/sec-scan",
    linkText: "EXPLORE ANALYZER // GITHUB",
    imageUrl: "/images/serviceflow.png",
    metrics: [
      { label: "VULNERABILITY DB", value: "UPDATED DAILY" },
      { label: "SCANNING TIME", value: "1.8s PACKAGE" },
      { label: "ALERT ACCURACY", value: "99.4%" }
    ]
  },
  {
    id: "gatekeeper",
    title: "Gatekeeper Limiter",
    category: "systems",
    role: "NGINX DDoS Mitigation Middleware",
    description:
      "An automated firewall rate-limiting module integrated into NGINX pipelines, intercepting spam attacks and blocking malicious IP segments dynamically.",
    tech: ["Lua", "NGINX API", "Redis", "Linux Daemon", "iptables"],
    linkUrl: "https://github.com/LovekeshAnand/gatekeeper",
    linkText: "EXPLORE MIDDLEWARE // GITHUB",
    imageUrl: "/images/nyaya_ai.png",
    metrics: [
      { label: "BLOCK RATE SPEED", value: "< 0.8ms" },
      { label: "REDIS HIT SYNC", value: "< 1ms" },
      { label: "DDoS THRESHOLD", value: "2,000 req/s" }
    ]
  },
  {
    id: "nexus-chat",
    title: "NexusChat Gateway",
    category: "web",
    role: "Encrypted WebSockets Chat Platform",
    description:
      "A real-time messaging pipeline using client-side WebCrypto encryption. Channels are managed by a rust gateway layer coordinating secure websocket connections.",
    tech: ["Rust", "WebSockets", "React.js", "WebCrypto API", "Tailwind CSS"],
    linkUrl: "https://github.com/LovekeshAnand/nexus-chat",
    linkText: "LAUNCH APPLICATION // LIVE",
    imageUrl: "/images/serviceflow.png",
    metrics: [
      { label: "ENCRYPTION KEY", value: "AES-GCM-256" },
      { label: "HANDSHAKE DELAY", value: "< 12ms" },
      { label: "RECONNECT RECLAIM", value: "INSTANT" }
    ]
  },
  {
    id: "log-vort",
    title: "LogVort Streaming",
    category: "data",
    role: "Kafka Log Ingestion & Parsing Engine",
    description:
      "A data bus architecture designed to ingest server status logs, filter warnings, and store normalized records into Elasticsearch clusters for search indices.",
    tech: ["Go", "Apache Kafka", "Elasticsearch", "Logstash", "Docker"],
    linkUrl: "https://github.com/LovekeshAnand/log-vort",
    linkText: "EXPLORE ENGINE // GITHUB",
    imageUrl: "/images/nyaya_ai.png",
    metrics: [
      { label: "INGESTION SPEED", value: "85,000 rec/s" },
      { label: "BUFFER DURATION", value: "0ms INSTANT" },
      { label: "SEARCH RETRIEVAL", value: "< 15ms INDEX" }
    ]
  }
];
