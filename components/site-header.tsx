"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/data/site";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="section-shell site-header__inner">
        <Link
          href="/"
          className="brand-mark"
          aria-label="Divyanx home"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="brand-mark__meta">{siteConfig.studioName}</span>
          <span className="brand-mark__name">{siteConfig.name}</span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {navigation.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`site-nav__link${isActive ? " is-active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="site-header__actions">
          <ThemeToggle />
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((value) => !value)}
          >
            Menu
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`mobile-menu${isMenuOpen ? " is-open" : ""}`}
      >
        <div className="section-shell mobile-menu__panel">
          <nav className="mobile-menu__nav" aria-label="Mobile">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="mobile-menu__link"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
