import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"], weight: ["500", "600", "700"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata = {
  title: "Nimbus Cloud — Cloud Tercepat & Teraman untuk Bisnis",
  description: "Tingkatkan efisiensi bisnis Anda dengan layanan cloud tercepat & paling aman. Coba Nimbus Cloud gratis selama 14 hari!",
  keywords: "cloud computing, hosting cloud terbaik, server cloud cepat, layanan cloud aman, cloud bisnis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${grotesk.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
