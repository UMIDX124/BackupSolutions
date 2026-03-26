export interface CaseStudyResult {
  metric: string;
  value: string;
  description: string;
}

export interface CaseStudyTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  duration: string;
  year: string;
  challenge: string;
  strategy: string;
  execution: string;
  results: CaseStudyResult[];
  testimonial: CaseStudyTestimonial;
  tags: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "techmart-ecommerce-overhaul",
    title: "TechMart E-Commerce Platform Overhaul",
    client: "TechMart",
    industry: "E-Commerce",
    duration: "6 months",
    year: "2024",
    challenge:
      "TechMart was hemorrhaging revenue through an outdated e-commerce platform plagued by 2.1-second load times, frequent downtime during peak traffic, and a checkout flow that abandoned 73% of carts. Their monolithic architecture could not scale to meet growing demand, and every attempted patch introduced new regressions that eroded customer trust and pushed buyers to competitors.",
    strategy:
      "We proposed a ground-up rebuild using a headless commerce architecture with edge-rendered storefronts, a microservices backend, and an event-driven inventory system. The migration would be executed in parallel with the live platform using a strangler-fig pattern, ensuring zero downtime during the transition and allowing incremental validation of each component before cutover.",
    execution:
      "Our team deployed a Next.js storefront with ISR for product pages, backed by a Go-based API gateway routing to independent order, inventory, and payment microservices. We implemented a CDN-first caching strategy with stale-while-revalidate patterns, integrated real-time inventory sync via Redis Streams, and redesigned the checkout into a streamlined three-step flow with address autocomplete and one-click payment. Load testing confirmed sub-400ms TTFB under 50,000 concurrent users before the final cutover.",
    results: [
      {
        metric: "Revenue Growth",
        value: "340%",
        description:
          "Annual revenue increased 340% within the first year of launch, driven by improved conversion rates and higher average order values.",
      },
      {
        metric: "Page Load Time",
        value: "0.4s",
        description:
          "Average page load dropped from 2.1 seconds to 0.4 seconds, delivering a near-instant browsing experience across all devices.",
      },
      {
        metric: "Platform Uptime",
        value: "99.99%",
        description:
          "The new architecture achieved 99.99% uptime over 12 months, including flawless performance during Black Friday and holiday surges.",
      },
      {
        metric: "Cart Abandonment",
        value: "-58%",
        description:
          "The redesigned checkout flow cut cart abandonment by 58%, converting thousands of previously lost transactions into completed orders.",
      },
    ],
    testimonial: {
      quote:
        "Backup Solutions did not just rebuild our platform — they fundamentally transformed how we do business online. The results exceeded every projection we had.",
      author: "Amara Okafor",
      role: "CTO, TechMart",
    },
    tags: [
      "Next.js",
      "Microservices",
      "E-Commerce",
      "Performance Optimization",
      "Headless Architecture",
      "Edge Computing",
    ],
  },
  {
    slug: "securebank-security-infrastructure",
    title: "SecureBank Security Infrastructure",
    client: "SecureBank",
    industry: "FinTech",
    duration: "8 months",
    year: "2024",
    challenge:
      "SecureBank faced mounting regulatory pressure after two near-miss security incidents exposed critical vulnerabilities in their authentication pipeline and data-at-rest encryption. Their legacy perimeter-based security model could not address modern threats, and compliance audits flagged over 40 findings requiring immediate remediation — putting their banking license at risk.",
    strategy:
      "We designed a zero-trust security architecture centered on identity-based access control, end-to-end encryption, and continuous threat monitoring. The approach combined hardware security modules for key management, behavioral biometrics for adaptive authentication, and a SIEM-integrated anomaly detection pipeline that could identify and isolate threats in real time without disrupting legitimate user sessions.",
    execution:
      "We deployed a multi-layered defense system featuring mutual TLS across all internal services, FIDO2-based passwordless authentication with device binding, and AES-256-GCM encryption for data at rest and in transit. A custom threat intelligence engine ingested feeds from 12 sources, correlating events across the network in under 50 milliseconds. We also built an automated compliance dashboard mapping controls to PCI-DSS, SOC 2, and local banking regulations, reducing audit preparation from weeks to hours.",
    results: [
      {
        metric: "Security Breaches",
        value: "Zero",
        description:
          "Zero successful breaches in the 18 months since deployment, despite a 300% increase in attempted attacks detected and neutralized.",
      },
      {
        metric: "Auth Response Time",
        value: "50ms",
        description:
          "Authentication decisions are made in under 50 milliseconds, providing bank-grade security without any perceptible friction for end users.",
      },
      {
        metric: "Cost Savings",
        value: "$2.3M",
        description:
          "Automated compliance monitoring and threat response saved $2.3 million annually in manual security operations and audit costs.",
      },
      {
        metric: "Compliance Score",
        value: "100%",
        description:
          "Achieved a perfect compliance score across all regulatory frameworks, clearing every audit finding from the previous assessment.",
      },
    ],
    testimonial: {
      quote:
        "Our board went from emergency security meetings to confident investor presentations. Backup Solutions delivered a security posture that our competitors now benchmark against.",
      author: "James Whitfield",
      role: "CISO, SecureBank",
    },
    tags: [
      "Zero Trust",
      "Cybersecurity",
      "FinTech",
      "Compliance",
      "FIDO2",
      "Threat Intelligence",
    ],
  },
  {
    slug: "dataflow-ai-analytics",
    title: "DataFlow AI Analytics Dashboard",
    client: "DataFlow",
    industry: "SaaS",
    duration: "5 months",
    year: "2025",
    challenge:
      "DataFlow's analytics platform was drowning in data but starving for insights. Their SQL-based reporting pipeline took hours to process queries across billions of rows, forcing analysts to work with stale dashboards and best-guess decisions. Customer churn was climbing as competitors shipped real-time analytics features that DataFlow's architecture simply could not support.",
    strategy:
      "We architected an AI-augmented analytics layer that combined columnar data storage with machine learning inference at the query level. The system would pre-compute common aggregations using incremental materialized views, surface anomalies proactively through unsupervised learning, and allow natural-language queries that translated business questions into optimized analytical pipelines.",
    execution:
      "We migrated the data layer to ClickHouse for sub-second OLAP queries, implemented a feature store serving pre-computed metrics to a custom ML pipeline built on PyTorch, and developed a natural-language query interface using fine-tuned LLMs that translated plain English into analytical workflows. The React-based dashboard delivered real-time visualizations through WebSocket streams, with collaborative annotation features and automated insight alerts that surfaced trends before users had to ask.",
    results: [
      {
        metric: "Insight Speed",
        value: "10x",
        description:
          "Analytical queries that previously took hours now return in seconds, enabling real-time decision-making across all business units.",
      },
      {
        metric: "Prediction Accuracy",
        value: "98%",
        description:
          "The ML models achieved 98% accuracy on demand forecasting and anomaly detection, catching issues days before they impacted revenue.",
      },
      {
        metric: "Infrastructure Cost",
        value: "-60%",
        description:
          "Optimized data pipelines and intelligent caching reduced infrastructure costs by 60% while handling 5x the previous query volume.",
      },
    ],
    testimonial: {
      quote:
        "We went from a team that reported on the past to one that predicts the future. The AI analytics dashboard is the single most impactful technology investment we have ever made.",
      author: "Priya Sharma",
      role: "VP of Product, DataFlow",
    },
    tags: [
      "AI/ML",
      "Analytics",
      "SaaS",
      "Real-Time Data",
      "Natural Language Processing",
      "ClickHouse",
    ],
  },
  {
    slug: "cloudshift-migration",
    title: "CloudShift Cloud Migration",
    client: "CloudShift",
    industry: "Healthcare",
    duration: "10 months",
    year: "2023",
    challenge:
      "CloudShift operated mission-critical healthcare systems on aging on-premise servers that were expensive to maintain, impossible to scale, and one hardware failure away from catastrophic data loss. Their patient records system, appointment scheduling, and billing platform were tightly coupled monoliths with no disaster recovery plan — a direct threat to both patient safety and HIPAA compliance.",
    strategy:
      "We developed a phased cloud migration strategy that prioritized data integrity and zero patient-impact cutover. Each legacy system would be containerized, decomposed into bounded contexts, and migrated to a HIPAA-compliant cloud environment with automated failover, encrypted backups, and comprehensive audit logging — all while maintaining uninterrupted service to 200+ healthcare facilities.",
    execution:
      "We containerized each application using Docker with Kubernetes orchestration on a HIPAA-compliant AWS environment, implementing blue-green deployments for zero-downtime migrations. Patient data was migrated using a dual-write pattern with cryptographic verification to ensure byte-level accuracy across 47 million records. We deployed multi-region failover with automated health checks, encrypted all data with customer-managed KMS keys, and implemented a comprehensive audit trail satisfying HIPAA, HITECH, and SOC 2 Type II requirements. The entire migration completed without a single minute of unplanned downtime.",
    results: [
      {
        metric: "System Uptime",
        value: "99.95%",
        description:
          "Achieved 99.95% uptime across all healthcare systems, with automated failover ensuring continuity even during regional cloud outages.",
      },
      {
        metric: "Cost Reduction",
        value: "40%",
        description:
          "Eliminated on-premise hardware costs and optimized cloud resource allocation, reducing total infrastructure spend by 40% year over year.",
      },
      {
        metric: "HIPAA Compliance",
        value: "Full",
        description:
          "Passed HIPAA compliance audits with zero findings, establishing a security posture that became the benchmark for the organization.",
      },
      {
        metric: "Data Migration",
        value: "47M",
        description:
          "Successfully migrated 47 million patient records with cryptographic verification and zero data loss or corruption incidents.",
      },
    ],
    testimonial: {
      quote:
        "Migrating healthcare systems is terrifying — one mistake can affect patient lives. Backup Solutions executed flawlessly. We never lost a single record or a single minute of service.",
      author: "Dr. Rachel Kim",
      role: "Chief Medical Information Officer, CloudShift",
    },
    tags: [
      "Cloud Migration",
      "Healthcare",
      "HIPAA",
      "Kubernetes",
      "AWS",
      "Disaster Recovery",
    ],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies;
}
