type PageHeroProps = {
  eyebrow: string;
  title: string;
  intro: string;
  detail?: string;
};

export function PageHero({ eyebrow, title, intro, detail }: PageHeroProps) {
  return (
    <section className="page-hero section-shell">
      <div className="page-hero__copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-hero__intro">{intro}</p>
      </div>
      {detail ? <p className="page-hero__detail">{detail}</p> : null}
    </section>
  );
}
