import type { Metadata } from "next";
import Image from "next/image";
import portraitImage from "@/assets/divyansh-portrait.png";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "About | Divyanx",
  description: "Learn more about Divyansh, the builder behind Divyanx.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <article className="page-stack">
      <PageHero
        eyebrow="About"
        title="An engineer and solo builder shaping products with care."
        intro={siteConfig.about.longStory}
        detail={siteConfig.location}
      />

      <section className="section-shell content-section about-layout">
        <figure className="surface-card about-photo-card">
          <Image
            src={portraitImage}
            alt="Portrait of Divyansh"
            className="about-photo-card__image"
          />
          <figcaption className="about-photo-card__caption">
            <p className="eyebrow">Studio view</p>
            <p>
              Building quietly across AI, product systems, and software that
              feels measured instead of noisy.
            </p>
          </figcaption>
        </figure>

        <section className="surface-card about-narrative">
          <div className="about-narrative__block">
            <p className="eyebrow">Background</p>
            <p>{siteConfig.about.background}</p>
          </div>

          <div className="about-narrative__block">
            <p className="eyebrow">Why I build</p>
            <p>{siteConfig.about.whyBuild}</p>
          </div>

          <div className="about-narrative__block">
            <p className="eyebrow">Interests</p>
            <ul className="chip-row">
              {siteConfig.about.interests.map((interest) => (
                <li key={interest} className="chip-row__item">
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </section>
    </article>
  );
}
