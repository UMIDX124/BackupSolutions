---
title: "How We Cut Our Client's Cloud Costs by 60% Without Sacrificing Performance"
excerpt: "A real-world case study of how we reduced a SaaS company's AWS bill from $47,000/month to under $19,000 — while actually improving their application performance."
category: "cloud-infrastructure"
tags: ["cloud costs", "AWS optimization", "infrastructure", "cost reduction", "DevOps"]
date: "2024-09-02"
author: "m-faizan-rafiq"
lastModified: "2024-09-02"
featured: true
faqs:
  - question: "What's the easiest way to start reducing cloud costs?"
    answer: "Start with rightsizing your instances. Most companies are running instances that are 2-4x larger than they need. Use AWS Compute Optimizer or similar tools to identify oversized resources. It's the lowest-hanging fruit and can often save 20-30% immediately."
  - question: "Will reducing cloud spend hurt my application performance?"
    answer: "Not if you do it right. In fact, many optimization strategies — like implementing caching, using CDNs, and rightsizing databases — actually improve performance while reducing costs. The key is measuring before and after, not just cutting blindly."
  - question: "How often should I review my cloud spending?"
    answer: "Monthly at minimum, weekly if your spend is over $10,000/month. Set up automated alerts for spending anomalies and review your cost allocation tags regularly. Cloud costs have a tendency to creep up silently."
  - question: "Should I use reserved instances or spot instances?"
    answer: "Both, but for different workloads. Reserved instances (or savings plans) are great for stable, predictable workloads — you can save 40-60% over on-demand pricing. Spot instances are perfect for fault-tolerant, flexible workloads like batch processing or CI/CD pipelines, with savings up to 90%. Don't put critical production workloads on spot instances though."
---

# How We Cut Our Client's Cloud Costs by 60% Without Sacrificing Performance

Last September, a SaaS company came to us with a problem that's become disturbingly common: their AWS bill had ballooned to $47,000 per month, and nobody could really explain why.

They'd started on AWS three years earlier with a modest $3,000/month bill. As the company grew, so did the infrastructure. New services, new databases, new environments. The usual story. But somewhere along the way, things got out of hand.

The CEO's exact words: "We're spending more on AWS than on half our engineering team's salaries."

Here's what we did about it.

## The Audit: Finding Where the Money Was Going

Before cutting anything, we needed to understand where the money was actually going. You'd be surprised how many companies don't have clear visibility into their cloud spending. This client was no exception.

### Step 1: Cost Allocation Tags

The first thing we noticed? Almost nothing was tagged properly. Resources were floating around without any indication of which team, project, or environment they belonged to.

We implemented a tagging strategy across every resource:
- `environment`: production, staging, development
- `team`: backend, frontend, data, platform
- `project`: the specific project or service name
- `cost-center`: for finance and budgeting alignment

This alone was eye-opening. Once we could see the breakdown, the picture became much clearer.

### Step 2: The Cost Breakdown

Here's roughly where that $47,000/month was going:

| Category | Monthly Cost | Percentage |
|----------|-------------|------------|
| EC2 Instances | $18,400 | 39% |
| RDS Databases | $11,200 | 24% |
| Data Transfer | $5,600 | 12% |
| EBS Storage | $4,200 | 9% |
| ElastiCache | $3,800 | 8% |
| Other Services | $3,800 | 8% |

That EC2 line item immediately jumped out at me. $18,400/month on compute? For a company with around 50,000 active users? Something was off.

## The Big Wins

### Win #1: Rightsizing EC2 Instances — Saved $9,200/month

This was the single biggest win, and honestly, it was embarrassingly straightforward.

They were running 12 `m5.2xlarge` instances in production. Each one had 8 vCPUs and 32GB of RAM. When we looked at the actual utilization metrics over a 30-day period:

- Average CPU utilization: **14%**
- Average memory utilization: **22%**
- Peak CPU utilization (during deployments): **45%**

They were massively over-provisioned. We worked with their engineering team to right-size these down to `m5.large` instances (2 vCPUs, 8GB RAM) and added auto-scaling to handle peak loads.

The result? Same performance, sometimes better (because auto-scaling responded faster to traffic spikes), and the EC2 bill dropped from $18,400 to $9,200.

But we weren't done with compute yet.

### Win #2: Reserved Instances and Savings Plans — Saved $3,700/month

Once we knew the baseline compute requirements, we purchased Reserved Instances for the steady-state workloads and a Compute Savings Plan for the flexible ones.

- **3 reserved instances** (1-year, partial upfront) for the core application servers
- **Compute Savings Plan** covering $5/hour of compute usage

This locked in significant savings on workloads we knew weren't going away. Combined savings: about $3,700/month compared to on-demand pricing.

### Win #3: Database Optimization — Saved $6,500/month

The RDS setup was... interesting. They had:

- A `db.r5.4xlarge` primary instance (16 vCPUs, 128GB RAM)
- Two read replicas of the same size
- Multi-AZ enabled on all three

For 50,000 users.

Here's the thing — their database wasn't slow because it needed more hardware. It was slow because of unoptimized queries. We found:

- **23 queries** running without proper indexes
- **7 N+1 query patterns** in their ORM layer
- **One query** that was doing a full table scan on a 40-million-row table every 5 minutes (a background job gone wrong)

After fixing the queries and adding proper indexes, we were able to:

1. Downsize the primary to `db.r5.xlarge` (4 vCPUs, 32GB RAM)
2. Reduce to one read replica
3. Keep Multi-AZ only on the primary

Database costs went from $11,200 to $4,700/month. And response times actually improved by 40% because we'd fixed the underlying query issues.

### Win #4: Development and Staging Environments — Saved $4,300/month

This is one that catches almost every growing company. Their development and staging environments were running 24/7 with production-equivalent resources. But developers only work roughly 10 hours a day, 5 days a week. That's about 30% of the total hours in a month.

We implemented:

- **Scheduled scaling**: Dev and staging environments automatically shut down at 8 PM and spin back up at 7 AM on weekdays. Completely off on weekends.
- **Right-sized dev instances**: Development doesn't need production-grade hardware. We downsized everything.
- **Shared staging**: Instead of per-team staging environments, we set up a shared staging environment with namespace isolation.

These changes saved $4,300/month without any developer pushback. In fact, the developers preferred it because the shared staging environment had better data and more realistic testing conditions.

### Win #5: Data Transfer and CDN — Saved $3,200/month

$5,600/month in data transfer costs was a red flag. When we dug in, we found two issues:

1. **No CDN for static assets**: Every image, CSS file, and JavaScript bundle was being served directly from EC2. Setting up CloudFront with proper caching cut data transfer costs dramatically.

2. **Cross-region data transfer**: Their application servers in `us-east-1` were regularly pulling data from an S3 bucket in `us-west-2`. Nobody knew why — it was a leftover from an old architecture decision. Moving the bucket to the same region eliminated those cross-region transfer charges.

### Win #6: Storage Cleanup — Saved $1,800/month

Storage costs creep up silently. We found:

- **47 unattached EBS volumes** — leftover from terminated instances that nobody cleaned up
- **3.2 TB of old snapshots** — daily snapshots with no lifecycle policy, going back 18 months
- **S3 lifecycle policies** — logs and temporary files sitting in S3 Standard that should've been in Glacier or simply deleted

We implemented lifecycle policies, cleaned up orphaned resources, and set up alerts for future orphaned volumes.

## The Results

After six weeks of optimization work, here's the final breakdown:

| Category | Before | After | Savings |
|----------|--------|-------|---------|
| EC2 Instances | $18,400 | $5,500 | $12,900 |
| RDS Databases | $11,200 | $4,700 | $6,500 |
| Data Transfer | $5,600 | $2,400 | $3,200 |
| EBS Storage | $4,200 | $2,400 | $1,800 |
| ElastiCache | $3,800 | $2,100 | $1,700 |
| Other Services | $3,800 | $1,700 | $2,100 |
| **Total** | **$47,000** | **$18,800** | **$28,200** |

That's a **60% reduction** in cloud costs. $28,200 saved per month. $338,400 per year.

And here's the kicker — application performance actually *improved*:
- API response times decreased by **35%** (thanks to query optimization)
- Page load times improved by **22%** (thanks to CDN implementation)
- Deployment times decreased by **50%** (smaller, more efficient instances spin up faster)

## Lessons We Learned

### 1. Cloud Waste is Normal — Ignoring It Isn't

Every company we've worked with has significant cloud waste. It's not a sign of incompetence; it's a natural consequence of growth. What matters is whether you actively manage it.

### 2. Optimization is Ongoing, Not One-Time

We set up monthly cost reviews and automated anomaly detection for this client. Cloud costs will creep back up if you're not watching. New services get deployed, old ones don't get cleaned up. It's a continuous process.

### 3. Engineers Need Cost Visibility

One of the most impactful changes was giving the engineering team visibility into costs. When developers can see that their service costs $X per month, they make different architectural decisions. We set up per-service cost dashboards that the team checks weekly.

### 4. Don't Optimize Prematurely, But Don't Wait Too Long

The client wished they'd done this two years earlier. They estimated they'd wasted roughly $400,000 in unnecessary cloud spending over that period. My advice: schedule your first cloud cost review when your monthly bill crosses $5,000. Don't wait until it's a crisis.

### 5. Performance and Cost Optimization Often Go Hand in Hand

This was the most surprising takeaway for the client's leadership team. They'd assumed cost cutting meant sacrificing performance. In reality, many optimizations — fixing slow queries, implementing caching, using CDNs — improve both performance and cost simultaneously.

## Building a Cost-Conscious Culture

The technical optimizations were important, but the cultural shift was equally valuable. Here's what we helped implement:

- **Cost tags in CI/CD**: Every deployment automatically tags resources for cost tracking
- **Budget alerts**: Automated Slack notifications when spending exceeds thresholds
- **Architecture reviews**: Cost is now a first-class consideration in architecture decisions
- **Monthly cost reviews**: 30-minute meeting where the team reviews spending trends

## Your Cloud Cost Optimization Starter Kit

If you're looking at your own cloud bill and feeling a little queasy, here's where to start:

1. **Tag everything.** You can't optimize what you can't measure.
2. **Check utilization.** Most instances are oversized. Look at actual CPU and memory usage.
3. **Kill zombie resources.** Unattached volumes, unused load balancers, forgotten test environments.
4. **Implement scheduling.** Non-production environments don't need to run 24/7.
5. **Review data transfer.** Cross-region transfers and lack of CDN are common cost drivers.
6. **Consider commitments.** Reserved Instances or Savings Plans for predictable workloads.

The $47,000-to-$18,800 story isn't unique to this client. We've seen similar patterns across dozens of companies. The specific numbers vary, but the underlying issues — over-provisioning, lack of visibility, no lifecycle management — are nearly universal.

Your cloud bill probably has room for a 30-50% reduction. The question isn't whether the opportunity exists. It's whether you're going to do something about it.
