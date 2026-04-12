import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { refundSections } from "@/data/legal";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Refund Policy | Divyanx",
  description: "Structured placeholder refund policy for future Divyanx product payments.",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Refund Policy"
      intro="A structured placeholder for future paid products and payment compliance. Review and customize before enabling live Stripe or Razorpay flows."
      sections={refundSections}
    />
  );
}
