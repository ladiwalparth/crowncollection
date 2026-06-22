import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BRAND_NAME, SITE_URL, HERO_IMAGE } from "@/lib/config";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const revalidate = 60;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Crown Collection — Handcrafted Brass Artifacts",
    template: "%s | Crown Collection",
  },
  description:
    "Premium handcrafted brass artifacts for your home and temple. Order directly on WhatsApp.",
  openGraph: {
    type: "website",
    siteName: BRAND_NAME,
    url: SITE_URL,
    title: "Crown Collection — Handcrafted Brass Artifacts",
    description:
      "Premium handcrafted brass artifacts for your home and temple. Order directly on WhatsApp.",
    images: [{ url: HERO_IMAGE }],
  },
  // Google Search Console ownership tag — do not remove
  verification: { google: ["9ld7innA1pM7XYmoW1cuNGzmuIJ9BWINTv98OlmeNlQ","WMths6vPqrh69d95NNwRXN-IALMBP8dIetSFjWVA7tk"] },
  
  // old <meta name="google-site-verification" content="WMths6vPqrh69d95NNwRXN-IALMBP8dIetSFjWVA7tk" />
};

export const viewport: Viewport = {
  themeColor: "#F7F3EC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
