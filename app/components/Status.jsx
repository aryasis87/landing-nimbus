import Link from 'next/link';
import { HARI, JENIS, persen, riwayat, tgl, uptime } from '@/lib/nimbus';

/* Bilah uptime bergaya halaman status: satu batang per hari. Batang bersifat
   dekoratif (aria-hidden); ringkasannya dibacakan sebagai teks. */
export function BilahUptime({ komponen, hari = 90, tautan = false }) {
  const data = riwayat(komponen).slice(-hari);
  const bermasalah = data.filter((d) => d.status !== 'ok');
  return (
    <div>
      <div aria-hidden="true" className="flex h-9 items-stretch gap-[2px]">
        {data.map((d) => {
          const isi = <span className={`block h-full rounded-[2px] ${JENIS[d.status].warna}`} />;
          return (
            <span key={d.tanggal} title={`${tgl(d.tanggal)} · ${JENIS[d.status].nama}`} className="flex-1">
              {tautan && d.insiden[0] ? <Link href={`/insiden/${d.insiden[0].slug}`} tabIndex={-1} className="block h-full">{isi}</Link> : isi}
            </span>
          );
        })}
      </div>
      <p className="sr-only">
        {persen(uptime(komponen))} tersedia dalam {hari} hari terakhir; {bermasalah.length ? `${bermasalah.length} hari dengan catatan: ${bermasalah.map((d) => `${tgl(d.tanggal)} (${JENIS[d.status].nama.toLowerCase()})`).join(', ')}` : 'tanpa gangguan'}.
      </p>
    </div>
  );
}

export function SkalaHari({ hari = 90 }) {
  return (
    <p aria-hidden="true" className="mt-2 flex justify-between text-xs opacity-75">
      <span>{tgl(HARI[HARI.length - hari], { day: 'numeric', month: 'short' })}</span>
      <span>{hari} hari</span>
      <span>{tgl(HARI[HARI.length - 1], { day: 'numeric', month: 'short' })}</span>
    </p>
  );
}

export function Legenda() {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
      {Object.entries(JENIS).map(([k, j]) => (
        <li key={k} className="flex items-center gap-2"><span aria-hidden="true" className={`h-3 w-3 rounded-[2px] ${j.warna}`} />{j.nama}</li>
      ))}
    </ul>
  );
}
