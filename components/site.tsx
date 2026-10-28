import Link from "next/link";
import { services, concepts, faqs } from "@/lib/content";
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      <span aria-hidden="true" /> {children}
    </p>
  );
}
export function SectionTitle({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <Eyebrow>{label}</Eyebrow>
        <h2>{title}</h2>
      </div>
      {text && <p>{text}</p>}
    </div>
  );
}
export function ServiceGrid() {
  return (
    <div className="service-grid">
      {services.map((s) => (
        <Link
          href={`/services/${s.slug}`}
          className="service-card"
          key={s.slug}
        >
          <span className="card-label">{s.tag}</span>
          <span className="service-symbol" aria-hidden="true">
            {s.slug === "seo"
              ? "◎"
              : s.slug === "digital-marketing"
                ? "↗"
                : s.slug === "software-development"
                  ? "⌘"
                  : s.slug === "e-commerce-development"
                    ? "▧"
                    : "〈/〉"}
          </span>
          <h3>{s.name}</h3>
          <p>{s.description}</p>
          <span className="card-link">
            Explore service <span aria-hidden="true">↗</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
export function ConceptGrid() {
  return (
    <div className="concept-grid">
      {concepts.map((c, i) => (
        <article className="concept-card" key={c.name}>
          <div className={`concept-art ${c.color}`} aria-hidden="true">
            <div className="mini-browser">
              <div className="mini-top">
                <span />
                <span />
                <span />
              </div>
              <div className="mini-content">
                <span className="mini-logo">
                  {["care /", "FORM.", "CURRENT ↗"][i]}
                </span>
                <div className="mini-line" />
                <div className="mini-line short" />
                <div className="mini-orb" />
                <div className="mini-pill" />
              </div>
            </div>
            <span className="concept-badge">CONCEPT EXPLORATION</span>
          </div>
          <div className="concept-copy">
            <p className="card-label">{c.type}</p>
            <h3>{c.name}</h3>
            <p>{c.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
export function Faq() {
  return (
    <div className="faq-list">
      {faqs.map(([q, a]) => (
        <details key={q}>
          <summary>
            {q}
            <span aria-hidden="true">+</span>
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
export function Cta() {
  return (
    <section className="container">
      <div className="cta-panel">
        <Eyebrow>YOUR NEXT CHAPTER</Eyebrow>
        <h2>
          Big ambitions.
          <br />
          Let’s make them tangible.
        </h2>
        <p>
          Bring your idea, your challenge or your next step.
          <br />
          We’ll help you find a clear way forward.
        </p>
        <Link className="button button-white" href="/contact">
          Book a Discovery Call <span aria-hidden="true">↗</span>
        </Link>
        <span className="cta-arrow" aria-hidden="true">
          ↗
        </span>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="container footer">
      <div className="footer-top">
        <div>
          <Link href="/" className="brand">
            NEXOVATE<span className="brand-dot">.</span>
          </Link>
          <p>
            Thoughtful technology.
            <br />
            Purposeful digital growth.
          </p>
          <p className="footer-small">
            Based in Pakistan. Working internationally.
          </p>
        </div>
        <div>
          <h2>Expertise</h2>
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`}>
              {s.name}
            </Link>
          ))}
        </div>
        <div>
          <h2>Explore</h2>
          {[
            ["About", "about"],
            ["Portfolio", "portfolio"],
            ["Case studies", "case-studies"],
            ["Insights", "blog"],
            ["Contact", "contact"],
          ].map(([n, p]) => (
            <Link key={p} href={`/${p}`}>
              {n}
            </Link>
          ))}
        </div>
        <div>
          <h2>Start a conversation</h2>
          <p>Have something in mind?</p>
          <Link className="text-link" href="/contact">
            Let’s build what’s next ↗
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Nexovate</span>
        <div>
          <Link href="/privacy-policy">Privacy policy</Link>
          <Link href="/terms">Terms</Link>
        </div>
        <span>Built with intention. Always evolving.</span>
      </div>
    </footer>
  );
}
export function PageHero({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <section className="container page-hero">
      <Eyebrow>{label}</Eyebrow>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
}
