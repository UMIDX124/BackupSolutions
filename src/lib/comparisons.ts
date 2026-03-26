export interface Comparison {
  slug: string;
  title: string;
  excerpt: string;
  optionA: { name: string; pros: string[]; cons: string[] };
  optionB: { name: string; pros: string[]; cons: string[] };
  verdict: string;
  recommendation: string;
  faqs: { question: string; answer: string }[];
}

export const comparisons: Comparison[] = [
  {
    slug: "aws-vs-azure-vs-gcp",
    title: "AWS vs Azure vs Google Cloud: Which One's Right for You?",
    excerpt: "An honest comparison of the three major cloud providers based on pricing, features, and real-world usage.",
    optionA: {
      name: "AWS",
      pros: ["Largest service catalog", "Most mature ecosystem", "Best documentation", "Widest global infrastructure"],
      cons: ["Complex pricing", "Steeper learning curve", "Can be overkill for small projects"],
    },
    optionB: {
      name: "Azure",
      pros: ["Best Microsoft integration", "Strong enterprise features", "Hybrid cloud support", "Good compliance certifications"],
      cons: ["Portal can be confusing", "Some services feel unfinished", "Pricing can be unpredictable"],
    },
    verdict: "There's no universal winner. AWS leads in breadth and maturity. Azure excels if you're in the Microsoft ecosystem. GCP offers superior data and ML tools. For most of our clients, we recommend AWS for startups and Azure for enterprises with existing Microsoft investments.",
    recommendation: "Start with the cloud your team knows best. The cost of learning a new platform often exceeds any savings from marginally better pricing.",
    faqs: [
      { question: "Which cloud provider is cheapest?", answer: "It depends entirely on your workload. GCP tends to be cheapest for compute-heavy workloads, AWS for storage-heavy ones, and Azure for organizations with existing Microsoft licensing." },
      { question: "Can I use multiple cloud providers?", answer: "Yes, multi-cloud is increasingly common. However, it adds complexity. We recommend starting with one provider and adding others only when there's a clear business case." },
    ],
  },
  {
    slug: "react-vs-vue-vs-svelte",
    title: "React vs Vue vs Svelte: Frontend Framework Showdown",
    excerpt: "Comparing the three most popular frontend frameworks for web development in 2025.",
    optionA: {
      name: "React",
      pros: ["Largest ecosystem and community", "Most job opportunities", "Next.js for full-stack", "React Native for mobile"],
      cons: ["JSX learning curve", "Decision fatigue (too many choices)", "Frequent API changes"],
    },
    optionB: {
      name: "Vue",
      pros: ["Gentle learning curve", "Excellent documentation", "Template syntax familiar to HTML developers", "Nuxt.js ecosystem"],
      cons: ["Smaller ecosystem than React", "Fewer job postings", "Some enterprise adoption concerns"],
    },
    verdict: "React is the safe career and project choice with the largest ecosystem. Vue offers a better developer experience for smaller teams. Svelte produces the smallest bundles and simplest code, but has the smallest ecosystem.",
    recommendation: "For businesses: React (largest talent pool). For rapid prototyping: Vue. For performance-critical sites: Svelte.",
    faqs: [
      { question: "Is React harder to learn than Vue?", answer: "Generally yes. React requires understanding JSX, hooks, and the component lifecycle. Vue's template syntax is more approachable for developers coming from HTML/CSS backgrounds." },
    ],
  },
  {
    slug: "custom-software-vs-saas",
    title: "Custom Software vs SaaS: When to Build and When to Buy",
    excerpt: "A decision framework for choosing between building custom software and adopting existing SaaS solutions.",
    optionA: {
      name: "Custom Software",
      pros: ["Exactly fits your needs", "Full control over features and data", "No per-user licensing costs at scale", "Competitive advantage"],
      cons: ["Higher upfront cost", "Longer time-to-market", "Ongoing maintenance burden", "Need for technical team"],
    },
    optionB: {
      name: "SaaS Solutions",
      pros: ["Quick to deploy", "Lower initial cost", "Vendor handles maintenance", "Regular feature updates"],
      cons: ["Monthly subscription costs add up", "Limited customization", "Vendor lock-in risk", "Data sovereignty concerns"],
    },
    verdict: "Build custom when the software is your core business differentiator or when no SaaS solution fits your workflow. Buy SaaS for commodity functions like email, CRM, and project management.",
    recommendation: "Start with SaaS to validate your process, then build custom only for the specific workflows that give you a competitive edge.",
    faqs: [
      { question: "At what point does custom software become cheaper than SaaS?", answer: "Typically when you have 50+ users on a SaaS platform with per-seat pricing. The break-even point depends on the SaaS cost, custom development cost, and maintenance overhead." },
    ],
  },
  {
    slug: "monolith-vs-microservices",
    title: "Monolith vs Microservices: The Architecture Decision",
    excerpt: "When to use a monolithic architecture vs microservices, based on team size, project complexity, and scaling needs.",
    optionA: {
      name: "Monolith",
      pros: ["Simple to develop and deploy", "Easier debugging", "Lower operational overhead", "Faster initial development"],
      cons: ["Harder to scale individual components", "Technology lock-in", "Large codebase can become unwieldy", "Deployments affect entire system"],
    },
    optionB: {
      name: "Microservices",
      pros: ["Independent scaling", "Technology flexibility per service", "Isolated failures", "Independent deployments"],
      cons: ["Complex infrastructure", "Network latency between services", "Data consistency challenges", "Requires mature DevOps"],
    },
    verdict: "Start with a well-structured monolith. Extract microservices only when specific parts of your system have clearly different scaling or team ownership needs.",
    recommendation: "If your team has fewer than 20 engineers, a monolith is almost always the right choice. Microservices shine when you have 5+ teams that need to deploy independently.",
    faqs: [
      { question: "Can I start with a monolith and move to microservices later?", answer: "Yes, and this is our recommended approach. Build a well-structured monolith with clear module boundaries, then extract services as needed. This is sometimes called the 'majestic monolith' approach." },
    ],
  },
  {
    slug: "in-house-vs-outsourced-development",
    title: "In-House vs Outsourced Development: A Honest Comparison",
    excerpt: "Weighing the pros and cons of building an in-house development team versus outsourcing to an agency or freelancers.",
    optionA: {
      name: "In-House Team",
      pros: ["Deep product knowledge", "Full-time dedication", "Easier communication", "Long-term investment in talent"],
      cons: ["Expensive to hire and retain", "Limited skill diversity", "Slower to scale up/down", "Recruitment takes time"],
    },
    optionB: {
      name: "Outsourced Development",
      pros: ["Access to diverse expertise", "Flexible scaling", "Often lower cost", "Faster project kickoff"],
      cons: ["Communication overhead", "Less product context", "Quality varies widely", "IP and security concerns"],
    },
    verdict: "The best approach is often hybrid: an in-house core team that owns product direction, with outsourced partners for specialized skills or capacity overflow.",
    recommendation: "Keep your product vision and core architecture in-house. Outsource well-defined, time-bounded projects with clear specifications.",
    faqs: [
      { question: "How do I evaluate an outsourcing partner?", answer: "Look for relevant portfolio work, ask for client references, start with a small pilot project, and evaluate communication quality above all else. The best code doesn't matter if you can't align on requirements." },
    ],
  },
];

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}

export function getAllComparisons(): Comparison[] {
  return comparisons;
}
