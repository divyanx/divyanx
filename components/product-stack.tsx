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
          <div className="product-stack__progress" aria-hidden="true">
            <motion.div
              className="product-stack__progress-fill"
              style={{ scaleX: progressScale }}
            />
          </div>

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

          <AnimatePresence mode="wait">
            <ProductCard key={products[activeIndex].slug} product={products[activeIndex]} />
          </AnimatePresence>
        </div>
      </div>

      {/* All-products reveal grid */}
      <div className="product-stack__all-heading">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          All products
        </motion.p>
      </div>
      <motion.div
        className="product-stack__all-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
      >
        {products.map((product) => (
          <motion.article
            key={product.slug}
            className={`home-product-card home-product-card--${product.tone} product-stack__all-card`}
            variants={{
              hidden: { opacity: 0, y: 32, scale: 0.97 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: cinematicEase } },
            }}
          >
            <div className="home-product-card__top">
              <p>{product.productType}</p>
              <span>{product.status}</span>
            </div>
            <h3>{product.name}</h3>
            <p className="home-product-card__tagline">{product.tagline}</p>
            <div className="home-product-card__footer">
              <span>{product.pricing.label}</span>
              <Link href={product.ctaHref ?? `/product/${product.slug}`} className="text-link">
                {product.ctaHref ? "Open live product" : "Open concept"}
              </Link>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
