import Link from "next/link";
import type { Product } from "@/data/products";

type PricingCardProps = {
  product: Product;
};

export function PricingCard({ product }: PricingCardProps) {
  const isLive = Boolean(product.ctaHref);

  return (
    <aside className="pricing-card">
      <p className="eyebrow">Pricing</p>
      <h2>{product.pricing.label}</h2>
      {product.pricing.price && product.pricing.price !== "TBD" && (
        <p className="pricing-card__price">
          {product.pricing.price}
          <span>{product.pricing.cadence}</span>
        </p>
      )}
      {product.pricing.note && (
        <p className="pricing-card__note">{product.pricing.note}</p>
      )}

      <div className="pricing-card__actions">
        {isLive ? (
          <a
            href={product.ctaHref}
            className="button button--primary"
            target="_blank"
            rel="noreferrer"
          >
            {product.ctaLabel}
          </a>
        ) : (
          <button type="button" className="button button--primary" disabled>
            {product.ctaLabel}
          </button>
        )}
        {isLive ? (
          <Link href="/contact" className="button button--secondary">
            Collaborate on this product
          </Link>
        ) : (
          <Link href="/contact" className="button button--secondary">
            Get notified when it launches
          </Link>
        )}
      </div>

      {product.pricing.paymentProviders.length > 0 && (
        <ul className="pricing-card__rails" aria-label="Planned payment providers">
          {product.pricing.paymentProviders.map((provider) => (
            <li key={provider}>{provider}</li>
          ))}
        </ul>
      )}
    </aside>
  );
}
