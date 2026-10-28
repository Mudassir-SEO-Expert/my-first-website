import { expect, test } from "@playwright/test";
const routes = [
  "/",
  "/about",
  "/services",
  "/services/web-development",
  "/services/e-commerce-development",
  "/services/software-development",
  "/services/seo",
  "/services/digital-marketing",
  "/portfolio",
  "/case-studies",
  "/blog",
  "/contact",
  "/privacy-policy",
  "/terms",
];
test("all public routes render meaningful headings, unique metadata and valid canonical paths", async ({
  page,
}) => {
  const titles = new Set<string>();
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("main h1")).toBeVisible();
    const title = await page.title();
    expect(titles.has(title)).toBe(false);
    titles.add(title);
    await expect(page.locator("link[rel=canonical]")).toHaveAttribute(
      "href",
      `http://localhost:3000${route === "/" ? "" : route}`,
    );
    await expect(page.locator("meta[name=description]")).toHaveAttribute(
      "content",
      /.{25,}/,
    );
  }
  await page.goto("/not-a-page");
  await expect(
    page.getByRole("heading", { name: "Let’s find a better direction." }),
  ).toBeVisible();
});
test("desktop services dropdown supports keyboard escape and links", async ({
  page,
}) => {
  await page.goto("/");
  const button = page.getByRole("button", { name: "Services", exact: true });
  await button.focus();
  await page.keyboard.press("Enter");
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(button).toBeFocused();
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await button.click();
  await page
    .getByRole("link", {
      name: "Web development A stronger digital first impression.",
    })
    .click();
  await expect(page).toHaveURL(/services\/web-development/);
});
test("mobile menu, nested escape and route changes work without horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      name: "Build smarter. Launch stronger. Grow further.",
    }),
  ).toBeVisible();
  const menu = page.getByRole("button", { name: /Menu/ });
  await menu.click();
  const services = page.getByRole("button", { name: "Services", exact: true });
  await services.click();
  await page.keyboard.press("Escape");
  await expect(services).toBeFocused();
  await expect(services).toHaveAttribute("aria-expanded", "false");
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await menu.click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "About", exact: true })
    .click();
  await expect(page).toHaveURL(/about/);
  await expect(page.getByRole("button", { name: /Menu/ })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  for (const path of ["/", "/services", "/portfolio", "/contact", "/blog"]) {
    await page.goto(path);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
});
test("manual themes persist, auto follows visitor local time, and animation can pause", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-06-15T12:00:00Z") });
  await page.goto("/");
  const theme = page.getByLabel("Color theme");
  await theme.selectOption("dark");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(theme).toHaveValue("dark");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await theme.selectOption("light");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await theme.selectOption("auto");
  const expected = await page.evaluate(() =>
    new Date().getHours() >= 7 && new Date().getHours() < 19 ? "light" : "dark",
  );
  await expect(page.locator("html")).toHaveAttribute("data-theme", expected);
  await page
    .getByRole("button", { name: "Pause decorative animation" })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "paused");
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Resume decorative animation" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page
      .locator(".growth-arrow")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
});
test("inquiry validates inputs and only prepares an authorized email draft", async ({
  page,
}) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Prepare my enquiry" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText(
    "valid email",
  );
  await expect(
    page.getByRole("link", { name: "Open email draft" }),
  ).toHaveCount(0);
  await page.getByLabel("Your name").fill("Example Visitor");
  await page.getByLabel("Email address").fill("person@example.com");
  await page
    .getByLabel("Tell us about your project")
    .fill("We need an accessible service website for our business.");
  await page.getByRole("button", { name: "Prepare my enquiry" }).click();
  await expect(
    page.getByRole("heading", { name: "Your email draft is ready" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Open email draft" }),
  ).toHaveAttribute("href", /^mailto:opmudassir882@gmail.com\?subject=/);
  await expect(
    page.getByText("Nothing has been sent.", { exact: false }),
  ).toBeVisible();
});
test("crawler endpoints and social card are available", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("/services/seo");
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain(
    "Sitemap: http://localhost:3000/sitemap.xml",
  );
  const image = await request.get("/opengraph-image");
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/png");
});
test("public internal links resolve to actual pages", async ({
  page,
  request,
}) => {
  await page.goto("/");
  const paths = await page
    .locator('a[href^="/"]')
    .evaluateAll((links) =>
      Array.from(new Set(links.map((a) => a.getAttribute("href")!))),
    );
  for (const path of paths) {
    expect((await request.get(path)).status(), path).toBe(200);
  }
});
test("screenshots and no hydration/runtime errors at mobile and desktop widths", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await page.getByLabel("Color theme").selectOption("light");
    await page.screenshot({
      path: `test-results/home-${width}-light.png`,
      fullPage: true,
    });
    await page.getByLabel("Color theme").selectOption("dark");
    await page.screenshot({
      path: `test-results/home-${width}-dark.png`,
      fullPage: true,
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  expect(errors).toEqual([]);
});
