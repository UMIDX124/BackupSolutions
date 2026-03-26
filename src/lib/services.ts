export interface Service {
  slug: string;
  title: string;
  headline: string;
  description: string;
  painPoints: { title: string; description: string }[];
  solutions: { title: string; description: string }[];
  process: { title: string; description: string; icon: string }[];
  benefits: { metric: string; label: string }[];
  faqs: { question: string; answer: string }[];
}

export const services: Service[] = [
  {
    slug: "web-architecture",
    title: "Web Architecture",
    headline: "High-Performance Websites & Web Applications",
    description:
      "We design and build lightning-fast, scalable web platforms that deliver exceptional user experiences. From responsive frontends to robust backend infrastructure, every layer is engineered for speed, security, and growth.",
    painPoints: [
      {
        title: "Sluggish Load Times",
        description:
          "Slow-loading pages drive visitors away and tank your search rankings. Every additional second of load time increases bounce rates and costs you revenue.",
      },
      {
        title: "Poor User Experience",
        description:
          "Clunky navigation, broken layouts on mobile, and inconsistent design erode trust and make users abandon your platform before they convert.",
      },
      {
        title: "Security Vulnerabilities",
        description:
          "Outdated frameworks and unpatched dependencies leave your site exposed to XSS attacks, data breaches, and compliance violations that threaten your business.",
      },
      {
        title: "Scalability Bottlenecks",
        description:
          "Traffic spikes crash your servers, database queries grind to a halt, and your monolithic architecture cannot scale to meet growing demand.",
      },
    ],
    solutions: [
      {
        title: "Modern Framework Engineering",
        description:
          "We leverage Next.js, React, and edge computing to build sites that load in under one second with server-side rendering, static generation, and intelligent caching strategies.",
      },
      {
        title: "Responsive & Accessible Design",
        description:
          "Every interface is crafted to work flawlessly across all devices and screen sizes, with WCAG-compliant accessibility baked in from the start.",
      },
      {
        title: "Security Hardening",
        description:
          "Multi-layered security including CSP headers, input sanitization, dependency auditing, and automated vulnerability scanning to keep your platform bulletproof.",
      },
      {
        title: "Cloud-Native Infrastructure",
        description:
          "Containerized deployments on auto-scaling cloud infrastructure with CDN distribution, ensuring your site handles any traffic volume without breaking a sweat.",
      },
    ],
    process: [
      {
        title: "Architecture Audit",
        description:
          "We analyze your current stack, identify performance bottlenecks, and map out an optimized architecture tailored to your business goals.",
        icon: "Search",
      },
      {
        title: "UI/UX Prototyping",
        description:
          "Interactive wireframes and high-fidelity prototypes validated through user testing before a single line of production code is written.",
        icon: "PenTool",
      },
      {
        title: "Agile Development",
        description:
          "Two-week sprints with continuous integration, automated testing, and regular demos so you see progress and provide feedback at every stage.",
        icon: "Code",
      },
      {
        title: "Launch & Optimize",
        description:
          "Zero-downtime deployment with performance monitoring, real-user metrics, and ongoing optimization to keep your platform at peak performance.",
        icon: "Rocket",
      },
    ],
    benefits: [
      { metric: "99.9%", label: "Uptime Guarantee" },
      { metric: "<1s", label: "Average Load Time" },
      { metric: "3x", label: "Conversion Improvement" },
      { metric: "60%", label: "Reduced Bounce Rate" },
    ],
    faqs: [
      {
        question: "What frontend frameworks do you work with?",
        answer:
          "Our primary stack is Next.js and React, but we also have deep expertise in Astro, SvelteKit, and Vue/Nuxt. We choose the framework that best fits your project requirements, whether that means static site generation for content-heavy sites or full server-side rendering for dynamic applications.",
      },
      {
        question: "How do you handle website performance optimization?",
        answer:
          "We take a holistic approach: code splitting and lazy loading to reduce initial bundle size, image optimization with modern formats like WebP and AVIF, edge caching through CDNs, database query optimization, and Core Web Vitals monitoring. Every site we ship scores 90+ on Lighthouse.",
      },
      {
        question: "Can you migrate our existing website to a modern stack?",
        answer:
          "Absolutely. We have migrated dozens of legacy platforms — from WordPress and Drupal to custom PHP — onto modern frameworks with zero downtime. Our migration process includes content mapping, URL redirect planning, SEO preservation, and thorough QA testing.",
      },
      {
        question: "Do you provide ongoing maintenance and support?",
        answer:
          "Yes. We offer flexible retainer plans that include security patching, dependency updates, performance monitoring, bug fixes, and feature enhancements. Our support team provides guaranteed response times and proactive health checks.",
      },
      {
        question: "How do you ensure the site is secure?",
        answer:
          "Security is built into every layer: we implement Content Security Policy headers, HTTPS everywhere, input validation and sanitization, rate limiting, automated dependency vulnerability scanning, and regular penetration testing. We also follow OWASP Top 10 guidelines for every project.",
      },
    ],
  },
  {
    slug: "software-engineering",
    title: "Software Engineering",
    headline: "Custom Software, APIs & Backend Systems",
    description:
      "We build the systems that power your business — from high-throughput APIs and microservices to enterprise platforms and data pipelines. Clean architecture, rigorous testing, and scalable design from day one.",
    painPoints: [
      {
        title: "Legacy System Paralysis",
        description:
          "Aging codebases written in outdated languages are impossible to extend, painful to maintain, and a ticking time bomb for reliability and security.",
      },
      {
        title: "Integration Failures",
        description:
          "Disconnected systems, incompatible data formats, and brittle point-to-point integrations create data silos and manual workarounds that drain productivity.",
      },
      {
        title: "Mounting Technical Debt",
        description:
          "Years of quick fixes and shortcuts have left your codebase tangled, untested, and fragile — every new feature risks breaking something else.",
      },
      {
        title: "Scaling Limitations",
        description:
          "Your monolithic application cannot handle growing user loads, and horizontal scaling is impossible without a fundamental re-architecture of the system.",
      },
    ],
    solutions: [
      {
        title: "Microservices Architecture",
        description:
          "We decompose monoliths into independently deployable services with clear domain boundaries, enabling teams to ship features faster without stepping on each other.",
      },
      {
        title: "API-First Design",
        description:
          "RESTful and GraphQL APIs designed with OpenAPI specifications, versioning strategies, and comprehensive documentation so every integration is predictable and reliable.",
      },
      {
        title: "Strategic Refactoring",
        description:
          "Incremental modernization of legacy systems using the strangler fig pattern — replacing components piece by piece without disrupting ongoing operations.",
      },
      {
        title: "Auto-Scaling Infrastructure",
        description:
          "Kubernetes-orchestrated containers with horizontal pod autoscaling, load balancing, and infrastructure-as-code so your system grows effortlessly with demand.",
      },
    ],
    process: [
      {
        title: "System Discovery",
        description:
          "Deep-dive into your existing architecture, data flows, and business logic to understand constraints and define clear technical requirements.",
        icon: "Database",
      },
      {
        title: "Architecture Design",
        description:
          "Domain-driven design sessions to define service boundaries, data models, API contracts, and integration patterns before development begins.",
        icon: "Server",
      },
      {
        title: "Iterative Build",
        description:
          "Test-driven development in two-week sprints with CI/CD pipelines, code reviews, and automated quality gates ensuring production-ready code at every step.",
        icon: "Code",
      },
      {
        title: "Deploy & Scale",
        description:
          "Blue-green deployments, infrastructure monitoring, and automated scaling policies to ensure reliable, zero-downtime releases and peak performance.",
        icon: "Rocket",
      },
    ],
    benefits: [
      { metric: "10x", label: "Faster Deployments" },
      { metric: "95%", label: "Test Coverage" },
      { metric: "40%", label: "Lower Infrastructure Cost" },
      { metric: "99.99%", label: "System Availability" },
    ],
    faqs: [
      {
        question: "What programming languages and frameworks do you use?",
        answer:
          "Our backend expertise spans Node.js with TypeScript, Python, Go, and Rust. We choose the right tool for each service based on performance requirements, team familiarity, and ecosystem maturity. For databases, we work with PostgreSQL, MongoDB, Redis, and specialized stores like Elasticsearch.",
      },
      {
        question: "How do you approach legacy system modernization?",
        answer:
          "We use the strangler fig pattern to incrementally replace legacy components without disrupting your running systems. We start by wrapping existing functionality behind modern APIs, then migrate business logic service by service. This reduces risk and delivers value continuously rather than in a single risky cutover.",
      },
      {
        question: "Can you integrate with our existing third-party services?",
        answer:
          "Yes. We have extensive experience integrating with payment gateways, CRMs, ERPs, messaging platforms, and cloud services. We build robust integration layers with retry logic, circuit breakers, and comprehensive error handling to ensure reliable communication between systems.",
      },
      {
        question: "How do you ensure code quality?",
        answer:
          "Every line of code goes through automated linting, unit tests, integration tests, and peer code review. We enforce minimum test coverage thresholds, use static analysis tools, and maintain comprehensive CI/CD pipelines that catch issues before they reach production.",
      },
      {
        question: "What does your deployment process look like?",
        answer:
          "We use infrastructure-as-code with Terraform or Pulumi, containerized deployments via Docker and Kubernetes, and blue-green or canary release strategies. Every deployment is automated through CI/CD pipelines with rollback capabilities, health checks, and monitoring alerts.",
      },
    ],
  },
  {
    slug: "ai-modeling",
    title: "AI Modeling",
    headline: "Machine Learning Solutions & Intelligent Automation",
    description:
      "We transform your data into competitive advantage with custom ML models, AI-powered automation, and intelligent tools. From predictive analytics to natural language processing, we build AI that delivers measurable business impact.",
    painPoints: [
      {
        title: "Manual Process Overload",
        description:
          "Repetitive tasks like data entry, document classification, and report generation consume hundreds of employee hours that could be spent on strategic work.",
      },
      {
        title: "Data Overload Without Insight",
        description:
          "You are sitting on mountains of data but lack the tools to extract actionable patterns, trends, and predictions that drive informed decision-making.",
      },
      {
        title: "Missed Business Insights",
        description:
          "Without predictive models, you are reacting to market shifts instead of anticipating them — losing opportunities to competitors who leverage data-driven strategies.",
      },
      {
        title: "Competitive Pressure",
        description:
          "Rivals are deploying AI to personalize customer experiences, optimize operations, and accelerate innovation while you rely on traditional methods that cannot keep pace.",
      },
    ],
    solutions: [
      {
        title: "Predictive Analytics",
        description:
          "Custom ML models trained on your historical data to forecast demand, predict churn, detect anomalies, and surface opportunities before your competitors see them.",
      },
      {
        title: "Natural Language Processing",
        description:
          "Intelligent text analysis for sentiment detection, document summarization, chatbots, and automated content classification that understands context and nuance.",
      },
      {
        title: "Computer Vision",
        description:
          "Image and video analysis pipelines for quality inspection, object detection, facial recognition, and visual search — turning visual data into structured intelligence.",
      },
      {
        title: "Recommendation Engines",
        description:
          "Personalized recommendation systems that increase engagement, cross-sell revenue, and customer satisfaction by surfacing the right content at the right time.",
      },
    ],
    process: [
      {
        title: "Data Assessment",
        description:
          "We audit your data sources, evaluate quality and completeness, and identify the highest-impact ML use cases aligned with your business objectives.",
        icon: "Database",
      },
      {
        title: "Model Development",
        description:
          "Iterative model training with rigorous validation, feature engineering, and hyperparameter tuning to achieve production-grade accuracy and reliability.",
        icon: "Brain",
      },
      {
        title: "Integration & Testing",
        description:
          "Seamless integration of ML models into your existing workflows via APIs, with A/B testing and shadow deployments to validate real-world performance.",
        icon: "Zap",
      },
      {
        title: "Monitor & Improve",
        description:
          "Continuous model monitoring for drift detection, automated retraining pipelines, and performance dashboards to ensure your AI stays accurate over time.",
        icon: "TrendingUp",
      },
    ],
    benefits: [
      { metric: "85%", label: "Process Automation Rate" },
      { metric: "5x", label: "Faster Data Processing" },
      { metric: "92%", label: "Prediction Accuracy" },
      { metric: "300%", label: "ROI Within 12 Months" },
    ],
    faqs: [
      {
        question: "Do we need a large dataset to get started with AI?",
        answer:
          "Not necessarily. While more data generally improves model performance, we can start with smaller datasets using transfer learning, data augmentation, and pre-trained foundation models. During our discovery phase, we assess your available data and recommend the most effective approach for your specific use case.",
      },
      {
        question: "How long does it take to build and deploy an ML model?",
        answer:
          "A focused proof-of-concept typically takes 4-6 weeks from data assessment to initial deployment. Production-grade models with full integration and monitoring usually require 8-12 weeks. We deliver in iterative milestones so you see value early and can provide feedback throughout the process.",
      },
      {
        question: "Can AI models integrate with our existing software systems?",
        answer:
          "Absolutely. We deploy models as REST or gRPC APIs that integrate seamlessly with any modern software stack. We also build custom SDKs, webhook integrations, and batch processing pipelines tailored to your specific architecture and workflow requirements.",
      },
      {
        question: "How do you handle data privacy and security?",
        answer:
          "Data security is paramount in our AI practice. We implement end-to-end encryption, on-premises or private cloud deployment options, data anonymization techniques, and strict access controls. We comply with GDPR, CCPA, and industry-specific regulations, and we never use client data to train models for other clients.",
      },
      {
        question: "What happens when model performance degrades over time?",
        answer:
          "Model drift is expected and we plan for it. Our MLOps infrastructure includes automated drift detection, performance monitoring dashboards, and retraining pipelines that trigger when accuracy drops below defined thresholds. We also conduct quarterly model reviews to ensure your AI stays aligned with evolving business needs.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
