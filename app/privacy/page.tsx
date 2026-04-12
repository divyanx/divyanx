import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { privacySections } from "@/data/legal";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy | Divyanx",
  description: "Placeholder privacy policy for Divyanx and future products.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="A simple, structured privacy framework for the studio and its future products. This content is intentionally editable and should be reviewed before live commerce or accounts are introduced."
      sections={privacySections}
    />
  );
}
