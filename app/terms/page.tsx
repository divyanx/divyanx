import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { termsSections } from "@/data/legal";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Terms of Service | Divyanx",
  description: "Terms of service for Divyanx and its products.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      intro="The terms that govern use of the Divyanx website and its products."
      sections={termsSections}
    />
  );
}
