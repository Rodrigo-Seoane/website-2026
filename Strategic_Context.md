# Strategic Context: Rodrigo Seoane Portfolio

**Purpose:** This document provides the strategic foundation for all website development decisions. Every feature, design choice, and content element should align with these principles, objectives, and key results.

**Last Updated:** February 4, 2026  
**Status:** Active - Reference for ALL Development Decisions

---

## 🎯 Core Principles & Values

### Who I Work With

I work with **innovative companies in the B2B SaaS market** that:

- Understand the value of design
- Recognize user experience as a key factor in product development
- Share my commitment to excellence in digital products and services

### How I Work

- **Ethics and transparency** in all client and collaborator communications
- **Attentive as in a game** - fully engaged, responsive, detail-oriented

---

## 🚀 Primary Objectives

### 1. Maximize Discoverability for New Jobs

**Goal:** Be found by the right opportunities instead of actively searching

**Website Implications:**

- SEO optimization for "B2B SaaS Product Designer", "Onboarding Specialist", "Customer Retention Design"
- Clear value proposition visible above the fold
- Portfolio showcasing B2B SaaS expertise prominently
- Easy-to-find contact methods (form + Calendly)
- Professional presentation that attracts premium clients

**Success Metric:** Receive 1 qualified job offer per week from B2B SaaS companies

### 2. Reduce Resume Distribution Effort

**Goal:** Stop sending resumes on multiple platforms daily

**Website Implications:**

- Portfolio serves as the primary resume/showcase
- Case studies demonstrate expertise comprehensively
- Downloadable resume/PDF version available
- LinkedIn integration for easy sharing
- Professional credibility established through content

---

## 📈 Secondary Objectives

### 1. Build Thought Leadership Brand

**Focus Areas:**

- Product design
- User onboarding optimization
- Customer retention strategies

**Website Implications:**

- Insights/Blog section prominently featured
- Content highlights expertise in onboarding and retention
- Easy content consumption and sharing
- Author bio establishing credibility
- Social proof through testimonials

**Success Metric:** 12 articles published on website (mix of new and republished)

### 2. Build Follower/Reader Base

**Goal:** Establish the website as content headquarters

**Website Implications:**

- Newsletter signup or content subscription option
- Content discovery made easy (categories, featured articles)
- Social media integration for sharing
- Return visit encouragement
- Content calendar consistency

### 3. Website as Central Hub

**Goal:** One destination for content, experience, and services

**Website Implications:**

- All services clearly defined and accessible
- Portfolio/case studies comprehensive
- Content library (articles, insights)
- Clear paths to engagement (contact, call booking)
- Professional brand consistency across all pages

**Success Metric:** 8 published case studies

---

## 🎯 Key Results (KPIs)

### Primary Conversion Goals

#### 1. Job Offers

**Target:** 1 qualified offer per week from B2B SaaS companies

**Tracking Requirements:**

- Google Analytics event: "Job Inquiry Received"
- Form field: "Inquiry Type" (with "Job Opportunity" option)
- Source tracking: Where did they find the site?

**Website Requirements:**

- Clear expertise positioning
- "Work With Me" or "Hire Me" CTA
- Portfolio demonstrating B2B SaaS results
- Easy contact methods
- Professional credibility signals

#### 2. Weekly Contacts

**Target:** 5 contacts per week (form submissions or call bookings)

**Tracking Requirements:**

- Google Analytics events:
  - "Contact Form Submitted"
  - "Discovery Call Booked"
- Calendly webhook integration for call tracking
- Form submission confirmation

**Website Requirements:**

- Multiple contact touchpoints throughout site
- Frictionless contact form (minimal fields)
- Calendly integration for instant booking
- Mobile-optimized contact methods
- Clear CTAs on every page

### Content Goals

#### 3. Article Publishing

**Target:** 12 articles published

**Tracking Requirements:**

- Article count dashboard
- Publication dates
- View metrics per article
- Read time tracking

**Website Requirements:**

- Insights section built for growth
- Easy content management
- SEO-optimized article pages
- Social sharing integration
- Featured articles highlighting

#### 4. Case Study Publishing

**Target:** 8 published case studies

**Tracking Requirements:**

- Case study count
- Views per case study
- Time spent on case study pages
- Scroll depth tracking

**Website Requirements:**

- Case study template system
- Visual showcase capabilities
- Results/metrics highlighting
- Easy navigation between studies
- SEO optimization per study

---

## 💡 Design & Development Decision Framework

When making any design or development decision, ask:

### 1. Does this help achieve the primary objective?

- ✅ Makes me more discoverable for B2B SaaS jobs?
- ✅ Demonstrates expertise clearly?
- ✅ Reduces friction to contact me?

### 2. Does this align with my values?

- ✅ Transparent and honest communication?
- ✅ Shows attention to detail ("attentive as in a game")?
- ✅ Appeals to innovative B2B SaaS companies?

### 3. Does this move KPIs forward?

- ✅ Increases likelihood of job offers?
- ✅ Encourages contact form submissions or call bookings?
- ✅ Supports content publishing goals?

### 4. Is this the simplest solution?

- ✅ KISS principle applied?
- ✅ No over-engineering?
- ✅ User experience prioritized?

---

## 🎨 Brand Positioning

### Specialist Positioning

**Primary:** Senior Product Designer specializing in B2B SaaS  
**Secondary:** Onboarding optimization & customer retention expert  
**Years:** 25+ years of experience  
**Location:** Barcelona, Spain (working globally)

### Target Audience

**Decision Makers at B2B SaaS Companies:**

- Product Managers
- VP/Head of Product
- CTOs/Engineering Leaders
- Founders (startup stage)
- Design Leaders

**Company Characteristics:**

- B2B SaaS business model
- Value design and UX
- Growth stage or established
- Budget for premium design talent
- Share values of innovation and excellence

### Competitive Differentiators

- 25+ years of experience
- Specific expertise in onboarding and retention
- B2B SaaS specialist (not generalist)
- Proven results (metrics-driven case studies)
- Thought leadership content
- Barcelona-based, global work

---

## 📊 Analytics & Conversion Tracking

### Required Google Analytics Events

```javascript
// Job Inquiry Received
gtag("event", "job_inquiry", {
  event_category: "contact",
  event_label: "Job Opportunity Form",
});

// Contact Form Submitted
gtag("event", "form_submission", {
  event_category: "contact",
  event_label: "Contact Form",
});

// Discovery Call Booked
gtag("event", "call_booked", {
  event_category: "conversion",
  event_label: "Calendly Discovery Call",
});

// Case Study Viewed (80% scroll depth)
gtag("event", "case_study_viewed", {
  event_category: "engagement",
  event_label: "Case Study: [slug]",
  value: 80,
});

// Article Read (2+ minutes on page)
gtag("event", "article_read", {
  event_category: "engagement",
  event_label: "Article: [slug]",
  value: 120,
});
```

### Success Dashboard Metrics

Track weekly:

- Job inquiry form submissions
- Total contact forms submitted
- Calendly bookings
- Case study views (full read)
- Article views (full read)
- Traffic sources
- Top landing pages

---

## 🚦 Feature Prioritization

### Critical (Must Have for Launch)

Features that directly support primary objectives:

- ✅ Clear hero section with value proposition
- ✅ Featured work/portfolio section
- ✅ Contact form with job inquiry option
- ✅ Calendly integration
- ✅ Mobile-responsive design
- ✅ Fast page load times (SEO)
- ✅ Professional case study pages

### Important (Launch v1.0)

Features that support secondary objectives:

- ✅ Insights/blog section with 8 articles
- ✅ About page establishing credibility
- ✅ Testimonials section
- ✅ Services clearly defined
- ✅ Social media integration

### Nice to Have (Post-Launch v1.1+)

Features for future iterations:

- ⏳ Newsletter subscription
- ⏳ Content search functionality
- ⏳ Multi-language support
- ⏳ Advanced analytics dashboard
- ⏳ A/B testing infrastructure

---

## 💬 Messaging Guidelines

### Value Proposition

**Primary Message:**  
"Senior Product Designer specializing in B2B SaaS onboarding and customer retention. 25+ years turning complex products into intuitive experiences that drive growth."

### Supporting Messages

- "Helping B2B SaaS companies reduce churn through better onboarding"
- "Proven track record: [X]% improvement in user activation"
- "Based in Barcelona, working with innovative companies globally"

### Tone of Voice

- **Professional** but approachable
- **Confident** but not arrogant
- **Results-focused** with metrics
- **Clear and direct** communication
- **Ethical and transparent**

### Words to Use

- Innovative, excellence, growth, retention, activation
- Proven, results-driven, strategic, thoughtful
- B2B SaaS, onboarding, customer journey, user experience

### Words to Avoid

- Ninja, guru, rockstar (overly casual)
- Cheap, fast, easy (undermines premium positioning)
- Generic claims without metrics

---

## ✅ Content Strategy Alignment

### Case Studies (Target: 8)

**Must Demonstrate:**

- B2B SaaS context
- Onboarding or retention focus
- Measurable results (metrics)
- Design process and thinking
- Business impact

**Structure:**

- Problem/Challenge
- Approach/Solution
- Results/Impact
- Visuals showcasing work

### Articles/Insights (Target: 12)

**Topics Should Cover:**

- Onboarding best practices
- Customer retention strategies
- B2B SaaS UX patterns
- Product design processes
- Thought leadership perspectives

**Goals:**

- Establish expertise
- Attract ideal clients
- SEO value
- Shareable content

---

## 🎯 User Journey Mapping

### Primary User Journey: Job Seeker (Hiring Manager)

1. **Discovery** → Finds site via search, LinkedIn, referral
2. **Evaluation** → Reviews portfolio, case studies, experience
3. **Validation** → Reads testimonials, checks credentials
4. **Contact** → Submits job inquiry form or books discovery call

**Website Must Support:**

- Quick credibility establishment (above fold)
- Easy portfolio navigation
- Clear expertise demonstration
- Frictionless contact process

### Secondary User Journey: Content Consumer

1. **Discovery** → Finds article via search or social
2. **Consumption** → Reads article, explores related content
3. **Interest** → Wants to follow or learn more
4. **Engagement** → Subscribes, shares, or contacts

**Website Must Support:**

- Fast article loading
- Easy reading experience
- Content discovery
- Social sharing
- Newsletter/follow option

---

## 🔍 SEO Strategy

### Primary Keywords

- B2B SaaS Product Designer
- User Onboarding Specialist
- Customer Retention UX
- SaaS Onboarding Design
- Product Designer Barcelona

### Content SEO

- Article titles optimized for search
- Case study metadata
- Image alt text
- Schema markup (Person, Organization)
- Internal linking strategy

### Technical SEO

- Fast page loads (< 2.5s LCP)
- Mobile-first responsive
- Semantic HTML
- Structured data
- XML sitemap
- Clean URL structure

---

## 📱 Mobile-First Considerations

### Mobile User Priorities

1. Quick value proposition understanding
2. Easy portfolio browsing
3. Simple contact method
4. Fast page loads
5. Readable content

### Mobile Conversions

- Click-to-call option
- Mobile-optimized forms
- Calendly mobile experience
- Social sharing
- Easy navigation

---

## 🔄 Continuous Improvement

### Monthly Review

- Check KPI progress (job offers, contacts)
- Review analytics data
- Identify bottlenecks in user journey
- Test form conversion rates
- Review content performance

### Quarterly Updates

- Add new case studies
- Publish new articles
- Update portfolio
- Refresh testimonials
- Optimize based on data

---

## 🎬 Launch Checklist Alignment

Before launch, verify:

- [ ] Value proposition clear in < 5 seconds
- [ ] Portfolio demonstrates B2B SaaS expertise
- [ ] Contact forms working and tracked
- [ ] Calendly integration functional
- [ ] Analytics tracking all KPIs
- [ ] Mobile experience excellent
- [ ] Page load speed meets targets
- [ ] SEO optimized for target keywords
- [ ] Professional presentation throughout
- [ ] All content supports objectives

---

## 📋 Quick Reference for Claude Code

**When working on this project, always remember:**

1. **Primary Goal:** Get Rodrigo 1 qualified job offer per week from B2B SaaS companies
2. **Conversion Focus:** 5 contacts per week (form + calls)
3. **Brand Positioning:** Senior specialist in B2B SaaS onboarding and retention
4. **Target Audience:** Decision makers at innovative B2B SaaS companies
5. **Values:** Ethics, transparency, attention to detail ("attentive as in a game")

**Every feature should answer:**

- Does this help get job offers?
- Does this encourage contact?
- Does this demonstrate B2B SaaS expertise?
- Does this position as thought leader?

**Development Priorities:**

1. Clear value proposition
2. Strong portfolio/case studies
3. Easy contact methods
4. Professional credibility
5. Content thought leadership

---

**Document Control**

- **Version:** 1.0
- **Created:** February 4, 2026
- **Owner:** Rodrigo Seoane
- **Purpose:** Strategic foundation for all website development
- **Usage:** Reference before every development session

---

**Remember:** This website is not just a portfolio—it's a business development tool designed to attract premium B2B SaaS opportunities and establish thought leadership. Every pixel, every word, every interaction should serve these objectives.
