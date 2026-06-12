import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BRAND_NAME, SITE_URL, HERO_IMAGE } from "@/lib/config";

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
  // GOOGLE SEARCH CONSOLE (Day 13, Step 7):
  // when you have your verification code, remove the // from the next line
  // and paste your code between the quotes:
  // verification: { google: "paste-your-google-code-here" },
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
