import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { termsSections } from "@/data/legal";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Terms of Service | Divyanx",
  description: "Structured placeholder terms for Divyanx and future products.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      intro="These terms are written as a calm, editable starting point for the Divyanx studio and the products that will sit under it."
      sections={termsSections}
    />
  );
}
