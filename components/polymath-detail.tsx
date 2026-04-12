import Link from "next/link";
import { PricingCard } from "@/components/pricing-card";
import type { Product } from "@/data/products";

const operatingLoop = [
  {
    label: "01 · Capture",
    title: "Bring the whole life system into one place.",
    body: "Tasks, habits, projects, and different life domains should not feel like disconnected tabs with no shared memory.",
  },
  {
    label: "02 · Shape",
    title: "Turn a noisy backlog into a calmer today.",
    body: "The point is not more organization for its own sake. It is helping the next action feel obvious without flattening the bigger picture.",
  },
  {
    label: "03 · Focus",
    title: "Keep momentum visible across domains.",
    body: "Work, health, learning, and personal goals all compete for attention. Polymath is strongest when the tradeoffs stay legible.",
  },
  {
    label: "04 · Review",
    title: "Make reflection part of the operating system.",
    body: "A real life OS should help you notice drift, protect progress, and adjust the rhythm before everything starts feeling reactive again.",
  },
];

const productAngles = [
  "More life OS than task manager",
  "Structured enough for momentum, calm enough for real life",
  "AI should clarify the day, not perform for it",
];

const aiPrinciples = [
  "Context-aware planning instead of one-shot novelty",
  "Useful prompts and suggestions that respect human judgment",
  "Signals about momentum, drift, and focus across domains",
];

export function PolymathDetail({ product }: { product: Product }) {
  return (
    <>
      <section className="section-shell polymath-layout">
        <div className="polymath-stage">
          <div className="polymath-stage__header">
            <p className="eyebrow">Live product</p>
            <span className="polymath-stage__status">Privacy-first · Apple platforms</span>
          </div>

          <div className="polymath-stage__copy">
            <h2>A richer product treatment for the most complete thing in the studio.</h2>
            <p>
              Polymath is the clearest expression of the studio thesis so far: software that helps
              people think across the full shape of their life, not just manage a pile of tasks.
            </p>
            <p>
              The ambition is bigger than another productivity app. It is a calmer operating layer
              for planning, domains, habits, and active projects, with space for AI to support
              judgment instead of replacing it.
            </p>
          </div>

          <div className="polymath-stage__chips" aria-label="Polymath themes">
            {productAngles.map((angle) => (
              <span key={angle}>{angle}</span>
            ))}
          </div>

          <div className="polymath-orbit" aria-hidden="true">
            <div className="polymath-orbit__ring polymath-orbit__ring--outer" />
            <div className="polymath-orbit__ring polymath-orbit__ring--inner" />
            <div className="polymath-orbit__core">
              <span>Today</span>
              <strong>Command center</strong>
            </div>
            <div className="polymath-orbit__node polymath-orbit__node--one">Projects</div>
            <div className="polymath-orbit__node polymath-orbit__node--two">Habits</div>
            <div className="polymath-orbit__node polymath-orbit__node--three">Domains</div>
            <div className="polymath-orbit__node polymath-orbit__node--four">Focus</div>
          </div>

          <div className="polymath-stage__footnotes">
            <article>
              <span>Why it matters</span>
              <strong>One product that can hold planning, reflection, and motion together.</strong>
            </article>
            <article>
              <span>Design posture</span>
              <strong>Less dashboard clutter, more operating clarity.</strong>
            </article>
          </div>
        </div>

        <PricingCard product={product} />
      </section>

      <section className="section-shell polymath-grid">
        <article className="surface-card polymath-panel">
          <p className="eyebrow">What makes it different</p>
          <h2>Not a productivity pile. A personal operating system.</h2>
          {product.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>

        <article className="surface-card polymath-panel polymath-panel--contrast">
          <p className="eyebrow">AI emphasis</p>
          <h2>AI belongs here when it reduces friction instead of adding spectacle.</h2>
          <p>
            The strongest version of Polymath is not loud about intelligence. It uses it to help
            shape the day, surface patterns, and keep a human life system legible when context gets
            messy.
          </p>
          <ul className="feature-list">
            {aiPrinciples.map((principle) => (
              <li key={principle}>{principle}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="section-shell polymath-loop-section">
        <div className="home-section-heading">
          <p className="eyebrow">Operating loop</p>
          <h2>How Polymath should feel in motion.</h2>
          <p>
            The product works best as a loop, not a list: capture context, shape the day, focus on
            what matters, and review without losing the thread.
          </p>
        </div>

        <div className="polymath-loop-grid">
          {operatingLoop.map((item) => (
            <article key={item.label} className="polymath-loop-card">
              <p className="polymath-loop-card__label">{item.label}</p>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell polymath-collab">
        <div className="polymath-collab__copy">
          <p className="eyebrow">Collaboration</p>
          <h2>Want to build around this product, or shape something adjacent?</h2>
          <p>
            I’m especially interested in collaborators who care about AI-native workflows, product
            clarity, and personal software that feels more considered than the usual productivity
            template.
          </p>
        </div>

        <div className="button-row">
          <a
            href={product.ctaHref}
            className="button button--primary"
            target="_blank"
            rel="noreferrer"
          >
            Open Polymath
          </a>
          <Link href="/contact" className="button button--secondary">
            Talk collaboration
          </Link>
        </div>
      </section>
    </>
  );
}
