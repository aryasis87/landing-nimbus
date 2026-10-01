import Link from 'next/link';
import { INSIDEN, JENIS, KOMPONEN, PERAWATAN, REGION, SITE, komponenByKode, persen, regionByKode, tgl, uptime } from '@/lib/nimbus';
import { BilahUptime, Legenda, SkalaHari } from '../components/Status';

export const metadata = {
  title: 'Status & Uptime 90 Hari',
  description: 'Status terkini dan uptime 90 hari tiap komponen Nimbus — Compute, Object Storage, Load Balancer, DNS, dan Dasbor — beserta perawatan terjadwal dan riwayat insiden.',
  alternates: { canonical: `${SITE}/status` },
};

export default function Status() {
  return (
    <main className="px-6 pt-28 pb-24">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-6 rounded-2xl bg-uptime p-7 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold md:text-4xl">Semua sistem normal</h1>
            <p className="mt-1 text-white/90">Diperbarui 30 Sep 2026, 23.59 WIB · contoh purwarupa</p>
          </div>
          <p className="status-label text-white/90">{REGION.map((r) => r.kode).join(' · ')}</p>
        </div>

        {PERAWATAN.map((p) => (
          <section key={p.judul} aria-label="Perawatan terjadwal" className="mt-6 rounded-2xl border border-[#5b8def]/40 bg-[#eef3ff] p-6">
            <p className="status-label text-[#1e4fae]">Perawatan terjadwal · {tgl(p.tanggal, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · {p.jam}</p>
            <h2 className="mt-2 text-xl font-bold text-vapor">{p.judul}</h2>
            <p className="mt-1 leading-relaxed">{komponenByKode(p.komponen).nama} {regionByKode(p.region).kode}. {p.dampak}</p>
          </section>
        ))}

        <section aria-labelledby="komponen" className="mt-10 rounded-2xl bg-vapor p-6 text-frost sm:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 id="komponen" className="text-2xl font-bold text-frost">Uptime 90 hari</h2>
            <div className="text-frost/85"><Legenda /></div>
          </div>
          <ul className="mt-8 space-y-8">
            {KOMPONEN.map((k) => (
              <li key={k.kode}>
                <div className="mb-2.5 flex items-baseline justify-between gap-4">
                  <h3 className="font-bold text-frost">{k.nama}</h3>
                  <span className="tabular-nums text-[#7ee2b0]">{persen(uptime(k.kode))}</span>
                </div>
                <BilahUptime komponen={k.kode} tautan />
                <SkalaHari />
              </li>
            ))}
          </ul>
          <p className="mt-8 border-t border-frost/15 pt-5 text-sm leading-relaxed text-frost/75">Persentase dihitung dari menit padam. Perawatan terjadwal yang diumumkan minimal tujuh hari sebelumnya dan kinerja turun tidak mengurangi uptime, tetapi tetap ditandai dan dilaporkan.</p>
        </section>

        <section id="riwayat" aria-labelledby="riwayat-h" className="mt-16 scroll-mt-24">
          <h2 id="riwayat-h" className="text-3xl font-bold text-vapor">Riwayat insiden</h2>
          <ol className="mt-8 border-l-2 border-vapor/15">
            {INSIDEN.map((i) => (
              <li key={i.slug} className="relative pb-8 pl-8 last:pb-0">
                <span aria-hidden="true" className={`absolute top-1.5 -left-[7px] h-3 w-3 rounded-full ring-4 ring-frost ${JENIS[i.jenis].warna}`} />
                <p className="status-label text-frost-dim">{tgl(i.tanggal, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · {i.mulai} WIB · {i.menit} menit</p>
                <h3 className="mt-2 text-xl font-bold text-vapor"><Link href={`/insiden/${i.slug}`} className="hover:text-uptime">{i.judul}</Link></h3>
                <p className="mt-1 text-sm"><span className="font-semibold text-vapor">{JENIS[i.jenis].nama}</span> · {komponenByKode(i.komponen).nama} · {i.region === 'semua' ? 'semua region' : regionByKode(i.region).kota}</p>
                <p className="mt-2 max-w-2xl leading-relaxed">{i.ringkas}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
