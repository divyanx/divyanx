import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { PolymathDetail } from "@/components/polymath-detail";
import { PricingCard } from "@/components/pricing-card";
import { getProductBySlug, products } from "@/data/products";
import { createMetadata } from "@/lib/metadata";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return createMetadata({
      title: "Product not found | Divyanx",
      description: "The requested Divyanx product could not be found.",
      path: `/product/${slug}`,
    });
  }

  return createMetadata({
    title: `${product.name} | Divyanx`,
    description: product.summary,
    path: `/product/${product.slug}`,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <article className="page-stack">
      <PageHero
        eyebrow={product.productType}
        title={product.name}
        intro={product.tagline}
        detail={product.summary}
      />

      {product.slug === "polymath" ? (
        <PolymathDetail product={product} />
      ) : (
        <section className="section-shell content-section product-detail-layout">
          <div className="product-detail-copy">
            <div className={`product-detail-visual product-detail-visual--${product.tone}`}>
              <div className="product-detail-visual__halo" />
              <div className="product-detail-visual__mesh" />
            </div>

            <div className="surface-card product-detail-copy__section">
              <p className="eyebrow">What it does</p>
              {product.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="surface-card product-detail-copy__section">
              <p className="eyebrow">Key features</p>
              <ul className="feature-list">
                {product.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>

          <PricingCard product={product} />
        </section>
      )}
    </article>
  );
}
