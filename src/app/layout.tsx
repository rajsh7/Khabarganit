import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "खबरगणित — हर ख़बर की कहानी, आँकड़ों की ज़ुबानी",
  description: "खबरगणित — भारत का प्रमुख डेटा-संचालित समाचार पोर्टल। हर ख़बर की कहानी, आँकड़ों की ज़ुबानी।",
  keywords: "खबर, समाचार, न्यूज़, हिंदी न्यूज़, भारत, राजनीति, खेल, व्यापार, खबरगणित",
  icons: {
    icon: [
      { url: "/favicon.ico?v=5", sizes: "any" },
      { url: "/favicon.png?v=5", type: "image/png" },
      { url: "/icon.png?v=5", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=5",
    apple: [
      { url: "/apple-touch-icon.png?v=5", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon.png?v=5", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    siteName: "खबरगणित",
    type: "website",
    locale: "hi_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" dir="ltr">
      <head>
        <link rel="icon" href="/favicon.ico?v=5" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png?v=5" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png?v=5" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=5" />
        {/* Flaticon UIcons CDN for interface icons */}
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/2.6.0/uicons-regular-rounded/css/uicons-regular-rounded.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/2.6.0/uicons-bold-rounded/css/uicons-bold-rounded.css"
        />
        {/* Google Fonts - Playfair Display & Devanagari Broadsheet Serif (Martel & Noto Serif Devanagari) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Martel:wght@700;800;900&family=Noto+Serif+Devanagari:wght@500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
