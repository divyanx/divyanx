import Link from "next/link";
import { siteConfig } from "@/data/site";

const footerLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/refund-policy", label: "Refund policy" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-shell site-footer__inner">
        <div className="site-footer__intro">
          <p className="eyebrow">Divyanx</p>
          <h2 className="site-footer__title">
            Creative systems, useful AI, and software with a point of view.
          </h2>
          <p className="site-footer__copy">{siteConfig.footerNote}</p>
        </div>

        <div className="site-footer__meta">
          <div className="site-footer__links">
            <Link href="/products">Products</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            {footerLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <p className="site-footer__small">
            Reach out at{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
