"use client";

import { useEffect } from "react";

// Lightweight observer: keeps CSS data-reveal animations working for
// ScrollLab and AboutMotionStory. The hero scroll is now owned by Framer Motion.
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
