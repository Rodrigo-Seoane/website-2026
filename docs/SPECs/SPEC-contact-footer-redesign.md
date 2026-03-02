# SPEC: Contact Form & Footer Redesign

**Based on:** [PRD-contact-footer-redesign.md](PRD-contact-footer-redesign.md)
**Created:** February 1, 2026

---

## Files to Create

### 1. `public/images/Illustration Rio-BCN.svg`

**Action:** Copy from `images/Illustration Rio-BCN.svg`

```bash
cp images/Illustration\ Rio-BCN.svg public/images/
```

---

## Files to Modify

### 2. `components/sections/ContactForm.tsx`

**Current state:** 325 lines, React Hook Form with floating labels, 4 fields

**Changes required:**

#### 2.1 Update Input Styling
- Change `bg-dark-50` → `bg-cream-500` on all input/textarea elements
- Keep floating label pattern (do NOT change to static labels)

#### 2.2 Reduce Form Fields
- **Keep:** Name, Email, Message
- **Remove:** Project Type dropdown (and related state/validation)

#### 2.3 Add Checkbox Component
Create inline or extract `CheckboxField` component:
```tsx
<div className="flex items-start gap-2">
  <input
    type="checkbox"
    id="consent"
    {...register('consent')}
    className="mt-1 w-5 h-5 accent-dark-900 cursor-pointer"
  />
  <label htmlFor="consent" className="text-base text-dark-900 cursor-pointer">
    I agree to the processing of my personal data
  </label>
</div>
```

#### 2.4 Update Form Validation Schema
Add consent field to validation:
```tsx
consent: z.boolean().refine(val => val === true, "You must agree to continue")
```

#### 2.5 Update Submit Button
- Remove icon from button
- Change text to "Primary" or "Send"
- Apply styles: `bg-dark-900 text-dark-50 w-full py-4`

#### 2.6 Add Legal Disclaimer
Below the button, add:
```tsx
<p className="text-xs text-dark-500 text-center mt-4">
  By submitting this form, you agree to our Privacy Policy.
</p>
```

#### 2.7 Add Rio-BCN Skyline Illustration
At the bottom of the section (after form, before Footer):
```tsx
<div className="w-full overflow-hidden">
  <Image
    src="/images/Illustration Rio-BCN.svg"
    alt="Rio de Janeiro and Barcelona skyline"
    width={1440}
    height={193}
    className="w-full h-auto"
  />
</div>
```

#### 2.8 Update Section Styling
- Background: `bg-primary-yellow` (already `#FFD115`)
- Padding: `px-20 pt-20` (80px)
- Max-width for text: 900px
- Max-width for form: 600px
- Gap between text and form: 48px (`gap-12`)

#### 2.9 Update Typography
- Heading: `font-display font-bold text-[32px] leading-[1.1]`
- Subheading: `font-body font-semibold text-lg leading-[1.32]`
- Labels: `font-body text-xs tracking-[0.24px]`

---

### 3. `components/layout/Footer.tsx`

**Current state:** 91 lines, flex wrap layout, 24x24 icons

**Changes required:**

#### 3.1 Update Container Layout
```tsx
<footer className="bg-dark-700 h-[200px]">
  <div className="h-full max-w-[1280px] mx-auto px-6 lg:px-20 flex items-center justify-between">
    {/* content */}
  </div>
</footer>
```

#### 3.2 Update Logo Size
- Width/height: 64x64px
```tsx
<Image src="/images/Logo Footer.svg" alt="Logo" width={64} height={64} />
```

#### 3.3 Update Social Icons
- Container: 96x96px (`w-24 h-24`)
- Inner icon SVG: 72x72px viewBox
- Gap between icons: 16px (`gap-4`)
- Order: Instagram, LinkedIn, YouTube

#### 3.4 Add Underline to Navigation Links
```tsx
<Link
  href={link.href}
  className="text-sm text-dark-50 underline hover:text-primary-yellow transition-colors font-body"
>
  {link.label}
</Link>
```

#### 3.5 Update Navigation Links
Ensure links are: About Me, Portfolio, Blog, Contact
Gap between links: 24px (`gap-6`)

#### 3.6 Update Copyright Section
```tsx
<div className="text-right text-dark-50">
  <p className="text-sm">©uxpertanalysis 2024</p>
  <p className="text-[10px] tracking-[0.4px] mt-1">Built with love from Barcelona.</p>
</div>
```

#### 3.7 Mobile Responsive Handling
Add responsive classes for stacking on mobile:
```tsx
<div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-0">
```

---

## Optional: New Dependencies

### 4. `package.json` (Optional Enhancement)

**If implementing Zod validation:**
```bash
npm install zod @hookform/resolvers
```

Then update ContactForm.tsx to use zodResolver:
```tsx
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  consent: z.boolean().refine(val => val === true, "Required"),
})

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(contactSchema)
})
```

---

## Design Tokens Reference

**Colors used (from globals.css):**
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary-yellow` | `#FFD115` | Contact section bg |
| `--color-cream-500` | `#FFF9F0` | Input backgrounds |
| `--color-dark-50` | `#F7F7F7` | Light text |
| `--color-dark-150` | `#C7C8C6` | Input borders |
| `--color-dark-500` | `#686B63` | Placeholder text |
| `--color-dark-700` | `#2E5E5E` | Footer bg |
| `--color-dark-900` | `#080D00` | Dark text, button bg |

---

## Implementation Order

1. Copy illustration asset to public folder
2. Modify ContactForm.tsx (largest changes)
3. Modify Footer.tsx (layout updates)
4. Test responsive behavior
5. Verify animations still work

---

## Figma Reference Nodes

- Contact Section: `node-id=8-19849`
- Footer: `node-id=8-19870`
- File: `hWnOIJprK4cfVhAW0kPKlK`
