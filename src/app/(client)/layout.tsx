import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import Header from "@/components/(Header)/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Brancy - Beauty Salon for Hair, Nails, Skin & Wellness",
  description:
    "Brancy is your trusted beauty salon offering expert hair styling, nail care, facials and spa treatments. Experience beauty and wellness in one place.",
  keywords: [
    "beauty salon",
    "Brancy",
    "hair styling",
    "nail salon",
    "facials",
    "skin care",
    "spa treatments",
    "self-care",
    "wellness",
    "haircuts",
  ],
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
  openGraph: {
    title: "Brancy - Professional Beauty Salon Services",
    description:
      "Discover Brancy’s top-tier haircuts, manicures, facials and spa treatments. Relax, refresh and enhance your natural beauty.",
    url: `${process.env.NEXT_PUBLIC_URL}`,
    siteName: "Brancy",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_URL}/assets/logo.webp`, // Update with your actual OG image
        width: 1200,
        height: 630,
        alt: "Brancy beauty salon services - hair, nails, skincare",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brancy - Beauty Salon for Hair, Nails, and Skin",
    description:
      "Visit Brancy salon for expert haircuts, nail art, facials, and wellness treatments. Book your appointment online today.",
    images: [`${process.env.NEXT_PUBLIC_URL}/assets/logo.webp`],
  },
  icons: {
    icon: "/assets/logo.webp",
    shortcut: "/assets/logo.webp",
    apple: "/assets/logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <head>
          {/* ✅ Explicit link fallback (optional, Next will auto inject from metadata too) */}
          <link rel="icon" href="/assets/logo.webp" type="image/webp+xml" />
        </head>
        <body className={`${poppins.className} antialiased`}>
          <Header />
          {children}
          <BackToTop />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
