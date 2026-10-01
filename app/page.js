import { FAQ, HargaRingkas, Hero, InsidenTerbaru, Layanan } from "./components/Beranda";

export default function Home() {
  return (
    <main>
      <Hero />
      <Layanan />
      <HargaRingkas />
      <InsidenTerbaru />
      <FAQ />
    </main>
  );
}
