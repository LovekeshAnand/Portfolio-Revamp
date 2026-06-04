export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  category: string;
  publishDate: string;
  readTime: string;
  contentHtml: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "achieving-sub-5ms-postgres-latency",
    title: "Achieving Sub-5ms Postgres Query Latency: A Hardcore Indexing Guide",
    summary: "How we refactored query plans and configured custom cache layers to optimize PostgreSQL throughput and memory profiles.",
    category: "Databases & Performance",
    publishDate: "MAY 15, 2026",
    readTime: "8 MIN READ",
    contentHtml: `
      <p>When query response latency spikes on production database systems, developers are quick to throw memory or cache hardware at the problem. However, the root issue is usually inefficient query planning and lack of indexing strategy. This guide breaks down the concrete steps we took to pull query response times down to under 5 milliseconds.</p>

      <h3>1. Analyzing the Query Plan (EXPLAIN ANALYZE)</h3>
      <p>Before writing code, analyze how PostgreSQL scans tables. Running <code>EXPLAIN (ANALYZE, BUFFERS) SELECT ...</code> highlights structural bottlenecks:
      <ul>
        <li><strong>Seq Scan (Sequential Scan):</strong> A full table scan. In database tables with millions of records, this is highly expensive and triggers heavy disk reads.</li>
        <li><strong>Index Scan:</strong> Scanning the index tree to locate matching records. Much faster, but can still trigger random disk I/O.</li>
        <li><strong>Index Only Scan:</strong> The query only requests columns covered by the index itself, avoiding table data block lookups entirely. This is the optimal path.</li>
      </ul>
      </p>

      <h3>2. Composite Indexes and Column Order</h3>
      <p>If queries filter across multiple columns (e.g., <code>tenant_id</code> and <code>status</code>), a single-column index is insufficient. PostgreSQL will perform bitmap index merges, which incurs overhead. Instead, build a composite index:</p>
      <pre><code>CREATE INDEX idx_orders_tenant_status ON orders (tenant_id, status);</code></pre>
      <p><strong>Crucial Rule:</strong> Place the high-cardinality columns (columns with most unique values) first, and equality filter columns before inequality/range filters (like timestamps).</p>

      <h3>3. Partial (Filtered) Indexes</h3>
      <p>If you only query active records, don't index the entire table. Indexing inactive archive data wastes cache memory. Build a partial index instead:</p>
      <pre><code>CREATE INDEX idx_users_active_sessions ON users (session_token) WHERE is_active = true;</code></pre>
      <p>This index is 80% smaller, fits entirely in RAM buffer pools, and achieves sub-1ms search times.</p>

      <h3>4. Cache Synchronization with Redis</h3>
      <p>For high-frequency static reads, bypass the database query entirely by integrating an automated Redis caching layer. We engineered a write-through cache coordinator that updates Redis keys whenever a write action is committed, guaranteeing sub-1ms read times for active caches and shielding the database from redundant queries.</p>
    `
  },
  {
    slug: "hardening-openvpn-gateways-zero-trust",
    title: "Hardening OpenVPN Gateways: Zero-Trust Security for Infrastructure Teams",
    summary: "Step-by-step design of custom secure administration gateways, certificate management, and firewall constraints.",
    category: "Cloud Security",
    publishDate: "APRIL 28, 2026",
    readTime: "12 MIN READ",
    contentHtml: `
      <p>Managing direct access to production VPC nodes poses serious security risks. Infrastructure teams need remote network entry, but standard VPN defaults leave servers vulnerable to lateral movement. This article details how we designed and secured a zero-trust gateway layout using OpenVPN and systemd firewalls.</p>

      <h3>1. Hardening Cryptographic Ciphers</h3>
      <p>Default OpenVPN configurations often support deprecated handshake algorithms and weak ciphers. Edit the server configuration (<code>server.conf</code>) to restrict protocol parameters to secure standards:</p>
      <pre><code># Cryptographic profile
cipher AES-256-GCM
auth SHA512
tls-version-min 1.3
tls-cipher TLS-ECDHE-ECDSA-WITH-AES-256-GCM-SHA384</code></pre>
      <p>This disables legacy TLS versions and legacy CBC blocks, enforcing modern authenticated encryption (AEAD).</p>

      <h3>2. Implementing Client Isolation</h3>
      <p>By default, VPN clients can communicate with other connected clients. Disable this by removing the <code>client-to-client</code> directive from the configuration, and drop client privileges immediately after startup using non-root parameters:</p>
      <pre><code>user nobody
group nogroup</code></pre>

      <h3>3. Dynamic Firewall Routing</h3>
      <p>To enforce zero-trust access, connected users should only reach specific ports on target nodes. Configure <code>iptables</code> to drop all traffic from the VPN subnet by default, and only allow access on strict destination ports:</p>
      <pre><code># Drop all client cross-forwarding
iptables -A FORWARD -s 10.8.0.0/24 -j DROP

# Explicitly allow administrative SSH access to the bastion node only
iptables -A FORWARD -s 10.8.0.5 -d 10.0.1.10 -p tcp --dport 22 -j ACCEPT</code></pre>
      <p>Enforce these constraints inside Jenkins automation runner scripts for automated, dynamic access policies.</p>
    `
  },
  {
    slug: "building-self-hosted-offline-ai-pipelines",
    title: "Building a Self-Hosted Offline AI Pipeline with llama.cpp and FastAPI",
    summary: "Configuring memory-mapped offline LLM models, batch size optimizations, and PyMuPDF document ingestion under strict CPU limits.",
    category: "AI & Systems Integration",
    publishDate: "MARCH 12, 2026",
    readTime: "10 MIN READ",
    contentHtml: `
      <p>For data-sensitive environments (such as legal platforms or clinical applications), using public LLM API calls is prohibited due to strict regulatory compliance rules. This article documents our architecture for self-hosting GGUF language models offline using <code>llama.cpp</code>, compiled with CPU vector acceleration (AVX2), and served via a FastAPI backend wrapper.</p>

      <h3>1. Quantization Profiles (GGUF)</h3>
      <p>Running LLM models in production on commercial CPU hardware requires reducing their memory footprints. We used weight quantization to compress the models:
      <ul>
        <li><strong>FP16:</strong> High accuracy but requires 16GB+ VRAM for a 7B model.</li>
        <li><strong>Q4_K_M (4-bit quantization):</strong> Reduces the Llama 7B model size from 14GB to ~4.1GB, allowing it to fit into standard host RAM, with negligible perplexity loss.</li>
      </ul>
      </p>

      <h3>2. Optimizing llama.cpp compilation</h3>
      <p>Build <code>llama.cpp</code> from source to match the host machine's architecture, enabling AVX2 instruction sets for fast matrix multiplication:</p>
      <pre><code># Compile with optimization flags
make CXXFLAGS="-mavx2 -mfma" -j8</code></pre>
      <p>This optimization improves token generation speed by 2.4x compared to unoptimized generic compilation binary streams.</p>

      <h3>3. FastAPI Async Processing</h3>
      <p>Since CPU-bound LLM generation blocks the Python main thread, wrapping the generation call directly in an async endpoint would degrade server throughput. Instead, delegate LLM generation tasks to a background execution pool using a worker queue:</p>
      <pre><code>from concurrent.futures import ThreadPoolExecutor
executor = ThreadPoolExecutor(max_workers=2)

@app.post("/generate")
async def generate_text(prompt: str):
    loop = asyncio.get_running_loop()
    response = await loop.run_in_executor(executor, run_llm_generation, prompt)
    return {"response": response}</code></pre>
      <p>This keeps FastAPI's event loop fully responsive, handling incoming API calls smoothly while threads crunch numbers in the background.</p>
    `
  }
];
export const getPostBySlug = (slug: string) => {
  return blogPosts.find(post => post.slug === slug);
};
