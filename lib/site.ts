import type { Metadata } from "next";
export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
);
export function metadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | Nexovate`,
      description,
      url: path,
      type: "website",
      siteName: "Nexovate",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
