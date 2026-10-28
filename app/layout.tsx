import type { Metadata } from "next";
import { Controls } from "@/components/controls";
import { Footer } from "@/components/site";
import { siteUrl } from "@/lib/site";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Nexovate | Build smarter. Grow further.",
    template: "%s | Nexovate",
  },
  description:
    "Custom websites, e-commerce platforms, software, SEO and digital marketing built around your business goals.",
  icons: { icon: "/icon.svg" },
};
const themeInit = `try{var m=localStorage.getItem('nexovate-theme')||'auto',h=new Date().getHours(),t=m==='light'||m==='dark'?m:(h>=7&&h<19?'light':'dark');document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;document.documentElement.dataset.motion=localStorage.getItem('nexovate-motion')==='paused'?'paused':'running'}catch(e){}`;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Controls />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
