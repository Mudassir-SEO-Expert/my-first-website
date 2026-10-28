"use client";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { services } from "@/lib/content";
function subscribePreferences(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("nexovate-preference", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("nexovate-preference", callback);
  };
}
function readPreference(key: string, fallback: string) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}
function savePreference(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
  window.dispatchEvent(new Event("nexovate-preference"));
}
export function Controls() {
  const [menu, setMenu] = useState(false);
  const [drop, setDrop] = useState(false);
  const mode = useSyncExternalStore(
    subscribePreferences,
    () => readPreference("nexovate-theme", "auto"),
    () => "auto",
  );
  const paused = useSyncExternalStore(
    subscribePreferences,
    () => readPreference("nexovate-motion", "running") === "paused",
    () => false,
  );
  const nav = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const servicesToggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function apply() {
      const current = readPreference("nexovate-theme", mode);
      const h = new Date().getHours();
      document.documentElement.dataset.theme =
        current === "light" || current === "dark"
          ? current
          : h >= 7 && h < 19
            ? "light"
            : "dark";
      document.documentElement.style.colorScheme =
        document.documentElement.dataset.theme!;
    }
    apply();
    const timer = setInterval(apply, 60000);
    return () => clearInterval(timer);
  }, [mode]);
  useEffect(() => {
    document.documentElement.dataset.motion =
      readPreference("nexovate-motion", "running") === "paused"
        ? "paused"
        : "running";
  }, [paused]);
  useEffect(() => {
    function key(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (drop) {
          setDrop(false);
          servicesToggle.current?.focus();
        } else if (menu) {
          setMenu(false);
          toggle.current?.focus();
        }
      }
    }
    function outside(e: PointerEvent) {
      if (nav.current && !nav.current.contains(e.target as Node)) {
        setDrop(false);
        setMenu(false);
      }
    }
    document.addEventListener("keydown", key);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", key);
      document.removeEventListener("pointerdown", outside);
    };
  }, [drop, menu]);
  function close() {
    setMenu(false);
    setDrop(false);
  }
  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Link
          className="brand"
          href="/"
          aria-label="Nexovate home"
          onClick={close}
        >
          <span className="brand-icon" aria-hidden="true">
            ↗
          </span>
          NEXOVATE<span className="brand-dot">.</span>
        </Link>
        <nav
          ref={nav}
          aria-label="Main navigation"
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setDrop(false);
          }}
        >
          <button
            ref={toggle}
            className="menu-toggle"
            aria-expanded={menu}
            aria-controls="main-links"
            onClick={() => setMenu(!menu)}
          >
            {menu ? "Close" : "Menu"} <span aria-hidden="true">☰</span>
          </button>
          <div id="main-links" className={`nav-links ${menu ? "is-open" : ""}`}>
            <Link href="/about" onClick={close}>
              About
            </Link>
            <div className="dropdown">
              <button
                ref={servicesToggle}
                aria-expanded={drop}
                aria-controls="services-menu"
                onClick={() => setDrop(!drop)}
              >
                Services <span aria-hidden="true">⌄</span>
              </button>
              <div id="services-menu" className="dropdown-panel" hidden={!drop}>
                <Link href="/services" onClick={close}>
                  <strong>Explore all services ↗</strong>
                  <span>Build a connected digital foundation.</span>
                </Link>
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    onClick={close}
                  >
                    <strong>{s.name}</strong>
                    <span>{s.short}</span>
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/portfolio" onClick={close}>
              Our work
            </Link>
            <Link href="/blog" onClick={close}>
              Insights
            </Link>
            <Link
              className="button button-small"
              href="/contact"
              onClick={close}
            >
              Let’s talk <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </nav>
        <div className="preferences">
          <label className="sr-only" htmlFor="theme">
            Color theme
          </label>
          <select
            id="theme"
            value={mode}
            onChange={(e) => savePreference("nexovate-theme", e.target.value)}
          >
            <option value="auto">Auto</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          <button
            className="motion-toggle"
            aria-pressed={paused}
            aria-label={
              paused
                ? "Resume decorative animation"
                : "Pause decorative animation"
            }
            onClick={() =>
              savePreference("nexovate-motion", paused ? "running" : "paused")
            }
          >
            {paused ? "▶" : "Ⅱ"}
          </button>
        </div>
      </div>
    </header>
  );
}
export function InquiryForm() {
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const [href, setHref] = useState("");
  return (
    <form
      onChange={() => setReady(false)}
      className="inquiry-form"
      onSubmit={(e) => {
        e.preventDefault();
        setReady(false);
        const data = new FormData(e.currentTarget);
        const name = String(data.get("name") || "").trim();
        const email = String(data.get("email") || "").trim();
        const message = String(data.get("message") || "").trim();
        if (
          name.length < 2 ||
          name.length > 100 ||
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
          email.length > 254 ||
          message.length < 20 ||
          message.length > 3000
        ) {
          setError(
            "Please enter your name, a valid email and a project outline of 20–3,000 characters.",
          );
          return;
        }
        setError("");
        setHref(
          `mailto:opmudassir882@gmail.com?subject=${encodeURIComponent("Nexovate project enquiry — " + String(data.get("service")))}&body=${encodeURIComponent(`Name: ${name}\nReply email: ${email}\n\n${message}`)}`,
        );
        setReady(true);
      }}
      noValidate
    >
      <div className="form-row">
        <label>
          Your name
          <input
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
          />
        </label>
      </div>
      <label>
        What can we help with?
        <select name="service">
          <option>Let’s explore the right fit</option>
          {services.map((s) => (
            <option key={s.slug}>{s.name}</option>
          ))}
          <option>Graphic, video or animation creative</option>
        </select>
      </label>
      <label>
        Tell us about your project
        <textarea
          name="message"
          rows={5}
          required
          minLength={20}
          maxLength={3000}
          placeholder="Your business, your goals and what you have in mind…"
        />
      </label>
      <p className="form-note">
        Your details stay in your browser. We’ll prepare an email for you to
        review and send using your email app.{" "}
        <Link href="/privacy-policy">Privacy policy</Link>
      </p>
      <button className="button" type="submit">
        Prepare my enquiry <span aria-hidden="true">↗</span>
      </button>
      <div aria-live="polite">
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        {ready && (
          <div className="email-ready">
            <h3>Your email draft is ready</h3>
            <p>
              Nothing has been sent. Open your email app, review the draft and
              send it to opmudassir882@gmail.com. If no email app opens, email
              that address directly.
            </p>
            <a className="text-link" href={href}>
              Open email draft ↗
            </a>
          </div>
        )}
      </div>
    </form>
  );
}
