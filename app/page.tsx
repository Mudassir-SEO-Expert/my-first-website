import Link from "next/link";
import {
  Cta,
  Eyebrow,
  Faq,
  ConceptGrid,
  SectionTitle,
  ServiceGrid,
} from "@/components/site";
import { sectors } from "@/lib/content";
import { metadata, siteUrl } from "@/lib/site";
export const generateMetadata = () =>
  metadata(
    "Build smarter. Launch stronger. Grow further.",
    "Custom websites, e-commerce platforms, software, SEO and digital marketing—built around your business goals.",
    "/",
  );
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Nexovate",
            url: siteUrl.href,
            description:
              "Pakistan-based software development and digital growth agency working internationally.",
            areaServed: ["Washington DC", "International"],
          }).replace(/</g, "\\u003c"),
        }}
      />
      <section className="hero container">
        <div className="hero-copy">
          <Eyebrow>DEVELOPMENT × DESIGN × DIGITAL GROWTH</Eyebrow>
          <h1>
            Build smarter.
            <br />
            Launch stronger.
            <br />
            <span>Grow further.</span>
          </h1>
          <p>
            Custom websites, e-commerce platforms, software, SEO and digital
            marketing—built around your business goals.
          </p>
          <div className="button-row">
            <Link className="button" href="/contact">
              Book a Discovery Call <span aria-hidden="true">↗</span>
            </Link>
            <Link className="text-link" href="/services">
              Explore Our Services <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="hero-footnote">
            <span className="status-dot" />
            From the first idea to your next stage of growth.
          </div>
        </div>
        <div
          className="hero-art"
          role="img"
          aria-label="Abstract ascending structure representing connected digital growth"
        >
          <div className="art-grid" />
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="art-glow" />
          <div className="growth-sculpture">
            <div className="sculpture-block block-one" />
            <div className="sculpture-block block-two" />
            <div className="sculpture-block block-three" />
            <svg
              className="growth-arrow"
              viewBox="0 0 300 300"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M45 250 245 50M110 50h135v135"
                stroke="url(#arrow)"
                strokeWidth="32"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="arrow" x1="40" y1="250" x2="250" y2="40">
                  <stop stopColor="#7900ff" />
                  <stop offset="1" stopColor="#a6cfff" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="art-label label-top">IDEA → IMPACT</span>
          <div className="art-caption">
            <span className="status-dot" />
            <span>
              Built to connect.
              <br />
              <strong>Designed to move you forward.</strong>
            </span>
          </div>
          <span className="art-coordinate">NX / 001</span>
        </div>
      </section>
      <div className="principles-strip">
        <div className="container">
          <span>GOOD WORK STARTS WITH</span>
          <strong>Clear thinking</strong>
          <span aria-hidden="true">✳</span>
          <strong>Thoughtful craft</strong>
          <span aria-hidden="true">✳</span>
          <strong>Open collaboration</strong>
          <span aria-hidden="true">✳</span>
          <strong>Long-term perspective</strong>
        </div>
      </div>
      <section className="section container">
        <SectionTitle
          label="CONNECTED EXPERTISE"
          title="One vision. The right digital tools."
          text="Build a solid foundation, create a better experience, and reach the people who matter. Our services work better together."
        />
        <ServiceGrid />
        <div className="creative-note">
          <span aria-hidden="true">✳</span>
          <p>
            <strong>Make your message move.</strong> Graphic design, video
            editing and 3D cartoon animation bring an extra dimension to your
            brand and campaigns.
          </p>
          <Link className="text-link" href="/services/digital-marketing">
            Explore creative support ↗
          </Link>
        </div>
      </section>
      <section className="section why-section">
        <div className="container why-grid">
          <div>
            <Eyebrow>THE NEXOVATE APPROACH</Eyebrow>
            <h2>
              More intention.
              <br />
              At every touchpoint.
            </h2>
            <p>
              Technology is only useful when it serves a purpose. We start with
              your business, ask better questions, and make each decision count.
            </p>
            <Link className="text-link" href="/about">
              Get to know Nexovate ↗
            </Link>
          </div>
          <div className="values-grid">
            {[
              [
                "01",
                "Business before buzzwords",
                "Your goals shape the scope, the platform and the work.",
              ],
              [
                "02",
                "Built as a connected whole",
                "Design, development and growth inform each other from day one.",
              ],
              [
                "03",
                "Clarity throughout",
                "Understand what we’re building, why it matters and what comes next.",
              ],
              [
                "04",
                "Made for real people",
                "Accessible, responsive experiences with a clear path to action.",
              ],
            ].map(([n, t, p]) => (
              <article key={n}>
                <span>{n} /</span>
                <h3>{t}</h3>
                <p>{p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionTitle
          label="FROM AMBITION TO ACTION"
          title="A clear path forward."
          text="A collaborative process, shaped around the project. No mystery between the first conversation and the final handover."
        />
        <div className="process-grid">
          {[
            [
              "Discover",
              "Understand your audience, goals and the problem worth solving.",
            ],
            [
              "Define",
              "Agree the priorities, scope and a practical direction.",
            ],
            [
              "Create",
              "Design, build and refine together through considered feedback.",
            ],
            [
              "Launch & evolve",
              "Test the experience, hand it over and plan what comes next.",
            ],
          ].map(([t, p], i) => (
            <article key={t}>
              <span className="process-number">
                0{i + 1}
                <span aria-hidden="true">↗</span>
              </span>
              <h3>{t}</h3>
              <p>{p}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section work-section">
        <div className="container">
          <SectionTitle
            label="POSSIBILITIES, MADE VISIBLE"
            title="A look at what could be next."
            text="Original concept explorations showing our approach. These are illustrative directions, not commissioned client projects or claims of results."
          />
          <ConceptGrid />
          <div className="section-end">
            <p>Thoughtful experiences for real-world businesses.</p>
            <Link className="text-link" href="/portfolio">
              Explore the portfolio ↗
            </Link>
          </div>
        </div>
      </section>
      <section className="section container audience-section">
        <Eyebrow>BUILT AROUND YOUR WORLD</Eyebrow>
        <h2>
          Local expertise.
          <br />
          International ambition.
        </h2>
        <p>
          Based in Pakistan, working with service businesses in Washington DC
          and internationally. We bring a focused digital perspective to
          businesses built on trust.
        </p>
        <div className="sector-tags">
          {sectors.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
        <div className="honest-panel">
          <div>
            <h3>Real stories deserve real evidence.</h3>
            <p>
              Our case-study library will grow as authorized project stories
              become available. We don’t publish client work or results without
              permission.
            </p>
          </div>
          <Link className="text-link" href="/case-studies">
            Visit case studies ↗
          </Link>
        </div>
      </section>
      <section className="section container faq-section">
        <div>
          <Eyebrow>A LITTLE MORE CLARITY</Eyebrow>
          <h2>
            Good questions.
            <br />
            Straight answers.
          </h2>
          <p>Have something else in mind?</p>
          <Link className="text-link" href="/contact">
            Let’s talk about it ↗
          </Link>
        </div>
        <Faq />
      </section>
      <Cta />
    </>
  );
}
