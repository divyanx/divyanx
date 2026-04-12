"use client";

import { useEffect, useState } from "react";

type Chapter = {
  eyebrow: string;
  title: string;
  body: string;
  markers: Array<{ label: string; value: string }>;
  outputs: string[];
  nodes: Array<{ top: string; left: string; delay: string }>;
};

const chapters: Chapter[] = [
  {
    eyebrow: "01 · Observe",
    title: "Find the hidden system inside the mess.",
    body: "The most interesting products usually start with messy workflows, not tidy briefs. I look for the repeated annoyance, the missing state, and the part the user keeps reconstructing manually.",
    markers: [
      { label: "Signal", value: "Repeated friction" },
      { label: "Lens", value: "Workflow before features" },
      { label: "Goal", value: "Name the real loop" },
    ],
    outputs: ["Problem framing", "State map", "Decision edges"],
    nodes: [
      { top: "18%", left: "18%", delay: "0s" },
      { top: "34%", left: "62%", delay: "0.7s" },
      { top: "62%", left: "28%", delay: "1.2s" },
      { top: "74%", left: "78%", delay: "0.4s" },
    ],
  },
  {
    eyebrow: "02 · Compose",
    title: "Turn intelligence into a visible interface.",
    body: "If a model is involved, the UI has to explain what the system is doing without slowing the user down. I like interfaces where the product logic becomes visible through pacing, layout, and motion.",
    markers: [
      { label: "Model UX", value: "Legible behavior" },
      { label: "Surface", value: "Editorial precision" },
      { label: "Motion", value: "Meaning before flair" },
    ],
    outputs: ["Interactive concepts", "Prompt + UI systems", "Design language"],
    nodes: [
      { top: "20%", left: "28%", delay: "0.2s" },
      { top: "42%", left: "74%", delay: "0.9s" },
      { top: "66%", left: "46%", delay: "1.5s" },
      { top: "80%", left: "18%", delay: "0.5s" },
    ],
  },
  {
    eyebrow: "03 · Ship",
    title: "Make it feel inevitable, then make it real.",
    body: "The final pass is where a product stops feeling assembled and starts feeling authored. This is where architecture, animation, copy, and technical choices have to agree with each other.",
    markers: [
      { label: "Build", value: "Production-minded" },
      { label: "Taste", value: "Distinctive by default" },
      { label: "Outcome", value: "Compact but memorable" },
    ],
    outputs: ["Product-ready frontends", "AI-native tools", "Systems that scale cleanly"],
    nodes: [
      { top: "16%", left: "58%", delay: "0.3s" },
      { top: "38%", left: "20%", delay: "1.1s" },
      { top: "58%", left: "82%", delay: "0.6s" },
      { top: "78%", left: "48%", delay: "1.4s" },
    ],
  },
];

export function ScrollLab() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const steps = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-chapter]"));

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
        threshold: [0.3, 0.55, 0.8],
        rootMargin: "-18% 0px -24% 0px",
      },
    );

    steps.forEach((step) => observer.observe(step));

    return () => observer.disconnect();
  }, []);

  const activeChapter = chapters[activeIndex];

  return (
    <section className="section-shell scroll-lab-section">
      <div className="home-section-heading" data-reveal>
        <p className="eyebrow">Scroll lab</p>
        <h2>A homepage that behaves like a creative system, not a brochure.</h2>
        <p>
          Scroll through the sequence. The stage locks in place while the narrative changes,
          mirroring how I usually work: observe the mess, shape the logic, and then compose the
          interface until it feels inevitable.
        </p>
      </div>

      <div className="scroll-lab">
        <div className="scroll-lab__sticky" data-reveal>
          <section className="scroll-lab__panel" aria-labelledby="scroll-lab-title">
            <div className="scroll-lab__panel-header">
              <p className="scroll-lab__eyebrow">{activeChapter.eyebrow}</p>
              <span className="scroll-lab__status">In motion</span>
            </div>

            <h3 id="scroll-lab-title" className="scroll-lab__title">
              {activeChapter.title}
            </h3>

            <p className="scroll-lab__body">{activeChapter.body}</p>

            <div className="scroll-lab__progress" aria-hidden="true">
              <span
                className="scroll-lab__progress-bar"
                style={{ transform: `scaleX(${(activeIndex + 1) / chapters.length})` }}
              />
            </div>

            <div className="scroll-lab__marker-grid">
              {activeChapter.markers.map((marker) => (
                <article key={marker.label} className="scroll-lab__marker">
                  <span>{marker.label}</span>
                  <strong>{marker.value}</strong>
                </article>
              ))}
            </div>

            <div className="scroll-lab__visual" aria-hidden="true">
              <div className="scroll-lab__beam scroll-lab__beam--a" />
              <div className="scroll-lab__beam scroll-lab__beam--b" />
              {activeChapter.nodes.map((node, index) => (
                <span
                  key={`${activeChapter.eyebrow}-${index}`}
                  className="scroll-lab__node"
                  style={{
                    top: node.top,
                    left: node.left,
                    animationDelay: node.delay,
                  }}
                />
              ))}
            </div>

            <div className="scroll-lab__outputs">
              {activeChapter.outputs.map((output) => (
                <span key={output}>{output}</span>
              ))}
            </div>
          </section>
        </div>

        <div className="scroll-lab__chapters">
          {chapters.map((chapter, index) => (
            <article
              key={chapter.eyebrow}
              data-scroll-chapter
              data-index={index}
              className={`scroll-lab__chapter${index === activeIndex ? " is-active" : ""}`}
              data-reveal
            >
              <p className="scroll-lab__chapter-label">{chapter.eyebrow}</p>
              <h3>{chapter.title}</h3>
              <p>{chapter.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
