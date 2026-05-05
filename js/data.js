/**
 * data.js
 * Berisi data dummy untuk aplikasi SITTA - Universitas Terbuka
 * Karena tugas ini hanya berfokus pada Front-End, semua data disimulasikan di sini
 */

// ====== Data User untuk Login ======
const dataUser = [
  { email: "admin@ut.ac.id", password: "admin123", nama: "Admin UT-Daerah Jakarta" },
  { email: "utd.bandung@ut.ac.id", password: "bandung2025", nama: "UT-Daerah Bandung" },
  { email: "utd.medan@ut.ac.id", password: "medan2025", nama: "UT-Daerah Medan" }
];

// ====== Data Bahan Ajar (untuk halaman stok.html) ======
const dataBahanAjar = [
  {
    kodeLokasi: "OTMP01",
    kodeBarang: "ASIP4301",
    namaBarang: "Pengantar Ilmu Komunikasi",
    jenisBarang: "BMP",
    edisi: 2,
    stok: 548
  },
  {
    kodeLokasi: "OTMP01",
    kodeBarang: "ESPA4111",
    namaBarang: "Pengantar Ekonomi Mikro",
    jenisBarang: "BMP",
    edisi: 3,
    stok: 312
  },
  {
    kodeLokasi: "OTMP02",
    kodeBarang: "MKDU4109",
    namaBarang: "Ilmu Sosial dan Budaya Dasar",
    jenisBarang: "BMP",
    edisi: 1,
    stok: 745
  },
  {
    kodeLokasi: "OTMP02",
    kodeBarang: "MKDU4111",
    namaBarang: "Pendidikan Kewarganegaraan",
    jenisBarang: "BMP",
    edisi: 2,
    stok: 489
  },
  {
    kodeLokasi: "OTMP03",
    kodeBarang: "STSI4209",
    namaBarang: "Pemrograman Berbasis Web",
    jenisBarang: "BMP",
    edisi: 1,
    stok: 220
  },
  {
    kodeLokasi: "OTMP03",
    kodeBarang: "EKMA4116",
    namaBarang: "Manajemen",
    jenisBarang: "BMP",
    edisi: 2,
    stok: 670
  },
  {
    kodeLokasi: "OTMP04",
    kodeBarang: "MKDU4110",
    namaBarang: "Bahasa Indonesia",
    jenisBarang: "BMP",
    edisi: 1,
    stok: 832
  },
  {
    kodeLokasi: "OTMP04",
    kodeBarang: "ADPU4130",
    namaBarang: "Pengantar Ilmu Administrasi Negara",
    jenisBarang: "BMP",
    edisi: 2,
    stok: 401
  }
];

// ====== Data Pengiriman (untuk halaman tracking.html) ======
const dataPengiriman = [
  {
    nomorDO: "1850398497",
    namaMahasiswa: "ROIKA HEPRIDA SITIO",
    asal: "Tangerang Selatan",
    tujuan: "Pematangsiantar",
    alamat: "Jalan Danau Laut Tawar ED Kelurahan",
    ekspedisi: "JNE Express",
    tanggalKirim: "2021-03-10",
    jenisPaket: "Reguler",
    totalPembayaran: 125000,
    statusPersen: 100,
    riwayat: [
      { keterangan: "Selesai antar di Pematangsiantar (Diterima oleh Roika)", tanggal: "2021-03-20 13:34:58" },
      { keterangan: "Proses antar di Pematangsiantar", tanggal: "2021-03-20 09:00:06" },
      { keterangan: "Diteruskan ke Kantor Antaran Pematangsiantar", tanggal: "2021-03-20 09:00:06" },
      { keterangan: "Tiba di Hub SPF Medan", tanggal: "2021-03-19 23:09:42" },
      { keterangan: "Diteruskan ke Hub SPF Medan", tanggal: "2021-03-19 23:09:36" },
      { keterangan: "Diteruskan ke Kantor Antaran Lubuk Pakam", tanggal: "2021-03-18 14:06:11" },
      { keterangan: "Tiba di Hub Tangerang Selatan", tanggal: "2021-03-12 10:37:02" },
      { keterangan: "Penerimaan di loket: Tangerang Selatan (Pengirim: Universitas Terbuka)", tanggal: "2021-03-10 15:58:02" }
    ]
  },
  {
    nomorDO: "1850398498",
    namaMahasiswa: "BUDI SETIAWAN",
    asal: "Tangerang Selatan",
    tujuan: "Bandung",
    alamat: "Jl. Asia Afrika No. 21, Bandung",
    ekspedisi: "Pos Indonesia",
    tanggalKirim: "2025-04-15",
    jenisPaket: "Express",
    totalPembayaran: 95000,
    statusPersen: 60,
    riwayat: [
      { keterangan: "Proses antar di Bandung", tanggal: "2025-04-17 10:15:22" },
      { keterangan: "Tiba di Hub Bandung", tanggal: "2025-04-17 06:30:11" },
      { keterangan: "Diteruskan ke Hub Bandung", tanggal: "2025-04-16 22:45:00" },
      { keterangan: "Penerimaan di loket: Tangerang Selatan", tanggal: "2025-04-15 14:20:30" }
    ]
  },
  {
    nomorDO: "1850398499",
    namaMahasiswa: "SITI NURHALIZA",
    asal: "Tangerang Selatan",
    tujuan: "Surabaya",
    alamat: "Jl. Pemuda No. 45, Surabaya",
    ekspedisi: "JNE Express",
    tanggalKirim: "2025-04-20",
    jenisPaket: "Reguler",
    totalPembayaran: 145000,
    statusPersen: 25,
    riwayat: [
      { keterangan: "Diteruskan ke Hub Tangerang Selatan", tanggal: "2025-04-21 08:00:00" },
      { keterangan: "Penerimaan di loket: Tangerang Selatan", tanggal: "2025-04-20 13:10:45" }
    ]
  }
];

// ====== Data Histori Transaksi ======
const dataHistori = [
  { tanggal: "2025-04-20", noDO: "1850398499", namaMahasiswa: "Siti Nurhaliza", jumlahBarang: 5, total: 145000, status: "Dikirim" },
  { tanggal: "2025-04-15", noDO: "1850398498", namaMahasiswa: "Budi Setiawan", jumlahBarang: 3, total: 95000, status: "Diproses" },
  { tanggal: "2025-04-10", noDO: "1850398496", namaMahasiswa: "Andi Wijaya", jumlahBarang: 4, total: 110000, status: "Diterima" },
  { tanggal: "2025-03-28", noDO: "1850398495", namaMahasiswa: "Dewi Lestari", jumlahBarang: 2, total: 75000, status: "Diterima" },
  { tanggal: "2025-03-20", noDO: "1850398497", namaMahasiswa: "Roika Heprida Sitio", jumlahBarang: 6, total: 125000, status: "Diterima" }
];

// ====== Data Monitoring Progress DO ======
const dataMonitoringDO = [
  { noDO: "1850398499", tanggalDO: "2025-04-20", totalItem: 5, terkirim: 1, status: "Berjalan", persen: 25 },
  { noDO: "1850398498", tanggalDO: "2025-04-15", totalItem: 3, terkirim: 2, status: "Berjalan", persen: 60 },
  { noDO: "1850398497", tanggalDO: "2025-03-10", totalItem: 6, terkirim: 6, status: "Selesai", persen: 100 },
  { noDO: "1850398496", tanggalDO: "2025-04-10", totalItem: 4, terkirim: 4, status: "Selesai", persen: 100 },
  { noDO: "1850398495", tanggalDO: "2025-03-28", totalItem: 2, terkirim: 2, status: "Selesai", persen: 100 }
];
