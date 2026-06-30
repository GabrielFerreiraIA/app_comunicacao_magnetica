import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/app-shell";
import { SwRegister } from "@/components/sw-register";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/lib/config";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  applicationName: siteConfig.name,
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description:
    "Guia de bolso premium para comunicação magnética: voz, arquétipos, imagem, liderança e carisma. Por Hélia Gonçalves.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.shortName,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0b0612",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body className="h-dvh overflow-hidden antialiased bg-background">
        <div className="mx-auto flex h-dvh w-full max-w-md flex-col relative overflow-hidden">
          <AppShell>{children}</AppShell>
        </div>
        <Toaster position="top-center" />
        <SwRegister />
      </body>
    </html>
  );
}
