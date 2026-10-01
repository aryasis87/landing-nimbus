'use client';

import { useState } from 'react';
import { HARGA_STORAGE, HARGA_TRANSFER, JAM_SEBULAN, PAKET, REGION, rp } from '@/lib/nimbus';

const batas = (v, a, b) => Math.min(b, Math.max(a, Number.isFinite(v) ? v : a));

export default function Kalkulator() {
  const [paket, setPaket] = useState('n2');
  const [jumlah, setJumlah] = useState(2);
  const [storage, setStorage] = useState(100);
  const [transfer, setTransfer] = useState(3);
  const [region, setRegion] = useState('cgk-1');

  const p = PAKET.find((x) => x.slug === paket);
  const n = batas(Math.round(parseFloat(jumlah)), 1, 20);
  const gb = batas(Math.round(parseFloat(storage)), 0, 50000);
  const tb = batas(parseFloat(transfer), 0, 200);
  const vps = p.harga * n;
  const kuota = p.kuota * n;
  const lebihGb = Math.max(0, (tb - kuota) * 1000);
  const biayaStorage = gb * HARGA_STORAGE;
  const biayaTransfer = lebihGb * HARGA_TRANSFER;
  const total = vps + biayaStorage + biayaTransfer;
  const input = 'w-full rounded-lg border border-vapor/20 bg-white px-4 py-3 text-vapor tabular-nums focus:border-uptime focus:outline-none';

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6 rounded-2xl border border-vapor/10 bg-white p-6 sm:p-8">
        <fieldset>
          <legend className="status-label mb-3 text-vapor">Paket VPS</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {PAKET.map((x) => (
              <label key={x.slug} className={`cursor-pointer rounded-lg border px-4 py-3 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-uptime ${paket === x.slug ? 'border-uptime bg-uptime/8' : 'border-vapor/15'}`}>
                <input type="radio" name="paket" value={x.slug} checked={paket === x.slug} onChange={() => setPaket(x.slug)} className="sr-only" />
                <span className="flex justify-between gap-3 font-bold text-vapor"><span>{x.nama}</span><span className="tabular-nums">{rp(x.harga)}</span></span>
                <span className="text-sm text-frost-dim">{x.vcpu} vCPU · {x.ram} GB RAM · {x.disk} GB</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="jumlah" className="status-label mb-2 block text-vapor">Jumlah server</label>
            <input id="jumlah" type="number" min={1} max={20} value={jumlah} onChange={(e) => setJumlah(e.target.value)} className={input} />
          </div>
          <div>
            <label htmlFor="region" className="status-label mb-2 block text-vapor">Region</label>
            <select id="region" value={region} onChange={(e) => setRegion(e.target.value)} className={input}>
              {REGION.map((r) => <option key={r.kode} value={r.kode}>{r.kota} ({r.kode})</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="storage" className="status-label mb-2 block text-vapor">Object Storage (GB)</label>
            <input id="storage" type="number" min={0} max={50000} step={10} value={storage} onChange={(e) => setStorage(e.target.value)} className={input} />
          </div>
          <div>
            <label htmlFor="transfer" className="status-label mb-2 block text-vapor">Transfer keluar (TB/bulan)</label>
            <input id="transfer" type="number" min={0} max={200} step={0.5} value={transfer} onChange={(e) => setTransfer(e.target.value)} className={input} aria-describedby="kuota" />
            <span id="kuota" className="mt-1 block text-xs text-frost-dim">Kuota gratis: {kuota} TB ({p.kuota} TB × {n} server)</span>
          </div>
        </div>
      </form>

      <div className="self-start rounded-2xl bg-vapor p-6 text-frost sm:p-8 lg:sticky lg:top-24">
        <p className="status-label text-frost/75">Perkiraan per bulan · {REGION.find((r) => r.kode === region).kota}</p>
        <p className="mt-2 font-[family-name:var(--font-grotesk)] text-5xl font-bold tabular-nums" aria-live="polite">{rp(total)}</p>
        <dl className="mt-6 space-y-3 border-t border-frost/15 pt-5 text-sm">
          <div className="flex justify-between gap-4"><dt className="text-frost/75">{n} × {p.nama}</dt><dd className="tabular-nums">{rp(vps)}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-frost/75">Object Storage {gb.toLocaleString('id-ID')} GB</dt><dd className="tabular-nums">{rp(biayaStorage)}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-frost/75">Transfer di atas kuota {lebihGb.toLocaleString('id-ID')} GB</dt><dd className="tabular-nums">{rp(biayaTransfer)}</dd></div>
        </dl>
        <p className="mt-6 rounded-lg bg-frost/8 p-4 text-sm leading-relaxed text-frost/85">
          Ditagih per jam: satu {p.nama} = {rp(p.harga / JAM_SEBULAN)} per jam, maksimal {rp(p.harga)} per bulan.
        </p>
        <p className="mt-4 text-xs text-frost/70">Perkiraan untuk purwarupa desain; belum termasuk PPN.</p>
      </div>
    </div>
  );
}
