# SITTA - Sistem Informasi Tiras dan Transaksi Bahan Ajar

**Tugas Praktik 1 - STSI4209 Pemrograman Berbasis Web**
Universitas Terbuka

Aplikasi website sederhana untuk pemesanan Bahan Ajar di Universitas Terbuka yang dilakukan oleh UT-Daerah. Implementasi murni Front-End menggunakan **HTML, CSS, dan JavaScript DOM**.

---

## 📁 Struktur Folder

```
sitta-praktik/
│
├── index.html              # Halaman Login
├── dashboard.html          # Halaman Dashboard utama dengan menu navigasi
├── tracking.html           # Halaman Tracking Pengiriman
├── stok.html               # Halaman Informasi Stok Bahan Ajar
│
├── css/
│   └── style.css           # Stylesheet utama (External CSS)
│
├── js/
│   ├── data.js             # Data dummy (dataBahanAjar, dataPengiriman, dll)
│   └── script.js           # JavaScript utama untuk DOM, validasi, interaksi
│
├── assets/
│   └── logo-ut.svg         # Logo (opsional)
│
└── README.md               # Dokumentasi proyek
```

---

## 🚀 Cara Menjalankan

1. Buka file `index.html` di browser (Chrome/Firefox/Edge/Safari).
2. Login menggunakan akun demo:
   - **Email:** `admin@ut.ac.id`
   - **Password:** `admin123`
3. Setelah login berhasil, Anda akan diarahkan ke halaman Dashboard.

### Akun Demo Lainnya
| Email | Password | Nama |
|---|---|---|
| `admin@ut.ac.id` | `admin123` | Admin UT-Daerah Jakarta |
| `utd.bandung@ut.ac.id` | `bandung2025` | UT-Daerah Bandung |
| `utd.medan@ut.ac.id` | `medan2025` | UT-Daerah Medan |

### Nomor DO untuk Tracking Demo
- `1850398497` (status 100% - Selesai)
- `1850398498` (status 60% - Dalam Perjalanan)
- `1850398499` (status 25% - Sedang Diproses)

---

## ✅ Implementasi Indikator Penilaian

### 1. Struktur HTML Semantik & Valid (15 poin)
- ✅ Penggunaan `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- ✅ Atribut `role`, `aria-label`, `aria-labelledby` untuk aksesibilitas
- ✅ Form dengan `<label>`, atribut `required`, `type="email"`, `type="password"`
- ✅ DOCTYPE HTML5 dan `lang="id"`
- ✅ Meta tags untuk SEO dan responsivitas

### 2. Desain CSS - Inline, Internal, External (15 poin)
- ✅ **External CSS:** `css/style.css` (linked di semua halaman)
- ✅ **Internal CSS:** `<style>` block di `index.html` (untuk `.login-footer`)
- ✅ **Inline CSS:** atribut `style="..."` pada beberapa elemen
- ✅ CSS Variables (`:root`) untuk konsistensi tema
- ✅ Responsive design dengan `@media` queries
- ✅ Animasi (`@keyframes`): fadeIn, slideDown, slideInRight
- ✅ Gradient, box-shadow, transition untuk visual modern

### 3. JavaScript DOM (25 poin)
- ✅ **Manipulasi DOM:** `getElementById`, `querySelector`, `createElement`, `appendChild`, `innerHTML`
- ✅ **Manipulasi Tabel:** Render dinamis tabel stok dari `dataBahanAjar`, tambah/edit/hapus baris
- ✅ **Event Handler:** `onsubmit`, `onclick`, `onkeyup`, `addEventListener`
- ✅ **Pop-up & Alert:** `alert()`, `confirm()`, `prompt()`, custom toast notification
- ✅ **Modal Box:** Modal Lupa Password, Daftar, Tambah Stok, Monitoring, Rekap, Histori
- ✅ **Greeting dinamis:** Berdasarkan waktu lokal (pagi/siang/sore/malam)
- ✅ **Filter/Search realtime** di halaman stok
- ✅ **sessionStorage** untuk menjaga login state
- ✅ **Date formatting** Indonesia
- ✅ **Format Rupiah** untuk nominal pembayaran

### 4. Validasi Form & Alert (15 poin)
- ✅ Validasi field kosong (semua form)
- ✅ Validasi format email dengan regex
- ✅ Validasi panjang password minimal 6 karakter
- ✅ Validasi konfirmasi password
- ✅ Validasi cek email duplikat saat registrasi
- ✅ Validasi panjang nama minimal 3 karakter
- ✅ Validasi cek nomor DO ada/tidak
- ✅ Alert popup saat email/password salah (sesuai instruksi tugas)
- ✅ Toast notification untuk sukses/gagal/warning

### 5. Modularitas File & Struktur (5 poin)
- ✅ Pemisahan file CSS, JS, dan HTML
- ✅ `data.js` terpisah berisi data dummy
- ✅ `script.js` berisi semua fungsi (modular per halaman)
- ✅ Struktur folder jelas: `css/`, `js/`, `assets/`

### 6. Kreativitas Tambahan (10 poin)
- ✅ Tema warna khas Universitas Terbuka (biru navy + kuning emas)
- ✅ Custom toast notification (selain alert browser)
- ✅ Progress bar untuk status pengiriman
- ✅ Timeline visual untuk riwayat pengiriman
- ✅ Statistik dashboard dengan card berwarna
- ✅ Hover effect & micro-animations
- ✅ Highlight baris baru saat tambah data
- ✅ Tutup modal dengan klik luar / tombol ESC
- ✅ Logo SVG kustom
- ✅ Auto-focus pada input email
- ✅ Update jam realtime (per menit) di greeting

---

## 📝 Poin untuk Video Penjelasan (15 menit)

Berikut sistematika dan alur berpikir yang dapat dijelaskan dalam video:

### A. Pendahuluan (1-2 menit)
- Perkenalan singkat: nama, NIM, mata kuliah STSI4209
- Tujuan tugas: membuat aplikasi SITTA untuk UT-Daerah dengan HTML, CSS, JS
- Garis besar 4 halaman yang dibuat

### B. Demonstrasi Aplikasi (4-5 menit)
1. **Login (index.html)**
   - Tampilkan validasi email/password salah → muncul alert
   - Klik "Lupa Password" → modal terbuka
   - Klik "Daftar" → modal pendaftaran
   - Login sukses dengan akun demo

2. **Dashboard (dashboard.html)**
   - Greeting otomatis sesuai waktu
   - Statistik dashboard
   - Klik dropdown Laporan → Monitoring/Rekap (modal)
   - Klik Histori Transaksi (modal dengan tabel)

3. **Tracking (tracking.html)**
   - Cari nomor DO → tampil progress bar, detail, timeline
   - Cari nomor DO yang tidak ada → alert error

4. **Stok (stok.html)**
   - Tabel data dinamis dari `dataBahanAjar`
   - Tambah baris baru → modal form → muncul di tabel
   - Edit stok via prompt
   - Hapus dengan konfirmasi
   - Search realtime

### C. Penjelasan Kode (5-6 menit)
1. **Struktur HTML semantik** - tunjukkan tag `<nav>`, `<main>`, `<section>`, dll
2. **CSS:** External (style.css), Internal (style block di index.html), Inline (style="...")
3. **JavaScript DOM:**
   - `cariPengiriman()` - validasi & render hasil
   - `tambahStokBaru()` - createElement & appendChild
   - `tampilkanGreeting()` - manipulasi waktu
   - `prosesLogin()` - validasi form
4. **Modularitas:** pisah `data.js` dan `script.js`

### D. Argumentasi Desain (1-2 menit)
- Mengapa pilih warna biru-kuning (identitas UT)
- Mengapa modular (mudah maintain)
- Mengapa pakai sessionStorage (menjaga login state)

### E. Penutup (30 detik - 1 menit)
- Ringkasan fitur yang sudah diimplementasi
- Terima kasih

---

## 🎨 Teknologi yang Digunakan

- **HTML5** - Struktur halaman semantik
- **CSS3** - Custom properties, Grid, Flexbox, Animations
- **JavaScript (Vanilla)** - DOM Manipulation, Event Handling
- **Google Fonts** - Poppins (heading) & Inter (body)

Tidak menggunakan library/framework eksternal sesuai persyaratan tugas.

---

## 📚 Referensi

1. https://www.w3schools.com/howto/howto_css_modals.asp
2. https://www.w3schools.com/howto/howto_js_popup_form.asp
3. https://www.w3schools.com/js/js_popup.asp
4. https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_dropdown_navbar
5. https://www.w3schools.com/js/js_date_methods.asp

### Sumber Akademik
- Sufandi, U. U., Aprijani, D. A., & Pandiangan, P. (2021). Evaluasi dan hasil review desain user interface prototype aplikasi mobile SITTA Universitas Terbuka. JANAPATI, 10(3), 147-156.
- Sufandi, U. U. (2022). Analisis Kebutuhan dan Dokumentasi Sistem Informasi Tiras dan Transaksi Bahan Ajar Universitas Terbuka. JANAPATI, 11(2), 112-122.
