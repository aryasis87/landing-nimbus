import { HARGA_STORAGE, HARGA_TRANSFER, SITE, SLA, rp } from '@/lib/nimbus';
import Kalkulator from '../components/Kalkulator';

export const metadata = {
  title: 'Harga & Kalkulator',
  description: 'Hitung biaya VPS, Object Storage, dan transfer Nimbus per bulan. Ditagih per jam dengan batas atas bulanan; SLA 99,95% dengan kredit otomatis.',
  alternates: { canonical: `${SITE}/harga` },
};

export default function Harga() {
  return (
    <main className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-6xl">
        <p className="status-label text-uptime">Harga</p>
        <h1 className="mt-4 max-w-3xl text-[2.7rem] leading-[1.02] font-bold text-vapor md:text-6xl">Hitung dulu, baru pindah</h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed">Tiga hal yang ditagih: server per jam, penyimpanan per GB, dan transfer keluar di atas kuota. Tidak ada biaya per permintaan atau biaya IP publik.</p>

        <div className="mt-12"><Kalkulator /></div>

        <div className="mt-20 grid gap-8 md:grid-cols-2">
          <section aria-labelledby="satuan" className="rounded-2xl border border-vapor/10 bg-white p-7">
            <h2 id="satuan" className="text-2xl font-bold text-vapor">Harga satuan</h2>
            <dl className="mt-5 divide-y divide-vapor/10">
              {[['Object Storage', `${rp(HARGA_STORAGE)} per GB per bulan`], ['Transfer di atas kuota', `${rp(HARGA_TRANSFER)} per GB`], ['Transfer masuk', 'Gratis'], ['IP publik IPv4 & IPv6', 'Termasuk di tiap VPS'], ['Cadangan harian VPS', '20% dari harga paket']].map(([t, d]) => (
                <div key={t} className="flex justify-between gap-4 py-3"><dt>{t}</dt><dd className="text-right font-semibold text-vapor">{d}</dd></div>
              ))}
            </dl>
          </section>
          <section aria-labelledby="sla" className="rounded-2xl bg-vapor p-7 text-frost">
            <h2 id="sla" className="text-2xl font-bold text-frost">SLA {SLA.target} per bulan</h2>
            <p className="mt-3 leading-relaxed text-frost/75">Berlaku untuk Compute dan Load Balancer. Kredit dipotong otomatis dari tagihan berikutnya, dihitung dari menit padam di halaman status.</p>
            <dl className="mt-5 divide-y divide-frost/15">
              {SLA.kredit.map(([t, d]) => (
                <div key={t} className="flex justify-between gap-4 py-3"><dt className="text-frost/85">Uptime bulanan {t.toLowerCase()}</dt><dd className="font-bold text-[#7ee2b0]">kredit {d}</dd></div>
              ))}
            </dl>
          </section>
        </div>
      </div>
    </main>
  );
}
