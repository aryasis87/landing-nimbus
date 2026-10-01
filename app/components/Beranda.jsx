import Link from 'next/link';
import { FAQ as DAFTAR, INSIDEN, JENIS, KOMPONEN, PAKET, REGION, SLA, komponenByKode, persen, regionByKode, rp, tgl, uptime } from '@/lib/nimbus';
import { BilahUptime, SkalaHari } from './Status';

export function Hero() {
  return (
    <section className="px-6 pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <p className="status-label text-uptime">VPS · Object Storage · Jakarta, Batam, Surabaya</p>
          <h1 className="mt-5 text-[2.7rem] leading-[1.02] font-bold text-vapor sm:text-6xl">Server di Indonesia. Status yang tidak kami sembunyikan.</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed">
            Nimbus menyewakan VPS dan penyimpanan objek dari tiga region di Indonesia, ditagih per jam — dan menerbitkan laporan terbuka setiap kali ada yang rusak.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/harga" className="inline-flex justify-center rounded-lg bg-vapor px-7 py-4 font-semibold text-frost hover:bg-uptime">Hitung biaya server</Link>
            <Link href="/status" className="inline-flex justify-center rounded-lg border-2 border-vapor px-7 py-4 font-semibold text-vapor hover:bg-vapor hover:text-frost">Lihat uptime 90 hari</Link>
          </div>
        </div>
        <div className="rounded-2xl bg-vapor p-6 text-frost shadow-[0_30px_60px_-30px_rgb(14_17_22/0.6)] sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <p className="flex items-center gap-2.5 font-semibold"><span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#2fae74]" />Semua sistem normal</p>
            <p className="status-label text-frost/75">30 hari</p>
          </div>
          <ul className="mt-6 space-y-5">
            {KOMPONEN.slice(0, 3).map((k) => (
              <li key={k.kode}>
                <div className="mb-2 flex justify-between text-sm"><span>{k.nama}</span><span className="tabular-nums text-[#7ee2b0]">{persen(uptime(k.kode))}</span></div>
                <BilahUptime komponen={k.kode} hari={30} />
              </li>
            ))}
          </ul>
          <SkalaHari hari={30} />
          <Link href="/status" className="status-label mt-6 inline-block border-b border-frost/40 pb-1 text-frost hover:border-frost">Status lengkap & riwayat</Link>
        </div>
      </div>
    </section>
  );
}

export function Layanan() {
  return (
    <section id="layanan" className="scroll-mt-16 border-t border-vapor/10 bg-white px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="status-label text-uptime">Layanan</p>
        <h2 className="mt-4 max-w-2xl text-[2.2rem] leading-[1.06] font-bold text-vapor md:text-5xl">Lima komponen, semuanya di halaman status</h2>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-vapor/10 bg-vapor/10 md:grid-cols-2 lg:grid-cols-3">
          {KOMPONEN.map((k) => (
            <li key={k.kode} className="bg-white p-7">
              <p className="flex items-center justify-between gap-4">
                <span className="text-xl font-bold text-vapor">{k.nama}</span>
                <span className="status-label text-uptime tabular-nums">{persen(uptime(k.kode))}</span>
              </p>
              <p className="mt-3 leading-relaxed">{k.ket}</p>
            </li>
          ))}
          <li className="bg-frost p-7">
            <p className="text-xl font-bold text-vapor">Tiga region</p>
            <ul className="mt-3 space-y-2">
              {REGION.map((r) => <li key={r.kode}><span className="font-mono text-sm font-semibold text-vapor">{r.kode}</span> · {r.kota}</li>)}
            </ul>
          </li>
        </ul>
      </div>
    </section>
  );
}

export function HargaRingkas() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="status-label text-uptime">Harga VPS</p>
            <h2 className="mt-4 max-w-2xl text-[2.2rem] leading-[1.06] font-bold text-vapor md:text-5xl">Per jam, dengan batas atas bulanan</h2>
          </div>
          <Link href="/harga" className="status-label shrink-0 border-b-2 border-vapor pb-1 text-vapor">Buka kalkulator</Link>
        </div>
        <div className="mt-10 overflow-x-auto rounded-2xl border border-vapor/10 bg-white" tabIndex={0} role="region" aria-label="Tabel harga paket VPS">
          <table className="w-full min-w-[40rem] border-collapse text-left">
            <caption className="sr-only">Paket VPS Nimbus dan harganya</caption>
            <thead>
              <tr className="border-b border-vapor/10">
                {['Paket', 'vCPU', 'RAM', 'Disk NVMe', 'Transfer', 'Per bulan'].map((h) => <th key={h} scope="col" className="status-label px-5 py-4 text-frost-dim">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {PAKET.map((p) => (
                <tr key={p.slug} className="border-b border-vapor/10 last:border-0">
                  <th scope="row" className="px-5 py-4 font-bold text-vapor">{p.nama}<span className="block text-sm font-normal text-frost-dim">{p.cocok}</span></th>
                  <td className="px-5 py-4 tabular-nums">{p.vcpu}</td>
                  <td className="px-5 py-4 tabular-nums">{p.ram} GB</td>
                  <td className="px-5 py-4 tabular-nums">{p.disk} GB</td>
                  <td className="px-5 py-4 tabular-nums">{p.kuota} TB</td>
                  <td className="px-5 py-4 font-bold text-vapor tabular-nums">{rp(p.harga)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm">SLA Compute {SLA.target} per bulan; kredit otomatis bila meleset. Harga contoh purwarupa desain.</p>
      </div>
    </section>
  );
}

export function InsidenTerbaru() {
  const daftar = INSIDEN.filter((i) => i.jenis !== 'rawat').slice(0, 3);
  return (
    <section className="bg-vapor px-6 py-20 text-frost md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div>
          <p className="status-label text-[#7ee2b0]">Laporan insiden</p>
          <h2 className="mt-4 text-[2.2rem] leading-[1.06] font-bold text-frost md:text-5xl">Kalau rusak, kami tulis</h2>
          <p className="mt-5 max-w-md leading-relaxed text-frost/75">Setiap padam atau kinerja turun mendapat laporan dalam lima hari kerja: linimasa per menit, penyebab, dan apa yang kami ubah.</p>
        </div>
        <ul className="space-y-4">
          {daftar.map((i) => (
            <li key={i.slug}>
              <Link href={`/insiden/${i.slug}`} className="block rounded-2xl border border-frost/15 p-6 hover:border-frost/40">
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${JENIS[i.jenis].warna}`} />
                  <span className="status-label text-frost/75">{JENIS[i.jenis].nama} · {tgl(i.tanggal)} · {i.menit} menit · {i.region === 'semua' ? 'semua region' : regionByKode(i.region).kode}</span>
                </span>
                <span className="mt-3 block text-xl font-bold text-frost">{i.judul}</span>
                <span className="mt-2 block text-sm leading-relaxed text-frost/75">{komponenByKode(i.komponen).nama} — {i.ringkas}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-16 px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div>
          <p className="status-label text-uptime">Pertanyaan</p>
          <h2 className="mt-4 text-[2.2rem] leading-[1.06] font-bold text-vapor md:text-5xl">Sebelum memindahkan server</h2>
        </div>
        <div className="divide-y divide-vapor/10 rounded-2xl border border-vapor/10 bg-white">
          {DAFTAR.map((f) => (
            <details key={f.t} className="group px-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-bold text-vapor [&::-webkit-details-marker]:hidden">
                {f.t}
                <span aria-hidden="true" className="status-label text-uptime group-open:hidden">Buka</span>
                <span aria-hidden="true" className="status-label hidden text-uptime group-open:inline">Tutup</span>
              </summary>
              <p className="pb-6 leading-relaxed">{f.j}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
