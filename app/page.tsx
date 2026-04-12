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
