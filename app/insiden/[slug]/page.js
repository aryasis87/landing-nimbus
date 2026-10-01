import Link from 'next/link';
import { notFound } from 'next/navigation';
import { INSIDEN, JENIS, SITE, insidenBySlug, komponenByKode, regionByKode, tgl } from '@/lib/nimbus';

export function generateStaticParams() {
  return INSIDEN.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const i = insidenBySlug(slug);
  if (!i) return {};
  return {
    title: `Laporan: ${i.judul}`,
    description: `${tgl(i.tanggal)} · ${i.menit} menit · ${i.ringkas}`,
    alternates: { canonical: `${SITE}/insiden/${i.slug}` },
  };
}

export default async function Insiden({ params }) {
  const { slug } = await params;
  const i = insidenBySlug(slug);
  if (!i) notFound();
  const lain = INSIDEN.filter((x) => x.slug !== i.slug).slice(0, 2);

  return (
    <main className="px-6 pt-28 pb-24">
      <article className="mx-auto max-w-3xl">
        <nav aria-label="Remah roti" className="status-label flex flex-wrap gap-2 text-frost-dim">
          <Link href="/status" className="text-uptime hover:text-vapor">Status</Link>
          <span aria-hidden="true">/</span>
          <Link href="/status#riwayat" className="text-uptime hover:text-vapor">Riwayat insiden</Link>
        </nav>
        <p className="mt-8 flex flex-wrap items-center gap-2.5">
          <span aria-hidden="true" className={`h-3 w-3 rounded-full ${JENIS[i.jenis].warna}`} />
          <span className="status-label text-vapor">{JENIS[i.jenis].nama}</span>
        </p>
        <h1 className="mt-3 text-[2.4rem] leading-[1.05] font-bold text-vapor md:text-5xl">{i.judul}</h1>
        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-vapor/10 bg-vapor/10 sm:grid-cols-4">
          {[
            ['Tanggal', tgl(i.tanggal, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })],
            ['Mulai', `${i.mulai} WIB`],
            ['Durasi', `${i.menit} menit`],
            ['Lingkup', `${komponenByKode(i.komponen).nama}, ${i.region === 'semua' ? 'semua region' : regionByKode(i.region).kode}`],
          ].map(([t, d]) => (
            <div key={t} className="bg-white p-4">
              <dt className="status-label text-frost-dim">{t}</dt>
              <dd className="mt-1 font-semibold text-vapor">{d}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-10 text-xl leading-relaxed text-vapor">{i.ringkas}</p>

        <h2 className="mt-12 text-2xl font-bold text-vapor">Dampak</h2>
        <p className="mt-3 leading-relaxed">{i.dampak}</p>

        <h2 className="mt-12 text-2xl font-bold text-vapor">Linimasa (WIB)</h2>
        <ol className="mt-5 rounded-2xl bg-vapor p-6 font-mono text-sm text-frost">
          {i.linimasa.map(([j, t]) => (
            <li key={j + t} className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-3 border-b border-frost/10 py-3 first:pt-0 last:border-0 last:pb-0">
              <span className="text-[#7ee2b0]">{j}</span>
              <span className="font-sans leading-relaxed text-frost/90">{t}</span>
            </li>
          ))}
        </ol>

        <h2 className="mt-12 text-2xl font-bold text-vapor">Penyebab</h2>
        <p className="mt-3 leading-relaxed">{i.penyebab}</p>

        <h2 className="mt-12 text-2xl font-bold text-vapor">Yang kami ubah</h2>
        <ul className="mt-5 space-y-3">
          {i.tindakan.map(([t, s]) => (
            <li key={t} className="flex items-start justify-between gap-4 rounded-xl border border-vapor/10 bg-white p-4">
              <span className="leading-relaxed text-vapor">{t}</span>
              <span className={`status-label shrink-0 rounded-full px-2.5 py-1 ${s === 'selesai' ? 'bg-uptime/10 text-uptime' : 'bg-[#fff4d6] text-[#7a5300]'}`}>{s}</span>
            </li>
          ))}
        </ul>

        <p className="mt-12 border-t border-vapor/10 pt-6 text-sm">Laporan ini contoh purwarupa desain; insiden dan angkanya fiktif.</p>

        {lain.length > 0 && (
          <nav aria-label="Laporan lain" className="mt-10">
            <p className="status-label text-frost-dim">Laporan lain</p>
            <ul className="mt-3 space-y-2">
              {lain.map((x) => <li key={x.slug}><Link href={`/insiden/${x.slug}`} className="font-semibold text-vapor underline decoration-vapor/30 underline-offset-4 hover:text-uptime">{x.judul}</Link> <span className="text-sm">· {tgl(x.tanggal)}</span></li>)}
            </ul>
          </nav>
        )}
      </article>
    </main>
  );
}
