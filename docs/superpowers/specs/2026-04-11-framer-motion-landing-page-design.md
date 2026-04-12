# Framer Motion Landing Page — Design Spec
**Date:** 2026-04-11  
**Project:** divyanx (divyanx.com)  
**Scope:** World-class landing page using Framer Motion, Option B (surgical enhancement)

---

## Overview

Enhance the existing divyanx landing page with Framer Motion to achieve a world-class, cinematic feel. Divyansh is the face of Divyanx — the site is a personal brand + product studio landing page. The goal is to make it feel authored, deliberate, and memorable without rebuilding what already works.

**Approach:** Framer Motion is added surgically to the highest-impact moments (hero entrance, product showcase). Existing CSS scroll infrastructure (marquee, AboutMotionStory) is left intact.

---

## Decisions Made

| Decision | Choice | Rationale |
|---|---|---|
| Animation personality | Cinematic & Deliberate | Matches existing copy tone ("authored in motion") |
| Hero opening | Dark → Light scroll transition | Most immersive, scroll itself becomes the animation |
| Products layout | Cinematic stack / flip | One product at a time, scroll to advance, memorable |
| Implementation scope | Option B — surgical | Lowest risk, highest perceived impact |

---

## Dependencies

- Install `framer-motion` (latest, React 19 compatible via `framer-motion@latest`)
- No other new dependencies

---

## Section 1 — Setup & Cleanup

- Install `framer-motion`
- Delete `components/home-scroll-effects.tsx` (replaced by Framer `useScroll`)
- Remove `<HomeScrollEffects />` from `app/page.tsx`
- Remove all `data-reveal` attributes from `app/page.tsx` (replaced by Framer `whileInView`)
- Remove CSS for `[data-reveal]` and `.is-visible` from `globals.css`

---

## Section 2 — Hero: Dark → Light Cinematic Entrance

**File:** `app/page.tsx` hero section + new `components/hero-section.tsx`

### Background Transition
- Hero section has a dark overlay (`#15120f`) on load
- `useScroll({ target: heroRef, offset: ["start start", "end start"] })` drives `scrollYProgress`
- `useTransform(scrollYProgress, [0, 0.6], ["#15120f", "#f4efe6"])` interpolates `backgroundColor` via `motionValue`
- Applied as `style` on the hero wrapper `motion.section`
- Text colors also interpolate: dark-mode text → light-mode text over the same range

### Entrance Animation Sequence (page load, not scroll)
All triggered on mount with `initial` / `animate`:

1. **Eyebrow line** (`"Creative software engineer · Applied ML builder"`)
   - `initial: { opacity: 0, y: 12 }`
   - `animate: { opacity: 1, y: 0 }`
   - `transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }`

2. **Headline** (`"Software that feels authored in motion."`)
   - Split into individual words, each a `motion.span`
   - Parent: `variants` with `staggerChildren: 0.06`, `delayChildren: 0.5`
   - Each word: `hidden: { opacity: 0, y: 20 }` → `visible: { opacity: 1, y: 0 }`
   - `transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }`

3. **Lede + body paragraphs**
   - `initial: { opacity: 0, y: 16 }`
   - `animate: { opacity: 1, y: 0 }`
   - `transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.1 }`

4. **Skill chips** (staggered list)
   - Parent stagger: `staggerChildren: 0.05`, `delayChildren: 1.3`
   - Each chip: `hidden: { opacity: 0, scale: 0.92 }` → `visible: { opacity: 1, scale: 1 }`

5. **CTA buttons**
   - `initial: { opacity: 0, y: 8 }`
   - `animate: { opacity: 1, y: 0 }`
   - `transition: { duration: 0.5, ease: "easeOut", delay: 1.6 }`

6. **Portrait**
   - `initial: { opacity: 0, x: 40, scale: 0.96 }`
   - `animate: { opacity: 1, x: 0, scale: 1 }`
   - `transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.7 }`

### Metric Cards (below hero)
- `whileInView` with `staggerChildren: 0.1`
- Same `[0.16, 1, 0.3, 1]` ease throughout for consistency

---

## Section 3 — Product Cinematic Stack

**File:** `components/product-stack.tsx` (new component)

### Structure
- Outer wrapper: `position: relative`, height = `calc(100vh * 8)` (7 products + 1 intro beat)
- Inner sticky container: `position: sticky`, `top: 0`, `height: 100vh`
- `useScroll({ target: wrapperRef })` → `scrollYProgress` (0→1 over full stack height)
- `useTransform(scrollYProgress, [...], [...])` maps progress to active index (0–6)

### Card Transition
- `AnimatePresence mode="wait"`
- Exiting card: `exit: { x: -60, opacity: 0, transition: { duration: 0.35, ease: "easeIn" } }`
- Entering card: `initial: { x: 60, opacity: 0 }` → `animate: { x: 0, opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }`
- Each card keyed by `product.slug` so AnimatePresence detects the swap

### Progress Indicator
- Thin horizontal line at bottom of stack container
- `scaleX` driven by `scrollYProgress` (0→1), `transformOrigin: "left"`
- Dot indicators: 7 dots, active dot has `scale: 1.4` + accent color

### Polymath Live Badge
- Subtle `animate={{ opacity: [0.6, 1, 0.6] }}` loop, `transition: { repeat: Infinity, duration: 2 }`

### Product Data Changes (`data/products.ts`)
Three new products appended:

```ts
{
  slug: "cue",
  name: "Cue",
  productType: "Productivity app",
  tagline: "Break tasks into chunks. Ship the day.",
  summary: "A task chunking todo app built around the idea that big tasks need to be broken before they can be done.",
  description: ["Cue is built for people who stall on large tasks. It forces you to chunk work into small, completable pieces before you start — so the list stays honest and momentum stays alive."],
  features: ["Task chunking", "Focus mode", "Daily cadence", "Streak tracking"],
  pricing: { label: "Coming soon", price: "TBD", cadence: "", note: "", paymentProviders: [] },
  ctaLabel: "Learn more",
  status: "Early concept",
  tone: "sage",
},
{
  slug: "job-craft",
  name: "Job Craft",
  productType: "Job search tool",
  tagline: "Search smarter. Apply with intent.",
  summary: "A focused job searching app that helps you track, filter, and apply to opportunities without the noise of traditional job boards.",
  description: ["Job Craft is designed for people who want to be deliberate about their job search — fewer spray-and-pray applications, more targeted effort with clear context behind each move."],
  features: ["Smart search", "Application tracker", "Role fit scoring", "Resume tailoring"],
  pricing: { label: "Coming soon", price: "TBD", cadence: "", note: "", paymentProviders: [] },
  ctaLabel: "Learn more",
  status: "Early concept",
  tone: "midnight",
},
{
  slug: "yaad",
  name: "Yaad",
  productType: "Memory app",
  tagline: "Remember what you actually need to remember.",
  summary: "A quick memorizing app built around spaced repetition and minimal friction — so the stuff you want to retain actually sticks.",
  description: ["Yaad is Hindi for 'remember'. It's a compact memory tool that makes spaced repetition feel fast and natural, not like studying. Built for vocabulary, concepts, and anything worth keeping."],
  features: ["Spaced repetition", "Quick capture", "Context cards", "Recall streaks"],
  pricing: { label: "Coming soon", price: "TBD", cadence: "", note: "", paymentProviders: [] },
  ctaLabel: "Learn more",
  status: "Early concept",
  tone: "ember",
},
```

---

## Section 4 — whileInView for All Other Sections

**Files:** `app/page.tsx`, possibly extracted to `components/motion-section.tsx`

Replace all `data-reveal` + `IntersectionObserver` CSS pattern with Framer `whileInView`.

**Standard variant (reused everywhere):**
```ts
const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}
```

**List stagger variant:**
```ts
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}
```

Applied to:
- Home proof grid cards (2 cards stagger)
- Collaboration cards
- CTA section
- Home section headings

All `viewport={{ once: true, amount: 0.15 }}` — matches current IntersectionObserver threshold.

**CSS cleanup:** Remove `[data-reveal]`, `.is-visible`, `--reveal-order`, `@keyframes reveal` from `globals.css`.

---

## Section 5 — Files Changed Summary

| File | Action |
|---|---|
| `package.json` | Add `framer-motion` |
| `components/home-scroll-effects.tsx` | Delete |
| `components/product-stack.tsx` | Create (new) |
| `components/hero-section.tsx` | Create (new, extracts hero from page.tsx) |
| `app/page.tsx` | Refactor: use new components, add whileInView |
| `data/products.ts` | Add Cue, Job Craft, Yaad |
| `app/globals.css` | Remove data-reveal CSS |

---

## Out of Scope

- `AboutMotionStory` — CSS scroll works well, leave as-is
- Marquee — CSS animation, leave as-is
- Header/footer — no changes
- Individual product pages — no changes
- About, Contact, Products list pages — no changes
