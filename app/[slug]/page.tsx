import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ConceptGrid,
  Cta,
  Eyebrow,
  Faq,
  PageHero,
  ServiceGrid,
} from "@/components/site";
import { InquiryForm } from "@/components/controls";
import { articles, sectors } from "@/lib/content";
import { metadata } from "@/lib/site";
import { contentRepository } from "@/lib/integrations";
const pages: Record<
  string,
  { title: string; description: string; heading: string; label: string }
> = {
  about: {
    title: "About",
    label: "MEET NEXOVATE",
    heading: "A thoughtful partner for what comes next.",
    description:
      "Pakistan-based, internationally minded. We connect development, design and digital growth with a practical understanding of your business.",
  },
  services: {
    title: "Our services",
    label: "OUR EXPERTISE",
    heading: "Build the foundation. Create the momentum.",
    description:
      "Websites, commerce, software and growth services that connect your business with its next opportunity.",
  },
  portfolio: {
    title: "Portfolio & concepts",
    label: "OUR CREATIVE PERSPECTIVE",
    heading: "Ideas you can see. Possibilities you can imagine.",
    description:
      "Explore original concept projects. Every item below is an illustrative design direction, not a commissioned client project.",
  },
  "case-studies": {
    title: "Case studies",
    label: "EVIDENCE OVER PROMISES",
    heading: "Good stories start with real work.",
    description:
      "A space for authorized project stories, honest context and measured outcomes.",
  },
  blog: {
    title: "Insights",
    label: "NOTES FOR YOUR NEXT MOVE",
    heading: "Clear thinking for a stronger digital business.",
    description:
      "Original practical reading on planning, search and digital growth. No hype required.",
  },
  contact: {
    title: "Contact & discovery",
    label: "START A CONVERSATION",
    heading: "What would you like to build next?",
    description:
      "Tell us about your business and your goals. We’ll start with a conversation and work out the right next step together.",
  },
  "privacy-policy": {
    title: "Privacy policy",
    label: "YOUR INFORMATION",
    heading: "Privacy, explained simply.",
    description:
      "How this public website handles your information and what happens when you contact Nexovate.",
  },
  terms: {
    title: "Terms",
    label: "USING THIS WEBSITE",
    heading: "A clear starting point.",
    description:
      "The terms for using Nexovate’s public website. Project work is governed by a separate written agreement.",
  },
};
export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = pages[slug];
  if (!p) return {};
  return metadata(p.title, p.description, `/${slug}`);
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = pages[slug];
  if (!p) notFound();
  return (
    <>
      <PageHero label={p.label} title={p.heading} text={p.description} />
      {slug === "about" && (
        <>
          <section className="section container content-grid">
            <div>
              <Eyebrow>BUILD WITH PURPOSE</Eyebrow>
              <h2>
                Different skills.
                <br />
                One connected vision.
              </h2>
              <p>
                Nexovate is a software development and digital growth agency led
                by a Pakistan-based founder with skills across web development,
                SEO and Google, Meta and TikTok marketing.
              </p>
              <p>
                Creative collaboration adds graphic design, video editing and 3D
                cartoon animation to the mix. The aim is simple: bring the right
                thinking and skills to the work your business actually needs.
              </p>
            </div>
            <div className="statement-card">
              <h3>Clarity is part of the craft.</h3>
              <p>
                We value a clear scope, thoughtful execution and open
                communication. We discuss the work before promising the outcome,
                and build an approach around your priorities.
              </p>
              <p>
                We serve Washington DC and international businesses remotely. We
                do not operate a US office.
              </p>
              <Link className="text-link" href="/contact">
                Meet your next project partner ↗
              </Link>
            </div>
          </section>
          <section className="container">
            <Eyebrow>WHO WE BUILD FOR</Eyebrow>
            <h2>Businesses built on trust.</h2>
            <div className="sector-tags">
              {sectors.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </section>
          <Cta />
        </>
      )}
      {slug === "services" && (
        <>
          <section className="section container">
            <ServiceGrid />
            <div className="creative-note">
              <span aria-hidden="true">✳</span>
              <p>
                <strong>Creative that supports the whole story.</strong> Ask
                about graphic design, video editing and 3D cartoon animation
                alongside your website or campaign.
              </p>
            </div>
          </section>
          <section className="container section faq-section">
            <div>
              <Eyebrow>FIND YOUR STARTING POINT</Eyebrow>
              <h2>Let’s make the scope clear.</h2>
            </div>
            <Faq />
          </section>
          <Cta />
        </>
      )}
      {slug === "portfolio" && (
        <>
          <section className="section container">
            <ConceptGrid />
            <div className="honest-panel">
              <div>
                <h3>Concepts, clearly labelled.</h3>
                <p>
                  These original interface studies demonstrate visual
                  directions. They are not live customer websites, endorsements
                  or case studies. Previous employer client work is not
                  included.
                </p>
              </div>
            </div>
          </section>
          <Cta />
        </>
      )}
      {slug === "case-studies" && (
        <section className="section container">
          <div
            className="empty-state"
            data-case-count={
              (await contentRepository.publishedCaseStudies()).length
            }
          >
            <span aria-hidden="true">↗</span>
            <h2>Room for the right stories.</h2>
            <p>
              No public case studies are available yet. We’ll publish project
              details only with permission and evidence. In the meantime,
              explore our clearly labelled concept work or discuss how we would
              approach your project.
            </p>
            <div className="button-row" style={{ justifyContent: "center" }}>
              <Link className="button" href="/portfolio">
                Explore concepts ↗
              </Link>
              <Link className="text-link" href="/contact">
                Discuss your project ↗
              </Link>
            </div>
          </div>
        </section>
      )}
      {slug === "blog" && (
        <section className="section container">
          <nav className="article-index" aria-label="Article index">
            {articles.map((a) => (
              <a key={a.id} href={`#${a.id}`}>
                {a.category} ↘
              </a>
            ))}
          </nav>
          <div className="article-list">
            {articles.map((a) => (
              <article className="article" id={a.id} key={a.id}>
                <Eyebrow>{a.category.toUpperCase()} / NEXOVATE NOTES</Eyebrow>
                <h2>{a.title}</h2>
                <p>{a.body}</p>
                <Link className="text-link" href="/contact">
                  Talk through your next step ↗
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
      {slug === "contact" && (
        <section className="section container content-grid">
          <div className="contact-copy">
            <Eyebrow>A GOOD PLACE TO BEGIN</Eyebrow>
            <h2>
              Tell us a little.
              <br />
              We’ll take it from there.
            </h2>
            <p>
              Share what you do, what you need and any timing or budget
              considerations. You don’t need a finished brief.
            </p>
            <a
              className="contact-address"
              href="mailto:opmudassir882@gmail.com"
            >
              opmudassir882@gmail.com ↗
            </a>
            <h3>Prefer a discovery call?</h3>
            <p>
              Request a call in your message. We’ll agree a time by email. Our
              intended call window is 9 AM–5 PM, Washington DC time
              (America/New_York); availability, days and duration are confirmed
              individually.
            </p>
            <p className="contact-note">
              Submitting this form prepares an email draft. It does not send
              your message or book an appointment. You stay in control of what
              you send.
            </p>
          </div>
          <InquiryForm />
        </section>
      )}
      {slug === "privacy-policy" && (
        <section className="section container prose">
          <h2>What this website stores</h2>
          <p>
            This site stores your theme and animation preferences in your
            browser’s local storage. These preferences are not sent to Nexovate.
            No analytics, advertising trackers or database are configured in
            this version.
          </p>
          <h2>When you make an enquiry</h2>
          <p>
            The contact form validates information locally and prepares a draft
            in your email application. It does not submit form contents to a
            website server. If you choose to send the email, your email provider
            and the recipient’s provider process it under their own terms.
            Nexovate uses information you send to discuss and respond to your
            enquiry.
          </p>
          <h2>Hosting and technical information</h2>
          <p>
            The hosting provider may process ordinary request information such
            as IP addresses and access logs to operate and secure the site. The
            deployment operator must confirm provider-specific retention and
            processing details before public launch.
          </p>
          <h2>Your choices</h2>
          <p>
            Do not include sensitive information in an initial enquiry. You can
            clear stored preferences through your browser. For questions about
            information sent to Nexovate, contact{" "}
            <a href="mailto:opmudassir882@gmail.com">opmudassir882@gmail.com</a>
            .
          </p>
          <h2>Updates</h2>
          <p>
            This notice should be reviewed when hosting, analytics or contact
            integrations change. Additional service-specific terms will be
            provided where needed.
          </p>
        </section>
      )}
      {slug === "terms" && (
        <section className="section container prose">
          <h2>Website information</h2>
          <p>
            This website describes Nexovate’s services for general information.
            Content is not a binding quote, legal advice or a promise of
            particular commercial results.
          </p>
          <h2>Projects and enquiries</h2>
          <p>
            An enquiry or discovery conversation does not create a service
            contract. Scope, pricing, payment, delivery, intellectual property
            and support must be agreed separately in writing before work begins.
          </p>
          <h2>Concept work and intellectual property</h2>
          <p>
            Portfolio concepts are illustrative original studies, not client
            endorsements or proof of business outcomes. Website content and
            original artwork may not be represented as your own or reused
            commercially without permission.
          </p>
          <h2>Responsible use</h2>
          <p>
            Do not misuse the website, attempt unauthorized access, or send
            unlawful or harmful material. Third-party sites and email services
            operate under their own policies.
          </p>
          <h2>Availability and questions</h2>
          <p>
            We aim to keep the site accurate and available but cannot promise
            uninterrupted access. Contact{" "}
            <a href="mailto:opmudassir882@gmail.com">opmudassir882@gmail.com</a>{" "}
            with questions. Review these terms with appropriate professional
            advice before relying on them for a particular legal situation.
          </p>
        </section>
      )}
    </>
  );
}
