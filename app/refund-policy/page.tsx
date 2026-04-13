import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { refundSections } from "@/data/legal";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Refund Policy | Divyanx",
  description: "Refund policy for Divyanx products and services.",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Refund Policy"
      intro="Our approach to refunds for current and future paid products."
      sections={refundSections}
    />
  );
}
