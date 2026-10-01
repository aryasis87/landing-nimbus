import { Space_Grotesk, Inter } from "next/font/google";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";
import "./globals.css";

const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"], weight: ["500", "600", "700"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const __jsonld = {"@context":"https://schema.org","@type":"Organization","name":"Nimbus","description":"VPS dan Object Storage dari tiga region di Indonesia","url":"https://landing-nimbus.vercel.app"};

export const metadata = {
  metadataBase: new URL("https://landing-nimbus.vercel.app"),
  title: { default: "Nimbus — Server di Indonesia, Status yang Terbuka", template: "%s — Nimbus" },
  description: "Nimbus: VPS dan Object Storage dari Jakarta, Batam, dan Surabaya, ditagih per jam. Uptime 90 hari, laporan insiden terbuka, dan kalkulator harga.",
  applicationName: "Nimbus Cloud",
  keywords: ["vps indonesia", "cloud server jakarta", "object storage s3 indonesia", "vps per jam", "status uptime"],
  authors: [{ name: "Nimbus Cloud" }],
  creator: "Nimbus Cloud",
  publisher: "Nimbus Cloud",
  alternates: { canonical: "https://landing-nimbus.vercel.app" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://landing-nimbus.vercel.app",
    siteName: "Nimbus Cloud",
    title: "Nimbus — Server di Indonesia, Status yang Terbuka",
    description: "Nimbus: VPS dan Object Storage dari Jakarta, Batam, dan Surabaya, ditagih per jam. Uptime 90 hari, laporan insiden terbuka, dan kalkulator harga.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Nimbus — Server di Indonesia, Status yang Terbuka" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nimbus — Server di Indonesia, Status yang Terbuka",
    description: "Nimbus: VPS dan Object Storage dari Jakarta, Batam, dan Surabaya, ditagih per jam. Uptime 90 hari, laporan insiden terbuka, dan kalkulator harga.",
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
        <a href="#konten" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-vapor focus:px-4 focus:py-2 focus:text-frost">Lompat ke konten</a>
        <SiteHeader />
        <div id="konten">{children}</div>
        <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__jsonld) }} />
        </body>
    </html>
  );
}
