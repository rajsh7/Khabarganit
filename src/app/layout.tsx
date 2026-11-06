import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.khabarganit.com"),
  title: {
    default: "KhabarGanit.com",
    template: "%s | KhabarGanit.com",
  },
  description:
    "KhabarGanit.com — हर ख़बर की कहानी, आँकड़ों की जुबानी। भारत का प्रमुख डेटा-संचालित समाचार पोर्टल।",
  keywords: [
    "KhabarGanit.com",
    "KhabarGanit",
    "Khabar Ganit",
    "ख़बरगणित",
    "खबरगणित",
    "khabarganit.com",
    "समाचार",
    "हिंदी समाचार",
    "हिंदी न्यूज़",
  ],
  authors: [{ name: "KhabarGanit.com", url: "https://www.khabarganit.com" }],
  creator: "KhabarGanit.com",
  publisher: "KhabarGanit.com",
  applicationName: "KhabarGanit.com",
  alternates: {
    canonical: "https://www.khabarganit.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "KhabarGanit.com",
    description: "KhabarGanit.com — हर ख़बर की कहानी, आँकड़ों की जुबानी।",
    url: "https://www.khabarganit.com",
    siteName: "KhabarGanit.com",
    locale: "hi_IN",
    type: "website",
    images: [
      {
        url: "https://www.khabarganit.com/logo.png",
        width: 1200,
        height: 630,
        alt: "KhabarGanit.com",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KhabarGanit.com",
    description: "KhabarGanit.com — हर ख़बर की कहानी, आँकड़ों की जुबानी।",
    site: "@khabarGanit",
    creator: "@khabarGanit",
    images: ["https://www.khabarganit.com/logo.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.khabarganit.com/#website",
      "url": "https://www.khabarganit.com",
      "name": "KhabarGanit.com",
      "alternateName": ["KhabarGanit", "ख़बरगणित", "खबरगणित"],
      "description": "हर ख़बर की कहानी, आँकड़ों की जुबानी।",
      "publisher": { "@id": "https://www.khabarganit.com/#organization" },
      "inLanguage": "hi-IN"
    },
    {
      "@type": "NewsMediaOrganization",
      "@id": "https://www.khabarganit.com/#organization",
      "name": "KhabarGanit.com",
      "alternateName": ["KhabarGanit", "ख़बरगणित", "खबरगणित"],
      "url": "https://www.khabarganit.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.khabarganit.com/logo.png",
        "caption": "KhabarGanit.com",
        "width": 1200,
        "height": 630
      },
      "slogan": "हर ख़बर की कहानी, आँकड़ों की जुबानी",
      "sameAs": [
        "https://x.com/khabarGanit",
        "https://www.instagram.com/khabarganit",
        "https://www.youtube.com/@KhabarGanit",
        "https://khabarganit.com"
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" dir="ltr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        {/* Structured Data for Google Search Indexing */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
