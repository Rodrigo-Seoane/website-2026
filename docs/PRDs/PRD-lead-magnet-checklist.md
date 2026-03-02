# PRD: Interactive Lead Magnet Checklist Page

## Overview

This PRD documents the implementation requirements for converting the existing "12 UX Red Flags Killing Your SaaS Retention" PDF checklist into an interactive web-based questionnaire with lead capture and automated email nurture sequence. The interactive checklist serves as a lead generation tool for the UX Pulse Check service.

**Primary Objective:** Generate 15-20 qualified leads per month from B2B SaaS Product Managers by providing an interactive self-assessment tool that demonstrates Rodrigo's expertise and funnels users toward the UX Pulse Check service or Discovery Call.

**Target Audience:** Product Managers, CTOs, founders, and design leaders at growth-stage B2B SaaS companies experiencing user churn, onboarding friction, or retention issues -- the same audience targeted by the UX Pulse Check service page.

**Strategic Alignment:**

- Extends the UX Pulse Check sales funnel with a top-of-funnel lead capture tool
- Positions Rodrigo as a B2B SaaS UX retention authority
- Creates an automated nurture path from awareness to Discovery Call booking
- Aligns with the Brand Story Script's empathy-first messaging framework

---

## Problem Statement

The current PDF checklist is a static, downloadable asset that provides no interactivity, collects no contact data, and offers no follow-up mechanism. Visitors who encounter the checklist have no way to self-assess their product against the 12 red flags in an engaging way, and Rodrigo has no mechanism to nurture these leads toward a paid engagement.

**What this solves:**

1. Converts a passive PDF into an active lead generation tool
2. Captures contact information (Name + Email) for follow-up
3. Provides personalized results based on self-assessment, building perceived value
4. Creates an automated 5-email nurture sequence that moves leads from awareness to Discovery Call
5. Builds the email list for the UX Pulse Check service specifically

---

## Goals and Success Metrics

| Metric                                | Target    | Measurement                                                |
| ------------------------------------- | --------- | ---------------------------------------------------------- |
| Monthly new leads captured            | 15-20     | Email submissions per month                                |
| Checklist completion rate             | 70%+      | Users who complete all 12 questions out of those who start |
| Email open rate (sequence avg)        | 40%+      | Across all 5 emails in nurture sequence                    |
| Discovery Call bookings from sequence | 2-3/month | Calendly bookings attributed to email sequence             |
| Lead-to-call conversion rate          | 10-15%    | Discovery Calls / Total leads captured                     |

---

## User Flow

```
[1. Landing Page]
    User arrives via social media, LinkedIn post, or organic search
    |
    v
[2. Hero + Value Proposition]
    Sees headline, understands the checklist value, clicks "Start Assessment"
    |
    v
[3. Interactive Questionnaire]
    12 questions, one per step (or grouped 4-4-4)
    Progress bar visible at top
    Each question: Yes/No toggle or scale
    Low-stakes, button-based interactions
    |
    v
[4. Lead Capture Gate]
    After completing all 12 questions, user sees a "Get Your Results" screen
    Requires: Name + Email
    Optional: Company name, Role
    Privacy consent checkbox
    |
    v
[5. Results Page]
    Score displayed: X / 12 red flags found
    Color-coded severity (Green 0-3, Amber 4-7, Red 8-12)
    Brief summary of which red flags apply
    For each flagged item: shows the "FIX IT" recommendation from the PDF
    CTA: "Book a Free Discovery Call" (Calendly link)
    CTA: "Learn about UX Pulse Check" (link to /ux-pulse-check)
    Option to download PDF version of results
    |
    v
[6. Email Nurture Sequence (automated)]
    Email 1 (Day 0): Deliver PDF checklist + results summary
    Email 2 (Day 2): Onboarding mistakes value content
    Email 3 (Day 5): Mini case study
    Email 4 (Day 8): Internal pain points (Brand Story empathy)
    Email 5 (Day 12): CTA to book Discovery Call
```

---

## Detailed Feature Specifications

### Section A: Checklist Landing Page

**Route:** `/ux-pulse-check/checklist` (nested under the existing UX Pulse Check route)

**Page Sections:**

#### A1. Hero Section

- **Label:** "FREE ASSESSMENT"
- **Headline:** "12 UX Red Flags Killing Your SaaS Retention"
- **Subheadline:** "A quick diagnostic for Product Managers who want to stop losing users and start growing revenue."
- **Body copy:** "Score your product's retention risk in under 3 minutes. Get actionable fixes you can prioritize with your team this week."
- **CTA Button:** "Start Your Free Assessment" (scrolls to questionnaire or navigates to first question)
- **Trust signals:** "Takes under 3 minutes" | "No credit card required" | "Instant results"
- **Visual:** Consider using the same PDF cover visual or a progress-themed illustration

#### A2. What You Will Discover (Optional section below hero)

- The 12 most common UX patterns that silently drive users away
- How to score your product's retention risk in under 3 minutes
- Actionable fixes you can prioritize with your team this week

#### A3. Social Proof

- Reuse existing client logos component (Coke, World Bank, TEDx, Rolls Royce)
- Brief authority statement: "Based on 25+ years of product design experience"

---

### Section B: Interactive Questionnaire

**Interaction Model:** Multi-step form with one question per step. Each step shows:

1. Question number and progress indicator (e.g., "Question 4 of 12")
2. Progress bar (visual percentage)
3. Red flag title
4. Brief description of the problem (from the PDF "THE PROBLEM" section)
5. Response options (see below)
6. "Next" button (enabled after selection)
7. "Back" button (to revise previous answers)

**Response Format for Each Question:**

Each question asks: "Does this red flag apply to your product?"

Options (radio/button selection):

- "Yes, this is a problem" (scores 1 point)
- "Partially -- we have some issues" (scores 0.5 points)
- "No, we handle this well" (scores 0 points)

**The 12 Checklist Items (mapped from PDF):**

| #   | Red Flag Title                                 | Brief Problem Description                                                                                                                                                          |
| --- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 01  | Your Onboarding Has No Clear "Aha Moment"      | Users sign up but never experience the core value of your product. They wander through features without understanding why they should care, and drop off within the first session. |
| 02  | You're Asking Too Much Before Delivering Value | Your signup flow requires extensive profile setup, team invitations, integrations, or configuration before users can do anything useful. The setup feels like homework.            |
| 03  | Your Navigation Is a Maze                      | Users can't find key features. Your menu structure reflects your org chart or technical architecture rather than user tasks. Important actions are buried 3+ clicks deep.          |
| 04  | Empty States That Kill Momentum                | When a user opens a new section for the first time, they see a blank page or a generic "no data yet" message. There's no guidance on what to do next.                              |
| 05  | Error Messages That Blame the User             | When something goes wrong, your product shows cryptic error codes, technical jargon, or vague messages with no actionable guidance.                                                |
| 06  | No Feedback on User Actions                    | Users click buttons and nothing visibly happens. Forms submit without confirmation. Settings save without acknowledgment.                                                          |
| 07  | Feature Overload on First Login                | New users are greeted with every feature your product offers. Dashboards are packed with widgets, sidebars show all tools, and tooltips fire like a tutorial machine gun.          |
| 08  | No Re-Engagement for Dormant Users             | When a user stops logging in, nothing happens. No email, no in-app message when they return, no acknowledgment that they've been away.                                             |
| 09  | Your Settings Page Is a Graveyard              | Critical configuration options are buried in a massive settings page that users only visit when something is already wrong.                                                        |
| 10  | Inconsistent Design Patterns                   | Buttons look different across pages. Some forms auto-save, others require clicking save. The product feels like it was built by 5 different teams.                                 |
| 11  | No Clear Path from Free to Paid                | Users on your free tier never experience the value of premium features. The upgrade prompt is either invisible or feels like a generic paywall.                                    |
| 12  | You Ship Features Without Validating Them      | Your team ships new features based on stakeholder requests, competitor analysis, or gut instinct -- but rarely tests with actual users before launch.                              |

**UX Considerations:**

- Start with low-stakes, easy-to-answer questions (questions 01-04 cover onboarding/navigation -- universal pain points)
- Button-based selection (not text input) for speed
- Animate transitions between questions (slide left/right)
- Allow users to go back and change answers
- Show running score is NOT recommended until completion (avoid discouraging early abandonment)
- Mobile-first responsive design

---

### Section C: Lead Capture Gate

**Appears after:** Question 12 is answered
**Screen content:**

- Headline: "Your assessment is complete!"
- Subheadline: "Enter your details to get your personalized results and the full PDF checklist with fix-it recommendations."
- Form fields:
  - **Name** (required) -- text input
  - **Email** (required) -- email input with validation
  - **Company** (optional) -- text input
  - **Role** (optional) -- dropdown: Product Manager / CTO / Founder / Design Leader / Other
- **Privacy checkbox** (required): "I agree to receive my results and occasional UX insights. Unsubscribe anytime."
- **CTA Button:** "Get My Results"
- **Below form:** "We respect your privacy. Your data is never shared."

**Form validation:**

- Email format validation (regex pattern matching existing ContactForm)
- Required fields must be filled
- Consent checkbox must be checked

---

### Section D: Results Display

**Appears after:** Lead capture form submission

**Scoring System (from PDF):**

- **0-3 red flags (Green):** "Solid Foundation" -- Your UX foundation is strong. Focus on optimization and growth experiments.
- **4-7 red flags (Amber):** "Friction Is Building" -- Friction is costing you users. Prioritize the top 3 red flags for quick wins.
- **8-12 red flags (Red):** "Urgent Action Needed" -- Users are struggling. You need a structured UX review.

**Note on scoring with partial answers:** Since each question can score 0, 0.5, or 1, the total score is a decimal. Round to nearest integer for tier placement. Display the raw number for transparency (e.g., "You flagged 6.5 out of 12 potential issues").

**Results Page Layout:**

1. **Score Hero**
   - Large score display: "Your Retention Risk Score: X / 12"
   - Color-coded badge (green/amber/red)
   - One-line interpretation from the scoring system above

2. **Detailed Breakdown**
   - Expandable/accordion list of all 12 items
   - For items flagged as "Yes" or "Partially": show the "WHY IT MATTERS" and "FIX IT" content from the PDF
   - For items marked "No": show a brief "Good job" acknowledgment
   - Use green/amber/red indicators per item

3. **Personalized Recommendation Block**
   - For scores 0-3: "Your product is in good shape. Consider periodic UX audits to maintain your edge."
   - For scores 4-7: "You have fixable friction points. A targeted UX Pulse Check could help you prioritize and resolve them. [Learn More](/ux-pulse-check)"
   - For scores 8-12: "Your product has significant UX issues affecting retention. A comprehensive UX Pulse Check with actionable recommendations can help turn things around fast. [Book a Discovery Call](calendly link)"

4. **CTA Section**
   - Primary CTA: "Book a Free Discovery Call" (Calendly link) -- same as main nav CTA
   - Secondary CTA: "Explore UX Pulse Check" (link to `/ux-pulse-check`)
   - Tertiary: "Download Full PDF Checklist" (link to PDF asset)

5. **Service Tiers Reference** (from PDF page 6)
   - Brief mention of Surface/Structure/Strategy tiers
   - Or reference the UX Pulse Check pricing (Essentials 490 EUR / + Redesign 1490 EUR)

---

### Section E: Email Nurture Sequence (5 Emails)

**Email Service Provider Recommendation:** Resend (with react-email for templates)

**Rationale for Resend:**

- Free tier: 3,000 emails/month (more than sufficient for 15-20 leads/month x 5 emails = 75-100 emails/month)
- Native Next.js integration via API routes
- React Email for branded HTML email templates
- Simple API, no complex marketing platform overhead
- Transactional + marketing email support
- Can be upgraded to paid tiers as volume grows

**Alternative considered:** Kit (formerly ConvertKit) free plan supports 10,000 subscribers with visual automation builder. Better for complex drip sequences but adds external platform dependency. Mailchimp free plan supports 500 contacts / 1,000 emails per month -- also viable but heavier.

**Recommendation:** Start with Resend for simplicity and native Next.js integration. The 5-email sequence can be triggered by a simple cron job or scheduled API calls. If the nurture sequence becomes more complex (branching logic, A/B testing), migrate to Kit or Mailchimp.

#### Email 1: Results + PDF Delivery (Day 0 -- Immediate)

**Subject Line:** "Your UX Retention Score: [X]/12 -- Here's Your Full Report"
**Sender:** Rodrigo Seoane <business@rodrigoseoane.com>

**Content Framework:**

- Personal greeting using first name
- Score summary with tier interpretation
- Attached/linked PDF checklist ("12 UX Red Flags Killing Your SaaS Retention")
- Brief list of their top 3 flagged red flags (personalized from assessment)
- One key "FIX IT" tip from their highest-scored area
- Sign-off establishing Rodrigo as the author/expert

**CTA:** "Review your full results online" (link back to results page, or a permalink if results are stored)

---

#### Email 2: Onboarding Mistakes Value Content (Day 2)

**Subject Line:** "The onboarding mistake that costs SaaS companies 60-80% of new users"
**Sender:** Rodrigo Seoane <business@rodrigoseoane.com>

**Content Framework:**

- Lead with the statistic from Red Flag #01: "Users who don't reach their 'aha moment' within the first 3-5 minutes have a 60-80% chance of never coming back."
- Expand on the onboarding problem (Red Flags 01, 02, 04, 07 from the checklist)
- Provide 2-3 actionable micro-tips the reader can implement this week:
  1. Map your activation path: What is the ONE thing users must do to experience value?
  2. Apply progressive disclosure: only ask for what's needed RIGHT NOW
  3. Design every empty state as a mini-onboarding
- Establish expertise: "Over 25 years working with teams at Coke, World Bank, and Rolls Royce, onboarding is consistently where I find the most recoverable revenue."
- Soft reference to UX Pulse Check as the deeper-dive solution

**CTA:** "Want to see how this applies to your product? Reply to this email with your app URL and I'll send you one specific onboarding observation -- free."

---

#### Email 3: Mini Case Study (Day 5)

**Subject Line:** "How we reduced onboarding friction by 40% for [Client/Industry]"
**Sender:** Rodrigo Seoane <business@rodrigoseoane.com>

**Content Framework:**

- Brief case study format: Problem - Approach - Result
- Reference a real project (Atlas onboarding redesign or AXA GO, per existing case studies)
- Frame the case study around 2-3 of the 12 red flags that were present and fixed
- Include a before/after insight or metric
- Connect it back to the reader: "If your assessment revealed [common red flag], the same approach could apply to your product."

**CTA:** "See more case studies: [link to /work]" + "Or let's discuss your specific situation: [Discovery Call link]"

---

#### Email 4: Internal Pain Points / Empathy (Day 8)

**Subject Line:** "The real reason UX problems don't get fixed (it's not what you think)"
**Sender:** Rodrigo Seoane <business@rodrigoseoane.com>

**Content Framework (informed by Brand Story Script):**

- Open with empathy for the PM's internal struggle (from Brand Story "Internal Problem"):
  - "You know the UX issues exist. You've probably flagged them in sprint planning more than once."
  - "But between firefighting bugs, reporting to stakeholders, preparing epics, and managing competing priorities -- UX improvements keep getting pushed to 'next quarter.'"
- Address the philosophical problem: "You shouldn't have to waste so much time making and defending decisions with little to no user research and validation."
- Address the villain (from Brand Story): Lack of time, resources, and budget allocation for UX research
- Offer the positive outcome: "Better user engagement, higher conversion rates, and increased retention by removing friction points in the user experience."
- Position the UX Pulse Check as the external catalyst: "Sometimes what you need isn't more internal bandwidth -- it's an experienced outside perspective that can cut through the noise in 3-5 days."

**CTA:** "If any of this resonates, I'd love to hear what you're dealing with. Reply to this email -- I read every one."

---

#### Email 5: Discovery Call CTA (Day 12)

**Subject Line:** "Quick question about your retention challenges"
**Sender:** Rodrigo Seoane <business@rodrigoseoane.com>

**Content Framework:**

- Short, direct email (under 150 words)
- Reference the original assessment: "Two weeks ago, you scored [X]/12 on the UX Retention Risk Assessment."
- Frame the Discovery Call as low-commitment: "In 30 minutes, we'll review your top 2-3 red flags in detail, identify the highest-impact fix, and discuss whether a Surface, Structure, or Strategy engagement fits your needs." (from PDF page 6)
- Social proof: One short testimonial quote (Martin Kelman or Stina Heikkila)
- Clear urgency without pressure: "I have [X] spots available this month for Discovery Calls."

**CTA:** "Book Your Free Discovery Call" (Calendly link: calendly.com/rodrigo_seoane/discovery)

**PS line:** "Not ready for a call? No worries. Reply with your biggest UX challenge and I'll share a quick thought -- no strings attached."

---

## Affected Codebase Files

### New Pages

| File Path                               | Type | Description                                           |
| --------------------------------------- | ---- | ----------------------------------------------------- |
| `app/ux-pulse-check/checklist/page.tsx` | NEW  | Landing page for the interactive checklist assessment |

### New Components

| File Path                                                  | Type    | Lines Target | Description                                                          |
| ---------------------------------------------------------- | ------- | ------------ | -------------------------------------------------------------------- |
| `components/sections/checklist/ChecklistHero.tsx`          | Section | ~80          | Hero section for the checklist landing page                          |
| `components/sections/checklist/ChecklistQuestionnaire.tsx` | Section | ~250         | Multi-step questionnaire with 12 questions, progress bar, navigation |
| `components/sections/checklist/LeadCaptureGate.tsx`        | Section | ~120         | Email/name capture form appearing after question completion          |
| `components/sections/checklist/ChecklistResults.tsx`       | Section | ~200         | Score display, detailed breakdown, personalized recommendations      |
| `components/sections/checklist/ChecklistCTA.tsx`           | Section | ~60          | Final CTA section with Discovery Call and UX Pulse Check links       |
| `components/ui/ProgressBar.tsx`                            | UI      | ~30          | Reusable animated progress bar component                             |
| `components/ui/QuestionCard.tsx`                           | UI      | ~60          | Individual question card with response buttons                       |
| `components/ui/ScoreBadge.tsx`                             | UI      | ~40          | Color-coded score badge (green/amber/red)                            |

### New Data Files

| File Path                         | Type | Description                                                                                     |
| --------------------------------- | ---- | ----------------------------------------------------------------------------------------------- |
| `lib/data/retention-checklist.ts` | NEW  | All 12 checklist items with titles, descriptions, problem/matters/fix content, response options |

### New API Routes

| File Path                           | Type | Description                                                                            |
| ----------------------------------- | ---- | -------------------------------------------------------------------------------------- |
| `app/api/checklist/submit/route.ts` | NEW  | API route to handle form submission, store lead data, trigger email sequence           |
| `app/api/checklist/email/route.ts`  | NEW  | API route for sending individual nurture emails (called by cron or scheduled function) |

### Email Templates (if using react-email)

| File Path                        | Type | Description                                |
| -------------------------------- | ---- | ------------------------------------------ |
| `emails/checklist-results.tsx`   | NEW  | Email 1: Results delivery + PDF attachment |
| `emails/onboarding-value.tsx`    | NEW  | Email 2: Onboarding mistakes content       |
| `emails/case-study.tsx`          | NEW  | Email 3: Mini case study                   |
| `emails/empathy-pain-points.tsx` | NEW  | Email 4: Internal pain points              |
| `emails/discovery-call-cta.tsx`  | NEW  | Email 5: Discovery Call CTA                |

### Existing Files to Modify

| File Path                          | Change Type | Description                                                                 |
| ---------------------------------- | ----------- | --------------------------------------------------------------------------- |
| `components/layout/Navigation.tsx` | MODIFY      | Potentially add "Free Assessment" link to nav or as a banner                |
| `app/ux-pulse-check/page.tsx`      | MODIFY      | Add cross-link to the checklist page (e.g., in hero or as a banner section) |
| `lib/data/ux-pulse-check.ts`       | MODIFY      | Add cross-reference content pointing to the checklist                       |

### Configuration / Dependencies

| Item           | Type       | Description                                                  |
| -------------- | ---------- | ------------------------------------------------------------ |
| `package.json` | MODIFY     | Add `resend` package for email sending                       |
| `.env.local`   | NEW/MODIFY | Add `RESEND_API_KEY` environment variable                    |
| `package.json` | MODIFY     | Optionally add `@react-email/components` for email templates |

---

## Internal Implementation Patterns

### Pattern 1: Section Component Structure

**Source:** `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/PulseCheckHero.tsx`
**Relevance:** The ChecklistHero component should follow this exact pattern for consistency with the UX Pulse Check page.

```typescript
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/utils/animations'

export function ChecklistHero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="pt-28 pb-16 lg:pt-32 lg:pb-20 bg-primary-yellow">
      <div className="container mx-auto px-6 lg:px-20">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Content with fadeUp variants */}
        </motion.div>
      </div>
    </section>
  )
}
```

### Pattern 2: Data-Driven Content Architecture

**Source:** `/Users/rodrigo.seoane/local-sites/portfolio-2026/lib/data/ux-pulse-check.ts`
**Relevance:** All checklist content must be externalized to a data file, following the same interface + export pattern.

```typescript
export interface ChecklistItem {
  id: string;
  number: number;
  title: string;
  problem: string;
  whyItMatters: string;
  fixIt: string;
}

export interface ChecklistHeroContent {
  label: string;
  headline: string;
  subheadline: string;
  bodyCopy: string;
  ctaText: string;
}

export const checklistItems: ChecklistItem[] = [
  // 12 items
];
```

### Pattern 3: Form Handling with react-hook-form

**Source:** `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/sections/ContactForm.tsx`
**Relevance:** The LeadCaptureGate form should reuse the FloatingInput pattern and react-hook-form validation approach from the existing ContactForm.

```typescript
const {
  register,
  handleSubmit,
  formState: { errors },
  reset,
} = useForm<LeadFormData>();
```

### Pattern 4: Animation Variants

**Source:** `/Users/rodrigo.seoane/local-sites/portfolio-2026/lib/utils/animations.ts`
**Relevance:** Use existing `fadeUp`, `staggerContainer`, `slideIn`, and `scaleUp` variants. No new animation variants should be needed. For question transitions, use Framer Motion's `AnimatePresence` with `slideIn` or custom slide-left/slide-right variants.

### Pattern 5: Design Token Consistency

**Source:** `/Users/rodrigo.seoane/local-sites/portfolio-2026/app/globals.css`
**Relevance:** Adhere to the existing color palette.

```css
/* Score colors */
Green (0-3):  Use existing green-600 from ContactForm success state
Amber (4-7):  Use existing orange-400 (#ef8c48)
Red (8-12):   Use a red variant (e.g., red-500)

/* Section backgrounds */
Hero: bg-primary-yellow (#ffd115)
Questionnaire: bg-cream-500 (#fff9f0) or bg-white
Results: bg-dark-700 (#2e5e5e) for score hero, bg-cream-500 for detail section
CTA: bg-dark-700 (#2e5e5e) or bg-primary-yellow
```

### Pattern 6: Accordion for Expandable Content

**Source:** `/Users/rodrigo.seoane/local-sites/portfolio-2026/components/ui/Accordion.tsx`
**Relevance:** The results detailed breakdown can reuse the existing Accordion component for expanding/collapsing individual red flag details.

---

## Documentation Excerpts

### Resend -- Send Emails with Next.js

**Source:** https://resend.com/docs/send-with-nextjs
**Key Points:**

- Install with `npm install resend`
- Create API route at `app/api/send/route.ts`
- Use `Resend` class with API key from environment variable
- Supports React Email components as email body
- Free tier: 3,000 emails/month, 100 emails/day

```typescript
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  const { data, error } = await resend.emails.send({
    from: "Rodrigo Seoane <business@rodrigoseoane.com>",
    to: ["user@example.com"],
    subject: "Your UX Retention Score",
    react: EmailTemplate({ firstName: "John", score: 7 }),
  });
}
```

### React Hook Form -- Multi-Step Form Pattern

**Source:** https://react-hook-form.com/advanced-usage#WizardFormFunnel
**Key Points:**

- Use a shared form state across steps
- Each step can have its own validation schema
- Use `useState` for step tracking, `AnimatePresence` for transitions
- Store partial form data in state or localStorage for persistence

### Framer Motion -- AnimatePresence for Step Transitions

**Source:** https://motion.dev/docs/react-animate-presence
**Key Points:**

- Wrap step content in `AnimatePresence` with `mode="wait"`
- Use `key` prop to trigger enter/exit animations
- Combine with `initial`, `animate`, `exit` for slide-left/right transitions

```typescript
<AnimatePresence mode="wait">
  <motion.div
    key={currentStep}
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ duration: 0.3 }}
  >
    <QuestionCard question={checklistItems[currentStep]} />
  </motion.div>
</AnimatePresence>
```

---

## External Implementation Patterns

### Interactive Lead Magnet Checklists -- Conversion Best Practices

**Sources:**

- [Checklist Lead Magnet Example Strategies](https://chriskoehl.com/checklist-lead-magnet-example/)
- [Lead Magnet Ideas to 10X Conversion Rates](https://www.funnelytics.io/blog/7-lead-magnet-ideas-to-10x-conversion-rates-in-2025)
- [High-Converting Lead Magnet Ideas](https://outgrow.co/blog/high-converting-lead-magnet-ideas-2025/)

**Key Patterns:**

- Interactive content generates 2x the engagement of passive content
- Interactive elements convert approximately 70% of the time vs 36% for passive content
- Progress tracking creates a sense of accomplishment and momentum
- The ideal length is determined by how efficiently it delivers the promised value, not word count
- Mobile optimization is non-negotiable
- Gamification elements (progress bars, badges) add motivation

### Multi-Step Form UX Best Practices

**Sources:**

- [Multi-Step Form Best Practices -- Webstacks](https://www.webstacks.com/blog/multi-step-form)
- [Creating Effective Multistep Forms -- Smashing Magazine](https://www.smashingmagazine.com/2024/12/creating-effective-multistep-form-better-user-experience/)
- [Multi-Step Forms Improve Lead Capture -- Digioh](https://www.digioh.com/blog/multi-step-forms)

**Key Patterns:**

- Limit each screen to 3-5 fields grouped by logical categories
- Display clear, visually prominent progress indicators
- Start with low-stakes questions (commitment and consistency principle)
- Button-based selection over text input for speed
- Users who complete the first step are psychologically committed to finishing (endowed progress effect)
- Quiz-style lead magnets convert at 7% vs overall 2.9% (141% increase)

### Email Nurture Sequence Best Practices for B2B SaaS

**Sources:**

- [Lead Nurturing Emails for SaaS -- Encharge](https://encharge.io/lead-nurturing-emails/)
- [After the Lead Magnet: Nurture B2B Leads -- CXL](https://cxl.com/blog/nurture-b2b-leads/)
- [Lead Magnet Email Follow-Up Sequence -- Automizy](https://automizy.com/blog/lead-magnet-email-follow-up-sequence/)

**Key Patterns:**

- Email 1 should deliver the promised value immediately (no delay)
- It's about helping, not selling -- each email should contain one clear helpful message
- Add waiting periods between emails (2-5 day gaps recommended)
- Personalize based on assessment results where possible
- Include social proof (testimonials, case studies) in middle emails
- Final email should be short and direct with clear CTA
- Average B2B nurture sequence open rates: 30-45%

### Next.js + Resend Email Integration

**Sources:**

- [Send Emails with Next.js -- Resend](https://resend.com/docs/send-with-nextjs)
- [Create and Send Email Templates Using React Email -- freeCodeCamp](https://www.freecodecamp.org/news/create-and-send-email-templates-using-react-email-and-resend-in-nextjs/)
- [Next.js Send Email Tutorial -- Mailtrap](https://mailtrap.io/blog/nextjs-send-email/)

**Key Patterns:**

- Use Next.js API routes (App Router: `app/api/send/route.ts`)
- Resend SDK: `npm install resend`
- React Email for component-based email templates
- Store API key in `.env.local` as `RESEND_API_KEY`
- Free tier is 3,000 emails/month -- more than sufficient for 15-20 leads x 5 emails = 75-100/month

---

## Technical Architecture

### Data Storage Approach

Given the small scale (15-20 leads/month), avoid over-engineering with a full database. Two options:

**Option A: Resend + JSON/CSV Storage (Recommended for MVP)**

- Store lead data (name, email, score, answers, submission date) as a JSON payload sent to Resend's contact list or logged via API
- Use Resend's built-in audience/contact management for email list
- Store assessment results in localStorage on the client side for the results page
- Email sequence triggered by Resend's scheduled sends or a simple cron via Vercel

**Option B: Lightweight Database (If growth exceeds expectations)**

- Add a lightweight database like Vercel KV (Redis), Supabase, or a simple JSON file via Vercel Blob Storage
- Store leads in a `checklist_leads` table: id, name, email, company, role, score, answers, created_at, email_sequence_step
- Use Vercel Cron Jobs to trigger drip emails based on created_at timestamps

**Recommendation:** Start with Option A. The scale of 15-20 leads/month does not justify a database. Resend's contact management + localStorage for client-side results is sufficient.

### Email Sequence Triggering

**Approach 1: Resend Batch Scheduling (Simplest)**
When a lead submits the form, schedule all 5 emails at once using Resend's `scheduledAt` parameter:

```typescript
// Email 1: Immediately
await resend.emails.send({ ..., scheduledAt: new Date() })
// Email 2: Day 2
await resend.emails.send({ ..., scheduledAt: addDays(new Date(), 2) })
// Email 3: Day 5
await resend.emails.send({ ..., scheduledAt: addDays(new Date(), 5) })
// Email 4: Day 8
await resend.emails.send({ ..., scheduledAt: addDays(new Date(), 8) })
// Email 5: Day 12
await resend.emails.send({ ..., scheduledAt: addDays(new Date(), 12) })
```

**Approach 2: Vercel Cron Jobs (More control)**

- Store leads with their submission date and current sequence step
- Run a daily cron job that checks which leads need their next email
- More complex but allows pausing/modifying the sequence

**Recommendation:** Approach 1 (Resend batch scheduling) for simplicity, aligned with the KISS principle in the Dev Guidelines.

### URL Structure

```
/ux-pulse-check                 -- Existing service page
/ux-pulse-check/checklist       -- Interactive checklist (new)
/ux-pulse-check/checklist#results  -- Results section (anchor on same page)
```

The checklist can be a single-page application with client-side state management for the questionnaire flow. No need for separate routes per step.

---

## Scope and Constraints

### In Scope

- Interactive 12-question assessment with progress tracking
- Lead capture form (name + email, optional company/role)
- Results page with score, breakdown, and recommendations
- 5-email nurture sequence content framework and templates
- Integration with Resend for email delivery
- Cross-linking with existing UX Pulse Check page
- Mobile-responsive design
- PDF checklist served as downloadable asset

### Out of Scope

- Advanced analytics dashboard for lead tracking (use Resend's built-in analytics)
- A/B testing of email subject lines (defer to future iteration)
- CRM integration (no Hubspot, Salesforce, etc. -- not needed at this scale)
- Multi-language support
- Account creation / login for returning users
- Real-time score comparison with other users
- Complex branching logic in the email sequence
- Payment processing

### Constraints

- **Scale ceiling:** 15-20 new leads per month maximum. Architecture decisions should not over-engineer for scale.
- **No backend database initially.** Client-side state + Resend is sufficient.
- **Email deliverability:** Must send from a verified domain (rodrigoseoane.com) through Resend for inbox placement.
- **GDPR compliance:** Consent checkbox required. Unsubscribe link in every email. Data processing transparency.
- **Existing tech stack only:** Next.js 16, React 19, Tailwind CSS 4, Framer Motion, react-hook-form, Lucide icons. No new UI frameworks.
- **Follow Dev Guidelines:** KISS, DRY, YAGNI principles. Reuse existing components. No over-abstraction.

---

## Integration with Existing UX Pulse Check Service

The interactive checklist is a **top-of-funnel** tool that feeds into the existing UX Pulse Check service page. The relationship is:

```
[Checklist Assessment] --> [Email Nurture] --> [Discovery Call] --> [UX Pulse Check Engagement]
     (Free)                   (Free)             (Free)              (Paid: 490-1490 EUR)
```

**Cross-linking strategy:**

1. **UX Pulse Check page:** Add a banner or section: "Not sure if you need a UX audit? Take our free 3-minute assessment to find out." with link to `/ux-pulse-check/checklist`
2. **Checklist results page:** CTA links to `/ux-pulse-check` for service details and to Calendly for Discovery Calls
3. **Navigation:** Consider adding "Free Assessment" as a highlighted nav item or a subtle banner on the UX Pulse Check page
4. **Email sequence:** Emails 3 and 5 link directly to Discovery Call (Calendly) and UX Pulse Check page

---

## Recommendations

1. **Start with a single-page client-side app.** The questionnaire, lead gate, and results should all be sections of the same page (`/ux-pulse-check/checklist`). This avoids unnecessary routing complexity and keeps the user experience seamless.

2. **Use Resend with batch scheduling for emails.** At 15-20 leads/month, this is the simplest approach. All 5 emails are scheduled at form submission time. No cron jobs or database needed.

3. **Reuse the existing ContactForm FloatingInput components.** The lead capture form should use the same FloatingInput and form validation patterns already established in the ContactForm component.

4. **Consider the "partial gating" approach.** Show the first 2-3 results immediately (before email capture) to build trust, then gate the full detailed report behind email submission. This can increase perceived value. However, the current spec gates everything after completion, which is also effective for a 12-question assessment where the user has already invested time (sunk cost / endowed progress effect).

5. **Store answers in React state, not URL params.** The questionnaire state should live in a single React `useState` or `useReducer` hook. Do not persist to URL or localStorage during the assessment -- only save to localStorage after submission for results re-access.

6. **Design email templates with react-email.** This keeps email templates as React components, consistent with the rest of the codebase. They can be previewed locally during development.

7. **Add UTM parameters to all email CTAs.** Track email-sourced traffic to the UX Pulse Check page and Calendly with UTM tags: `?utm_source=checklist&utm_medium=email&utm_campaign=retention_nurture&utm_content=email_N`.

8. **Implement a simple "thank you" redirect/state after form submission.** Use the same AnimatePresence pattern from ContactForm to transition from form to results display.

---

## Open Questions

1. **Email domain verification:** Is `rodrigoseoane.com` already verified with an email sending service? Resend requires DNS verification (SPF, DKIM, DMARC records) for sending from a custom domain.

2. **PDF hosting:** Should the PDF checklist be hosted as a static asset in `/public/` or served via an API route to track downloads? Static is simpler; API route allows download tracking.

3. **Results persistence:** Should users be able to re-access their results via a unique URL (e.g., `/ux-pulse-check/checklist/results/[hash]`)? This adds complexity but allows linking from emails. Alternative: store in localStorage and link back to `/ux-pulse-check/checklist#results`.

4. **Navigation placement:** Should the checklist get its own top-level nav item, a sub-item under UX Pulse Check, or just be discoverable via links on the UX Pulse Check page and social media?

5. **Email sequence personalization depth:** Should emails reference specific red flags the user flagged (requires storing answer data server-side), or use generic content? Personalization increases engagement but adds complexity.

6. **Unsubscribe handling:** Resend handles unsubscribes automatically. Should we also add a one-click unsubscribe mechanism from the assessment results page (e.g., "Don't want follow-up emails? Click here")?

7. **Case study for Email 3:** Which existing case study should be featured? Atlas onboarding redesign seems most relevant to the retention/onboarding theme. Is there enough public content available for the email?

8. **Analytics:** Should we integrate basic analytics tracking (e.g., Google Analytics events) for: assessment started, each question answered, assessment completed, email captured, email opened, Discovery Call booked? Or defer analytics to a later phase?

---

## Implementation Priority

### Phase 1: Core Assessment Experience (MVP)

1. Create `lib/data/retention-checklist.ts` with all 12 checklist items
2. Build `ChecklistHero` section component
3. Build `ChecklistQuestionnaire` multi-step component with progress bar
4. Build `LeadCaptureGate` form component
5. Build `ChecklistResults` display component
6. Create `app/ux-pulse-check/checklist/page.tsx` composing all sections
7. Test full flow end-to-end (client-side only, no email)

### Phase 2: Email Integration

1. Install `resend` package
2. Set up Resend account and verify domain
3. Create `app/api/checklist/submit/route.ts` API route
4. Build 5 email templates (react-email or HTML)
5. Implement batch email scheduling on form submission
6. Test email delivery end-to-end

### Phase 3: Cross-Linking and Polish

1. Add cross-links from UX Pulse Check page to checklist
2. Add cross-links from checklist results to UX Pulse Check and Discovery Call
3. Consider adding a banner or highlighted link in Navigation
4. Mobile responsiveness testing and polish
5. SEO metadata for the checklist page

---

## Self-Verification Checklist

- [x] All existing file paths referenced actually exist in the codebase
- [x] New file paths follow existing project naming conventions
- [x] Code snippets follow existing project patterns (animations, data-driven, react-hook-form)
- [x] All 12 checklist items are accurately mapped from the PDF
- [x] Email sequence content framework aligns with Brand Story Script messaging
- [x] External sources are authoritative and relevant
- [x] Technical approach respects the 15-20 leads/month scale constraint
- [x] Implementation follows Dev Guidelines (KISS, DRY, YAGNI)
- [x] Integration points with existing UX Pulse Check page are clearly defined
- [x] Open questions are clearly articulated for team discussion

---

**Document Version:** 1.0
**Created:** February 15, 2026
**Status:** Ready for Spec Writing
