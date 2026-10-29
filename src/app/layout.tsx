import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.khabarganit.com"),
  title: {
    default: "ख़बरगणित | हर ख़बर की कहानी, आँकड़ों की जुबानी",
    template: "%s | ख़बरगणित",
  },
  description:
    "ख़बरगणित (KhabarGanit) — भारत का प्रमुख डेटा-संचालित राष्ट्रीय और अंतर्राष्ट्रीय समाचार पोर्टल। हर ख़बर की कहानी, आँकड़ों की जुबानी। ब्रेकिंग न्यूज़, राजनीति, व्यापार, तकनीक और खेल।",
  keywords: [
    "ख़बरगणित",
    "खबरगणित",
    "KhabarGanit",
    "khabarganit.com",
    "समाचार",
    "हिंदी समाचार",
    "हिंदी न्यूज़",
    "ताज़ा ख़बरें",
    "डेटा पत्रकारिता",
    "भारत",
    "राजनीति",
    "व्यापार",
    "तकनीक",
    "खेल",
    "Breaking News Hindi",
  ],
  authors: [{ name: "KhabarGanit Editorial Board", url: "https://www.khabarganit.com" }],
  creator: "KhabarGanit",
  publisher: "ख़बरगणित",
  applicationName: "ख़बरगणित",
  alternates: {
    canonical: "https://www.khabarganit.com",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=8", sizes: "any" },
      { url: "/favicon.png?v=8", type: "image/png", sizes: "32x32" },
      { url: "/icon.png?v=8", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico?v=8",
    apple: [
      { url: "/apple-touch-icon.png?v=8", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon.png?v=8", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "ख़बरगणित | हर ख़बर की कहानी, आँकड़ों की जुबानी",
    description:
      "ख़बरगणित (KhabarGanit) — भारत का प्रमुख डेटा-संचालित समाचार पोर्टल। हर ख़बर की कहानी, आँकड़ों की जुबानी।",
    url: "https://www.khabarganit.com",
    siteName: "ख़बरगणित",
    locale: "hi_IN",
    type: "website",
    images: [
      {
        url: "https://www.khabarganit.com/logo.png",
        width: 1200,
        height: 630,
        alt: "ख़बरगणित - हर ख़बर की कहानी, आँकड़ों की जुबानी",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ख़बरगणित | हर ख़बर की कहानी, आँकड़ों की जुबानी",
    description:
      "ख़बरगणित (KhabarGanit) — भारत का प्रमुख डेटा-संचालित समाचार पोर्टल। हर ख़बर की कहानी, आँकड़ों की जुबानी।",
    site: "@khabarGanit",
    creator: "@khabarGanit",
    images: ["https://www.khabarganit.com/logo.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "NewsMediaOrganization",
      "@id": "https://www.khabarganit.com/#organization",
      "name": "ख़बरगणित",
      "alternateName": ["KhabarGanit", "Khabar Ganit", "KhabarGanit.com", "खबरगणित"],
      "url": "https://www.khabarganit.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.khabarganit.com/logo.png",
        "caption": "ख़बरगणित — हर ख़बर की कहानी, आँकड़ों की जुबानी",
        "width": 1200,
        "height": 630
      },
      "slogan": "हर ख़बर की कहानी, आँकड़ों की जुबानी",
      "description": "भारत का प्रमुख डेटा-संचालित राष्ट्रीय और अंतर्राष्ट्रीय समाचार पोर्टल।",
      "sameAs": [
        "https://x.com/khabarGanit",
        "https://www.instagram.com/khabarganit",
        "https://www.youtube.com/@KhabarGanit",
        "https://khabarganit.com"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.khabarganit.com/#website",
      "url": "https://www.khabarganit.com",
      "name": "ख़बरगणित",
      "alternateName": "KhabarGanit",
      "description": "भारत का प्रमुख डेटा-संचालित राष्ट्रीय और अंतर्राष्ट्रीय समाचार पोर्टल। हर ख़बर की कहानी, आँकड़ों की जुबानी।",
      "publisher": { "@id": "https://www.khabarganit.com/#organization" },
      "inLanguage": "hi-IN"
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
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png?v=8" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png?v=8" />
        <link rel="icon" href="/favicon.ico?v=8" sizes="any" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=8" />
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
