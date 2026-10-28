import Link from "next/link";
export default function NotFound() {
  return (
    <section className="container section empty-state">
      <h1>Let’s find a better direction.</h1>
      <p>This page isn’t here. Explore our services or head back home.</p>
      <Link className="button" href="/">
        Back to Nexovate ↗
      </Link>
    </section>
  );
}
