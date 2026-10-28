import type { MetadataRoute } from "next";
import { services } from "@/lib/content";
import { siteUrl } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "about",
    "services",
    "portfolio",
    "case-studies",
    "blog",
    "contact",
    "privacy-policy",
    "terms",
    ...services.map((s) => `services/${s.slug}`),
  ].map((path) => ({ url: new URL(`/${path}`, siteUrl).href }));
}
