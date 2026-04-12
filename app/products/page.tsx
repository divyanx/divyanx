import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { products } from "@/data/products";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Products | Divyanx",
  description: "Explore the products and experiments currently being built under Divyanx.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <article className="page-stack">
      <PageHero
        eyebrow="Products"
        title="A growing set of products built with a personal point of view."
        intro="The studio is designed to support multiple products without losing its human voice. Each product lives under the same umbrella, but solves a distinct problem."
        detail="These entries use realistic placeholder content for now, so the structure is ready before final product details are dropped in."
      />

      <section className="section-shell content-section">
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </article>
  );
}
