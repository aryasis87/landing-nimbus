import Link from 'next/link';
import { PERAWATAN } from '@/lib/nimbus';

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-vapor/10 bg-frost/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <Link href="/" className="font-[family-name:var(--font-grotesk)] text-xl font-bold tracking-tight text-vapor">Nimbus</Link>
        <nav aria-label="Navigasi utama" className="hidden items-center gap-8 md:flex">
          {[['/#layanan', 'Layanan'], ['/harga', 'Harga'], ['/status', 'Status'], ['/#faq', 'FAQ']].map(([h, l]) => (
            <Link key={h} href={h} className="text-sm font-semibold text-frost-dim hover:text-vapor">{l}</Link>
          ))}
        </nav>
        <Link href="/status" className="flex items-center gap-2 rounded-full border border-uptime/25 bg-white px-3.5 py-2 text-sm font-semibold text-uptime hover:border-uptime">
          <span aria-hidden="true" className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-uptime opacity-50" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-uptime" />
          </span>
          Semua sistem normal
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const p = PERAWATAN[0];
  return (
    <footer className="bg-vapor px-6 text-frost">
      <div className="mx-auto grid max-w-6xl gap-10 py-14 md:grid-cols-[minmax(0,1.4fr)_repeat(2,minmax(0,1fr))]">
        <div>
          <p className="font-[family-name:var(--font-grotesk)] text-2xl font-bold">Nimbus</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-frost/75">VPS dan penyimpanan objek dari Jakarta, Batam, dan Surabaya — dengan halaman status dan laporan insiden yang terbuka.</p>
          {p && <p className="status-label mt-6 leading-[1.8] text-[#8fb4ff]">Perawatan berikutnya · {p.jam} · {p.judul}</p>}
        </div>
        <nav aria-label="Produk">
          <p className="status-label mb-4 text-frost/75">Produk</p>
          <ul className="space-y-2.5 text-sm text-frost/75">
            <li><Link href="/#layanan" className="hover:text-frost">Layanan</Link></li>
            <li><Link href="/harga" className="hover:text-frost">Harga & kalkulator</Link></li>
          </ul>
        </nav>
        <nav aria-label="Keterbukaan">
          <p className="status-label mb-4 text-frost/75">Keterbukaan</p>
          <ul className="space-y-2.5 text-sm text-frost/75">
            <li><Link href="/status" className="hover:text-frost">Status & uptime 90 hari</Link></li>
            <li><Link href="/status#riwayat" className="hover:text-frost">Laporan insiden</Link></li>
          </ul>
        </nav>
      </div>
      <p className="status-label mx-auto max-w-6xl border-t border-frost/15 py-6 leading-[1.9] text-frost/70">© 2026 Nimbus · Region, harga, insiden, dan angka uptime adalah contoh purwarupa desain</p>
    </footer>
  );
}
