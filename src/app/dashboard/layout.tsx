export const metadata = {
  title: "Brancy - Beauty Salon for Hair, Nails, Skin & Wellness",
  description:
    "Brancy is your trusted beauty salon offering expert hair styling, nail care, facials and spa treatments. Experience beauty and wellness in one place.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}