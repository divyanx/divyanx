import Link from "next/link";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Not Found | Divyanx",
  description: "The page you were looking for does not exist.",
  path: "/404",
});

export default function NotFound() {
  return (
    <section className="section-shell not-found-page">
      <div className="surface-card not-found-page__card">
        <p className="eyebrow">404</p>
        <h1>This page drifted out of the studio.</h1>
        <p>
          The route may be missing, renamed, or still on the way. Head back to the home
          page or explore the products that already have a place here.
        </p>
        <div className="button-row">
          <Link href="/" className="button button--primary">
            Back home
          </Link>
          <Link href="/products" className="button button--secondary">
            View products
          </Link>
        </div>
      </div>
    </section>
  );
}
