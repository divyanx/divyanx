"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import dreamyCoverImage from "@/assets/divyansh-at-work.png";
import portraitImage from "@/assets/divyansh-portrait.png";

type MotionChapter = {
  eyebrow: string;
  scene: "work" | "paint" | "game" | "night";
  title: string;
  body: string;
  status: string;
  sceneWord: string;
  cards: string[];
};

const chapters: MotionChapter[] = [
  {
    eyebrow: "01 · Work",
    scene: "work",
    title: "Building product systems until the flow feels obvious.",
    body: "Most of my best work starts with a messy workflow and ends with a calmer operating system. I like making software that feels sharp, useful, and deeply considered.",
    status: "Studio mode",
    sceneWord: "Build",
    cards: ["Product architecture", "Model UX", "Frontend systems"],
  },
  {
    eyebrow: "02 · Paint",
    scene: "paint",
    title: "Painting keeps my visual instincts honest.",
    body: "When I step away from code and work with color, texture, and composition, I come back with better judgment about rhythm, contrast, restraint, and what deserves attention.",
    status: "Color mode",
    sceneWord: "Paint",
    cards: ["Color", "Texture", "Composition"],
  },
  {
    eyebrow: "03 · Play",
    scene: "game",
    title: "Games remind me that interfaces should feel alive.",
    body: "Pacing, response, anticipation, atmosphere, delight: games teach all of that better than most product decks do. I carry those lessons back into interaction design.",
    status: "Play loop",
    sceneWord: "Play",
    cards: ["Pacing", "Feedback", "Immersion"],
  },
  {
    eyebrow: "04 · Tinker",
    scene: "night",
    title: "Late-night experiments are where the strange ideas get good.",
    body: "A lot of the memorable stuff starts outside a sprint plan: a weird visual system, a tiny prototype, a behavior experiment, or a thought that keeps asking to be built properly.",
    status: "After hours",
    sceneWord: "Tinker",
    cards: ["Experiments", "Visual systems", "Odd prototypes"],
  },
];

export function AboutMotionStory() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const steps = Array.from(document.querySelectorAll<HTMLElement>("[data-about-motion-step]"));

    if (!steps.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (!visible) {
          return;
        }

        const nextIndex = Number((visible.target as HTMLElement).dataset.index);

        if (!Number.isNaN(nextIndex)) {
          setActiveIndex(nextIndex);
        }
      },
      {
        threshold: [0.34, 0.6, 0.8],
        rootMargin: "-14% 0px -22% 0px",
      },
    );

    steps.forEach((step) => observer.observe(step));

    return () => observer.disconnect();
  }, []);

  const activeChapter = chapters[activeIndex];

  return (
    <section className="section-shell about-motion-section">
      <div className="home-section-heading" data-reveal>
        <p className="eyebrow">About me, in motion</p>
        <h2>A more personal scroll sequence, built from real references and changing moods.</h2>
        <p>
          This section is meant to feel closer to how I actually operate: software, visual taste,
          games, and late-night experiments all feeding the same creative loop.
        </p>
      </div>

      <div className="about-motion">
        <div className="about-motion__sticky" data-reveal>
          <section
            className={`about-motion__visual about-motion__visual--${activeChapter.scene}`}
            aria-labelledby="about-motion-title"
          >
            <div className="about-motion__visual-top">
              <p className="about-motion__eyebrow">{activeChapter.eyebrow}</p>
              <span className="about-motion__status">{activeChapter.status}</span>
            </div>

            <div className="about-motion__stage">
              <div className="about-motion__glow about-motion__glow--a" />
              <div className="about-motion__glow about-motion__glow--b" />

              <div className="about-motion__scene-word" aria-hidden="true">
                {activeChapter.sceneWord}
              </div>

              <figure className="about-motion__frame about-motion__frame--main">
                <Image
                  src={dreamyCoverImage}
                  alt="Divyansh working at a laptop"
                  className="about-motion__image"
                />
              </figure>

              <figure className="about-motion__frame about-motion__frame--secondary">
                <Image
                  src={portraitImage}
                  alt="Portrait of Divyansh"
                  className="about-motion__image"
                />
              </figure>

              <div className="about-motion__hud about-motion__hud--north">
                <span>Current energy</span>
                <strong>{activeChapter.sceneWord} with intention, not noise.</strong>
              </div>

              <div className="about-motion__hud about-motion__hud--south">
                <span>What it adds</span>
                <strong>{activeChapter.cards.join(" · ")}</strong>
              </div>

              <div className="about-motion__activity-cluster" aria-hidden="true">
                {activeChapter.cards.map((card) => (
                  <span key={card}>{card}</span>
                ))}
              </div>

              <div className="about-motion__progress" aria-hidden="true">
                <span
                  className="about-motion__progress-bar"
                  style={{ transform: `scaleX(${(activeIndex + 1) / chapters.length})` }}
                />
              </div>

              <div className="about-motion__signal about-motion__signal--a" />
              <div className="about-motion__signal about-motion__signal--b" />
              <div className="about-motion__signal about-motion__signal--c" />
            </div>

            <div className="about-motion__copy">
              <h3 id="about-motion-title">{activeChapter.title}</h3>
              <p>{activeChapter.body}</p>
            </div>
          </section>
        </div>

        <div className="about-motion__steps">
          {chapters.map((chapter, index) => (
            <article
              key={chapter.eyebrow}
              data-about-motion-step
              data-index={index}
              data-reveal
              className={`about-motion__step${index === activeIndex ? " is-active" : ""}`}
            >
              <p className="about-motion__step-label">{chapter.eyebrow}</p>
              <h3>{chapter.title}</h3>
              <p>{chapter.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
