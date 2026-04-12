# Framer Motion Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enhance divyanx.com with Framer Motion for a cinematic world-class landing page experience.

**Architecture:** Surgical integration (Option B) — new `HeroSection` and `ProductStack` components replace the static hero and product grid; remaining sections get `whileInView` upgrades; CSS-based sticky scroll components (`ScrollLab`, `AboutMotionStory`) stay untouched. `HomeScrollEffects` is simplified to keep `data-reveal` working for those two components only.

**Tech Stack:** Next.js 16.2.1, React 19, framer-motion (latest), TypeScript

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `package.json` | Modify | Add framer-motion dependency |
| `data/products.ts` | Modify | Add Cue, Job Craft, Yaad products |
| `lib/motion.ts` | **Create** | Shared variants, eases, viewport config |
| `components/hero-section.tsx` | **Create** | Dark→light hero, cinematic word-by-word entrance |
| `components/product-stack.tsx` | **Create** | Scroll-driven product card flip (7 products) |
| `components/home-scroll-effects.tsx` | Modify | Strip hero-progress; keep reveal observer |
| `app/page.tsx` | Modify | Use new components, replace data-reveal with whileInView |
| `app/globals.css` | Modify | Add ProductStack CSS; remove `--hero-progress` lines |

---

## Task 1: Install framer-motion

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install the package**

Run from `/Users/divyansh/divyanx`:
```bash
npm install framer-motion
```
Expected: exits 0, `package.json` gains `"framer-motion": "^11.x.x"` or higher

- [ ] **Step 2: Verify the import resolves**

```bash
node -e "require('./node_modules/framer-motion/dist/cjs/index.js'); console.log('framer-motion OK')"
```
Expected: prints `framer-motion OK`

- [ ] **Step 3: Confirm dev server still compiles**

```bash
npm run dev 2>&1 | head -10
```
Expected: `✓ Ready in Xms`, no errors

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "deps: add framer-motion"
```

---

## Task 2: Add products — Cue, Job Craft, Yaad

**Files:**
- Modify: `data/products.ts`

- [ ] **Step 1: Append 3 new products before the closing `]` of the `products` array**

In `data/products.ts`, add after the closing `}` of the `signalform` entry (before `];`):

```ts
  {
    slug: "cue",
    name: "Cue",
    productType: "Productivity app",
    tagline: "Break tasks into chunks. Ship the day.",
    summary:
      "A task chunking todo app built around the idea that big tasks need to be broken before they can be done.",
    description: [
      "Cue is built for people who stall on large tasks. It forces you to chunk work into small, completable pieces before you start — so the list stays honest and momentum stays alive.",
    ],
    features: ["Task chunking", "Focus mode", "Daily cadence", "Streak tracking"],
    pricing: {
      label: "Coming soon",
      price: "TBD",
      cadence: "",
      note: "",
      paymentProviders: [],
    },
    ctaLabel: "Learn more",
    status: "Early concept",
    tone: "sage",
  },
  {
    slug: "job-craft",
    name: "Job Craft",
    productType: "Job search tool",
    tagline: "Search smarter. Apply with intent.",
    summary:
      "A focused job searching app that helps you track, filter, and apply to opportunities without the noise of traditional job boards.",
    description: [
      "Job Craft is designed for people who want to be deliberate about their job search — fewer spray-and-pray applications, more targeted effort with clear context behind each move.",
    ],
    features: ["Smart search", "Application tracker", "Role fit scoring", "Resume tailoring"],
    pricing: {
      label: "Coming soon",
      price: "TBD",
      cadence: "",
      note: "",
      paymentProviders: [],
    },
    ctaLabel: "Learn more",
    status: "Early concept",
    tone: "midnight",
  },
  {
    slug: "yaad",
    name: "Yaad",
    productType: "Memory app",
    tagline: "Remember what you actually need to remember.",
    summary:
      "A quick memorizing app built around spaced repetition and minimal friction — so the stuff you want to retain actually sticks.",
    description: [
      "Yaad is Hindi for 'remember'. It's a compact memory tool that makes spaced repetition feel fast and natural, not like studying. Built for vocabulary, concepts, and anything worth keeping.",
    ],
    features: ["Spaced repetition", "Quick capture", "Context cards", "Recall streaks"],
    pricing: {
      label: "Coming soon",
      price: "TBD",
      cadence: "",
      note: "",
      paymentProviders: [],
    },
    ctaLabel: "Learn more",
    status: "Early concept",
    tone: "ember",
  },
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors

- [ ] **Step 3: Verify all 7 products appear**

Open http://localhost:3000, scroll to the products section. Confirm 7 cards render (Polymath, Relaynote, Threadline, Signalform, Cue, Job Craft, Yaad).

- [ ] **Step 4: Commit**

```bash
git add data/products.ts
git commit -m "feat: add Cue, Job Craft, Yaad to products"
```

---

## Task 3: Create shared motion utilities

**Files:**
- Create: `lib/motion.ts`

- [ ] **Step 1: Create `lib/motion.ts`**

```ts
import type { Variants } from "framer-motion";

// The cinematic ease: fast start, very slow end — like a film cut settling into frame.
export const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: cinematicEase },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: cinematicEase },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: cinematicEase },
  },
};

export const chipReveal: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: cinematicEase },
  },
};

export const portraitReveal: Variants = {
  hidden: { opacity: 0, x: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.9, ease: cinematicEase, delay: 0.7 },
  },
};

// Shared viewport config — matches the existing IntersectionObserver threshold
export const defaultViewport = { once: true, amount: 0.15 } as const;
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add lib/motion.ts
git commit -m "feat: add shared framer-motion variants and eases"
```

---

## Task 4: Build HeroSection component

**Files:**
- Create: `components/hero-section.tsx`

The hero does two independent things:
1. **On mount:** text reveals cinematically (eyebrow → headline words → body → chips → buttons → portrait), all while background is dark
2. **On scroll:** `useScroll` drives `backgroundColor` from `#15120f` → `#f4efe6` as the hero scrolls out of view

These are additive — mount animations fire once on load, scroll animation is continuous.

- [ ] **Step 1: Create `components/hero-section.tsx`**

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dreamyCoverImage from "@/assets/divyansh-at-work.png";
import { siteConfig } from "@/data/site";
import {
  cinematicEase,
  fadeUp,
  staggerContainer,
  staggerContainerSlow,
  wordReveal,
  chipReveal,
  portraitReveal,
} from "@/lib/motion";

const signalChips = [
  "Next.js + React",
  "Agentic workflows",
  "Model UX",
  "Creative frontend systems",
  "Product architecture",
];

function SplitHeadline({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <motion.h1
      className="home-stage__headline"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      // Override stagger timing on the container itself
      transition={{ staggerChildren: 0.08, delayChildren: 0.5 }}
      style={{ display: "flex", flexWrap: "wrap", gap: "0.25em" }}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={wordReveal} style={{ display: "inline-block" }}>
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  // 0 = hero top at viewport top; 1 = hero bottom at viewport top
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.65],
    ["#15120f", "#f4efe6"],
  );

  const textColor = useTransform(
    scrollYProgress,
    [0, 0.65],
    ["#f5efe5", "#1d1a17"],
  );

  const ringsOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <motion.section
      ref={heroRef}
      className="section-shell home-stage"
      style={{ backgroundColor }}
    >
      <motion.div className="home-stage__grid" style={{ color: textColor }}>
        {/* ── Copy column ── */}
        <div className="home-stage__copy">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: cinematicEase, delay: 0.3 }}
          >
            Creative software engineer · Applied ML builder
          </motion.p>

          <SplitHeadline text="Software that feels authored in motion." />

          <motion.p
            className="home-stage__lede"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: cinematicEase, delay: 1.1 }}
          >
            I&apos;m {siteConfig.name}, building under {siteConfig.studioName}: product systems,
            AI-native workflows, and visual experiences that make intelligence feel tangible.
          </motion.p>

          <motion.p
            className="home-stage__body"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: cinematicEase, delay: 1.25 }}
          >
            The work gets interesting where model behavior, interaction design, and frontend
            craft stop acting like separate departments and start behaving like one system.
          </motion.p>

          <motion.ul
            className="home-chip-list"
            aria-label="Core skills"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.05, delayChildren: 1.4 }}
          >
            {signalChips.map((chip) => (
              <motion.li key={chip} variants={chipReveal}>
                {chip}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className="button-row"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 1.7 }}
          >
            <Link href="/products" className="button button--primary">
              Explore the work
            </Link>
            <Link href="/contact" className="button button--secondary">
              Start a conversation
            </Link>
          </motion.div>
        </div>

        {/* ── Portrait column ── */}
        <motion.figure
          className="home-stage__visual"
          variants={portraitReveal}
          initial="hidden"
          animate="visible"
        >
          <div className="home-stage__portrait-wrap">
            <Image
              src={dreamyCoverImage}
              alt="Divyansh working at a laptop"
              className="home-stage__portrait"
              priority
            />
          </div>

          <div className="home-stage__panel home-stage__panel--north">
            <span>Current mode</span>
            <strong>Designing AI-native interfaces with visible system logic.</strong>
          </div>

          <div className="home-stage__panel home-stage__panel--south">
            <span>What matters</span>
            <strong>Strong taste, usable behavior, and products that earn repeat use.</strong>
          </div>

          <motion.div
            className="home-stage__rings"
            aria-hidden="true"
            style={{ opacity: ringsOpacity }}
          >
            <span />
            <span />
            <span />
          </motion.div>
        </motion.figure>
      </motion.div>

      {/* ── Metric cards ── */}
      <motion.div
        className="home-stage__metrics"
        variants={staggerContainerSlow}
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1, delayChildren: 1.8 }}
      >
        {[
          { label: "Bias", value: "Useful first. Memorable by design." },
          { label: "Strength", value: "Turning AI-heavy workflows into calm product systems." },
          { label: "Focus", value: "AI products, model UX, and creative software with taste." },
        ].map((metric) => (
          <motion.article key={metric.label} className="home-stage__metric" variants={fadeUp}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors

- [ ] **Step 3: Temporarily import into page.tsx to see it render**

In `app/page.tsx`, replace `<HomeScrollEffects />` and the existing `<section className="section-shell home-stage">` block with:
```tsx
import { HeroSection } from "@/components/hero-section";
// ...
<HeroSection />
```

Open http://localhost:3000. Confirm text animates in and background is dark on load.

- [ ] **Step 4: Commit**

```bash
git add components/hero-section.tsx
git commit -m "feat: HeroSection with cinematic entrance and dark-to-light scroll"
```

---

## Task 5: Build ProductStack component

**Files:**
- Create: `components/product-stack.tsx`
- Modify: `app/globals.css`

The outer div is `(products.length × 100vh)` tall, giving each product one full viewport of scroll space. A sticky inner container stays fixed while the outer scrolls. `useMotionValueEvent` syncs the scroll-derived float to a React integer state, which drives `AnimatePresence`.

- [ ] **Step 1: Create `components/product-stack.tsx`**

```tsx
"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValueEvent,
} from "framer-motion";
import { products } from "@/data/products";
import { cinematicEase, fadeUp, defaultViewport } from "@/lib/motion";

const CARD_EXIT = { x: -60, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } } as const;
const CARD_ENTER = { x: 0, opacity: 1, transition: { duration: 0.4, ease: cinematicEase } } as const;
const CARD_INITIAL = { x: 60, opacity: 0 } as const;

function ProductCard({ product }: { product: (typeof products)[number] }) {
  const isLive = product.status === "Live";
  return (
    <motion.article
      className={`home-product-card home-product-card--${product.tone} product-stack__card`}
      initial={CARD_INITIAL}
      animate={CARD_ENTER}
      exit={CARD_EXIT}
    >
      <div className="home-product-card__top">
        <p>{product.productType}</p>
        <span className={isLive ? "product-stack__live-badge" : undefined}>
          {product.status}
          {isLive && (
            <motion.span
              className="product-stack__live-dot"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          )}
        </span>
      </div>
      <h3>{product.name}</h3>
      <p className="home-product-card__tagline">{product.tagline}</p>
      <p className="home-product-card__summary">{product.summary}</p>
      <ul className="home-product-card__chips" aria-label={`${product.name} features`}>
        {product.features.slice(0, 4).map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <div className="home-product-card__footer">
        <span>{product.pricing.label}</span>
        <Link href={product.ctaHref ?? `/product/${product.slug}`} className="text-link">
          {product.ctaHref ? "Open live product" : "Open concept"}
        </Link>
      </div>
    </motion.article>
  );
}

export function ProductStack() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const rawIndex = useTransform(scrollYProgress, [0, 1], [0, products.length - 1]);
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(rawIndex, "change", (latest) => {
    const next = Math.min(Math.round(latest), products.length - 1);
    setActiveIndex(next);
  });

  return (
    <section className="section-shell home-product-section">
      <motion.div
        className="home-section-heading"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
      >
        <p className="eyebrow">Products in orbit</p>
        <h2>Products with stronger AI brains and clearer operating logic.</h2>
        <p>
          This mix includes a live product as well as concepts in motion. The through-line is
          the same: calmer systems, stronger product thinking, and AI used with intent.
        </p>
      </motion.div>

      <div
        ref={wrapperRef}
        style={{ height: `${products.length * 100}vh`, position: "relative" }}
      >
        <div className="product-stack__sticky">
          {/* Progress bar */}
          <div className="product-stack__progress" aria-hidden="true">
            <motion.div
              className="product-stack__progress-fill"
              style={{ scaleX: progressScale }}
            />
          </div>

          {/* Dot indicators */}
          <div className="product-stack__dots" aria-hidden="true">
            {products.map((p, i) => (
              <motion.span
                key={p.slug}
                className="product-stack__dot"
                animate={{
                  scale: i === activeIndex ? 1.4 : 1,
                  opacity: i === activeIndex ? 1 : 0.35,
                }}
                transition={{ duration: 0.25 }}
              />
            ))}
          </div>

          {/* Active card */}
          <AnimatePresence mode="wait">
            <ProductCard key={products[activeIndex].slug} product={products[activeIndex]} />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add ProductStack CSS to `app/globals.css`**

Append to the end of `app/globals.css` (before the final `}` of any media query, or just at the very end):

```css
/* ── ProductStack ── */
.product-stack__sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem var(--page-gutter);
}

.product-stack__card {
  width: 100%;
  max-width: 640px;
}

.product-stack__progress {
  position: absolute;
  bottom: 2.5rem;
  left: var(--page-gutter);
  right: var(--page-gutter);
  height: 2px;
  background: var(--border);
  border-radius: 1px;
  overflow: hidden;
}

.product-stack__progress-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 1px;
  transform-origin: left;
}

.product-stack__dots {
  position: absolute;
  bottom: 3.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  align-items: center;
}

.product-stack__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  display: block;
}

.product-stack__live-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.product-stack__live-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #4ade80;
  display: inline-block;
  flex-shrink: 0;
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add components/product-stack.tsx app/globals.css
git commit -m "feat: ProductStack scroll-driven cinematic card flip"
```

---

## Task 6: Refactor page.tsx

**Files:**
- Modify: `app/page.tsx`

Replace the entire file. The page becomes a client component (needed for `motion` elements directly in JSX). `HeroSection` and `ProductStack` are already client components internally; this lets the section-level wrappers also animate.

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AboutMotionStory } from "@/components/about-motion-story";
import { HeroSection } from "@/components/hero-section";
import { HomeScrollEffects } from "@/components/home-scroll-effects";
import { ProductStack } from "@/components/product-stack";
import { ScrollLab } from "@/components/scroll-lab";
import {
  fadeUp,
  staggerContainer,
  staggerContainerSlow,
  defaultViewport,
} from "@/lib/motion";

const marqueeItems = [
  "Applied ML",
  "Creative software",
  "Systems thinking",
  "Agentic interfaces",
  "Design-forward engineering",
  "Workflow tools",
  "Original interaction design",
  "Fast iteration loops",
];

const proofPoints = [
  "Designing product flows and engineering them to production quality.",
  "Making ML features feel grounded, inspectable, and useful inside real workflows.",
  "Giving software a stronger visual voice than standard SaaS templates.",
];

const obsessions = [
  "Interfaces that reveal system intelligence through motion and typography.",
  "Products that compress messy decisions into clean operating loops.",
  "AI tooling that feels deliberate instead of bolted on.",
];

const collaborationTracks = [
  {
    label: "Build together",
    title: "Collaborate on a product already in motion.",
    body: "If one of these products is close to your world, I'm open to thoughtful collaboration: product shaping, AI systems, interface work, or shipping a tighter v1 together.",
  },
  {
    label: "Bring a problem",
    title: "Need an AI-native workflow with real product thinking behind it?",
    body: "That is the work I want more of: model behavior, information design, interaction logic, and frontend craft pushed into one coherent product system.",
  },
];

export default function Home() {
  return (
    <article className="home-shell">
      {/* Keeps data-reveal working for ScrollLab + AboutMotionStory */}
      <HomeScrollEffects />

      <HeroSection />

      <section className="home-marquee" aria-label="Selected capabilities">
        <div className="home-marquee__track">
          {[0, 1].flatMap((copyIndex) =>
            marqueeItems.map((item) => (
              <span key={`${copyIndex}-${item}`}>{item}</span>
            )),
          )}
        </div>
      </section>

      <ScrollLab />

      <AboutMotionStory />

      {/* Proof grid */}
      <motion.section
        className="section-shell home-proof-grid"
        variants={staggerContainerSlow}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
      >
        <motion.article className="home-card home-panel" variants={fadeUp}>
          <p className="eyebrow">Why this feels different</p>
          <h2>The overlap is the skill.</h2>
          <p>
            I&apos;m not trying to look like a generic full-stack profile. The value is in combining
            engineering, product thinking, and visual taste into the same build loop.
          </p>
          <motion.ul
            className="home-list"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {proofPoints.map((point) => (
              <motion.li key={point} variants={fadeUp}>
                {point}
              </motion.li>
            ))}
          </motion.ul>
        </motion.article>

        <motion.article className="home-card home-panel" variants={fadeUp}>
          <p className="eyebrow">Current obsessions</p>
          <h2>Original software is still possible.</h2>
          <p>
            The goal isn&apos;t more screens. It&apos;s better compression, stronger behavior, and software
            with enough personality to be remembered.
          </p>
          <motion.ul
            className="home-list"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {obsessions.map((item) => (
              <motion.li key={item} variants={fadeUp}>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.article>
      </motion.section>

      <ProductStack />

      {/* Collab grid */}
      <motion.section
        className="section-shell home-collab-grid"
        variants={staggerContainerSlow}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
      >
        {collaborationTracks.map((track) => (
          <motion.article key={track.title} className="home-collab-card" variants={fadeUp}>
            <p className="eyebrow">{track.label}</p>
            <h2>{track.title}</h2>
            <p>{track.body}</p>
            <div className="button-row">
              <Link href="/contact" className="button button--primary">
                Start a conversation
              </Link>
              <Link href="/products" className="button button--secondary">
                Explore products
              </Link>
            </div>
          </motion.article>
        ))}
      </motion.section>

      {/* CTA */}
      <section className="section-shell">
        <motion.div
          className="home-cta"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <div>
            <p className="eyebrow">Next step</p>
            <h2>
              Need help building an AI product, shaping a system, or collaborating on something
              with real ambition?
            </h2>
            <p>
              I&apos;m especially interested in AI-native products, experimental interfaces, and
              collaborations where product architecture matters as much as execution.
            </p>
          </div>
          <div className="button-row">
            <Link href="/products" className="button button--primary">
              View products
            </Link>
            <Link href="/contact" className="button button--secondary">
              Contact Divyansh
            </Link>
          </div>
        </motion.div>
      </section>
    </article>
  );
}
```

- [ ] **Step 2: Verify page loads**

Open http://localhost:3000. Confirm:
- Hero is dark on load with animated text
- Background transitions to amber on scroll
- All sections below the hero still render

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: refactor page.tsx with Framer Motion whileInView"
```

---

## Task 7: Simplify HomeScrollEffects + remove --hero-progress CSS

**Files:**
- Modify: `components/home-scroll-effects.tsx`
- Modify: `app/globals.css`

`HomeScrollEffects` previously tracked hero scroll progress via `--hero-progress` CSS var. Framer Motion now owns that. We keep only the `data-reveal` IntersectionObserver for `ScrollLab` and `AboutMotionStory`.

- [ ] **Step 1: Replace `components/home-scroll-effects.tsx`**

```tsx
"use client";

import { useEffect } from "react";

// Lightweight observer: keeps CSS data-reveal animations working for
// ScrollLab and AboutMotionStory. The hero scroll is now Framer Motion.
export function HomeScrollEffects() {
  useEffect(() => {
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    reveals.forEach((element, index) => {
      element.style.setProperty("--reveal-order", String(index));
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -10% 0px" },
    );

    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
```

- [ ] **Step 2: Find the exact lines with `--hero-progress` in globals.css**

```bash
grep -n "hero-progress" /Users/divyansh/divyanx/app/globals.css
```

This will print 3 lines (approximately 3863, 3927, 3928). For each one, use the Edit tool to remove just that CSS property line. The surrounding rules (`.home-stage__panel`, portrait `figure`, etc.) remain — only the `transform`/`opacity` lines that reference `var(--hero-progress)` are removed.

- [ ] **Step 3: Verify no remaining hero-progress references**

```bash
grep "hero-progress" /Users/divyansh/divyanx/app/globals.css
```
Expected: no output

- [ ] **Step 4: Verify the page still renders correctly**

Open http://localhost:3000. Confirm:
- `ScrollLab` section heading fades up when scrolled into view
- `AboutMotionStory` section heading fades up when scrolled into view
- No console errors

- [ ] **Step 5: Commit**

```bash
git add components/home-scroll-effects.tsx app/globals.css
git commit -m "refactor: strip hero-progress from HomeScrollEffects, remove from CSS"
```

---

## Task 8: Final build verification

- [ ] **Step 1: Production build**

```bash
npm run build 2>&1 | tail -20
```
Expected: `✓ Compiled successfully`, route `/` rendered, no TypeScript errors

- [ ] **Step 2: Full visual walkthrough**

Open http://localhost:3000 and verify in order:

1. Page loads with **dark hero** — text reveals word-by-word (eyebrow → headline → lede → chips → buttons)
2. Portrait slides in from the right ~700ms after load
3. Scroll down — hero background transitions **dark → amber** smoothly
4. Marquee scrolls continuously
5. ScrollLab sticky scroll works (3 chapters, panel stays fixed)
6. AboutMotionStory sticky scroll works (4 chapters, panel stays fixed)
7. Proof grid: two cards fade up on scroll
8. **ProductStack**: scrolling through the section flips cards one by one (7 products), progress bar advances, dots update, Polymath has green pulsing dot
9. Collab cards fade up
10. CTA fades up
11. No layout jumps, no console errors, no FOUC

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: world-class Framer Motion landing page — cinematic hero, product stack, whileInView sections"
```
