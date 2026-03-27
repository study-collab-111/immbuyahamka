// Pastikan sudah ada script Supabase di HTML kamu:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

// 🔹 Inisialisasi hanya sekali (gunakan 'window.supabase.createClient')
const SUPABASE_URL = "https://jqeithheusmnrxtoaisk.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZWl0aGhldXNtbnJ4dG9haXNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzODczNDQsImV4cCI6MjA3NTk2MzM0NH0._STcPPBqU6-_CfSAakcQ7DlwcSa3iOswRYaF2Ec57-U";

// ✅ Gunakan window.supabase.createClient agar tidak error
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loadVisiMisi() {
  const visiEl = document.querySelector("#visi-text");
  const misiList = document.querySelector("#misi-list");
  const visiMisiSection = document.querySelector(".visi-misi_section");

  try {
    // 🔧 Perbaikan: gunakan 'supabase' bukan 'supabaseClient'
    const { data, error } = await supabase
      .from("visi_misi")
      .select("*")
      .single();

    console.log("Supabase data:", data);
    console.log("Supabase error:", error);

    if (error) throw error;

    // 🔹 Jika data tidak aktif
    if (!data.is_active) {
      visiMisiSection.style.display = "none";
      console.log("Visi & Misi section dinonaktifkan via Supabase.");
      return;
    }

    // 🔹 Isi konten
    visiEl.textContent = data.visi || "Data visi belum tersedia";

    misiList.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
      const misi = data[`misi_${i}`];
      if (misi) {
        const li = document.createElement("li");
        li.textContent = misi;
        misiList.appendChild(li);
      }
    }

    visiMisiSection.style.display = "block";
  } catch (err) {
    console.error("❌ Error load visi misi:", err.message);
    visiEl.textContent = "Gagal memuat data visi.";
    misiList.innerHTML = "<li>Gagal memuat data misi.</li>";
    visiMisiSection.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", loadVisiMisi);
