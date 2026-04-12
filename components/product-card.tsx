import Link from "next/link";
import type { Product } from "@/data/products";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const href = product.ctaHref ?? `/product/${product.slug}`;
  const label = product.ctaHref ? "Open live product" : "Explore product";

  return (
    <article className="product-card">
      <div className={`product-card__visual product-card__visual--${product.tone}`}>
        <div className="product-card__orb" />
        <div className="product-card__grid" />
        <div className="product-card__badge">{product.status}</div>
      </div>

      <div className="product-card__body">
        <div className="product-card__header">
          <p className="product-card__type">{product.productType}</p>
          <h3>{product.name}</h3>
          <p className="product-card__tagline">{product.tagline}</p>
        </div>

        <p className="product-card__summary">{product.summary}</p>

        <ul className="chip-row" aria-label={`${product.name} highlights`}>
          {product.features.slice(0, 3).map((feature) => (
            <li key={feature} className="chip-row__item">
              {feature}
            </li>
          ))}
        </ul>

        <div className="product-card__footer">
          <Link href={href} className="text-link">
            {label}
          </Link>
          <span className="product-card__price">{product.pricing.label}</span>
        </div>
      </div>
    </article>
  );
}
