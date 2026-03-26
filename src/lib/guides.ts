export interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  icon: string;
  readTime: string;
  sections: { title: string; content: string }[];
  faqs: { question: string; answer: string }[];
}

export const guides: Guide[] = [
  {
    slug: "complete-website-security-guide",
    title: "The Complete Website Security Guide for 2025",
    excerpt: "Everything you need to know about protecting your website from modern threats, from SSL certificates to advanced WAF configurations.",
    icon: "Shield",
    readTime: "18 min read",
    sections: [
      { title: "Understanding Modern Web Threats", content: "The threat landscape has evolved dramatically. From SQL injection to sophisticated supply chain attacks, understanding what you're defending against is the first step. Modern attacks target not just your application code, but your dependencies, build pipeline, and even your DNS configuration." },
      { title: "SSL/TLS Configuration", content: "Every website needs HTTPS — that's non-negotiable in 2025. But there's more to it than just installing a certificate. You need to configure proper cipher suites, enable HSTS, and set up certificate transparency monitoring. We recommend using Let's Encrypt with auto-renewal for most projects." },
      { title: "Web Application Firewall (WAF)", content: "A WAF sits between your users and your application, filtering malicious traffic before it reaches your servers. Modern WAFs can detect and block OWASP Top 10 attacks, rate limit aggressive bots, and even provide DDoS protection at the application layer." },
      { title: "Authentication Best Practices", content: "Implement multi-factor authentication wherever possible. Use bcrypt or Argon2 for password hashing. Never store passwords in plain text. Consider passwordless authentication options like WebAuthn for improved security and user experience." },
      { title: "Security Headers", content: "Properly configured HTTP security headers can prevent a wide range of attacks. Key headers include Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy. Each header addresses specific attack vectors." },
      { title: "Dependency Security", content: "Your application is only as secure as its weakest dependency. Use tools like npm audit, Snyk, or Dependabot to monitor for known vulnerabilities. Pin dependency versions and review changes before updating." },
    ],
    faqs: [
      { question: "How often should I audit my website security?", answer: "We recommend quarterly security audits for most businesses, with continuous automated monitoring in between. High-risk industries like finance and healthcare should conduct monthly audits." },
      { question: "Is HTTPS really necessary for all websites?", answer: "Yes. Search engines penalize non-HTTPS sites, browsers show security warnings, and even static sites can be targets for man-in-the-middle attacks. There's no reason not to use HTTPS in 2025." },
      { question: "What's the most common security vulnerability?", answer: "According to recent data, injection attacks (SQL injection, XSS) remain the most common web vulnerabilities, followed by broken authentication and security misconfigurations." },
    ],
  },
  {
    slug: "choosing-right-tech-stack",
    title: "How to Choose the Right Tech Stack for Your Project",
    excerpt: "A practical decision framework for selecting technologies that match your project requirements, team skills, and business goals.",
    icon: "Layers",
    readTime: "15 min read",
    sections: [
      { title: "Start with Requirements, Not Trends", content: "The biggest mistake we see is choosing technologies because they're trending on Hacker News. Instead, start with your actual requirements: team size, expected traffic, time-to-market, and long-term maintenance needs. A boring, well-understood stack often beats a cutting-edge one." },
      { title: "Frontend Frameworks Compared", content: "React remains the dominant choice for complex applications. Next.js adds server-side rendering and a great developer experience. Vue.js offers a gentler learning curve. Svelte compiles away the framework overhead. For most business applications, Next.js with TypeScript is our default recommendation." },
      { title: "Backend Considerations", content: "Node.js works well when your team already knows JavaScript. Python excels for data-heavy applications. Go is ideal for high-performance microservices. The key factor is often team expertise — don't choose a language your team doesn't know just because it benchmarks well." },
      { title: "Database Selection", content: "PostgreSQL is the safe default for relational data. MongoDB works well for document-oriented data with flexible schemas. Redis handles caching and real-time features. Consider your query patterns, consistency requirements, and scaling needs when choosing." },
      { title: "Infrastructure and Deployment", content: "Cloud platforms like AWS, GCP, and Azure offer managed services that reduce operational burden. For most web applications, a platform like Vercel or Railway can handle deployment, scaling, and monitoring with minimal configuration." },
    ],
    faqs: [
      { question: "Should startups use microservices?", answer: "Usually no. Start with a monolith. Microservices add complexity in deployment, monitoring, and debugging. Most startups don't need microservices until they have distinct teams that need to deploy independently." },
      { question: "Is TypeScript worth the overhead?", answer: "Absolutely. TypeScript catches bugs at compile time, improves IDE support, and makes refactoring safer. The initial setup cost pays for itself within weeks on any project with more than one developer." },
    ],
  },
  {
    slug: "ai-implementation-playbook",
    title: "AI Implementation Playbook for Business Leaders",
    excerpt: "A practical guide to identifying AI opportunities, building a business case, and successfully deploying AI solutions in your organization.",
    icon: "Brain",
    readTime: "20 min read",
    sections: [
      { title: "Identifying AI Opportunities", content: "Not every problem needs AI. Look for tasks that involve pattern recognition, prediction, classification, or processing large amounts of unstructured data. Good AI candidates include customer support automation, demand forecasting, fraud detection, and content personalization." },
      { title: "Building the Business Case", content: "Quantify the potential ROI before investing. Consider: How much time does this task take manually? What's the error rate? What's the cost of errors? How many customers would benefit? A strong business case makes it easier to secure budget and organizational buy-in." },
      { title: "Data Readiness Assessment", content: "AI is only as good as your data. Before starting any AI project, assess your data quality, quantity, and accessibility. Do you have enough labeled examples? Is your data clean and well-organized? Can you access it programmatically? Address data issues before building models." },
      { title: "Build vs. Buy Decisions", content: "For most businesses, buying or using existing AI services (like OpenAI APIs, Google Cloud AI, or AWS SageMaker) is more practical than building from scratch. Custom models make sense only when you have unique data that gives you a competitive advantage." },
      { title: "Implementation and Deployment", content: "Start with a pilot project. Choose a use case with clear success metrics, limited scope, and enthusiastic stakeholders. Build, test, measure, and iterate before scaling. Production AI systems need monitoring for model drift, bias, and performance degradation." },
      { title: "Measuring Success", content: "Define KPIs before launch. Track both technical metrics (accuracy, latency, uptime) and business metrics (cost savings, revenue impact, customer satisfaction). Regular review cycles ensure your AI investment continues to deliver value." },
    ],
    faqs: [
      { question: "How much data do I need for AI?", answer: "It depends on the complexity of the problem. Simple classification tasks might work with hundreds of examples. Complex image recognition might need thousands. For most business applications using pre-trained models (like GPT), you need much less training data than building from scratch." },
      { question: "How long does an AI project take?", answer: "A typical AI pilot takes 2-4 months from concept to initial deployment. Full production rollout with monitoring and optimization adds another 2-3 months. The biggest time investment is usually data preparation, not model building." },
      { question: "What's the biggest risk in AI projects?", answer: "Solving the wrong problem. Many AI projects fail not because of technical issues, but because they automate something that didn't need automating, or they optimize for the wrong metric. Thorough problem definition upfront is critical." },
    ],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getAllGuides(): Guide[] {
  return guides;
}
