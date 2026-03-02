# SPEC: Launch Implementation Plan (Days 1-28)

**Based on:** `docs/Site2026_Kanban_Board.csv`
**Created:** February 16, 2026
**Launch Date:** March 16, 2026 (28 working days)
**Current Date:** February 16, 2026

---

## Summary

This specification provides a tactical master plan for implementing all 41 tasks required to launch the portfolio website on March 16, 2026. It classifies each task by execution type, identifies interaction points with the user, structures work into dependency-aware phases, and flags risks with mitigation strategies. This is the operational blueprint for the next 28 days.

**Key Stats:**
- **Total Tasks:** 41
- **Total Estimated Hours:** 66.5
- **Working Days Available:** 28
- **Sections:** 9 (Home, Featured Work, Cases Template, Insights, About Me, Vibe Lab, Lead Magnet, Email Templates, Testing & Deploy)
- **Critical Path:** Lead Magnet → Email Templates → Testing & Deploy

---

## Progress Log

| Date | Task ID | Task | Status | Notes |
|---|---|---|---|---|
| Feb 17 | — | Design Tokens Update | **DONE** | Semantic color, typography & effect tokens. 58 files updated. See `SPEC-design-tokens-update.md` |
| Feb 17 | H-02 | Hero Button Interactions | **DONE** | Hover bg shift, spring scale, focus-visible rings, arrow translate |
| Feb 17 | H-10 | Clients Logo Sizes | **DONE** | Fixed paths, matched Figma card specs (165×100px), gap 20px, marquee 24s |
| Feb 17 | — | Token Bug Fix | **DONE** | Fixed `bg-content-active-secondary0` replacement error in Hero phone mockup |
| Feb 18 | FW-02 | Remove Grid Layout | **DONE** | Removed 2-col grid + category filters from `/work` page, replaced with stacked `CaseBlockSection` components |
| Feb 18 | FW-03 | Case Section Block Template | **DONE** | Created reusable `CaseBlockSection.tsx` (Figma node 229:17857). Alternating layout, 2 feature columns w/ icons, CTAs. Used on both `/work` page (5 cases) and homepage `FeaturedWork` (3 cases). Content updated to match live site. |

**Completed:** 6/41 tasks (5 autonomous + 1 foundational)
**Next up:** FW-01 (resource-dependent — needs hero background for /work page), then Cases Template section (CS-01 through CS-04)

---

## Task Classification Matrix

### Legend
- **Autonomous:** Can be implemented by Claude agents without user input
- **Resource-Dependent:** Needs assets/content from user (images, copy, icons, brand colors)
- **Direction-Dependent:** Needs design direction/approval from user (redesigns, new layouts)
- **New Feature Flow:** Requires full research → PRD → spec → implementation workflow
- **Manual/External:** Must be done by user outside codebase (DNS, email testing, Vercel config)

---

### Home Section (10 tasks)

| ID | Task | Classification | User Interaction Needed | Agent(s) | Priority |
|---|---|---|---|---|---|
| H-01 | Hero Cover | Resource-Dependent | Provide hero image asset (PNG/JPG, 1440px+ width) | Frontend Craftsman | High |
| H-02 | ~~Hero Button Interactions~~ | ~~Autonomous~~ | ~~None~~ | ~~Frontend Craftsman~~ | **DONE** (Feb 17) |
| H-03 | Pitfalls Background Color | Direction-Dependent | Approve background color (user to specify: cream-500, dark-700, or custom hex) | Frontend Craftsman | Medium |
| H-04 | Pitfalls Blurbs Design | Direction-Dependent | Review wireframe/mockup, approve card layout (2-col, 3-col, or custom) | UX Researcher → Frontend Craftsman | Medium |
| H-05 | Pitfalls Icons Set | Resource-Dependent | Provide icons (64px, 48px, 32px, 24px SVG/PNG) OR approve Lucide icon selection | Frontend Craftsman | Medium |
| H-06 | Competitive Advantage Image Banner | Resource-Dependent | Provide banner image/graphic (1280px+ width, aspect ratio?) | Frontend Craftsman | High |
| H-07 | Featured Work Case Icons | Resource-Dependent | Provide/approve icons for 5 case studies (64px SVG preferred) | Frontend Craftsman | Medium |
| H-08 | Featured Work Impact Values | Resource-Dependent | Provide metric values (% increases, time saved, etc.) for each case | Frontend Craftsman | High |
| H-09 | Pricing Background Colors | Direction-Dependent | Approve background colors for 3 pricing tiers | Frontend Craftsman | Low |
| H-10 | ~~Clients Logo Sizes~~ | ~~Autonomous~~ | ~~None~~ | ~~Frontend Craftsman~~ | **DONE** (Feb 17) |

**Section Risk:** High dependency on user-provided assets (4 tasks). If assets delayed, entire Home section blocks.

**Mitigation:** User must provide all Home section assets by **Day 2** (Feb 18) to avoid cascading delays.

---

### Featured Work Section (3 tasks)

| ID | Task | Classification | User Interaction Needed | Agent(s) | Priority |
|---|---|---|---|---|---|
| FW-01 | Cases Grid Hero Background | Resource-Dependent | Provide hero background image/color for /work page | Frontend Craftsman | High |
| FW-02 | ~~Remove Grid Layout~~ | ~~Autonomous~~ | ~~None~~ | ~~Frontend Craftsman~~ | **DONE** (Feb 18) |
| FW-03 | ~~Case Section Block Template~~ | ~~Direction-Dependent~~ | ~~Approved via Figma node 229:17857~~ | ~~Frontend Craftsman~~ | **DONE** (Feb 18) |

**Section Risk:** FW-03 is a Large (3hr) task requiring design approval. If direction changes mid-implementation, timeline extends.

**Mitigation:** User approves FW-03 wireframe by **Day 5** (Feb 21). Implementation starts Day 6.

---

### Cases Template Section (4 tasks)

| ID | Task | Classification | User Interaction Needed | Agent(s) | Priority |
|---|---|---|---|---|---|
| CS-01 | Redesign Case Hero | Direction-Dependent | Approve new case hero layout (content structure, typography, spacing) | UX Researcher → Frontend Craftsman | High |
| CS-02 | Case Hero Cover Image Ratio | Resource-Dependent | Confirm aspect ratio (16:9, 4:3, 3:2?) for hero images | Frontend Craftsman | High |
| CS-03 | Meta Details Cards | Autonomous | None (component already specified in SPEC-work-portfolio-section.md) | Frontend Craftsman | High |
| CS-04 | Up Next Block Template | Autonomous | None (component already specified in SPEC-work-portfolio-section.md) | Frontend Craftsman | Medium |

**Section Risk:** CS-01 blocks CS-02. If hero redesign is extensive, 3-hour estimate may be insufficient.

**Mitigation:** User approves CS-01 mockup by **Day 7** (Feb 24). If redesign exceeds 3 hours, flag immediately for scope adjustment.

---

### Insights Section (4 tasks)

| ID | Task | Classification | User Interaction Needed | Agent(s) | Priority |
|---|---|---|---|---|---|
| IN-01 | Insights Hero Background | Direction-Dependent | Approve background color for Insights hero | Frontend Craftsman | Medium |
| IN-02 | Refine Article Cards | Direction-Dependent | Approve card refinements (typography, spacing, hover states) | Frontend Craftsman | Medium |
| IN-03 | Add Article Filters | Autonomous | None (filter component already exists in codebase patterns) | Frontend Craftsman | Medium |
| IN-04 | Bento Grid Layout | New Feature Flow | Requires PRD → SPEC for bento grid layout system | UX Researcher → Spec Writer → Frontend Craftsman | Medium |

**Section Risk:** IN-04 is marked Medium priority but requires full PRD → SPEC → implementation cycle (4-6 hours total).

**Mitigation:** If timeline is tight, IN-04 can be deferred to post-launch. Ask user: "Is bento grid launch-critical?"

---

### About Me Section (2 tasks)

| ID | Task | Classification | User Interaction Needed | Agent(s) | Priority |
|---|---|---|---|---|---|
| AB-01 | Profile Section Redesign | Direction-Dependent | Approve new profile section layout | UX Researcher → Frontend Craftsman | Medium |
| AB-02 | Profile Image Sizes | Autonomous | None (resize existing images to responsive breakpoints) | Frontend Craftsman | Low |

**Section Risk:** Minimal. Already implemented per SPEC-about-page.md.

**Mitigation:** Verify existing About page meets requirements. If yes, mark AB-01/AB-02 as **Done**.

---

### Vibe Lab Section (3 tasks)

| ID | Task | Classification | User Interaction Needed | Agent(s) | Priority |
|---|---|---|---|---|---|
| VL-01 | Vibe Lab Hero Background | Direction-Dependent | Approve background color (already dark-background per SPEC-vibe-lab.md) | Frontend Craftsman | Low |
| VL-02 | Review Case Card Template | Autonomous | None (already implemented per SPEC-vibe-lab.md) | Frontend Craftsman | Low |
| VL-03 | Redesign Message Block | Direction-Dependent | Approve redesigned 'Next Updates' block (Coming Soon Teaser already exists) | Frontend Craftsman | Low |

**Section Risk:** Low priority, low risk. May be deferred if timeline compresses.

**Mitigation:** Mark VL-01/VL-02 as **Done** if existing implementation matches requirements. Only implement VL-03 if user requests changes.

---

### Lead Magnet Section (3 tasks) — CRITICAL PATH

| ID | Task | Classification | User Interaction Needed | Agent(s) | Priority |
|---|---|---|---|---|---|
| LM-01 | Lead Magnet Finish Dev | Autonomous | None (already specified in SPEC-lead-magnet-checklist.md) | Frontend Craftsman | **Critical** |
| LM-02 | Lead Magnet Test Backend + Frontend | Autonomous | User must test form submission once to verify email receipt | Frontend Craftsman + User Testing | **Critical** |
| LM-03 | Lead Magnet QA | Autonomous | User approves QA checklist results | Frontend Craftsman + User Testing | **Critical** |

**Section Risk:** **HIGHEST RISK SECTION.** 4 + 2 + 1.5 = 7.5 hours estimated. Depends on Resend API setup, domain verification (24-48hr DNS propagation), and email template cross-client testing.

**Mitigation:**
1. User sets up Resend account and starts domain verification **immediately** (Day 1, Feb 16).
2. Frontend Craftsman implements Phase 1 (client-side flow) Days 16-17.
3. Frontend Craftsman implements Phase 2 (email integration) Day 18 **only after DNS verification completes**.
4. If DNS delays past Day 18, use Resend sandbox domain for testing and deploy production domain post-launch.

---

### Email Templates Section (4 tasks) — CRITICAL PATH

| ID | Task | Classification | User Interaction Needed | Agent(s) | Priority |
|---|---|---|---|---|---|
| EM-01 | Email Sequence Content | Resource-Dependent | User provides/approves final email copy for all 5 emails | Frontend Craftsman (or copywriter if available) | **Critical** |
| EM-02 | Email Template Design | Direction-Dependent | User approves email template design mockup | Frontend Craftsman | **Critical** |
| EM-03 | Email Template Implementation | Autonomous | None (implement approved design with @react-email/components) | Frontend Craftsman | **Critical** |
| EM-04 | Email Templates QA | Manual/External | **User must test emails in Gmail, Outlook, Apple Mail** | User Testing + Frontend Craftsman | **Critical** |

**Section Risk:** **CRITICAL PATH DEPENDENCY.** EM-01 content must be written before EM-02/EM-03 can start. EM-04 requires manual testing across email clients.

**Mitigation:**
1. EM-01: Use email content already provided in SPEC-lead-magnet-checklist.md as baseline. User reviews/approves by **Day 19** (Mar 8).
2. EM-02: Simple HTML email template (text-heavy, minimal graphics) reduces design time. User approves mockup same-day (Day 21).
3. EM-03: Implement using React Email components (already specified).
4. EM-04: User must allocate 1 hour on Day 23 for manual email testing. **This cannot be delegated to agents.**

---

### Testing & Deploy Section (8 tasks) — CRITICAL PATH

| ID | Task | Classification | User Interaction Needed | Agent(s) | Priority |
|---|---|---|---|---|---|
| TD-01 | Cross-Browser Testing | Autonomous | User spot-checks on own devices (optional) | Frontend Craftsman | **Critical** |
| TD-02 | Accessibility Audit | Autonomous | None (automated + manual WCAG audit) | Frontend Craftsman | High |
| TD-03 | SEO Implementation | Autonomous | User provides final metadata/OG image assets if missing | Frontend Craftsman | High |
| TD-04 | Analytics & Conversion Tracking | Manual/External | **User must set up GA4 property and provide Measurement ID** | User (setup) + Frontend Craftsman (implementation) | High |
| TD-05 | Performance Optimization | Autonomous | None (Lighthouse audit + fixes) | Frontend Craftsman | High |
| TD-06 | Vercel Deployment | Manual/External | **User must connect GitHub repo to Vercel, configure environment variables** | User (setup) + Frontend Craftsman (verification) | **Critical** |
| TD-07 | DNS Migration | Manual/External | **User must update DNS records at IONOS to point to Vercel** | User (DNS changes) + Frontend Craftsman (guidance) | **Critical** |
| TD-08 | Launch Day Checklist | Manual/External | **User performs final verification and announces launch** | User | **Critical** |

**Section Risk:** **CRITICAL PATH BLOCKER.** TD-04, TD-06, TD-07, TD-08 all require user manual actions that cannot be delegated.

**Mitigation:**
1. **TD-04:** User creates GA4 property **by Day 25** (Mar 13) and provides Measurement ID to agent.
2. **TD-06:** User connects Vercel **by Day 26** (Mar 14). Agent provides step-by-step guide if needed.
3. **TD-07:** User initiates DNS migration **Day 27** (Mar 15) morning. DNS propagation takes 4-48 hours; plan for 24hr buffer.
4. **TD-08:** User owns launch checklist. Agent provides checklist template.

---

## Execution Phases (Days 1-28)

### Phase 1: Foundation & Quick Wins (Days 1-5)

**Goal:** Knock out autonomous tasks and gather all user-required assets early.

**Parallel Workstreams:**

**Workstream A: Home Section (Days 1-5)**
- Day 1: ~~H-02 (Autonomous)~~ **DONE** + **User provides H-01 hero image, H-06 banner image, H-08 metrics**
- Day 2: H-03 (User approves color), H-04 (User approves layout), **User provides H-05 icons, H-07 icons**
- Day 3: H-06 implementation (has banner image by now), H-05 implementation (has icons)
- Day 4: H-07, H-08 implementation (has icons + metrics)
- Day 5: H-09 (User approves colors), ~~H-10 (Autonomous)~~ **DONE**

**Workstream B: Featured Work Section (Days 5-7)**
- Day 5: FW-01 (User provides background image/color), FW-02 (Autonomous)
- Day 6: **User approves FW-03 wireframe/design**
- Day 7: FW-03 implementation (3hr task)

**Blocking Points:**
- If user delays asset delivery past Day 2, Home section slips.
- If user delays FW-03 approval past Day 6, Featured Work section slips into Phase 2.

**User Commitments (Phase 1):**
- [ ] Day 1: Provide hero image (H-01), banner image (H-06), impact metrics (H-08)
- [ ] Day 2: Approve Pitfalls background color (H-03), approve Pitfalls layout (H-04), provide icons (H-05, H-07)
- [ ] Day 2: Approve pricing tier background colors (H-09)
- [ ] Day 5: Provide /work hero background (FW-01)
- [ ] Day 6: Approve FW-03 case section block design

---

### Phase 2: Case Studies & Content Pages (Days 8-15)

**Goal:** Complete case study templates, Insights page, About page, Vibe Lab.

**Parallel Workstreams:**

**Workstream A: Cases Template (Days 8-11)**
- Day 8-9: CS-01 implementation (User approves hero redesign by Day 7)
- Day 9: CS-02 (User confirms aspect ratio)
- Day 10: CS-03 (Autonomous, already specified)
- Day 11: CS-04 (Autonomous, already specified)

**Workstream B: Insights (Days 11-13)**
- Day 11: IN-01 (User approves color)
- Day 12: IN-02 (User approves refinements)
- Day 13: IN-03 (Autonomous), **IN-04 (ASK USER: Launch-critical? If no, defer post-launch)**

**Workstream C: About Me (Day 14)**
- Day 14: **Verify AB-01/AB-02 already done per SPEC-about-page.md.** If changes needed, implement.

**Workstream D: Vibe Lab (Days 15-16)**
- Day 15: **Verify VL-01/VL-02 already done per SPEC-vibe-lab.md.** Only implement VL-03 if user requests.

**Blocking Points:**
- CS-01 is a 3-hour task; if redesign scope creeps, Days 8-9 slip.
- IN-04 (Bento Grid) requires PRD → SPEC cycle (4-6 hours). If launch-critical, starts Day 13 and extends into Phase 3.

**User Commitments (Phase 2):**
- [ ] Day 7: Approve CS-01 case hero redesign mockup
- [ ] Day 9: Confirm case hero image aspect ratio (CS-02)
- [ ] Day 11: Approve Insights hero background color (IN-01)
- [ ] Day 12: Approve Insights card refinements (IN-02)
- [ ] Day 13: **DECISION:** Is Bento Grid (IN-04) launch-critical? Yes/No?
- [ ] Day 14: Review About page against SPEC-about-page.md, flag any changes
- [ ] Day 15: Review Vibe Lab against SPEC-vibe-lab.md, flag any changes

---

### Phase 3: Lead Magnet & Emails (Days 16-23) — CRITICAL PATH

**Goal:** Complete interactive checklist, integrate Resend, test emails. **This phase is the launch blocker.**

**Sequential Tasks (cannot parallelize due to dependencies):**

**Days 16-17: Lead Magnet Dev (LM-01)**
- Frontend Craftsman implements Phase 1 (client-side flow) per SPEC-lead-magnet-checklist.md
- **User action (Day 16):** Create Resend account, initiate domain verification for `rodrigoseoane.com`
- **Blocking point:** DNS verification takes 24-48 hours. Email integration (LM-02 Phase 2) cannot start until verification completes.

**Day 18: Lead Magnet Backend + Testing (LM-02)**
- Frontend Craftsman implements Phase 2 (email integration) **only if DNS verification complete**
- User tests form submission, verifies Email 1 receipt
- **Fallback:** If DNS still propagating, use Resend sandbox domain for testing
- LM-03 (QA) runs on same day

**Days 19-20: Email Content (EM-01)**
- **User reviews/approves email copy** from SPEC-lead-magnet-checklist.md
- If changes needed, user provides final copy by end of Day 20
- **Blocking point:** EM-02/EM-03 cannot start until copy is approved

**Day 21: Email Template Design (EM-02)**
- Frontend Craftsman creates HTML email template mockup
- **User approves template same-day** (simple text-heavy template = fast approval)

**Day 22: Email Template Implementation (EM-03)**
- Frontend Craftsman implements 5 email templates using @react-email/components

**Day 23: Email QA (EM-04)**
- **User tests emails in Gmail, Outlook (webmail), Apple Mail**
- Verify: layout, links, UTM parameters, unsubscribe link, deliverability
- **Blocking point:** User must allocate 1 hour for manual testing

**Blocking Points:**
- If DNS verification incomplete by Day 18, email integration slips to Day 19-20 (compresses Days 19-23 into Days 20-23).
- If user delays email copy approval past Day 20, EM-02/EM-03 slip into Day 24-25 (compresses testing window).

**User Commitments (Phase 3):**
- [ ] Day 16: Create Resend account, initiate domain verification
- [ ] Day 18: Test lead magnet form submission, confirm Email 1 receipt
- [ ] Day 18: Approve LM-03 QA checklist results
- [ ] Day 20: Approve email sequence copy (EM-01)
- [ ] Day 21: Approve email template design (EM-02)
- [ ] Day 23: **Allocate 1 hour** for email QA across 3 email clients

---

### Phase 4: Testing & Optimization (Days 24-26)

**Goal:** Cross-browser, accessibility, SEO, analytics, performance.

**Parallel Tasks (can run simultaneously):**

**Day 24:**
- TD-01 (Cross-Browser Testing): Frontend Craftsman tests Chrome, Firefox, Safari, Edge (desktop + mobile)
- User spot-checks on own devices (optional)

**Day 25:**
- TD-02 (Accessibility Audit): Frontend Craftsman runs automated tools + manual WCAG audit
- TD-03 (SEO Implementation): Frontend Craftsman adds metadata, OG tags, structured data, sitemap
  - **User action:** Provide any missing OG images or final metadata tweaks

**Day 26:**
- TD-04 (Analytics): **User creates GA4 property, provides Measurement ID.** Frontend Craftsman implements event tracking.
- TD-05 (Performance): Frontend Craftsman runs Lighthouse, optimizes (lazy loading, bundle analysis, LCP/CLS fixes)

**Blocking Points:**
- TD-04 blocked until user provides GA4 Measurement ID. If delayed past Day 26, analytics won't be live at launch (can add post-launch).

**User Commitments (Phase 4):**
- [ ] Day 25: Provide any missing OG images for SEO (TD-03)
- [ ] Day 26: Create GA4 property, provide Measurement ID to agent
- [ ] Day 26: Spot-check performance optimizations (optional)

---

### Phase 5: Deployment & Launch (Days 27-28) — CRITICAL PATH

**Goal:** Deploy to Vercel, migrate DNS, verify, launch.

**Day 27:**
- **TD-06 (Vercel Deployment):**
  - **User action (morning):** Connect GitHub repo to Vercel project
  - **User action (morning):** Add environment variables (RESEND_API_KEY, RESEND_AUDIENCE_ID, GA4_MEASUREMENT_ID) to Vercel
  - Frontend Craftsman: Trigger production build, verify deployment succeeds
  - Frontend Craftsman: Test preview URL, verify all pages render correctly

- **TD-07 (DNS Migration):**
  - **User action (after Vercel deployment succeeds):** Update DNS A/CNAME records at IONOS to point to Vercel
  - Frontend Craftsman: Provide DNS configuration guide (Vercel provides exact records)
  - **DNS propagation:** 4-24 hours (plan for 24hr buffer)
  - Frontend Craftsman: Monitor SSL certificate issuance (Vercel auto-provisions after DNS points)

**Day 28 (Launch Day):**
- **TD-08 (Launch Day Checklist):**
  - **User performs final verification:**
    - [ ] All links work (navigation, case studies, CTAs, Calendly)
    - [ ] All forms work (contact form, lead magnet)
    - [ ] Analytics tracking fires (verify in GA4 real-time)
    - [ ] Mobile responsive on real devices
    - [ ] OG images display correctly on social media (LinkedIn, Twitter preview)
  - **User announces launch** (LinkedIn, email list, etc.)

**Blocking Points:**
- DNS propagation can take up to 48 hours in rare cases. If DNS doesn't resolve by end of Day 28, launch slips to Day 29-30.
- Vercel deployment failure (build error, environment variable misconfiguration) would block DNS migration.

**Mitigation:**
- Run `npm run build` locally on Day 26 to catch build errors early.
- Verify environment variables in Vercel UI immediately after adding them.
- If DNS propagation is slow, user can access site via Vercel preview URL (e.g., `portfolio-2026.vercel.app`) while waiting for custom domain.

**User Commitments (Phase 5):**
- [ ] Day 27 (morning): Connect GitHub repo to Vercel
- [ ] Day 27 (morning): Add environment variables to Vercel
- [ ] Day 27 (afternoon): Initiate DNS migration at IONOS (after Vercel deployment verified)
- [ ] Day 28: Perform launch checklist verification (2 hours allocated)
- [ ] Day 28: Announce launch publicly

---

## Risk Register & Mitigation Strategies

### High-Priority Risks

| Risk ID | Risk | Impact | Probability | Mitigation |
|---|---|---|---|---|
| R-01 | User asset delivery delays (H-01, H-06, H-08, etc.) | Phase 1 slips 2-3 days | **High** | **User commits to asset delivery schedule in Phase 1.** Agent sends asset request checklist Day 1. |
| R-02 | Resend DNS verification takes >48 hours | Email integration delayed to Day 19-20 | **Medium** | **User starts DNS verification Day 16 (morning).** Use Resend sandbox for testing if needed. |
| R-03 | Email copy approval delayed past Day 20 | EM-02/EM-03 slip into Days 24-25, compresses testing | **Medium** | **User pre-approves baseline copy from SPEC.** Only minor tweaks allowed Days 19-20. |
| R-04 | User unavailable for EM-04 email QA (Day 23) | Email QA incomplete, potential deliverability issues at launch | **Medium** | **User blocks 1 hour on calendar for Day 23.** If unavailable, agent tests across email clients using test accounts. |
| R-05 | DNS propagation takes >24 hours (Day 27-28) | Launch slips to Day 29-30 | **Low** | **Initiate DNS migration morning of Day 27.** Monitor propagation every 4 hours. Use Vercel preview URL as fallback. |
| R-06 | Vercel deployment fails (build error, env vars) | DNS migration blocked, launch slips | **Medium** | **Run `npm run build` locally Day 26.** Catch build errors early. Test env vars in Vercel preview before DNS migration. |
| R-07 | GA4 setup delayed (user provides Measurement ID late) | Analytics won't track at launch | **Medium** | **User creates GA4 property by Day 25.** Agent provides step-by-step guide. Analytics can be added post-launch if needed (low risk). |
| R-08 | Bento Grid (IN-04) scope creep | Adds 4-6 hours to timeline, pushes into Phase 3 | **Low** | **User decides Day 13: Launch-critical or post-launch?** If post-launch, defer immediately. |

### Medium-Priority Risks

| Risk ID | Risk | Impact | Probability | Mitigation |
|---|---|---|---|---|
| R-09 | CS-01 redesign scope exceeds 3 hours | Days 8-9 extend into Day 10 | **Medium** | **User approves mockup Day 7 with clear scope.** If scope creeps, flag for user decision: simplify or extend timeline. |
| R-10 | FW-03 case section block requires multiple design revisions | Days 6-7 extend into Days 8-9 | **Low** | **User approves wireframe Day 6 morning.** Agent implements approved design only; no mid-implementation changes. |
| R-11 | Accessibility audit uncovers critical issues (TD-02) | Adds 2-4 hours to fix on Day 25-26 | **Low** | **Follow WCAG best practices from start.** Existing SPECs already include accessibility patterns. |
| R-12 | Performance optimization (TD-05) requires major refactoring | Adds 4-6 hours, pushes into Day 27 | **Low** | **Target Lighthouse 90+ (not 95+) as acceptable threshold.** Major performance wins already implemented in existing code. |

---

## User Interaction Schedule

### Daily User Commitments

**Day 1 (Feb 16):**
- [ ] Provide: Hero image (H-01), banner image (H-06), impact metrics (H-08)
- [ ] Provide: Featured work icons (H-07)

**Day 2 (Feb 18):**
- [ ] Approve: Pitfalls background color (H-03)
- [ ] Approve: Pitfalls blurbs layout (H-04)
- [ ] Approve: Pricing tier background colors (H-09)
- [ ] Provide: Pitfalls icons (H-05)

**Day 5 (Feb 21):**
- [ ] Provide: /work hero background (FW-01)

**Day 6 (Feb 22):**
- [ ] Approve: FW-03 case section block wireframe/mockup

**Day 7 (Feb 24):**
- [ ] Approve: CS-01 case hero redesign mockup

**Day 9 (Feb 25):**
- [ ] Confirm: Case hero image aspect ratio (CS-02)

**Day 11 (Feb 27):**
- [ ] Approve: Insights hero background color (IN-01)

**Day 12 (Feb 28):**
- [ ] Approve: Insights card refinements (IN-02)

**Day 13 (Mar 1):**
- [ ] **DECISION:** Is Bento Grid (IN-04) launch-critical? Yes/No?

**Day 14 (Mar 2):**
- [ ] Review: About page against SPEC, flag any changes

**Day 15 (Mar 3):**
- [ ] Review: Vibe Lab against SPEC, flag any changes

**Day 16 (Mar 5):**
- [ ] **ACTION:** Create Resend account, initiate domain verification

**Day 18 (Mar 6):**
- [ ] **ACTION:** Test lead magnet form submission, verify Email 1 receipt
- [ ] Approve: LM-03 QA checklist results

**Day 20 (Mar 8):**
- [ ] Approve: Email sequence copy (EM-01)

**Day 21 (Mar 9):**
- [ ] Approve: Email template design (EM-02)

**Day 23 (Mar 11):**
- [ ] **ACTION (1 hour):** Test emails in Gmail, Outlook, Apple Mail (EM-04)

**Day 25 (Mar 13):**
- [ ] Provide: Any missing OG images (TD-03)

**Day 26 (Mar 14):**
- [ ] **ACTION:** Create GA4 property, provide Measurement ID (TD-04)

**Day 27 (Mar 15):**
- [ ] **ACTION (morning):** Connect GitHub repo to Vercel (TD-06)
- [ ] **ACTION (morning):** Add environment variables to Vercel (TD-06)
- [ ] **ACTION (afternoon):** Update DNS at IONOS to point to Vercel (TD-07)

**Day 28 (Mar 16 - LAUNCH DAY):**
- [ ] **ACTION (2 hours):** Final verification checklist (TD-08)
- [ ] **ACTION:** Announce launch publicly

---

## Agent Workflow Recommendations

### For Autonomous Tasks
**Pattern:** Agent reads existing SPEC → implements → commits → reports completion to user.

**Example (H-02: Hero Button Interactions):**
1. Agent reads `SPEC-homepage-optimization.md` (confirms hover/click patterns already specified)
2. Agent reviews `components/sections/Hero.tsx` (identifies CTA button lines)
3. Agent adds hover animation classes (already in Tailwind config)
4. Agent tests locally (`npm run dev`)
5. Agent commits: `feat: add hero button hover/click interactions (H-02)`
6. Agent reports: "H-02 complete. Hero CTA buttons now have hover scale + color transition."

### For Resource-Dependent Tasks
**Pattern:** Agent requests asset → user provides asset → agent implements → commits → reports.

**Example (H-01: Hero Cover):**
1. Agent sends asset request to user: "H-01 requires hero image. Please provide PNG/JPG, 1440px+ width, aspect ratio 16:9 or 4:3. Place in `/public/images/` and reply with filename."
2. User provides: `hero-cover.jpg` (1920x1080, placed in `/public/images/`)
3. Agent updates `components/sections/Hero.tsx` to use new image
4. Agent optimizes image if >200KB (Next.js Image component handles this automatically)
5. Agent commits: `feat: update hero cover image (H-01)`
6. Agent reports: "H-01 complete. Hero image updated and optimized."

### For Direction-Dependent Tasks
**Pattern:** Agent creates wireframe/mockup → user approves → agent implements → commits → reports.

**Example (H-04: Pitfalls Blurbs Design):**
1. Agent reads task: "Redesign blurb cards layout and content for Pitfalls section"
2. Agent reviews existing `components/sections/ValueProposition.tsx` (Pitfalls = Problem Statement section)
3. Agent creates 2 layout options:
   - Option A: 2-column grid, larger cards, icons top-left
   - Option B: 3-column grid, compact cards, icons centered above text
4. Agent sends wireframe/mockup to user with question: "Which layout do you prefer? Or would you like adjustments?"
5. User approves Option A with note: "Use orange accent line above each card"
6. Agent implements approved design
7. Agent commits: `feat: redesign Pitfalls blurbs to 2-col grid with accent lines (H-04)`
8. Agent reports: "H-04 complete. Pitfalls section now uses 2-column layout with orange accent lines."

### For Manual/External Tasks
**Pattern:** Agent provides step-by-step guide → user performs actions → user confirms completion → agent verifies.

**Example (TD-07: DNS Migration):**
1. Agent generates DNS configuration guide:
   ```
   To migrate DNS from IONOS to Vercel:
   1. Log in to IONOS control panel
   2. Navigate to Domain Management > DNS Settings
   3. Delete existing A records for rodrigoseoane.com
   4. Add new A record: @ → 76.76.21.21 (Vercel IP)
   5. Add new CNAME record: www → cname.vercel-dns.com
   6. Save changes
   7. Reply "DNS updated" when complete
   ```
2. User performs actions
3. User replies: "DNS updated at 10:32am"
4. Agent monitors DNS propagation: `dig rodrigoseoane.com` (checks every 4 hours)
5. Agent verifies SSL certificate issued by Vercel
6. Agent reports: "TD-07 complete. DNS propagated, SSL active, site live at rodrigoseoane.com."

---

## Appendix A: Task Dependency Graph

```
Home Section (Days 1-5)
├── H-01 (Day 1) ──[Asset]──> User provides image
├── H-02 (Day 1) ──[DONE Feb 17]
├── H-03 (Day 2) ──[Approval]──> User approves color
├── H-04 (Day 2) ──[Approval]──> User approves layout
├── H-05 (Day 3) ──[Asset]──> User provides icons
├── H-06 (Day 3) ──[Asset]──> User provides banner ──> H-06 implementation
├── H-07 (Day 4) ──[Asset]──> User provides icons
├── H-08 (Day 4) ──[Asset]──> User provides metrics ──> H-08 implementation
├── H-09 (Day 5) ──[Approval]──> User approves colors
└── H-10 (Day 5) ──[DONE Feb 17]

Featured Work (Days 5-7)
├── FW-01 (Day 5) ──[Asset]──> User provides background
├── FW-02 (Day 5) ──[DONE Feb 18]
└── FW-03 (Day 6-7) ──[DONE Feb 18]

Cases Template (Days 8-11)
├── CS-01 (Day 8-9) ──[Approval Day 7]──> User approves mockup ──> Implementation Days 8-9
├── CS-02 (Day 9) ──[Approval]──> User confirms aspect ratio
├── CS-03 (Day 10) ──[Autonomous]
└── CS-04 (Day 11) ──[Autonomous]

Insights (Days 11-13)
├── IN-01 (Day 11) ──[Approval]──> User approves color
├── IN-02 (Day 12) ──[Approval]──> User approves refinements
├── IN-03 (Day 13) ──[Autonomous]
└── IN-04 (Day 13) ──[Decision]──> User: Launch-critical? ──> If yes: PRD→SPEC→Implement

About Me (Day 14)
├── AB-01 (Day 14) ──[Verify existing SPEC]──> If changes: implement
└── AB-02 (Day 14) ──[Autonomous]

Vibe Lab (Days 15-16)
├── VL-01 (Day 15) ──[Verify existing SPEC]
├── VL-02 (Day 15) ──[Verify existing SPEC]
└── VL-03 (Day 16) ──[Approval if changes requested]

Lead Magnet (Days 16-18) ──CRITICAL PATH──
├── LM-01 (Days 16-17) ──[Autonomous Phase 1]
│   └──[Day 16]──> User: Create Resend account, start DNS verification
├── LM-02 (Day 18) ──[BLOCKS: DNS verification complete]──> Phase 2 implementation
│   └──> User: Test form, verify email receipt
└── LM-03 (Day 18) ──[Autonomous QA]──> User approves results

Email Templates (Days 19-23) ──CRITICAL PATH──
├── EM-01 (Days 19-20) ──[User approves copy]──> BLOCKS EM-02, EM-03
├── EM-02 (Day 21) ──[DEPENDS: EM-01 approved]──> User approves template mockup
├── EM-03 (Day 22) ──[DEPENDS: EM-02 approved]──> Implementation
└── EM-04 (Day 23) ──[DEPENDS: EM-03 complete]──> User: Manual email testing (1hr)

Testing & Deploy (Days 24-28) ──CRITICAL PATH──
├── TD-01 (Day 24) ──[Autonomous cross-browser testing]
├── TD-02 (Day 25) ──[Autonomous accessibility audit]
├── TD-03 (Day 25) ──[User provides missing OG images]
├── TD-04 (Day 26) ──[BLOCKS: User creates GA4, provides ID]──> Implementation
├── TD-05 (Day 26) ──[Autonomous performance optimization]
├── TD-06 (Day 27) ──[BLOCKS: User connects Vercel, adds env vars]──> Deploy
├── TD-07 (Day 27) ──[DEPENDS: TD-06 complete]──> User: DNS migration ──> 24hr propagation
└── TD-08 (Day 28) ──[DEPENDS: TD-07 propagated]──> User: Launch checklist, announce
```

---

## Appendix B: Existing SPEC Cross-Reference

Tasks that are already specified in existing SPECs (may be partially or fully implemented):

| Task ID | Task | Existing SPEC Reference | Implementation Status |
|---|---|---|---|
| H-02 | Hero Button Interactions | `SPEC-homepage-optimization.md` (Hero section) | **DONE** (Feb 17) — hover bg shift, spring scale, focus-visible rings, arrow animation |
| FW-02 | Remove Grid Layout | `SPEC-work-portfolio-section.md` (page composition) | **DONE** (Feb 18) — Grid + filters removed from `/work`, replaced with stacked CaseBlockSection |
| FW-03 | Case Section Block Template | `SPEC-work-portfolio-section.md` (CaseSection component) | **DONE** (Feb 18) — Reusable `CaseBlockSection.tsx` created from Figma spec, used on homepage + /work |
| CS-03 | Meta Details Cards | `SPEC-work-portfolio-section.md` (CaseStudyOverview component) | Specified, needs verification |
| CS-04 | Up Next Block Template | `SPEC-work-portfolio-section.md` (NextProject component) | Specified, needs verification |
| IN-03 | Add Article Filters | `SPEC-work-portfolio-section.md` (CategoryFilter component pattern) | Pattern exists, needs adaptation |
| AB-01 | Profile Section Redesign | `SPEC-about-page.md` (AboutHero component) | Specified, needs verification |
| AB-02 | Profile Image Sizes | `SPEC-about-page.md` (responsive image handling) | Specified, needs verification |
| VL-01 | Vibe Lab Hero Background | `SPEC-vibe-lab.md` (VibeLabHero component) | Specified, needs verification |
| VL-02 | Review Case Card Template | `SPEC-vibe-lab.md` (ExperimentCard component) | Specified, needs verification |
| VL-03 | Redesign Message Block | `SPEC-vibe-lab.md` (ComingSoonTeaser component) | Specified, may need updates |
| LM-01 | Lead Magnet Finish Dev | `SPEC-lead-magnet-checklist.md` (all components) | Specified, not yet implemented |
| LM-02 | Lead Magnet Test Backend + Frontend | `SPEC-lead-magnet-checklist.md` (API route + email integration) | Specified, not yet implemented |
| LM-03 | Lead Magnet QA | `SPEC-lead-magnet-checklist.md` (testing checklist) | Specified, not yet implemented |
| EM-01 | Email Sequence Content | `SPEC-lead-magnet-checklist.md` (email templates content) | Specified, needs approval |
| EM-02 | Email Template Design | `SPEC-lead-magnet-checklist.md` (email template structure) | Specified, needs approval |
| EM-03 | Email Template Implementation | `SPEC-lead-magnet-checklist.md` (5 email files) | Specified, not yet implemented |

**Verification Strategy:** Agent should read each existing SPEC and verify current codebase state before starting implementation. If already done, mark task **Done** and move to next task.

---

## Appendix C: Launch Day Checklist Template

**TD-08: Launch Day Checklist (User-Performed)**

Date: March 16, 2026
Allocated Time: 2 hours

### Pre-Launch Verification (Morning)

**DNS & Hosting:**
- [ ] Site resolves at https://rodrigoseoane.com (no "Page Not Found")
- [ ] SSL certificate is active (green padlock in browser)
- [ ] No mixed content warnings in console
- [ ] Vercel deployment status shows "Ready"

**Navigation & Pages:**
- [ ] Homepage loads and renders correctly
- [ ] /work page displays all case studies
- [ ] All 5 case study detail pages load (/work/[slug])
- [ ] /about page loads
- [ ] /insights page loads, article cards display
- [ ] /vibe-lab page loads, experiment card displays
- [ ] /ux-pulse-check page loads
- [ ] /ux-pulse-check/checklist page loads

**Forms & CTAs:**
- [ ] Contact form submission works (send test submission)
- [ ] Confirmation message appears after contact form submit
- [ ] Lead magnet checklist form works (complete full flow)
- [ ] Email 1 arrives after lead magnet submission (check inbox)
- [ ] All "Book a Call" buttons link to correct Calendly URL
- [ ] All "Download PDF" links work

**Analytics:**
- [ ] GA4 real-time view shows active user (you) on site
- [ ] Test event fires when clicking a CTA (verify in GA4 real-time)
- [ ] GA4 property is set to correct domain (not localhost)

**Mobile Responsive:**
- [ ] Open site on mobile device (iOS or Android)
- [ ] Navigation menu works on mobile
- [ ] All pages are readable (no horizontal scroll, text not cut off)
- [ ] Forms are usable on mobile (tap targets ≥44px)
- [ ] Images load correctly on mobile

**Social Media Preview:**
- [ ] Paste homepage URL into LinkedIn post preview → OG image displays
- [ ] Paste /work URL into Twitter/X post preview → OG image displays
- [ ] OG title and description match metadata

**Cross-Browser Spot Check:**
- [ ] Open site in Safari (if on Mac)
- [ ] Open site in Edge (if on Windows)
- [ ] Verify: No layout breaks, all images load, forms work

### Launch Actions (Afternoon)

**Public Announcement:**
- [ ] Publish LinkedIn post announcing launch
- [ ] Email announcement to email list (if applicable)
- [ ] Update LinkedIn profile with new portfolio URL
- [ ] Update Twitter/X bio with new portfolio URL

**Monitoring (24-48 hours post-launch):**
- [ ] Check GA4 daily for traffic
- [ ] Monitor Resend dashboard for email delivery issues
- [ ] Check Vercel dashboard for build/deployment errors
- [ ] Respond to any form submissions within 24 hours

---

## Appendix D: Emergency Contingency Plans

### Contingency 1: Critical Asset Delivery Failure

**Scenario:** User cannot provide required asset (hero image, banner, icons) by deadline.

**Mitigation:**
1. **Placeholder strategy:** Agent uses high-quality placeholder from Unsplash/Pexels/UI8 (royalty-free)
2. Agent implements with placeholder, marks task as "Pending final asset"
3. Post-launch swap: User provides final asset after launch, agent swaps in 5-minute update

**Example:** H-01 (Hero Cover) delayed to Day 5.
- Agent uses https://unsplash.com/photos/abstract-shapes (matches brand color palette)
- Implements hero with placeholder Day 1
- User provides final hero image Day 6
- Agent swaps image, redeploys (5 minutes)

### Contingency 2: DNS Propagation Exceeds 48 Hours

**Scenario:** DNS migration initiated Day 27, but custom domain doesn't resolve by Day 28.

**Mitigation:**
1. **Soft launch:** Use Vercel preview URL (e.g., `portfolio-2026.vercel.app`) for initial announcement
2. Email list: "Site is live at [preview URL]. Custom domain coming within 24-48 hours."
3. LinkedIn post: Link to preview URL with note: "New portfolio is live!"
4. Once DNS propagates, update social posts with final URL

**Impact:** Minimal. Preview URL is fully functional. Custom domain is cosmetic at launch.

### Contingency 3: Email Integration Blocked by Resend DNS Verification

**Scenario:** DNS verification incomplete by Day 18, email integration cannot proceed.

**Mitigation:**
1. **Sandbox testing:** Use Resend sandbox domain (`onboarding@resend.dev`) for testing
2. **Delay email automation:** Deploy lead magnet form with email collection only (no automated emails)
3. **Manual follow-up:** User manually sends Email 1 to leads from personal email
4. **Post-launch fix:** Complete DNS verification post-launch, activate automated emails within 48 hours

**Impact:** Lead capture still works. Email automation delayed by 2-3 days post-launch.

### Contingency 4: Build Failure on Vercel (Day 27)

**Scenario:** Vercel deployment fails due to TypeScript error, missing dependency, or environment variable issue.

**Mitigation:**
1. **Local build test:** Agent runs `npm run build` Day 26 to catch errors early
2. **Vercel logs analysis:** Agent reads build logs, identifies specific error
3. **Rapid fix:**
   - TypeScript error: Fix type, push, redeploy (15-30 min)
   - Missing dependency: Add to package.json, push, redeploy (10 min)
   - Env var issue: Add to Vercel dashboard, redeploy (5 min)
4. **Rollback option:** Revert to last working commit, investigate issue post-launch

**Impact:** 1-2 hour delay on Day 27. DNS migration postponed to evening of Day 27.

### Contingency 5: GA4 Setup Not Complete by Day 26

**Scenario:** User cannot create GA4 property by Day 26.

**Mitigation:**
1. **Defer analytics:** Deploy without GA4, add post-launch
2. **Vercel Analytics:** Use Vercel's built-in analytics (free tier) as temporary substitute
3. **Post-launch add:** User creates GA4 within 48 hours of launch, agent adds tracking code, redeploys (15 min)

**Impact:** No visitor tracking for first 24-48 hours. Historical data lost but not critical.

---

## Final Recommendations

### For User (Rodrigo)

**Week 1 (Days 1-7):**
- **Priority:** Provide all Home section assets by Day 2 (Feb 18). This is the biggest blocker.
- **Time commitment:** 2-3 hours total (gathering assets, approving colors/layouts)

**Week 2 (Days 8-14):**
- **Priority:** Approve case study redesigns (CS-01, FW-03) by Day 7 (Feb 24).
- **Time commitment:** 1-2 hours total (reviewing mockups, providing feedback)

**Week 3 (Days 15-21):**
- **Priority:** Create Resend account and initiate DNS verification Day 16 (Mar 5).
- **Priority:** Approve email copy by Day 20 (Mar 8).
- **Time commitment:** 3-4 hours total (Resend setup, email review)

**Week 4 (Days 22-28):**
- **Priority:** Allocate 1 hour Day 23 for email QA.
- **Priority:** Allocate 2 hours Day 27-28 for Vercel setup and DNS migration.
- **Priority:** Allocate 2 hours Day 28 for launch checklist.
- **Time commitment:** 5-6 hours total (hands-on deployment and testing)

**Total user time commitment:** 11-15 hours over 28 days (average 30-45 min/day).

### For Frontend Craftsman Agent

**Success Criteria:**
1. **Follow existing SPECs first:** Before implementing any task, read corresponding SPEC. If already specified, implement exactly as written. If not specified, ask user for direction.
2. **Communicate blocking points immediately:** If waiting on user asset/approval, report: "Task X blocked. Awaiting user input: [specific request]. Moving to next available task."
3. **Maintain daily progress log:** At end of each day, report: "Day N complete. Finished: [task IDs]. In progress: [task IDs]. Blocked: [task IDs + reason]."
4. **Raise risks early:** If any task exceeds estimated hours by 50%, flag immediately: "Task X taking longer than estimated. Current: Xhr, Estimated: Yhr. Recommend: [scope adjustment or timeline extension]."
5. **Test before committing:** Every task must pass local testing (`npm run dev`) before commit. No broken builds pushed to main branch.

### For Project Manager (AI/User)

**Daily Standups (Recommended):**
- **Format:** 5-minute async check-in (written report, no meeting)
- **Frequency:** Daily, end of day
- **Content:** Agent reports completed tasks, blocked tasks, risks, next day's plan

**Weekly Milestones:**
- **Week 1 Goal:** Home section complete (H-01 through H-10)
- **Week 2 Goal:** Featured Work, Cases Template, Insights complete
- **Week 3 Goal:** Lead Magnet + Email Templates complete (**CRITICAL**)
- **Week 4 Goal:** Testing, deployment, launch (**CRITICAL**)

If any weekly milestone slips by >2 days, escalate for scope/timeline adjustment.

---

**End of SPEC-launch-implementation-plan.md**

This is your master blueprint. Execute methodically, communicate blockers immediately, and deliver on March 16. Let's ship this.
