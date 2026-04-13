import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Contact | Divyanx",
  description: "Get in touch with Divyansh for product conversations, collaboration, or feedback.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <article className="page-stack">
      <PageHero
        eyebrow="Contact"
        title="A simple way to reach out."
        intro="Have a project in mind, a product question, or just want to say hello? Drop a message below or write directly by email."
      />

      <section className="section-shell content-section contact-layout">
        <ContactForm />

        <aside className="surface-card contact-sidebar">
          <p className="eyebrow">Direct contact</p>
          <h2>{siteConfig.email}</h2>
          <p>
            Best for product questions, partnerships, feedback, or a thoughtful note from
            someone building nearby.
          </p>
          <div className="contact-sidebar__meta">
            <span>Email</span>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </div>
          <div className="contact-sidebar__meta">
            <span>Studio</span>
            <strong>{siteConfig.studioName}</strong>
          </div>
        </aside>
      </section>
    </article>
  );
}
