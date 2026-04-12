"use client";

import { startTransition, useEffect, useEffectEvent, useState } from "react";

type Track = {
  label: string;
  title: string;
  summary: string;
  signature: string;
  metrics: Array<{ value: string; label: string }>;
  pipeline: Array<{ title: string; body: string }>;
  outputs: string[];
  nodes: Array<{ top: string; left: string; delay: string }>;
};

const tracks: Track[] = [
  {
    label: "ML systems",
    title: "Model behavior shaped into product behavior.",
    summary:
      "I’m interested in ML when it becomes part of a workflow, not just a demo. Retrieval, prompting, evaluation, and interface design need to feel like one system.",
    signature:
      "Interesting AI products are less about sprinkling a model on top and more about deciding what the model should notice, ignore, and hand back to the user with confidence.",
    metrics: [
      { value: "Signal-first", label: "Context over noise" },
      { value: "Tight loops", label: "Eval and iteration" },
      { value: "Useful outputs", label: "Briefs, actions, memory" },
    ],
    pipeline: [
      {
        title: "Capture the signal",
        body: "Gather the right context and discard the decorative clutter.",
      },
      {
        title: "Shape the model loop",
        body: "Prompting, retrieval, ranking, and fallbacks behave like product decisions.",
      },
      {
        title: "Make the result legible",
        body: "Outputs should feel editable, reviewable, and grounded in the user’s workflow.",
      },
    ],
    outputs: ["Research compressors", "Decision memories", "AI-native workspaces"],
    nodes: [
      { top: "14%", left: "18%", delay: "0s" },
      { top: "36%", left: "68%", delay: "0.9s" },
      { top: "58%", left: "26%", delay: "1.4s" },
      { top: "70%", left: "78%", delay: "0.4s" },
      { top: "48%", left: "50%", delay: "1.1s" },
    ],
  },
  {
    label: "Creative code",
    title: "Interfaces with texture, motion, and intent.",
    summary:
      "I don’t want polished software to mean generic software. Typography, rhythm, spatial composition, and motion should reveal how a product thinks.",
    signature:
      "The frontend should feel like an authored instrument, not a stack of interchangeable components. Good motion clarifies structure before it decorates anything.",
    metrics: [
      { value: "Typography-led", label: "Voice before chrome" },
      { value: "Motion-literate", label: "Meaningful animation" },
      { value: "Systematic", label: "Aesthetic with structure" },
    ],
    pipeline: [
      {
        title: "Choose a visual thesis",
        body: "Every interface works better when it commits to a point of view.",
      },
      {
        title: "Turn systems into surfaces",
        body: "Architecture becomes visible through hierarchy, pacing, and interaction.",
      },
      {
        title: "Refine until it feels inevitable",
        body: "The last pass is usually about removing almost-good decisions.",
      },
    ],
    outputs: ["Editorial landing pages", "Experimental dashboards", "Design-forward tools"],
    nodes: [
      { top: "18%", left: "28%", delay: "0.2s" },
      { top: "32%", left: "82%", delay: "1.2s" },
      { top: "54%", left: "38%", delay: "0.8s" },
      { top: "66%", left: "16%", delay: "1.5s" },
      { top: "76%", left: "72%", delay: "0.5s" },
    ],
  },
  {
    label: "Product architecture",
    title: "From fuzzy idea to sharp operating system.",
    summary:
      "The work I enjoy most is turning ambiguous founder problems into smaller, cleaner systems: clear inputs, clear states, clear next actions.",
    signature:
      "A strong product usually feels smarter because the architecture is calmer. It knows what state it is in, what matters next, and what the user should not have to think about.",
    metrics: [
      { value: "Fast framing", label: "Problem to workflow" },
      { value: "Sane structure", label: "States and edges" },
      { value: "Shippable scope", label: "Reduce before expand" },
    ],
    pipeline: [
      {
        title: "Notice the friction",
        body: "Repeated annoyance is often a better signal than abstract market language.",
      },
      {
        title: "Compress the workflow",
        body: "Good product architecture removes decision fatigue before adding features.",
      },
      {
        title: "Ship the smallest credible system",
        body: "Version one should already feel opinionated, not merely possible.",
      },
    ],
    outputs: ["Founder tools", "Workflow layers", "Quietly ambitious product bets"],
    nodes: [
      { top: "12%", left: "58%", delay: "0.4s" },
      { top: "26%", left: "20%", delay: "1.1s" },
      { top: "44%", left: "76%", delay: "0.7s" },
      { top: "68%", left: "40%", delay: "1.6s" },
      { top: "82%", left: "84%", delay: "0.3s" },
    ],
  },
];

export function GeniusConsole() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTrack = tracks[activeIndex];

  const rotateTrack = useEffectEvent(() => {
    startTransition(() => {
      setActiveIndex((current) => (current + 1) % tracks.length);
    });
  });

  useEffect(() => {
    const timer = window.setInterval(() => {
      rotateTrack();
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="genius-console" aria-labelledby="genius-console-title">
      <div className="genius-console__header">
        <div>
          <p className="genius-console__eyebrow">Live working model</p>
          <h2 id="genius-console-title">{activeTrack.title}</h2>
        </div>
        <p className="genius-console__status">
          <span aria-hidden="true" />
          Active
        </p>
      </div>

      <div className="genius-console__controls" aria-label="Focus tracks">
        {tracks.map((track, index) => (
          <button
            key={track.label}
            type="button"
            className={`genius-console__control${index === activeIndex ? " is-active" : ""}`}
            aria-pressed={index === activeIndex}
            onClick={() => {
              startTransition(() => {
                setActiveIndex(index);
              });
            }}
          >
            {track.label}
          </button>
        ))}
      </div>

      <p className="genius-console__summary">{activeTrack.summary}</p>

      <div className="genius-console__metrics">
        {activeTrack.metrics.map((metric) => (
          <article key={metric.label} className="genius-console__metric">
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </article>
        ))}
      </div>

      <div className="genius-console__visual" aria-hidden="true">
        <div className="genius-console__beam genius-console__beam--one" />
        <div className="genius-console__beam genius-console__beam--two" />
        {activeTrack.nodes.map((node, index) => (
          <span
            key={`${activeTrack.label}-${index}`}
            className="genius-console__node"
            style={{
              top: node.top,
              left: node.left,
              animationDelay: node.delay,
            }}
          />
        ))}
      </div>

      <div className="genius-console__pipeline">
        {activeTrack.pipeline.map((step, index) => (
          <article
            key={step.title}
            className="genius-console__step"
            style={{ animationDelay: `${index * 140}ms` }}
          >
            <span className="genius-console__step-index">{`0${index + 1}`}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="genius-console__footer">
        <div className="genius-console__outputs">
          {activeTrack.outputs.map((output) => (
            <span key={output}>{output}</span>
          ))}
        </div>
        <p className="genius-console__signature">{activeTrack.signature}</p>
      </div>
    </section>
  );
}
