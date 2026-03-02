# Homepage - Optimized Content

## Strategic Alignment Summary

- **Primary Objective:** Attract qualified B2B SaaS opportunities by positioning Rodrigo as the specialist hire for onboarding and retention challenges. Every section must earn its place against this goal.
- **Target KPIs:** (1) 1 qualified job inquiry per week; (2) 5 total contacts per week via form or Discovery Call booking; (3) case study engagement at 80%+ scroll depth.
- **Target Audience:** Product Managers, VP/Head of Product, CTOs, and Design Leaders at growth-stage or established B2B SaaS companies that budget for premium design talent.
- **Buyer Journey Stage:** Awareness to Consideration. The homepage must establish credibility fast enough to earn 30 more seconds of attention, then convert that attention into a portfolio click or a contact action.

---

### Decisions Log

The following changes depart from the original scraped content. Each is justified against the Strategic_Context.md objectives.

| # | Original | Change | Rationale |
|---|----------|--------|-----------|
| 1 | H1: "Product Design & Strategy for AI & SaaS Innovation" | Rewritten to lead with the outcome, not the discipline | The "So what?" test: a hiring manager already knows what product design is. The H1 must answer what they get. |
| 2 | Intro: "Hello! I'm Rodrigo..." | Tightened and restructured as two sentences | The run-on buried the value proposition behind a greeting. Strategic_Context.md flags "clear and direct" as a tone requirement. |
| 3 | Section title: "Imagine using design to be your secret weapon?" | Rewritten as a declarative statement | The original was grammatically awkward (flagged in scraper notes). Mixing question-format and statement-format headings erodes scan hierarchy. This section is mid-funnel credibility -- it should assert, not wonder aloud. |
| 4 | "10.000ft overview" | Corrected to "10,000-foot" | Regional formatting issue flagged by scraper. US English standard applied for the primary audience. |
| 5 | Run-on paragraph in "Why Me" block | Split into three focused sentences | Causality between "overlooking user needs" and "faster production cycles" was unclear. Restructured to make the logic explicit. |
| 6 | Testimonials section: no H2 wrapper | Added section heading "What Our Clients Say" | Heading hierarchy gap flagged by scraper. Accessibility and semantic HTML requirement. |
| 7 | Services: titles rendered as H4 | Specified as H3 in layout notes | H2 (section) jumping to H4 (card titles) skips a level. Corrected per WCAG heading hierarchy rules. |
| 8 | Client logos: no heading | Added visually-hidden H2 "Trusted by" | Same hierarchy gap as #6. The marquee layout does not need a visible headline, but the DOM must have one for screen readers and document outline. |
| 9 | UX Pulse Check subtitle: "Or diagnose critical issues fast with my surgical UX audit." | Rewritten as a declarative H3 | Fragment used as a heading. Reframed to stand alone as a complete statement. |
| 10 | Contact section subheadline: "...start turning those challenges into triumphs" | Tightened | "Triumphs" is vague and slightly hyperbolic. Replaced with specific, benefit-oriented language that matches the metrics-driven tone required by Strategic_Context.md. |
| 11 | Featured Work section: scraper captured only 2 case studies; code contains 3 | All three retained | The implementation already includes AXA GO, Atlas Onboarding, and BennitAI. The scraper missed the third. No content was removed. |
| 12 | Testimonials: scraper captured Stina, Javi, Pablo (from old Webflow site); code contains Sarah, Marcus, Emily, James, Stina | All five current testimonials retained, copy untouched | The testimonials.ts file is the source of truth. The scraper pulled from a cached or previous version of the live site. All quotes are kept verbatim -- testimonials must never be rewritten. |

---

## Section 1: Hero

### Layout Specifications

- **Column Structure:** 2-column split, 50/50 on large screens. Left column: text content. Right column: decorative visual (currently abstract animated shapes; see Image Requirements for the recommended upgrade). Single column on mobile, text first.
- **Background:** Primary yellow (brand token: `bg-primary-yellow`). This is the most visible surface on the site -- it sets the first emotional signal.
- **Spacing:** Generous. Min-height 85vh. Top padding accounts for fixed navigation. Vertical rhythm between headline, subheadline, CTAs, and availability indicator is critical -- do not compress.
- **Mobile Behavior:** Stacked vertically, text block on top. Right-column visual hidden on mobile (current behavior via `hidden lg:flex`). This is acceptable for now; the visual is decorative, not informational.

### Content

**Headline (H1):**
B2B SaaS Design That Drives Retention and Growth

**Subheadline:**
I'm Rodrigo Seoane. Over 25 years, I've helped product teams at AI and SaaS companies turn complex user experiences into measurable business outcomes.

**Availability Indicator (microcopy):**
Available for new projects

**CTA 1 (Primary):**
- Button Text: Explore Work
- Button Style: Primary (dark background, light text)
- Destination: `/work`

**CTA 2 (Secondary):**
- Button Text: Get in Touch
- Button Style: Ghost / outlined (dark border, dark text, inverts on hover)
- Destination: `#contact` (smooth scroll to contact form)

### Image Requirements

- **Image 1 (Right Column Visual):**
  - Description: A clean, high-fidelity product interface mockup -- either a dashboard or an onboarding flow screen -- rendered at slight 3D perspective to give depth. The UI should feel modern and data-rich without being cluttered. Background is transparent or matches primary yellow. Style: product photography / digital render. Mood: confident, precise, forward-looking. If this image is not available immediately, the current animated abstract shapes are an acceptable placeholder, but this should be the first asset swap in the next design iteration.
  - Ratio: 4:3 (fits the existing container)
  - ALT Text: "B2B SaaS product interface showcasing an onboarding flow design"
  - aria-label: Not required (decorative/illustrative, not interactive)
  - Purpose: Hero visual -- establishes the professional, product-focused tone above the fold

---

## Section 2: Problem Statement (Value Proposition -- Part A)

### Layout Specifications

- **Column Structure:** Full-width single column for the header. 3-column equal grid for the problem cards below.
- **Background:** Dark (brand token: `bg-dark-700`). The contrast shift from the yellow hero creates a deliberate pattern interrupt -- the reader's eye resets and expects new information.
- **Spacing:** Standard vertical padding above and below. Cards have internal padding of 24px. Gap between cards is 24px.
- **Mobile Behavior:** Cards stack to single column. Header remains centered.

### Content

**Section Label (visually small, above H2):**
Common Pitfalls

**Headline (H2):**
The product trap that costs teams time and budget

**Subheadline:**
When user-centric thinking isn't woven into every stage of development, the consequences compound fast. Here's what that looks like in practice.

**Card 1 -- Title (H3):** User Experience Issues

**Card 1 -- Items:**
- Poor user adoption
- Confusing interface
- Escalating customer support volume
- Conflicting user feedback

**Card 2 -- Title (H3):** Business Performance

**Card 2 -- Items:**
- High churn rates
- Stalling revenue growth
- Losing ground to competitors
- Low conversion rates

**Card 3 -- Title (H3):** Development Challenges

**Card 3 -- Items:**
- Wasted engineering resources
- Redesigns that backfire
- Features nobody uses
- Mounting technical debt

### Image Requirements

- **Icon 1 (Card 1):** Current path `/images/Card Icons 64px/SVG/UXpert.svg`. No change required. ALT text should be empty string (decorative icon accompanying labeled text).
- **Icon 2 (Card 2):** Current path `/images/Card Icons 64px/SVG/ROI.svg`. Same treatment.
- **Icon 3 (Card 3):** Current path `/images/Card Icons 64px/SVG/Priority Tasks.svg`. Same treatment.

### Implementation Notes

- The card icon `alt=""` is already correct in the current code. These are decorative; the card title carries the meaning.
- One typo exists in the current data: "Redesign that backfire" (singular). Corrected above to "Redesigns that backfire" (plural, matching the pattern of all other items in all three cards).

---

## Section 3: Why Me (Value Proposition -- Part B)

### Layout Specifications

- **Column Structure:** 2-column split, 50/50. Left column: image. Right column: text. On mobile, image stacks above text.
- **Background:** Continuation of dark section (`bg-dark-700`). No background break between Part A and Part B -- they are one logical section with two visual rhythms.
- **Spacing:** Generous vertical padding (80px desktop, 64px mobile) creates breathing room between the problem cards above and this credibility statement.

### Content

**Headline (H2):**
Design as a competitive advantage, not an afterthought

**Body Copy (Paragraph 1):**
For 25 years I've embedded myself in product teams facing the exact challenges listed above. The common thread is not a lack of design effort -- it's a lack of design strategy integrated with business and engineering realities.

**Body Copy (Paragraph 2):**
My capability is the combination of two things most designers have in isolation: a 10,000-foot view of how a product ecosystem fits together, and the hands-on skill to translate that vision into flows, components, and prototypes that ship.

### Image Requirements

- **Image 1 (Left Column):**
  - Description: The Atlas Onboarding case study hero image already exists at `/images/Cases/Atlas Onboarding/Atlas Onboarding 01-min.png`. This is the correct asset -- it shows real work, not stock imagery, and directly supports the credibility claim being made in the copy.
  - Ratio: 4:3 (matches the `aspect-4/3` container already in the component)
  - ALT Text: "Atlas Onboarding redesign -- streamlined user flow design for a B2B SaaS platform"
  - aria-label: Not required (static illustrative image)
  - Purpose: Social proof through demonstrated work. The image does the job that a paragraph of self-description cannot.

### Implementation Notes

- The current alt text on this image is the generic string "Design work showcase." Replace with the ALT text specified above. This is both an accessibility fix and an SEO improvement (Strategic_Context.md flags image alt text as part of the content SEO checklist).

---

## Section 4: Featured Work (Case Studies)

### Layout Specifications

- **Column Structure:** Section header is full-width, left-aligned with a right-aligned "View all projects" link on the same row (desktop). Each case study is a 2-column alternating layout: 50/50 split, content and image swap sides on each successive case. On mobile, all cases stack to single column with image above text.
- **Background:** Primary yellow (`bg-primary-yellow`). The shift back from dark creates rhythm and signals a new content phase.
- **Spacing:** 16-24px top padding for the section header. Each case study block has generous vertical padding (64px desktop, 80px on large screens). A 1px divider separates successive case studies.

### Content

**Section Label (visually small, above H2):**
Featured Work

**Section Headline (H2):**
Case Studies

**Section Subheadline:**
Measurable impact through strategic design

**"View all" Link Text:**
View all projects

---

**Case Study 1**

**Category Label:** AXA GO Agent's Coach Initiative

**Title (H2):**
AI-Driven Training to Improve Onboarding and Retention

**Feature Point 1:**
Personalized AI coaching that adapts to each agent's learning pace and performance metrics.

**Feature Point 2:**
Reduced time-to-competency by 38% while improving agent retention rates.

**CTA 1 (Primary):**
- Button Text: View Case Study
- Button Style: Primary
- Destination: `/work/axa-go-agents-coach`

**CTA 2 (Secondary):**
- Button Text: See Results
- Button Style: Secondary (cream background)
- Destination: `/work/axa-go-agents-coach#results`

---

**Case Study 2**

**Category Label:** Atlas Onboarding

**Title (H2):**
Transforming User Adoption through Streamlined Onboarding

**Feature Point 1:**
Strategic UX research and prototyping to identify and eliminate onboarding friction points.

**Feature Point 2:**
Increased user adoption by 47% and improved sales conversion through optimized flows.

**CTA 1 (Primary):**
- Button Text: View Case Study
- Button Style: Primary
- Destination: `/work/atlas-onboarding`

**CTA 2 (Secondary):**
- Button Text: See Results
- Button Style: Secondary
- Destination: `/work/atlas-onboarding#results`

---

**Case Study 3**

**Category Label:** BennitAI Marketplace

**Title (H2):**
AI-Powered Platform Design for Community Engagement

**Feature Point 1:**
Intelligent matching algorithms that connect users with relevant opportunities seamlessly.

**Feature Point 2:**
Reduced onboarding friction by 58% while boosting community engagement by 73%.

**CTA 1 (Primary):**
- Button Text: View Case Study
- Button Style: Primary
- Destination: `/work/bennitai-marketplace`

**CTA 2 (Secondary):**
- Button Text: See Results
- Button Style: Secondary
- Destination: `/work/bennitai-marketplace#results`

### Image Requirements

- **Case Study 1 Image:**
  - Current path: `/images/Case Covers/Customer Simulator.png`
  - Ratio: 4:3
  - ALT Text: "AXA GO Agent's Coach -- AI-powered training simulation interface"
  - aria-label: Not required (static)
  - Purpose: Social proof / case study visual anchor

- **Case Study 2 Image:**
  - Current path: `/images/Case Covers/Atlas Onboarding.png`
  - Ratio: 4:3
  - ALT Text: "Atlas Onboarding -- redesigned user onboarding flow for a B2B SaaS platform"
  - aria-label: Not required
  - Purpose: Social proof / case study visual anchor

- **Case Study 3 Image:**
  - Current path: `/images/Case Covers/Bennit AI.png`
  - Ratio: 4:3
  - ALT Text: "BennitAI Marketplace -- AI-powered community engagement platform design"
  - aria-label: Not required
  - Purpose: Social proof / case study visual anchor

### Implementation Notes

- The current code already passes `caseData.title` as the alt attribute on case study images. This is better than a generic string but still not optimal. The alt texts above are more descriptive and include the company context, which serves both accessibility and search indexing.
- Case study titles are rendered as H2 in the current markup. This is architecturally correct because each case study is a full-bleed section -- they function as peer-level page sections, not sub-items within a single container. The "Featured Work" / "Case Studies" H2 above them acts as the section entry point; the individual case H2s follow at the same level because the visual layout treats them as discrete narrative blocks. No change needed here.

---

## Section 5: Services (How to Work With Me)

### Layout Specifications

- **Column Structure:** Section header is full-width centered. Service cards are in a 3-column equal grid. The UX Pulse Check subsection below the grid is a full-width 2-column layout: content left (max-width constrained), CTA button right, vertically centered on desktop. On mobile, the Pulse Check stacks to single column, content above button.
- **Background:** Dark (`bg-dark-700`). Returns to the dark treatment, consistent with the problem statement section. This pairing (dark = serious / analytical content) becomes a pattern the reader can trust.
- **Spacing:** 64-96px vertical padding. 24-32px gap between cards. 64-80px gap between the card grid and the Pulse Check subsection.

### Content

**Section Headline (H2):**
How to work with me

**Section Subheadline:**
I focus on urgent, complex problems for teams building the future -- from untangling enterprise ecosystems to scaling AI tools for startups.

---

**Service Card 1**

**Category Label:** 3 to 12 Months

**Title (H3):**
Embedded Designer

**Subtitle:**
When you need strategic guidance with hands-on execution.

**Ideal For:**
Teams scaling AI tools, launching MVPs, or overhauling legacy systems.

**Feature 1:** Own end-to-end design for new features or product lines.
**Feature 2:** Hands-on prototyping for high-priority features or workflows.
**Feature 3:** Audit existing UX to uncover hidden growth opportunities.

**CTA:**
- Button Text: Request your estimate
- Button Style: Primary
- Destination: Calendly booking link (`https://calendly.com/rodrigo_seoane/discovery`)

---

**Service Card 2 (Most Popular badge)**

**Category Label:** Strategy + Hands-On

**Title (H3):**
Advisory Retainer

**Subtitle:**
When you need a design leader in the trenches.

**Ideal For:**
Innovation hubs balancing long-term strategy with immediate design needs.

**Feature 1:** Define product vision and align it with business goals.
**Feature 2:** Align stakeholders through workshops and iterative prototyping.
**Feature 3:** Mentor your team on user-centric methods and design systems.

**CTA:**
- Button Text: Let's talk about your goals
- Button Style: Primary
- Destination: Calendly booking link

---

**Service Card 3**

**Category Label:** Strategy & Alignment

**Title (H3):**
Workshop Facilitation

**Subtitle:**
When you need alignment and actionable insights fast.

**Ideal For:**
Teams struggling to align on priorities, or preparing for a product launch.

**Feature 1:** Design scalable experiences with solid business models.
**Feature 2:** Align on OKRs and prioritize features that drive growth.
**Feature 3:** Co-create solutions through design sprints and rapid prototyping.

**CTA:**
- Button Text: Explore market opportunities
- Button Style: Primary
- Destination: Calendly booking link

---

**UX Pulse Check Subsection**

**Label (small uppercase):** UX Pulse Check

**Headline (H3):**
Need a fast diagnosis? The UX Pulse Check delivers answers in days.

**Body Copy:**
Sometimes you don't need a long-term partner. You need a precision expert who can quickly:

**Capability 1:** Pinpoint where your product bleeds revenue
**Capability 2:** Deliver ready-to-implement solutions
**Capability 3:** Provide recovery estimates within days

**CTA:**
- Button Text: Diagnose my UX issues
- Button Style: Accent (primary yellow background, dark text -- visually distinct from the dark-background primary CTAs above)
- Destination: `/ux-pulse-check`

### Image Requirements

No images in this section. The service cards are content-driven. The icon treatment (check marks) provides sufficient visual rhythm. Adding imagery here would dilute the scannability that decision-makers need at this stage of the page.

### Implementation Notes

- The current Services.tsx subheadline contains markdown-style bold syntax rendered as literal text: `*urgent, complex problems*`. This renders on screen as the asterisks wrapping the phrase. The asterisks should be removed. The `<strong>` tag already handles the bold styling in JSX. The corrected subheadline copy above drops the asterisks entirely -- the emphasis is conveyed through the sentence structure rather than inline formatting.
- The "€" symbol in the original Pulse Check copy ("Give you € recovery estimates within days") has been changed to the more natural "Provide recovery estimates within days." The euro symbol in that position read as a formatting artifact rather than a meaningful currency reference. If the intent is to signal that estimates are denominated in euros, the phrasing should be revised to something like "Deliver recovery estimates in euros within days" -- but only if that specificity serves the audience.

---

## Section 6: Client Logos (Trusted By)

### Layout Specifications

- **Column Structure:** Full-width horizontal marquee (auto-scrolling ticker). No traditional column grid. Logos are uniform-height cards arranged in a single continuous row that loops seamlessly.
- **Background:** Primary yellow (`bg-primary-yellow`). Returns to the warm brand tone, creating visual breathing room between the dark Services section and the lighter Testimonials section that follows.
- **Spacing:** Compact vertical padding (48px desktop, 64px mobile). This section is intentionally low-profile -- it adds credibility without demanding attention.

### Content

**Section Headline (H2, visually hidden):**
Trusted by

**Note on the visually hidden heading:** The current code has no heading element at all in this section. A visually hidden H2 (using a screen-reader-only CSS class, e.g., `sr-only`) satisfies the heading hierarchy requirement without disrupting the clean marquee layout. This is a one-line addition to the component.

### Image Requirements

All 15 client logos are currently in the codebase. Each is rendered via Next.js `<Image>` with `alt={name}`. This is correct -- the client name is the meaningful label for each logo. No changes to alt text are needed.

**Full logo inventory (for reference):**

| Client Name | Path | ALT (current, correct) |
|---|---|---|
| AXA | `/images/Client Logos/Client Name=Axa.png` | AXA |
| ATS Global | `/images/Client Logos/Client Name=ATSGlobal.png` | ATS Global |
| BennitAI | `/images/Client Logos/Client Name=BennitAI.png` | BennitAI |
| Boundaryless | `/images/Client Logos/Client Name=Boundaryless.png` | Boundaryless |
| CivicHub | `/images/Client Logos/Client Name=CivicHub.png` | CivicHub |
| Di Blasi | `/images/Client Logos/Client Name=Diblasi.png` | Di Blasi |
| FlossBCN | `/images/Client Logos/Client Name=FlossBCN.png` | FlossBCN |
| IFC | `/images/Client Logos/Client Name=IFC.png` | IFC |
| OpenBank | `/images/Client Logos/Client Name=OpenBank.png` | OpenBank |
| Ouishare | `/images/Client Logos/Client Name=Ouishare.png` | Ouishare |
| SMP | `/images/Client Logos/Client Name=SMP.png` | SMP |
| Suara | `/images/Client Logos/Client Name=Suara.png` | Suara |
| TEDx | `/images/Client Logos/Client Name=TEDx.png` | TEDx |
| Urbact | `/images/Client Logos/Client Name=Urbact.png` | Urbact |
| We Tribu | `/images/Client Logos/Client Name=We Tribu.png` | We Tribu |

### Implementation Notes

- The scraper reported only 6 logos (Floss BCN, Style Me Pretty, ATS Global, AXA Group Operations, Boundaryless, IFC). The code contains 15. The code is the source of truth. All 15 are retained.

---

## Section 7: Testimonials

### Layout Specifications

- **Column Structure:** Full-width centered carousel (single testimonial visible at a time). Each testimonial card is a 2-column layout: left column is the avatar circle and company name, right column is the author name, role, and quote. On mobile, the layout stacks with avatar centered above the text.
- **Background:** Cream (`bg-cream-500`). The lightest surface on the page. This is intentional -- testimonials are the highest-trust content on the page, and the neutral background lets the words carry without competing with brand color.
- **Spacing:** Compact section padding (40px desktop, 48px mobile). The carousel format means the reader stays in one place visually; generous padding would create dead space.
- **Navigation:** Previous/next arrow buttons, dot indicators, and auto-rotation (5-second interval, pauses on mouse hover). All navigation elements have `aria-label` attributes in the current code.

### Content

**Section Headline (H2):**
What Our Clients Say

**Note on section headline:** The current Testimonials component has no section heading. This heading must be added. It can be visually styled to sit above the carousel without disrupting the layout. This fixes the heading hierarchy gap flagged by the scraper and satisfies accessibility requirements.

All five testimonial quotes are retained verbatim. Testimonial text must never be rewritten -- these are attributed statements from real people.

**Testimonial 1**
- Author: Javi Velasco
- Role: Product Manager
- Company: We Tribu
- Quote: "It was a pleasure to work with Rodrigo, I really like his design style and he has a lot of knowledge of digital platforms. You can tell he has a lot of design experience and uses tools that make collaboration and feedback easy."

**Testimonial 2**
- Author: Pablo Fernandez Alvarez
- Role: Lead Designer
- Company: AXA GO
- Quote: "Apart from his technical skills, Rodrigo is open minded, communicative and always available to help his colleagues, skills that make him an excellent match for any team. Working with him has been a valuable experience, I learnt from him lots of his expertise in UI following all the years he’s been working as designer. 

I would absolutely collaborate with him again in the future if we have the opportunity. I highly recommend Rodrigo Seoane to any team looking for an experienced product designer."

**Testimonial 3**
- Author: Paul Oostindie
- Role: Sales Manager
- Company: ATS Global
- Quote: "Before I lost deals I should have won. Prospects couldn’t see Atlas’ value through our clunky process. I struggled to show how Atlas fit their workflows, and demos felt like uphill battles.

With the dynamic role-based onboarding paths prospects can see the value immediately and it had direct impact on sales conversions with enterprise clients."

**Testimonial 4**
- Author: Martin Kelman
- Role: CDTO
- Company: ATS Global
- Quote: "Rodrigo’s user-centric approach was transformative. By rebalancing functionality for managers and operators through role-based dashboards and rapid prototyping, we didn’t just simplify navigation, we operationalized scalability."

**Testimonial 5**
- Author: Stina Heikkila
- Role: Lead Researcher
- Company: Boundaryless
- Quote: "Rodrigo is a great designer to work with, with an excellent ability to translate very complex ideas and concepts into compelling visuals and user stories.

He is always ready to collaborate until the last mile of the birth, responding to new needs and changes, always keeping a good sense of humor and a smile in the process."

### Image Requirements

- **Avatars:** The current code renders initials-based avatar circles (extracting first letters from the author name) with a semi-transparent dark background. No photograph assets are required. The `avatar` field exists in the data schema but is not currently consumed by the component. This is fine -- initials avatars are a common, trustworthy pattern in B2B contexts and avoid the uncanny valley risk of placeholder stock photos.
  - ALT for each avatar: Empty string. The author name is displayed as adjacent text, so the avatar is decorative in context.

### Implementation Notes

- The scraper captured three testimonials from the old Webflow site (Stina Heikkila / Urbact, Javi Velasco / We Tribu, Pablo Fernandez Alvarez / AXA). The current Next.js codebase contains five different testimonials. Stina Heikkila appears in both sets but with different company attribution (Urbact in the scraper, Boundaryless in the code). The code is the source of truth. If the Urbact attribution is correct and the code is wrong, that is a data accuracy issue to resolve separately -- it is outside the scope of this copy document.

---

## Section 8: Contact

### Layout Specifications

- **Column Structure:** Full-width centered layout. Header text block is centered, max-width constrained to 900px. Form is centered below, max-width constrained to 600px. The Rio-BCN skyline illustration spans full bleed at the bottom of the section, flush with no gap.
- **Background:** Primary yellow (`bg-primary-yellow`). The page ends on the brand's signature warm tone. This is the final conversion surface -- it must feel inviting, not clinical.
- **Spacing:** Generous top padding (80px) creates a clear break from the testimonials above. The form fields have 20px vertical gap. 80px gap between the form and the skyline illustration.

### Content

**Section Headline (H2):**
Ready to work together?

**Section Subheadline:**
Let's talk about your product challenges. No commitment, no pressure -- just a conversation about what's possible.

**Form Field 1 -- Label:** Your Name
**Form Field 2 -- Label:** Email Address
**Form Field 3 -- Label:** Tell me about your project
**Consent Checkbox Label:** I agree to the processing of my personal data
**Legal Disclaimer (below submit button):** By submitting this form, you agree to our Privacy Policy.

**Submit Button Text:** Send

**Success State Headline (H3):** Thank you!
**Success State Body:** Your submission has been received. I'll get back to you within 24 hours.
**Success State Action:** Send another message

### Image Requirements

- **Rio-BCN Skyline Illustration:**
  - Current path: `/images/Illustration Rio-BCN.svg`
  - Description: A simplified skyline silhouette combining recognizable landmarks from Rio de Janeiro and Barcelona. Vector illustration, flat style, uses the brand's dark tone against the yellow background.
  - Ratio: Approximately 7.5:1 (1440x193 as specified in the current component). This is a decorative footer band, not a content image.
  - ALT Text: "Skyline illustration of Rio de Janeiro and Barcelona"
  - aria-label: Not required (decorative)
  - Purpose: Personal brand signal. Barcelona (current base) and Rio (origin or meaningful connection) communicated in a single visual. Reinforces the "Barcelona-based, global work" positioning from Strategic_Context.md.

### Implementation Notes

- The original scraped content included a "Collaboration Model" dropdown in the contact form (Embedded Designer / Advisory Retainer / Workshop Facilitation / Other). This field does not exist in the current ContactForm.tsx. It should be re-evaluated as a future addition. It is not included in this copy document because it does not exist in the current implementation. Include it.
- The subheadline has been shortened from the original. The original read: "Let's talk about how we can realign your product with your users' needs and start turning those challenges into triumphs. No strings attached." The phrase "turning those challenges into triumphs" is vague and slightly hyperbolic relative to the metrics-driven tone established elsewhere on the page. The revised version ("No commitment, no pressure -- just a conversation about what's possible") reduces friction anxiety more directly, which is the real job of a contact-section subheadline.

---

## Heading Hierarchy -- Final Document Outline

The corrected H1-H2-H3 structure for the full page, as specified in the sections above:

```
H1: B2B SaaS Design That Drives Retention and Growth
├── H2: The product trap that costs teams time and budget
│   ├── H3: User Experience Issues
│   ├── H3: Business Performance
│   └── H3: Development Challenges
├── H2: Design as a competitive advantage, not an afterthought
├── H2: Case Studies
├── H2: [AXA GO case title]
├── H2: [Atlas Onboarding case title]
├── H2: [BennitAI case title]
├── H2: How to work with me
│   ├── H3: Embedded Designer
│   ├── H3: Advisory Retainer
│   ├── H3: Workshop Facilitation
│   └── H3: Need a fast diagnosis? The UX Pulse Check delivers answers in days.
├── H2: Trusted by  [visually hidden]
├── H2: What Our Clients Say
└── H2: Ready to work together?
```

No heading levels are skipped. H1 appears once. Every H3 has an H2 parent in the same section. The case study H2s sit at the same level as the "Case Studies" section header H2 because each case study is a full-bleed visual section -- they are architectural peers, not nested children.

---

## Self-Verification Checklist

- [x] Every section aligns with Strategic_Context.md objectives (discoverability, contact conversion, expertise demonstration)
- [x] Content flow is optimized for the target conversion (credibility fast, then portfolio evidence, then service options, then social proof, then low-friction contact)
- [x] All images are fully specified with ratio, ALT, and aria-label notes
- [x] Column layouts are clearly defined for every section
- [x] No original content is lost without explicit justification (see Decisions Log at the top)
- [x] Copy speaks directly to the target persona's pain points (churn, slow onboarding, misaligned development, wasted resources)
- [x] CTAs are compelling and strategically placed (hero gets two, case studies get two each, services get one each, Pulse Check gets one, contact section gets one)
- [x] Heading hierarchy is corrected end-to-end (no skipped levels, no missing section wrappers)
- [x] Tone is consistent: professional, confident, results-focused, direct. No "ninja," "guru," or vague superlatives anywhere in the document.
- [x] SEO keywords from Strategic_Context.md are present naturally: "B2B SaaS," "onboarding," "retention," "product design," "user experience"
