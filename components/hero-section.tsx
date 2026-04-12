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
      transition={{ staggerChildren: 0.08, delayChildren: 0.5 }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordReveal}
          style={{ display: "inline-block", marginRight: i < words.length - 1 ? "0.22em" : 0 }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

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
            style={{ color: "inherit" }}
          >
            I&apos;m {siteConfig.name}, building under {siteConfig.studioName}: product systems,
            AI-native workflows, and visual experiences that make intelligence feel tangible.
          </motion.p>

          <motion.p
            className="home-stage__body"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: cinematicEase, delay: 1.25 }}
            style={{ color: "inherit" }}
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
