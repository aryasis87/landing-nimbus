import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"], weight: ["500", "600", "700"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const __jsonld = {"@context":"https://schema.org","@type":"Organization","name":"Nimbus Cloud","description":"Layanan cloud untuk bisnis","url":"https://landing-nimbus.vercel.app"};

export const metadata = {
  metadataBase: new URL("https://landing-nimbus.vercel.app"),
  title: "Nimbus Cloud — Cloud Tercepat & Teraman untuk Bisnis",
  description: "Tingkatkan efisiensi bisnismu dengan layanan cloud tercepat & paling aman. Coba Nimbus Cloud gratis 14 hari.",
  applicationName: "Nimbus Cloud",
  keywords: ["cloud", "layanan cloud", "cloud bisnis", "SaaS", "cloud hosting"],
  authors: [{ name: "Nimbus Cloud" }],
  creator: "Nimbus Cloud",
  publisher: "Nimbus Cloud",
  alternates: { canonical: "https://landing-nimbus.vercel.app" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://landing-nimbus.vercel.app",
    siteName: "Nimbus Cloud",
    title: "Nimbus Cloud — Cloud Tercepat & Teraman untuk Bisnis",
    description: "Tingkatkan efisiensi bisnismu dengan layanan cloud tercepat & paling aman. Coba Nimbus Cloud gratis 14 hari.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Nimbus Cloud — Cloud Tercepat & Teraman untuk Bisnis" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nimbus Cloud — Cloud Tercepat & Teraman untuk Bisnis",
    description: "Tingkatkan efisiensi bisnismu dengan layanan cloud tercepat & paling aman. Coba Nimbus Cloud gratis 14 hari.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${grotesk.variable} ${inter.variable} antialiased`}>
        {children}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__jsonld) }} />
        </body>
    </html>
  );
}
