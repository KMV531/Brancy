import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: 'Page Not Found | Brancy – Beauty & Self-Care Experts',
  description:
    'Oops! The page you are looking for doesn’t exist or has been moved. Explore Brancy’s premium beauty and self-care products to find what you need.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Explicit link fallback (optional, Next will auto inject from metadata too) */}
        <link rel="icon" href="/assets/logo.webp" type="image/webp" />
      </head>
      <body className={`${poppins.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}