# PRD: Contact Form & Footer Redesign

**Project:** Rodrigo Seoane Portfolio
**Feature:** Contact Section & Footer Redesign
**Figma Sources:**

- Contact: [node-id=8-19849](https://www.figma.com/design/hWnOIJprK4cfVhAW0kPKlK/Portfolio--UI-Design?node-id=8-19849&m=dev)
- Footer: [node-id=8-19870](https://www.figma.com/design/hWnOIJprK4cfVhAW0kPKlK/Portfolio--UI-Design?node-id=8-19870&m=dev)
  **Created:** February 1, 2026

---

## 1. Figma Design Specifications

### Contact Section (Node: 8:19849)

**Visual Design:**

- Yellow background (`#FFD115` / `--color-primary-yellow`)
- Centered layout with max-width 900px for text, 600px for form
- Rio-Barcelona skyline illustration at bottom (Pre-Footer decorative element)

**Typography:**

- Heading: "Plus Jakarta Sans" Bold, 32px, line-height 1.1
- Subheading: "Inter" Semi Bold, 18px, line-height 1.32
- Labels: "Inter" Regular, 12px, letter-spacing 0.24px
- Body: "Inter" Regular, 16px, line-height 1.32

**Form Elements:**

- 3 text fields (keep existing floating label pattern, deviate from Figma static labels)
- Cream background (`#FFF9F0`) for inputs
- Bottom border only (`#C7C8C6`)
- Textarea with resize indicator
- Checkbox with consent label
- Primary button (dark background `#080D00`, light text `#F7F7F7`)
- Legal/privacy text below form

**Spacing:**

- Section padding: 80px horizontal, 80px top
- Form gap: 16px between fields
- Section gap: 48px between text and form

### Footer (Node: 8:19870)

**Visual Design:**

- Dark teal background (`#2E5E5E` / `--color-dark-700`)
- Fixed height: 200px
- Horizontally centered content (max-width 1280px)

**Layout (left to right):**

1. Logo (64x64px)
2. Social icons: Instagram, LinkedIn, YouTube (96x96px each, 16px gap)
3. Navigation links: About Me, Portfolio, Blog, Contact (24px gap)
4. Copyright & tagline (right-aligned)

**Typography:**

- Links: "Adelle" Regular, 14px, underlined, light text (`#F7F7F7`)
- Copyright: 14px
- Tagline: 10px, letter-spacing 0.4px

---

## 2. Files Affected

### Primary Files to Modify

| File                                                                       | Purpose              | Changes Required                 |
| -------------------------------------------------------------------------- | -------------------- | -------------------------------- |
| [components/sections/ContactForm.tsx](components/sections/ContactForm.tsx) | Contact form section | Complete redesign to match Figma |
| [components/layout/Footer.tsx](components/layout/Footer.tsx)               | Footer component     | Update layout and styling        |

### Supporting Files (Reference Only)

| File                               | Purpose                                    |
| ---------------------------------- | ------------------------------------------ |
| [app/globals.css](app/globals.css) | Design tokens & theme variables            |
| [app/page.tsx](app/page.tsx)       | Home page composition                      |
| [lib/utils/cn.ts](lib/utils/cn.ts) | Class name utility (clsx + tailwind-merge) |

### Asset Files

| Asset                        | Current Location                  | Action                   |
| ---------------------------- | --------------------------------- | ------------------------ |
| Rio-BCN Skyline Illustration | `images/Illustration Rio-BCN.svg` | Copy to `public/images/` |
| Logo Footer                  | `public/images/Logo Footer.svg`   | Already in place         |

---

## 3. Design Tokens Reference

### Colors (from globals.css)

```css
/* Colors Used in Designs */
--color-primary-yellow: #ffd115; /* Contact section background */
--color-cream-500: #fff9f0; /* Form input backgrounds */
--color-dark-50: #f7f7f7; /* Light text */
--color-dark-150: #c7c8c6; /* Input borders */
--color-dark-500: #686b63; /* Placeholder text */
--color-dark-700: #2e5e5e; /* Footer background */
--color-dark-900: #080d00; /* Dark text, button bg */

/* Fonts */
--font-display: "Plus Jakarta Sans"; /* Headings */
--font-body: "Inter"; /* Body text */
/* Note: Figma uses "Adelle" for footer - may need fallback to Inter */
```

---

## 4. Current Implementation Analysis

### ContactForm.tsx (325 lines)

**Current Features:**

- React Hook Form with inline validation
- Floating label pattern (labels inside inputs)
- 4 fields: Name, Email, Project Type (dropdown), Message
- Loading spinner during submission
- Success state with checkmark animation
- Framer Motion animations

**Key Differences from Figma:**

| Aspect   | Current                            | Figma Design                 | Implementation Decision       |
| -------- | ---------------------------------- | ---------------------------- | ----------------------------- |
| Labels   | Floating (inside input)            | Static (above input)         | **Keep floating labels**      |
| Input bg | `bg-dark-50` (gray)                | `bg-cream-500` (cream)       | Update to cream               |
| Fields   | Name, Email, Project Type, Message | 3 generic fields + checkbox  | Update fields + add checkbox  |
| Button   | "Send Message" with icon           | "Primary" text only          | Update button styling         |
| Bottom   | Nothing                            | Rio-BCN skyline illustration | Add illustration              |

**Current Code Pattern - Floating Input:**

```typescript
function FloatingInput({ label, error, register, name, type, required }: FloatingInputProps) {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  return (
    <div className="relative">
      <input
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false)
          setHasValue(!!e.target.value)
        }}
        className={cn(
          'peer w-full px-4 py-3 pt-6',
          'bg-dark-50',
          'border-b border-dark-150',
          'outline-none transition-all duration-300',
          'focus:border-b-2 focus:border-dark-900',
        )}
      />
      <label className={cn(
        'absolute left-4 transition-all duration-200 pointer-events-none',
        'text-dark-500',
        focused || hasValue ? 'top-1 text-xs text-dark-900' : 'top-1/2 -translate-y-1/2 text-base'
      )}>
        {label}
      </label>
    </div>
  )
}
```

### Footer.tsx (91 lines)

**Current Features:**

- Dark teal background
- Flexbox layout (wraps on mobile)
- Logo, social icons, nav links, copyright
- Social icons: 24x24 stroke style

**Key Differences from Figma:**

| Aspect    | Current                      | Figma Design                      |
| --------- | ---------------------------- | --------------------------------- |
| Layout    | Flex wrap                    | Strict horizontal justify-between |
| Icons     | 24x24 stroke (72x72 viewBox) | 96x96 filled icons                |
| Icon size | `w-24 h-24` container        | 96x96px total with inner icon     |
| Links     | No underline                 | Underlined                        |
| Font      | Inter                        | Adelle (needs verification)       |
| Spacing   | Gap-based                    | Justify-between at 1280px         |

---

## 5. External Documentation & Best Practices

### Next.js Forms Guide

**Source:** [Next.js Forms Documentation](https://nextjs.org/docs/app/guides/forms)

> React extends the HTML `<form>` element to allow Server Actions to be invoked with the `action` attribute. When used in a form, the function automatically receives the FormData object.

### React Hook Form + Zod + Server Actions Pattern

**Source:** [nehalist.io](https://nehalist.io/react-hook-form-with-nextjs-server-actions/)

> The great thing is that you can use the same validation functions on your client and your server action. A robust form starts with a schema - the schema is the contract between your UI and your backend.

**Recommended Schema Pattern:**

```typescript
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  consent: z
    .boolean()
    .refine((val) => val === true, "You must agree to the terms"),
});

type ContactFormData = z.infer<typeof contactSchema>;
```

### Server Action Pattern

**Source:** [DEV.to - Next.js Server Actions 2026](https://dev.to/marufrahmanlive/nextjs-server-actions-complete-guide-with-examples-for-2026-2do0)

```typescript
// actions/contact.ts
"use server";

import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function submitContact(formData: FormData) {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten() };
  }

  // Process form submission (email, database, etc.)
  return { success: true };
}
```

### useFormStatus Hook for Loading States

**Source:** [Next.js Form Component](https://nextjs.org/docs/app/api-reference/components/form)

> You can use the `useFormStatus` hook to show a loading indicator while the action is being executed. When using this hook, you'll need to create a separate component to render the loading indicator.

```typescript
'use client'

import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Sending...' : 'Primary'}
    </button>
  )
}
```

---

## 6. External Implementation Patterns

### Floating Label Input Pattern (Keep Current)

**Keep the existing floating label pattern - update styling only:**

```typescript
function FloatingInput({
  label,
  error,
  register,
  name,
  type = 'text',
  required,
}: FloatingInputProps) {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  return (
    <div className="relative">
      <input
        type={type}
        {...register(name, {
          required: required ? `${label} is required` : false,
          pattern:
            type === 'email'
              ? {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                }
              : undefined,
          onChange: (e) => setHasValue(!!e.target.value),
        })}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false)
          setHasValue(!!e.target.value)
        }}
        className={cn(
          'peer w-full px-4 py-3 pt-6',
          'bg-cream-500',                    // Updated: cream background
          'border-b border-dark-150',
          'outline-none transition-all duration-300',
          'focus:border-b-2 focus:border-dark-900',
          error && 'border-red-500'
        )}
      />
      <label
        className={cn(
          'absolute left-4 transition-all duration-200 pointer-events-none',
          'text-dark-500',
          focused || hasValue
            ? 'top-1 text-xs text-dark-900'
            : 'top-1/2 -translate-y-1/2 text-base'
        )}
      >
        {label}
      </label>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
```

### Checkbox Component Pattern

**Source:** [React Hook Form Examples](https://github.com/typescript-cheatsheets/react)

```typescript
interface CheckboxFieldProps {
  label: string
  name: string
  register: UseFormRegister<ContactFormData>
  error?: string
}

function CheckboxField({ label, name, register, error }: CheckboxFieldProps) {
  return (
    <div className="flex items-start gap-2">
      <input
        type="checkbox"
        id={name}
        {...register(name)}
        className={cn(
          'mt-1 w-5 h-5',
          'accent-dark-900',
          'cursor-pointer'
        )}
      />
      <label
        htmlFor={name}
        className="text-base text-dark-900 cursor-pointer"
      >
        {label}
      </label>
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  )
}
```

### Footer Layout Pattern

**Source:** [DEV Community - React Footer Components](https://dev.to/tailwindcss/21-top-react-footer-components-to-use-in-2024-4e8o)

```typescript
export function Footer() {
  return (
    <footer className="bg-dark-700 h-[200px]">
      <div className="h-full max-w-[1280px] mx-auto px-6 lg:px-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image src="/images/Logo Footer.svg" alt="Logo" width={64} height={64} />
        </Link>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <SocialIcon href="https://instagram.com/..." icon="instagram" />
          <SocialIcon href="https://linkedin.com/..." icon="linkedin" />
          <SocialIcon href="https://youtube.com/..." icon="youtube" />
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-dark-50 underline hover:text-primary-yellow transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <div className="text-right text-dark-50">
          <p className="text-sm tracking-wide">©uxpertanalysis 2024</p>
          <p className="text-[10px] tracking-wider mt-1">Built with love from Barcelona.</p>
        </div>
      </div>
    </footer>
  )
}
```

### Social Icon Component (96x96)

**Based on Figma design:**

```typescript
interface SocialIconProps {
  href: string
  icon: 'instagram' | 'linkedin' | 'youtube'
  label: string
}

function SocialIcon({ href, icon, label }: SocialIconProps) {
  const icons = {
    instagram: (
      <svg viewBox="0 0 24 24" fill="none" className="w-[72px] h-[72px]">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    linkedin: (/* ... */),
    youtube: (/* ... */),
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-24 h-24 flex items-center justify-center text-dark-50 hover:text-primary-yellow transition-colors"
      aria-label={label}
    >
      {icons[icon]}
    </a>
  )
}
```

### Rio-BCN Skyline Illustration Usage

**Asset:** `images/Illustration Rio-BCN.svg`

```typescript
// At the bottom of the Contact section, full width
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

---

## 7. Substack & Industry Patterns

### Modern Stack Recommendations

**Source:** [Front-End Focus](https://frontendfocus.substack.com/p/tech-predictions-for-2025)

> The standardization on React + NextJS + Tailwind + ShadCN UI seems to be the preferred stack for the vast majority of people in the online tech community. React and NextJS are in a much better place now with React 19 and NextJS 15.

### Advanced React Patterns

**Source:** [Large Apps Substack](https://largeapps.substack.com/p/advanced-react-in-the-wild)

> Real-world implementations of advanced React and Next.js techniques include the evolution of rendering approaches (migrating from CSR to SSR/SSG, adopting React Server Components) and how Next.js App Router improved developer experience.

### Form UX Best Practices

**Source:** [Lee Robinson - Substack](https://leerob.substack.com/p/summer-2024)

> It's now even easier to build applications with React Server Components, Server Actions, and other new features. The latest Next.js and React patterns simplify common tasks like building forms, talking to your database, and more.

### UI Design Trends 2025

**Source:** [Prince Paul UX Substack](https://princepaluiux.substack.com/p/ui-design-trends-in-2025)

> Interactive objects—buttons, sliders, animated cards—bring life to a page. They respond, react, and sometimes surprise, improving user engagement and making digital experiences more tactile and dynamic.

---

## 8. Implementation Checklist

### Contact Form Section

- [ ] Keep floating labels pattern (do not change to static)
- [ ] Update input backgrounds from `bg-dark-50` to `bg-cream-500`
- [ ] Reduce fields to 3: Name, Email, Message (remove Project Type dropdown)
- [ ] Add checkbox component with consent text
- [ ] Update button: dark bg, full width, "Primary" text only (no icon)
- [ ] Add legal/privacy disclaimer text below button
- [ ] Copy `images/Illustration Rio-BCN.svg` to `public/images/`
- [ ] Add Rio-BCN skyline illustration at section bottom
- [ ] Maintain existing animation patterns (Framer Motion)
- [ ] Consider adding Zod validation schema for type safety
- [ ] Update section heading/subheading styling to match Figma

### Footer Section

- [ ] Update layout to strict horizontal justify-between
- [ ] Set max-width to 1280px with center alignment
- [ ] Increase social icons to 96x96px (currently using 24x24 in 96x96 containers)
- [ ] Add underline to navigation links
- [ ] Update font to "Adelle" or fallback to Inter
- [ ] Verify copyright text matches: "©uxpertanalysis 2024"
- [ ] Add tagline: "Built with love from Barcelona."
- [ ] Test responsive behavior on mobile (may need stacking)

---

## 9. Dependencies

### Already Installed

- `react-hook-form` (^7.71.1) - Form state management
- `framer-motion` (^12.29.2) - Animations
- `lucide-react` (^0.563.0) - Icons
- `clsx` (^2.1.1) - Class composition
- `tailwind-merge` (^3.4.0) - Tailwind class deduplication

### Recommended Additions

- `zod` - Schema validation for type-safe forms
- `@hookform/resolvers` - Zod integration with React Hook Form

**Installation:**

```bash
npm install zod @hookform/resolvers
```

---

## 10. Sources & References

### Official Documentation

- [Next.js Forms Guide](https://nextjs.org/docs/app/guides/forms)
- [Next.js Form Component](https://nextjs.org/docs/app/api-reference/components/form)

### Tutorials & Articles

- [React Hook Form + Zod + Server Actions - nehalist.io](https://nehalist.io/react-hook-form-with-nextjs-server-actions/)
- [Type-Safe Form Validation in Next.js 15 - AbstractAPI](https://www.abstractapi.com/guides/email-validation/type-safe-form-validation-in-next-js-15-with-zod-and-react-hook-form)
- [Next.js Server Actions Guide 2026 - DEV.to](https://dev.to/marufrahmanlive/nextjs-server-actions-complete-guide-with-examples-for-2026-2do0)
- [React Hook Form with Zod 2026 - DEV.to](https://dev.to/marufrahmanlive/react-hook-form-with-zod-complete-guide-for-2026-1em1)
- [How to Use React Hook Form + Zod - Medium](https://medium.com/@ctrlaltmonique/how-to-use-react-hook-form-zod-with-next-js-server-actions-437aaca3d72d)

### GitHub Resources

- [TypeScript React Cheatsheet](https://github.com/typescript-cheatsheets/react)
- [form-container](https://github.com/vitkon/form-container)
- [react-component/field-form](https://github.com/react-component/field-form)
- [Form Validation Discussion - react-hook-form](https://github.com/orgs/react-hook-form/discussions/11209)

### Substack

- [Lee Robinson - Summer 2024](https://leerob.substack.com/p/summer-2024)
- [Advanced React in the Wild - Large Apps](https://largeapps.substack.com/p/advanced-react-in-the-wild)
- [The Road to Next - Robin Wieruch](https://rwieruch.substack.com/p/the-road-to-next)
- [UI Design Trends 2025 - Prince Paul UX](https://princepaluiux.substack.com/p/ui-design-trends-in-2025)
- [Tech Predictions 2025 - Front-End Focus](https://frontendfocus.substack.com/p/tech-predictions-for-2025)

### Component Libraries & Patterns

- [21+ React Footer Components - DEV.to](https://dev.to/tailwindcss/21-top-react-footer-components-to-use-in-2024-4e8o)
- [Flowbite React Footer](https://flowbite-react.com/docs/components/footer)
- [Responsive Footer in React - GeeksforGeeks](https://www.geeksforgeeks.org/how-to-create-a-simple-responsive-footer-in-react-js/)

---

**Status:** Ready for Implementation Review
**Next Steps:**

1. Review and approve PRD
2. Copy `images/Illustration Rio-BCN.svg` to `public/images/`
3. Implement Contact Form redesign
4. Implement Footer redesign
5. Test animations and responsiveness
