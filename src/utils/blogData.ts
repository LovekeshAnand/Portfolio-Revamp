export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  category: string;
  publishDate: string;
  readTime: string;
  image?: string;
  contentHtml: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-my-first-real-staging-environment",
    title: "Building My First Real Staging Environment (And Everything That Went Wrong)",
    summary: "A practical, hands-on account of building a real Linux staging environment from scratch — covering Docker, Jenkins, PM2, memory failures, swap space, and real deployment pipelines.",
    category: "DevOps & Systems",
    publishDate: "FEB 9, 2026",
    readTime: "4 MIN READ",
    image: "/images/blog-one.webp",
    contentHtml: `
      <p>When I first heard the term <em>staging environment</em>, I assumed it was just another server where code is deployed before production. I quickly learned that this assumption was wrong.</p>

      <p>A real staging environment forces you to understand Linux internals, memory limits, automation, networking, security, and deployment workflows — all at once. This article is not a motivational story. It is a practical, hands-on guide based on real problems I faced while building a staging environment from scratch.</p>

      <p>If you are a beginner and want to understand how real systems are built, this article is for you.</p>

      <h3>What a Staging Environment Actually Is</h3>
      <p>A staging environment is a production-like setup used to test real deployments safely. It behaves like production but is isolated so mistakes do not affect real users.</p>
      <p>That means:</p>
      <ul>
        <li>Code is deployed in a repeatable way</li>
        <li>Services restart automatically</li>
        <li>Failures are handled, not ignored</li>
        <li>Access is controlled and secure</li>
        <li>Automation replaces manual work</li>
      </ul>
      <p>I decided to build everything from zero on a fresh Linux server instead of relying on prebuilt scripts.</p>

      <h3>Step 1: Preparing the Server Properly</h3>
      <p>Before installing anything, I updated the system. Skipping this step often causes dependency issues later.</p>
      <pre><code>sudo yum update -y</code></pre>

      <p><strong>Installing Docker</strong></p>
      <p>Docker was used to isolate services and simplify management.</p>
      <pre><code>sudo yum install docker -y
sudo systemctl start docker
sudo systemctl enable docker</code></pre>
      <p>By default, Docker requires root access. To avoid constantly using <code>sudo</code>, I added the user to the Docker group.</p>
      <pre><code>sudo usermod -aG docker ec2-user
exit</code></pre>
      <p>After logging back in, Docker commands worked normally.</p>

      <h3>Step 2: Setting Up Git Access the Right Way</h3>
      <p>Automation fails if Git asks for passwords. SSH-based authentication is mandatory.</p>
      <pre><code>ssh-keygen -t ed25519 -C "automation-key"</code></pre>
      <p>The public key was copied and added to the Git provider.</p>
      <pre><code>cat ~/.ssh/id_ed25519.pub</code></pre>
      <p>To verify access:</p>
      <pre><code>ssh -T git@bitbucket.org</code></pre>
      <p>If this step fails, nothing else will work reliably.</p>

      <h3>Step 3: Installing Node.js and Process Management</h3>
      <p>A stable Node.js version was installed:</p>
      <pre><code>curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs</code></pre>
      <p>Then I installed a process manager to keep applications running after crashes or reboots.</p>
      <pre><code>sudo npm install -g pm2</code></pre>
      <p>To make processes start automatically on reboot:</p>
      <pre><code>pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ec2-user</code></pre>
      <p>At this point, the system looked ready. That confidence did not last long.</p>

      <h3>Step 4: Running Into Memory Failures</h3>
      <p>The first application build failed. The second one failed too. Then the server became unresponsive.</p>
      <p>The issue was not the code — it was memory.</p>
      <p>Checking memory usage:</p>
      <pre><code>free -h</code></pre>
      <p>The system did not have enough RAM to handle build processes.</p>

      <p><strong>Adding Swap Memory</strong></p>
      <p>Creating swap space stabilized the system.</p>
      <pre><code>sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile</code></pre>
      <p>Later, the swap was increased:</p>
      <pre><code>sudo swapoff /swapfile
sudo dd if=/dev/zero of=/swapfile bs=1M count=4096
sudo mkswap /swapfile
sudo swapon /swapfile</code></pre>
      <p>To make swap persistent:</p>
      <pre><code>echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab</code></pre>
      <p>After this, builds stopped crashing unexpectedly.</p>

      <h3>Step 5: Deploying Code in a Repeatable Way</h3>
      <p>Instead of running applications manually, I followed a strict workflow.</p>
      <pre><code>git clone &lt;repository-url&gt;
cd project
npm install</code></pre>
      <p>For memory-heavy builds:</p>
      <pre><code>NODE_OPTIONS="--max-old-space-size=3072" npm run build</code></pre>
      <p>Running the application with process management:</p>
      <pre><code>pm2 start &lt;start-command&gt; --name project-name
pm2 save</code></pre>
      <p>Now, even if the server rebooted, everything came back automatically.</p>

      <h3>Step 6: Running the Database Safely</h3>
      <p>The database was isolated using Docker to avoid accidental exposure and simplify recovery.</p>
      <pre><code>docker run -d \\
  --name database \\
  -v data_volume:/data/db \\
  --restart unless-stopped \\
  mongo:7</code></pre>
      <p>This ensured persistent data storage, automatic restarts, and clean separation from the host system.</p>

      <h3>Step 7: Automating Deployments with Jenkins</h3>
      <p>Initially, Jenkins was installed directly on the system. That approach failed due to permission and dependency issues.</p>
      <p>Running Jenkins inside Docker worked far better.</p>
      <pre><code>docker volume create jenkins_home
docker run -d \\
  --name jenkins \\
  -v jenkins_home:/var/jenkins_home \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  -v $(which docker):/usr/bin/docker \\
  jenkins/jenkins:lts</code></pre>
      <p>Jenkins failed again — this time due to Docker socket permissions.</p>
      <pre><code>sudo chmod 666 /var/run/docker.sock</code></pre>
      <p>Then Jenkins started correctly. To retrieve the initial admin password:</p>
      <pre><code>docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword</code></pre>

      <h3>Step 8: Writing Real Deployment Pipelines</h3>
      <p>Each automated deployment followed the same logic: connect to the server via SSH, navigate to the project directory, switch to the correct branch, pull latest changes, install dependencies, build with memory limits, and restart the process.</p>
      <p>Core commands used inside pipelines:</p>
      <pre><code>git checkout branch-name
git pull origin branch-name
npm install
NODE_OPTIONS="--max-old-space-size=2048" npm run build
pm2 restart project-name</code></pre>
      <p>Every step was logged. No hidden magic.</p>

      <h3>Step 9: Debugging Real Failures</h3>
      <p>Some real problems I encountered:</p>
      <ul>
        <li><strong>Builds failing randomly</strong> — Fixed by increasing swap and Node heap size.</li>
        <li><strong>Applications not restarting</strong> — Checked process names using <code>pm2 status</code>.</li>
        <li><strong>Silent pipeline failures</strong> — Fixed by stopping scripts on error with <code>set -e</code>.</li>
        <li><strong>Server freezing under load</strong> — Fixed by expanding disk space:</li>
      </ul>
      <pre><code>lsblk
sudo growpart /dev/nvme0n1 1
sudo xfs_growfs /</code></pre>
      <p>Each failure improved my understanding of system behavior.</p>

      <h3>What This Project Taught Me</h3>
      <p>This setup taught me more than any tutorial ever could. I learned why automation is essential, how memory affects builds, how Linux behaves under stress, how real deployments work, and how to debug instead of guessing.</p>
      <p>A staging environment is not about tools. It is about thinking like an engineer.</p>

      <h3>Advice for Beginners</h3>
      <p>If you are starting out:</p>
      <ul>
        <li>Do not blindly copy configurations</li>
        <li>Monitor memory and disk usage</li>
        <li>Read logs carefully</li>
        <li>Automate repetitive work</li>
        <li>Break things and fix them yourself</li>
      </ul>
      <p>That is how real learning happens.</p>
    `
  }
];

export const getPostBySlug = (slug: string) => {
  return blogPosts.find(post => post.slug === slug);
};
