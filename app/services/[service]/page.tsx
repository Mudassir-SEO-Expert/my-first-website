import { notFound } from "next/navigation";
import Link from "next/link";
import { services } from "@/lib/content";
import { Cta, Eyebrow, PageHero } from "@/components/site";
import { metadata } from "@/lib/site";
export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const s = services.find((s) => s.slug === service);
  return s ? metadata(s.name, s.description, `/services/${s.slug}`) : {};
}
export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const s = services.find((s) => s.slug === service);
  if (!s) notFound();
  return (
    <>
      <PageHero
        label={s.name.toUpperCase()}
        title={s.short}
        text={s.description}
      />
      <section className="section container content-grid">
        <div>
          <Eyebrow>THOUGHTFUL FROM THE START</Eyebrow>
          <h2>A practical foundation for your next move.</h2>
          <p>{s.detail}</p>
          <p>
            We begin by understanding your audience, current setup and
            priorities. Then we agree the scope and the delivery approach, with
            room for considered feedback along the way.
          </p>
          <Link className="button" href="/contact">
            Discuss {s.name.toLowerCase()} ↗
          </Link>
        </div>
        <div className="statement-card">
          <h3>What we can work on</h3>
          <ul className="detail-list">
            {s.deliverables.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <p>
            Every engagement is scoped individually. Deliverables, timelines,
            fees and ongoing support are agreed before work begins.
          </p>
        </div>
      </section>
      <section className="container section">
        <Eyebrow>CONNECT THE NEXT PIECE</Eyebrow>
        <h2>Better together.</h2>
        <div className="sector-tags">
          {services
            .filter((x) => x.slug !== s.slug)
            .map((x) => (
              <Link
                className="text-link"
                key={x.slug}
                href={`/services/${x.slug}`}
              >
                {x.name} ↗
              </Link>
            ))}
        </div>
        <Link className="text-link" href="/services">
          All services ↗
        </Link>
      </section>
      <Cta />
    </>
  );
}
