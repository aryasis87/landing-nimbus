import Link from "next/link";

export const metadata = { title: "Halaman tidak ditemukan" };

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center px-6 pt-24">
      <div className="mx-auto w-full max-w-lg rounded-2xl bg-vapor p-8 text-frost">
        <p className="flex items-center gap-2.5 font-semibold"><span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#e5534b]" />404 · halaman tidak ditemukan</p>
        <h1 className="mt-4 text-3xl font-bold text-frost">Server kami menyala. Halaman ini saja yang tidak ada.</h1>
        <p className="mt-3 leading-relaxed text-frost/75">Mungkin alamatnya salah ketik, atau tautannya sudah lama.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/" className="rounded-lg bg-frost px-5 py-3 font-semibold text-vapor hover:bg-white">Ke beranda</Link>
          <Link href="/status" className="rounded-lg border border-frost/30 px-5 py-3 font-semibold text-frost hover:border-frost">Cek status</Link>
        </div>
      </div>
    </main>
  );
}
