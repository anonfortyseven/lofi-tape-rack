import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { AudioPlayerProvider } from "@/contexts/AudioPlayerContext";
import { SearchProvider } from "@/contexts/SearchContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { AudioPlayer } from "@/components/AudioPlayer";
import { CartDrawer } from "@/components/CartDrawer";
import { SearchModal } from "@/components/SearchModal";
import { ToastContainer } from "@/components/Toast";
import { OrganizationJsonLd, WebSiteJsonLd, MusicStoreJsonLd } from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = "https://drifttapes.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Drift Tapes | Premium Lofi Music Downloads",
    template: "%s | Drift Tapes",
  },
  description: "Discover and download premium lofi music from independent artists worldwide. High-quality study beats, chill hip hop, and ambient music for focus and relaxation.",
  keywords: ["lofi", "lofi music", "lofi beats", "study music", "chill beats", "lofi hip hop", "ambient music", "focus music", "relaxation music", "cassette tapes", "music download"],
  authors: [{ name: "Drift Tapes" }],
  creator: "Drift Tapes",
  publisher: "Drift Tapes",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Drift Tapes",
    title: "Drift Tapes | Premium Lofi Music Downloads",
    description: "Discover and download premium lofi music from independent artists worldwide. High-quality study beats, chill hip hop, and ambient music.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Drift Tapes - Premium Lofi Music",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Drift Tapes | Premium Lofi Music Downloads",
    description: "Discover and download premium lofi music from independent artists worldwide.",
    images: ["/og-image.png"],
    creator: "@drifttapes",
  },
  alternates: {
    canonical: baseUrl,
  },
  category: "music",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#09090b" />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <MusicStoreJsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-50`}
      >
        <AuthProvider>
          <ToastProvider>
            <CartProvider>
              <AudioPlayerProvider>
                <SearchProvider>
                  {children}
                  <AudioPlayer />
                  <CartDrawer />
                  <SearchModal />
                  <ToastContainer />
                </SearchProvider>
              </AudioPlayerProvider>
            </CartProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
