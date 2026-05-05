/* ==========================================================================
   SITTA - Sistem Informasi Tiras dan Transaksi Bahan Ajar
   script.js - File JavaScript utama untuk manipulasi DOM, validasi form, dll
   ========================================================================== */

// ==========================================================================
// FUNGSI UTILITAS GLOBAL
// ==========================================================================

/**
 * Menampilkan toast notification (custom pop-up)
 * @param {string} pesan - pesan yang ditampilkan
 * @param {string} tipe - 'success', 'error', 'warning', 'info'
 * @param {string} judul - judul toast
 */
function tampilkanToast(pesan, tipe = "info", judul = "") {
  // Hapus toast lama jika ada
  const toastLama = document.querySelector(".toast");
  if (toastLama) toastLama.remove();

  const ikon = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ"
  };

  const judulDefault = {
    success: "Berhasil!",
    error: "Gagal!",
    warning: "Perhatian!",
    info: "Informasi"
  };

  const toast = document.createElement("div");
  toast.className = `toast toast-${tipe}`;
  toast.innerHTML = `
    <div class="toast-icon">${ikon[tipe]}</div>
    <div class="toast-content">
      <strong>${judul || judulDefault[tipe]}</strong>
      ${pesan}
    </div>
  `;

  document.body.appendChild(toast);

  // Hapus toast setelah 3.4 detik
  setTimeout(() => {
    if (toast.parentElement) toast.remove();
  }, 3400);
}

/**
 * Format angka ke format Rupiah
 */
function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

/**
 * Format tanggal ke format Indonesia
 */
function formatTanggal(tanggalStr) {
  const bulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const tgl = new Date(tanggalStr);
  return `${tgl.getDate()} ${bulan[tgl.getMonth()]} ${tgl.getFullYear()}`;
}

/**
 * Mendapatkan inisial dari nama (untuk avatar)
 */
function getInisial(nama) {
  if (!nama) return "U";
  const parts = nama.trim().split(" ");
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/**
 * Cek apakah user sudah login (ada di sessionStorage)
 * Jika belum, redirect ke index.html
 */
function cekLogin() {
  const userLogin = sessionStorage.getItem("userLogin");
  if (!userLogin) {
    alert("Anda harus login terlebih dahulu!");
    window.location.href = "index.html";
    return null;
  }
  return JSON.parse(userLogin);
}

/**
 * Logout - hapus session dan redirect
 */
function logout() {
  if (confirm("Apakah Anda yakin ingin keluar dari aplikasi?")) {
    sessionStorage.removeItem("userLogin");
    window.location.href = "index.html";
  }
}

// ==========================================================================
// HALAMAN LOGIN (index.html)
// ==========================================================================

/**
 * Validasi format email menggunakan regex
 */
function validasiEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Proses login - dipanggil saat tombol "Masuk" diklik
 */
function prosesLogin(event) {
  event.preventDefault(); // Mencegah form melakukan submit/refresh halaman

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorBox = document.getElementById("loginError");

  // Sembunyikan error sebelumnya
  errorBox.style.display = "none";
  errorBox.textContent = "";

  // Validasi: input tidak boleh kosong
  if (email === "" || password === "") {
    errorBox.textContent = "⚠ Email dan password wajib diisi!";
    errorBox.style.display = "flex";
    alert("Email dan password wajib diisi!");
    return false;
  }

  // Validasi: format email
  if (!validasiEmail(email)) {
    errorBox.textContent = "⚠ Format email tidak valid!";
    errorBox.style.display = "flex";
    alert("Format email tidak valid! Contoh: nama@domain.com");
    return false;
  }

  // Validasi: panjang password minimal 6 karakter
  if (password.length < 6) {
    errorBox.textContent = "⚠ Password minimal 6 karakter!";
    errorBox.style.display = "flex";
    alert("Password minimal 6 karakter!");
    return false;
  }

  // Cek user di data dummy
  const user = dataUser.find(u => u.email === email && u.password === password);

  if (!user) {
    // Tampilkan pop-up/alert sesuai instruksi tugas
    errorBox.textContent = "⚠ Email/password yang anda masukkan salah";
    errorBox.style.display = "flex";
    alert("Email/password yang anda masukkan salah");
    return false;
  }

  // Login berhasil - simpan ke sessionStorage
  sessionStorage.setItem("userLogin", JSON.stringify(user));
  alert(`Selamat datang, ${user.nama}!`);
  window.location.href = "dashboard.html";
}

/**
 * Buka modal box (untuk Lupa Password & Daftar)
 */
function bukaModal(idModal) {
  const modal = document.getElementById(idModal);
  if (modal) {
    modal.classList.add("active");
  }
}

/**
 * Tutup modal box
 */
function tutupModal(idModal) {
  const modal = document.getElementById(idModal);
  if (modal) {
    modal.classList.remove("active");
  }
}

/**
 * Proses lupa password - dipanggil saat submit modal Lupa Password
 */
function prosesLupaPassword(event) {
  event.preventDefault();
  const email = document.getElementById("emailLupa").value.trim();

  if (email === "") {
    alert("Email wajib diisi!");
    return false;
  }

  if (!validasiEmail(email)) {
    alert("Format email tidak valid!");
    return false;
  }

  const user = dataUser.find(u => u.email === email);
  if (!user) {
    alert("Email tidak terdaftar dalam sistem!");
    return false;
  }

  alert(`Tautan reset password telah dikirim ke ${email}. Silakan cek inbox Anda.`);
  tutupModal("modalLupaPassword");
  document.getElementById("formLupaPassword").reset();
}

/**
 * Proses pendaftaran user baru
 */
function prosesDaftar(event) {
  event.preventDefault();

  const nama = document.getElementById("namaDaftar").value.trim();
  const email = document.getElementById("emailDaftar").value.trim();
  const password = document.getElementById("passwordDaftar").value.trim();
  const konfirmasi = document.getElementById("konfirmasiPassword").value.trim();

  // Validasi semua field terisi
  if (nama === "" || email === "" || password === "" || konfirmasi === "") {
    alert("Semua field wajib diisi!");
    return false;
  }

  // Validasi nama (minimal 3 karakter)
  if (nama.length < 3) {
    alert("Nama minimal 3 karakter!");
    return false;
  }

  // Validasi email
  if (!validasiEmail(email)) {
    alert("Format email tidak valid!");
    return false;
  }

  // Cek email sudah terdaftar
  const userExist = dataUser.find(u => u.email === email);
  if (userExist) {
    alert("Email sudah terdaftar! Silakan gunakan email lain.");
    return false;
  }

  // Validasi password
  if (password.length < 6) {
    alert("Password minimal 6 karakter!");
    return false;
  }

  if (password !== konfirmasi) {
    alert("Konfirmasi password tidak cocok!");
    return false;
  }

  // Tambahkan user baru ke array (simulasi - data hanya di memori)
  dataUser.push({ email: email, password: password, nama: nama });

  alert(`Pendaftaran berhasil! Silakan login dengan email ${email}.`);
  tutupModal("modalDaftar");
  document.getElementById("formDaftar").reset();
}

// ==========================================================================
// HALAMAN DASHBOARD (dashboard.html)
// ==========================================================================

/**
 * Tampilkan greeting berdasarkan waktu lokal
 */
function tampilkanGreeting() {
  const elGreeting = document.getElementById("greetingTime");
  const elGreetingFull = document.getElementById("greetingFull");
  if (!elGreeting) return;

  const sekarang = new Date();
  const jam = sekarang.getHours();

  let salam = "";
  let emoji = "";

  if (jam >= 4 && jam < 11) {
    salam = "Selamat Pagi";
    emoji = "🌅";
  } else if (jam >= 11 && jam < 15) {
    salam = "Selamat Siang";
    emoji = "☀️";
  } else if (jam >= 15 && jam < 18) {
    salam = "Selamat Sore";
    emoji = "🌇";
  } else {
    salam = "Selamat Malam";
    emoji = "🌙";
  }

  elGreeting.textContent = `${emoji} ${salam}`;

  // Format waktu lengkap: hari, tanggal, jam
  if (elGreetingFull) {
    const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const bulan = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const namaHari = hari[sekarang.getDay()];
    const tanggal = sekarang.getDate();
    const namaBulan = bulan[sekarang.getMonth()];
    const tahun = sekarang.getFullYear();
    const jamStr = String(sekarang.getHours()).padStart(2, "0");
    const menitStr = String(sekarang.getMinutes()).padStart(2, "0");

    elGreetingFull.textContent = `${namaHari}, ${tanggal} ${namaBulan} ${tahun} • ${jamStr}:${menitStr} WIB`;
  }
}

/**
 * Tampilkan info user yang sedang login
 */
function tampilkanInfoUser(user) {
  const elNama = document.getElementById("namaUser");
  const elAvatar = document.getElementById("avatarUser");

  if (elNama) elNama.textContent = user.nama;
  if (elAvatar) elAvatar.textContent = getInisial(user.nama);
}

/**
 * Tampilkan statistik dashboard
 */
function tampilkanStatistik() {
  const elStatBahanAjar = document.getElementById("statBahanAjar");
  const elStatStok = document.getElementById("statStok");
  const elStatDO = document.getElementById("statDO");
  const elStatTransaksi = document.getElementById("statTransaksi");

  if (elStatBahanAjar) elStatBahanAjar.textContent = dataBahanAjar.length;
  if (elStatStok) {
    const totalStok = dataBahanAjar.reduce((sum, item) => sum + item.stok, 0);
    elStatStok.textContent = totalStok.toLocaleString("id-ID");
  }
  if (elStatDO) elStatDO.textContent = dataMonitoringDO.length;
  if (elStatTransaksi) elStatTransaksi.textContent = dataHistori.length;
}

/**
 * Tampilkan halaman laporan (modal/section)
 */
function tampilkanLaporan(jenis) {
  if (jenis === "monitoring") {
    bukaModal("modalMonitoring");
    renderTabelMonitoring();
  } else if (jenis === "rekap") {
    bukaModal("modalRekap");
    renderTabelRekap();
  } else if (jenis === "histori") {
    bukaModal("modalHistori");
    renderTabelHistori();
  }
}

/**
 * Render tabel Monitoring Progress DO
 */
function renderTabelMonitoring() {
  const tbody = document.getElementById("tbodyMonitoring");
  if (!tbody) return;

  tbody.innerHTML = "";
  dataMonitoringDO.forEach(item => {
    const tr = document.createElement("tr");
    let badgeClass = "badge-warning";
    if (item.status === "Selesai") badgeClass = "badge-success";

    tr.innerHTML = `
      <td>${item.noDO}</td>
      <td>${formatTanggal(item.tanggalDO)}</td>
      <td>${item.totalItem}</td>
      <td>${item.terkirim}</td>
      <td>
        <div style="background:#e9ecef; height:8px; border-radius:4px; overflow:hidden; margin-bottom:4px;">
          <div style="background: linear-gradient(90deg, #ffc107, #e0a800); height:100%; width:${item.persen}%;"></div>
        </div>
        <small>${item.persen}%</small>
      </td>
      <td><span class="badge ${badgeClass}">${item.status}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

/**
 * Render tabel Rekap Bahan Ajar
 */
function renderTabelRekap() {
  const tbody = document.getElementById("tbodyRekap");
  if (!tbody) return;

  tbody.innerHTML = "";
  dataBahanAjar.forEach(item => {
    const tr = document.createElement("tr");
    let badgeClass = "badge-success";
    if (item.stok < 300) badgeClass = "badge-warning";
    if (item.stok < 100) badgeClass = "badge-danger";

    tr.innerHTML = `
      <td>${item.kodeBarang}</td>
      <td>${item.namaBarang}</td>
      <td>${item.jenisBarang}</td>
      <td>Edisi ${item.edisi}</td>
      <td><span class="badge ${badgeClass}">${item.stok}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

/**
 * Render tabel Histori Transaksi
 */
function renderTabelHistori() {
  const tbody = document.getElementById("tbodyHistori");
  if (!tbody) return;

  tbody.innerHTML = "";
  dataHistori.forEach(item => {
    const tr = document.createElement("tr");
    let badgeClass = "badge-info";
    if (item.status === "Diterima") badgeClass = "badge-success";
    if (item.status === "Diproses") badgeClass = "badge-warning";

    tr.innerHTML = `
      <td>${formatTanggal(item.tanggal)}</td>
      <td>${item.noDO}</td>
      <td>${item.namaMahasiswa}</td>
      <td>${item.jumlahBarang}</td>
      <td>${formatRupiah(item.total)}</td>
      <td><span class="badge ${badgeClass}">${item.status}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

/**
 * Inisialisasi halaman dashboard
 */
function inisialisasiDashboard() {
  const user = cekLogin();
  if (!user) return;

  tampilkanInfoUser(user);
  tampilkanGreeting();
  tampilkanStatistik();

  // Update jam setiap menit
  setInterval(tampilkanGreeting, 60000);
}

// ==========================================================================
// HALAMAN TRACKING (tracking.html)
// ==========================================================================

/**
 * Cari pengiriman berdasarkan nomor DO
 */
function cariPengiriman(event) {
  event.preventDefault();

  const noDO = document.getElementById("nomorDO").value.trim();
  const result = document.getElementById("trackingResult");
  const errorBox = document.getElementById("trackingError");

  errorBox.style.display = "none";
  result.classList.remove("active");

  if (noDO === "") {
    errorBox.textContent = "⚠ Nomor Delivery Order wajib diisi!";
    errorBox.style.display = "flex";
    alert("Nomor Delivery Order wajib diisi!");
    return false;
  }

  // Cari di data
  const pengiriman = dataPengiriman.find(p => p.nomorDO === noDO);

  if (!pengiriman) {
    errorBox.innerHTML = `⚠ Nomor DO <strong>${noDO}</strong> tidak ditemukan! 
      <br><small>Coba: 1850398497, 1850398498, atau 1850398499</small>`;
    errorBox.style.display = "flex";
    alert(`Nomor DO ${noDO} tidak ditemukan dalam sistem.`);
    return false;
  }

  // Render hasil tracking
  renderHasilTracking(pengiriman);
  result.classList.add("active");
  result.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Render hasil tracking ke DOM
 */
function renderHasilTracking(p) {
  // Info utama
  document.getElementById("trackNamaMhs").textContent = p.namaMahasiswa;
  document.getElementById("trackNoDO").textContent = p.nomorDO;
  document.getElementById("trackTanggal").textContent = formatTanggal(p.tanggalKirim);
  document.getElementById("trackRoute").textContent = `${p.asal} → ${p.tujuan}`;
  document.getElementById("trackAddress").textContent = p.alamat;

  // Progress bar
  document.getElementById("trackProgressBar").style.width = p.statusPersen + "%";
  let statusText = "";
  if (p.statusPersen === 100) statusText = "Paket Telah Diterima";
  else if (p.statusPersen >= 50) statusText = "Dalam Perjalanan";
  else statusText = "Sedang Diproses";
  document.getElementById("trackProgressText").textContent = `${statusText} (${p.statusPersen}%)`;

  // Detail
  document.getElementById("detailEkspedisi").textContent = p.ekspedisi;
  document.getElementById("detailJenisPaket").textContent = p.jenisPaket;
  document.getElementById("detailTotalBayar").textContent = formatRupiah(p.totalPembayaran);

  // Timeline riwayat
  const timeline = document.getElementById("timelineRiwayat");
  timeline.innerHTML = "";
  p.riwayat.forEach((r, index) => {
    const item = document.createElement("div");
    item.className = "timeline-item";
    if (index === 0 && p.statusPersen === 100) item.classList.add("completed");
    if (p.statusPersen === 100) item.classList.add("completed");

    item.innerHTML = `
      <div class="timeline-keterangan">${r.keterangan}</div>
      <div class="timeline-tanggal">${r.tanggal}</div>
    `;
    timeline.appendChild(item);
  });
}

/**
 * Inisialisasi halaman tracking
 */
function inisialisasiTracking() {
  const user = cekLogin();
  if (!user) return;
  tampilkanInfoUser(user);
}

// ==========================================================================
// HALAMAN STOK BAHAN AJAR (stok.html)
// ==========================================================================

// Variabel untuk menyimpan data yang sedang ditampilkan (untuk filter)
let dataStokTampil = [];

/**
 * Render tabel stok bahan ajar
 */
function renderTabelStok(data) {
  const tbody = document.getElementById("tbodyStok");
  if (!tbody) return;

  tbody.innerHTML = "";

  if (data.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td colspan="7">
        <div class="empty-state">
          <div class="empty-icon">📦</div>
          <p>Tidak ada data bahan ajar yang ditemukan</p>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
    return;
  }

  data.forEach((item, index) => {
    let badgeClass = "badge-success";
    let statusStok = "Tersedia";
    if (item.stok < 300) {
      badgeClass = "badge-warning";
      statusStok = "Menipis";
    }
    if (item.stok < 100) {
      badgeClass = "badge-danger";
      statusStok = "Kritis";
    }

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td><strong>${item.kodeLokasi}</strong></td>
      <td><strong>${item.kodeBarang}</strong></td>
      <td>${item.namaBarang}</td>
      <td>${item.jenisBarang}</td>
      <td>Edisi ${item.edisi}</td>
      <td>
        <strong>${item.stok}</strong>
        <span class="badge ${badgeClass}" style="margin-left:6px;">${statusStok}</span>
      </td>
      <td>
        <div class="action-buttons">
          <button class="btn-edit" onclick="editStok(${index})" title="Edit">✏ Edit</button>
          <button class="btn-delete" onclick="hapusStok(${index})" title="Hapus">🗑 Hapus</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Update total data ditampilkan
  const elTotalData = document.getElementById("totalData");
  if (elTotalData) elTotalData.textContent = data.length;
}

/**
 * Tambah baris stok baru menggunakan DOM manipulation
 */
function tambahStokBaru(event) {
  event.preventDefault();

  const kodeLokasi = document.getElementById("kodeLokasi").value.trim().toUpperCase();
  const kodeBarang = document.getElementById("kodeBarang").value.trim().toUpperCase();
  const namaBarang = document.getElementById("namaBarang").value.trim();
  const jenisBarang = document.getElementById("jenisBarang").value;
  const edisi = parseInt(document.getElementById("edisi").value);
  const stok = parseInt(document.getElementById("stok").value);

  // Validasi
  if (kodeLokasi === "" || kodeBarang === "" || namaBarang === "" || jenisBarang === "") {
    alert("Semua field wajib diisi!");
    return false;
  }

  if (kodeLokasi.length < 3) {
    alert("Kode lokasi minimal 3 karakter!");
    return false;
  }

  if (kodeBarang.length < 4) {
    alert("Kode barang minimal 4 karakter!");
    return false;
  }

  if (namaBarang.length < 3) {
    alert("Nama barang minimal 3 karakter!");
    return false;
  }

  if (isNaN(edisi) || edisi < 1) {
    alert("Edisi harus berupa angka minimal 1!");
    return false;
  }

  if (isNaN(stok) || stok < 0) {
    alert("Stok harus berupa angka non-negatif!");
    return false;
  }

  // Cek duplikat kode barang
  const exist = dataBahanAjar.find(d => d.kodeBarang === kodeBarang);
  if (exist) {
    if (!confirm(`Kode barang ${kodeBarang} sudah ada (${exist.namaBarang}). Tetap tambahkan?`)) {
      return false;
    }
  }

  // Tambahkan ke array data (di awal/akhir)
  const dataBaru = {
    kodeLokasi: kodeLokasi,
    kodeBarang: kodeBarang,
    namaBarang: namaBarang,
    jenisBarang: jenisBarang,
    edisi: edisi,
    stok: stok
  };

  dataBahanAjar.unshift(dataBaru); // tambah di awal supaya terlihat
  dataStokTampil = [...dataBahanAjar];

  // Re-render tabel
  renderTabelStok(dataStokTampil);

  // Tutup modal & reset form
  tutupModal("modalTambahStok");
  document.getElementById("formTambahStok").reset();

  alert(`Bahan ajar "${namaBarang}" berhasil ditambahkan!`);
  tampilkanToast(`Bahan ajar "${namaBarang}" berhasil ditambahkan!`, "success");

  // Update statistik
  updateStatistikStok();

  // Highlight baris baru (animasi singkat)
  setTimeout(() => {
    const firstRow = document.querySelector("#tbodyStok tr:first-child");
    if (firstRow) {
      firstRow.style.backgroundColor = "#fff3cd";
      setTimeout(() => {
        firstRow.style.transition = "background-color 1.5s";
        firstRow.style.backgroundColor = "";
      }, 100);
    }
  }, 100);
}

/**
 * Edit data stok
 */
function editStok(index) {
  const item = dataStokTampil[index];
  if (!item) return;

  const stokBaru = prompt(
    `Edit Stok untuk: ${item.namaBarang}\n` +
    `Kode: ${item.kodeBarang}\n` +
    `Stok saat ini: ${item.stok}\n\n` +
    `Masukkan jumlah stok baru:`,
    item.stok
  );

  if (stokBaru === null) return; // user cancel

  const stokAngka = parseInt(stokBaru);
  if (isNaN(stokAngka) || stokAngka < 0) {
    alert("Stok harus berupa angka non-negatif!");
    return;
  }

  // Update di data asli
  const idxAsli = dataBahanAjar.findIndex(d => d.kodeBarang === item.kodeBarang);
  if (idxAsli !== -1) {
    dataBahanAjar[idxAsli].stok = stokAngka;
  }

  dataStokTampil = [...dataBahanAjar];
  renderTabelStok(dataStokTampil);
  updateStatistikStok();

  alert(`Stok "${item.namaBarang}" berhasil diubah menjadi ${stokAngka}.`);
  tampilkanToast(`Stok "${item.namaBarang}" diubah menjadi ${stokAngka}`, "success");
}

/**
 * Hapus data stok
 */
function hapusStok(index) {
  const item = dataStokTampil[index];
  if (!item) return;

  if (!confirm(`Apakah Anda yakin ingin menghapus bahan ajar:\n"${item.namaBarang}" (${item.kodeBarang})?`)) {
    return;
  }

  // Hapus dari data asli
  const idxAsli = dataBahanAjar.findIndex(d => d.kodeBarang === item.kodeBarang);
  if (idxAsli !== -1) {
    dataBahanAjar.splice(idxAsli, 1);
  }

  dataStokTampil = [...dataBahanAjar];
  renderTabelStok(dataStokTampil);
  updateStatistikStok();

  alert(`Bahan ajar "${item.namaBarang}" berhasil dihapus.`);
  tampilkanToast(`"${item.namaBarang}" berhasil dihapus`, "warning");
}

/**
 * Filter / cari data stok
 */
function cariStok() {
  const keyword = document.getElementById("searchStok").value.trim().toLowerCase();

  if (keyword === "") {
    dataStokTampil = [...dataBahanAjar];
  } else {
    dataStokTampil = dataBahanAjar.filter(item =>
      item.kodeBarang.toLowerCase().includes(keyword) ||
      item.namaBarang.toLowerCase().includes(keyword) ||
      item.kodeLokasi.toLowerCase().includes(keyword) ||
      item.jenisBarang.toLowerCase().includes(keyword)
    );
  }

  renderTabelStok(dataStokTampil);
}

/**
 * Update statistik di halaman stok
 */
function updateStatistikStok() {
  const elTotal = document.getElementById("statTotalItem");
  const elTotalStok = document.getElementById("statTotalStok");
  const elKritis = document.getElementById("statKritis");
  const elJenis = document.getElementById("statJenis");

  if (elTotal) elTotal.textContent = dataBahanAjar.length;
  if (elTotalStok) {
    const total = dataBahanAjar.reduce((sum, item) => sum + item.stok, 0);
    elTotalStok.textContent = total.toLocaleString("id-ID");
  }
  if (elKritis) {
    const kritis = dataBahanAjar.filter(item => item.stok < 300).length;
    elKritis.textContent = kritis;
  }
  if (elJenis) {
    const jenis = [...new Set(dataBahanAjar.map(item => item.jenisBarang))];
    elJenis.textContent = jenis.length;
  }
}

/**
 * Inisialisasi halaman stok
 */
function inisialisasiStok() {
  const user = cekLogin();
  if (!user) return;

  tampilkanInfoUser(user);
  dataStokTampil = [...dataBahanAjar];
  renderTabelStok(dataStokTampil);
  updateStatistikStok();
}

// ==========================================================================
// EVENT LISTENER GLOBAL
// ==========================================================================

// Tutup modal saat klik di luar modal
document.addEventListener("click", function(event) {
  if (event.target.classList.contains("modal-overlay")) {
    event.target.classList.remove("active");
  }
});

// Tutup modal saat tekan tombol ESC
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal-overlay.active").forEach(modal => {
      modal.classList.remove("active");
    });
  }
});
