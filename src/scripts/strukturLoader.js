// ✅ Jalankan setelah halaman dan library Supabase selesai dimuat
window.addEventListener("DOMContentLoaded", () => {
  console.log("Supabase global object:", window.supabase);

  // Pastikan Supabase sudah ter-load
  if (!window.supabase) {
    console.error("❌ Supabase belum dimuat. Periksa urutan <script> di HTML.");
    return;
  }

  // ✅ Ambil fungsi createClient dari library global
  const { createClient } = window.supabase;

  // ✅ Konfigurasi Supabase
  const SUPABASE_URL = "https://jqeithheusmnrxtoaisk.supabase.co";
  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZWl0aGhldXNtbnJ4dG9haXNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzODczNDQsImV4cCI6MjA3NTk2MzM0NH0._STcPPBqU6-_CfSAakcQ7DlwcSa3iOswRYaF2Ec57-U";

  // ✅ Buat koneksi Supabase client
  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // ✅ Fungsi untuk memuat data struktur organisasi
  async function loadStrukturOrganisasi() {
    const container = document.getElementById("struktur-container");

    if (!container) {
      console.error("Elemen dengan id 'struktur-container' tidak ditemukan di HTML.");
      return;
    }

    container.innerHTML = `<div class="text-center">Memuat data struktur organisasi...</div>`;

    try {
      // Ambil data dari tabel struktur_organisasi
      const { data, error } = await supabaseClient
        .from("struktur_organisasi")
        .select("*")
        .order("urutan", { ascending: true });

      if (error) throw error;

      if (!data || data.length === 0) {
        container.innerHTML = `<div class="text-center">Belum ada data struktur organisasi.</div>`;
        return;
      }

      // Kosongkan container dulu
      container.innerHTML = "";

      // Tampilkan tiap anggota struktur
      data.forEach((person) => {
        const card = document.createElement("div");
        card.className = "struktur-card";

        const fotoUrl = person.foto_url || "https://via.placeholder.com/150?text=No+Image";

        card.innerHTML = `
          <img src="${fotoUrl}" alt="${person.jabatan} - ${person.nama}" 
               class="struktur-foto" 
               onerror="this.src='https://via.placeholder.com/150?text=No+Image'">
          <h3 class="struktur-nama">${person.nama}</h3>
          <p class="struktur-jabatan">${person.jabatan}</p>
        `;

        container.appendChild(card);
      });

    } catch (err) {
      console.error("❌ Gagal memuat struktur organisasi:", err.message);
      container.innerHTML = `<div class="text-center text-danger">Gagal memuat data struktur organisasi.</div>`;
    }
  }

  // Jalankan fungsi
  loadStrukturOrganisasi();
});
