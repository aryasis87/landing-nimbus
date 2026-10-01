/* ==========================================================================
   Nimbus Cloud — VPS dan penyimpanan objek dari tiga region di Indonesia,
   dengan halaman status dan laporan insiden yang terbuka.
   Satu sumber isi: riwayat 90 hari dan persentase uptime DIHITUNG dari
   daftar insiden di bawah, bukan ditulis tangan.
   Region, harga, insiden, dan angka adalah contoh purwarupa desain.
   ========================================================================== */

export const SITE = 'https://landing-nimbus.vercel.app';
export const rp = (n) => `Rp ${Math.round(n).toLocaleString('id-ID')}`;
const ZONA = { timeZone: 'Asia/Jakarta' };
export const tgl = (iso, opsi = { day: 'numeric', month: 'short', year: 'numeric' }) => new Date(`${iso}T12:00:00+07:00`).toLocaleDateString('id-ID', { ...opsi, ...ZONA });

export const REGION = [
  { kode: 'cgk-1', kota: 'Jakarta', ket: 'Region utama, dua gedung terpisah 14 km' },
  { kode: 'btm-1', kota: 'Batam', ket: 'Terdekat ke Singapura untuk pengguna regional' },
  { kode: 'sub-1', kota: 'Surabaya', ket: 'Untuk pengguna di Jawa Timur dan Indonesia timur' },
];

export const KOMPONEN = [
  { kode: 'compute', nama: 'Compute (VPS)', ket: 'VPS KVM dengan disk NVMe, ditagih per jam dan tidak pernah lebih dari harga bulanan.' },
  { kode: 'storage', nama: 'Object Storage', ket: 'Kompatibel S3, Rp 300 per GB per bulan, tanpa biaya per permintaan.' },
  { kode: 'lb', nama: 'Load Balancer', ket: 'Sertifikat TLS otomatis dan pemeriksaan kesehatan tiap 10 detik.' },
  { kode: 'dns', nama: 'DNS', ket: 'Gratis untuk domain yang servernya ada di Nimbus.' },
  { kode: 'dasbor', nama: 'Dasbor & API', ket: 'Semua yang bisa diklik di dasbor juga bisa dipanggil lewat API.' },
];
export const komponenByKode = (k) => KOMPONEN.find((x) => x.kode === k);
export const regionByKode = (k) => REGION.find((x) => x.kode === k);

export const JENIS = {
  ok: { nama: 'Normal', warna: 'bg-[#2fae74]' },
  turun: { nama: 'Kinerja turun', warna: 'bg-[#e0a526]' },
  padam: { nama: 'Padam', warna: 'bg-[#e5534b]' },
  rawat: { nama: 'Perawatan terjadwal', warna: 'bg-[#5b8def]' },
};

export const INSIDEN = [
  {
    slug: 'object-storage-jakarta-lambat', judul: 'Unggahan Object Storage lambat di Jakarta', tanggal: '2026-09-14', mulai: '10.12', menit: 47, komponen: 'storage', region: 'cgk-1', jenis: 'turun',
    ringkas: 'Unggahan berukuran besar ke Object Storage Jakarta melambat hingga sepuluh kali lipat selama 47 menit. Tidak ada data yang hilang.',
    dampak: 'Sekitar 9% permintaan unggah di cgk-1 butuh lebih dari 5 detik. Unduhan dan region lain tidak terdampak.',
    linimasa: [['10.12', 'Alarm latensi unggah berbunyi.'], ['10.19', 'Teknisi jaga mulai memeriksa; status diubah menjadi "kinerja turun".'], ['10.38', 'Penyebab ditemukan: disk satu node metadata penuh oleh berkas log.'], ['10.51', 'Log dipindahkan, node kembali sehat.'], ['10.59', 'Latensi normal; insiden ditutup.']],
    penyebab: 'Rotasi log di satu node metadata gagal sejak pembaruan sistem 2 September, sehingga log menumpuk sampai disk penuh dan node itu menulis sangat lambat.',
    tindakan: [['Alarm disk 80% untuk semua node metadata', 'selesai'], ['Uji rotasi log dimasukkan ke daftar periksa pembaruan', 'selesai'], ['Log node metadata dipindah ke disk terpisah', 'berjalan']],
  },
  {
    slug: 'perawatan-hypervisor-jakarta', judul: 'Perawatan terjadwal: pembaruan hypervisor Compute Jakarta', tanggal: '2026-09-05', mulai: '01.00', menit: 30, komponen: 'compute', region: 'cgk-1', jenis: 'rawat',
    ringkas: 'Pembaruan keamanan hypervisor. VPS dipindah hidup ke host lain; diumumkan tujuh hari sebelumnya.',
    dampak: 'VPS tetap menyala. Sebagian mengalami jeda jaringan di bawah 2 detik saat dipindahkan.',
    linimasa: [['29 Agt', 'Pengumuman perawatan dikirim ke surel pelanggan cgk-1.'], ['01.00', 'Pemindahan hidup dimulai, host per host.'], ['01.30', 'Semua host diperbarui; perawatan ditutup.']],
    penyebab: 'Perawatan terjadwal, bukan gangguan.',
    tindakan: [['Tidak ada tindak lanjut', 'selesai']],
  },
  {
    slug: 'compute-batam-tak-terjangkau', judul: 'Compute Batam tak terjangkau dari sebagian ISP', tanggal: '2026-08-22', mulai: '19.41', menit: 23, komponen: 'compute', region: 'btm-1', jenis: 'padam',
    ringkas: 'Selama 23 menit, VPS di Batam tidak bisa dijangkau dari sebagian jaringan ISP rumahan. VPS tetap menyala.',
    dampak: 'Kira-kira 30% lalu lintas masuk ke btm-1 hilang. Lalu lintas antar-VPS di dalam region tetap berjalan.',
    linimasa: [['19.41', 'Pemantau luar mendeteksi kegagalan koneksi dari tiga ISP.'], ['19.47', 'Status diubah menjadi "padam" untuk Compute btm-1.'], ['19.55', 'Rute salah dari salah satu pemasok transit teridentifikasi.'], ['20.01', 'Rute pemasok itu dimatikan; lalu lintas pindah ke pemasok kedua.'], ['20.04', 'Konektivitas pulih penuh.']],
    penyebab: 'Pemasok transit mengumumkan rute yang salah untuk blok alamat kami. Penyaring rute di sisi kami belum mencakup blok alamat baru yang ditambahkan Juli.',
    tindakan: [['Penyaring rute diperbarui untuk semua blok alamat', 'selesai'], ['Pemeriksaan otomatis: setiap blok alamat baru wajib masuk penyaring', 'selesai'], ['Pemasok transit ketiga untuk btm-1', 'berjalan']],
  },
  {
    slug: 'dasbor-gagal-masuk', judul: 'Dasbor gagal masuk setelah pembaruan', tanggal: '2026-07-30', mulai: '14.05', menit: 12, komponen: 'dasbor', region: 'semua', jenis: 'padam',
    ringkas: 'Selama 12 menit pengguna tidak bisa masuk ke dasbor. API dan semua server tetap berjalan.',
    dampak: 'Masuk ke dasbor gagal untuk semua pengguna. Sesi yang sudah terbuka tetap bekerja.',
    linimasa: [['14.05', 'Versi baru dasbor diluncurkan.'], ['14.08', 'Laporan gagal masuk mulai masuk ke bantuan.'], ['14.13', 'Versi baru ditarik kembali.'], ['14.17', 'Masuk berfungsi lagi; insiden ditutup.']],
    penyebab: 'Versi baru membaca pengaturan sesi dari variabel lingkungan yang belum ada di produksi. Uji otomatis berjalan dengan pengaturan staging.',
    tindakan: [['Uji masuk otomatis terhadap produksi setelah tiap peluncuran', 'selesai'], ['Peluncuran bertahap 5% → 100% untuk dasbor', 'selesai']],
  },
];
export const insidenBySlug = (s) => INSIDEN.find((i) => i.slug === s);

export const PERAWATAN = [
  { judul: 'Penggantian switch inti Load Balancer Surabaya', tanggal: '2026-10-10', jam: '01.00–02.00 WIB', komponen: 'lb', region: 'sub-1', dampak: 'Koneksi baru mungkin tertunda hingga 30 detik; koneksi yang berjalan dan data tidak terdampak.' },
];

// Jendela 90 hari: 3 Jul – 30 Sep 2026.
export const AKHIR = '2026-09-30';
export const HARI = Array.from({ length: 90 }, (_, i) => {
  const d = new Date(`${AKHIR}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - (89 - i));
  return d.toISOString().slice(0, 10);
});

const BOBOT = { padam: 3, turun: 2, rawat: 1, ok: 0 };
export function riwayat(komponen) {
  return HARI.map((h) => {
    const ins = INSIDEN.filter((i) => i.komponen === komponen && i.tanggal === h);
    const status = ins.reduce((s, i) => (BOBOT[i.jenis] > BOBOT[s] ? i.jenis : s), 'ok');
    return { tanggal: h, status, insiden: ins };
  });
}
// Hanya menit "padam" yang mengurangi uptime; perawatan terjadwal dan kinerja turun tidak.
export function uptime(komponen) {
  const padam = INSIDEN.filter((i) => i.komponen === komponen && i.jenis === 'padam').reduce((s, i) => s + i.menit, 0);
  return 100 * (1 - padam / (90 * 1440));
}
export const persen = (n) => `${n.toLocaleString('id-ID', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}%`;

export const PAKET = [
  { slug: 'n1', nama: 'N1 Kecil', vcpu: 1, ram: 1, disk: 25, kuota: 1, harga: 59000, cocok: 'Situs pribadi, bot, VPN' },
  { slug: 'n2', nama: 'N2 Sedang', vcpu: 2, ram: 4, disk: 80, kuota: 2, harga: 189000, cocok: 'Toko daring, aplikasi kecil' },
  { slug: 'n4', nama: 'N4 Besar', vcpu: 4, ram: 8, disk: 160, kuota: 4, harga: 369000, cocok: 'Basis data, API ramai' },
  { slug: 'n8', nama: 'N8 Ekstra', vcpu: 8, ram: 16, disk: 320, kuota: 6, harga: 719000, cocok: 'Pemrosesan berat, banyak layanan' },
];
export const HARGA_STORAGE = 300; // per GB per bulan
export const HARGA_TRANSFER = 800; // per GB di atas kuota
export const JAM_SEBULAN = 720;

export const SLA = {
  target: '99,95%',
  kredit: [['Di bawah 99,95%', '10%'], ['Di bawah 99,0%', '25%'], ['Di bawah 95,0%', '50%']],
};

export const FAQ = [
  { t: 'Apakah data saya disimpan di Indonesia?', j: 'Ya, di region yang Anda pilih. Kami tidak menyalin data ke luar negeri; cadangan lintas region hanya dibuat bila Anda mengaturnya sendiri.' },
  { t: 'Bagaimana tagihan per jam bekerja?', j: 'Setiap VPS ditagih per jam sejak dibuat sampai dihapus, dan tidak pernah melebihi harga bulanannya. Server yang hanya hidup 3 hari dibayar 72 jam.' },
  { t: 'Apa yang terjadi bila SLA tidak terpenuhi?', j: 'Kredit dipotong otomatis dari tagihan bulan berikutnya, dihitung dari menit padam di halaman status. Anda tidak perlu mengajukan klaim.' },
  { t: 'Mengapa insiden ditulis terbuka?', j: 'Karena Anda berhak tahu apa yang rusak, mengapa, dan apa yang kami ubah. Setiap insiden padam atau kinerja turun mendapat laporan dalam lima hari kerja.' },
];
