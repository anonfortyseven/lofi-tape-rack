import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { AudioPlayerProvider } from "@/contexts/AudioPlayerContext";
import { SearchProvider } from "@/contexts/SearchContext";
import { AudioPlayer } from "@/components/AudioPlayer";
import { CartDrawer } from "@/components/CartDrawer";
import { SearchModal } from "@/components/SearchModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Drift Tapes | Lofi Music Store",
  description: "Premium lofi beats and cassette tapes. Chill vibes, warm sounds, endless loops.",
  keywords: ["lofi", "music", "beats", "cassette", "tapes", "chill", "study", "relax"],
  openGraph: {
    title: "Drift Tapes | Lofi Music Store",
    description: "Premium lofi beats and cassette tapes. Chill vibes, warm sounds, endless loops.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-50`}
      >
        <AuthProvider>
          <CartProvider>
            <AudioPlayerProvider>
              <SearchProvider>
                {children}
                <AudioPlayer />
                <CartDrawer />
                <SearchModal />
              </SearchProvider>
            </AudioPlayerProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
