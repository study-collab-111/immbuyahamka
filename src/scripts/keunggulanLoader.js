import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Konfigurasi Supabase
const SUPABASE_URL = "https://jqeithheusmnrxtoaisk.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZWl0aGhldXNtbnJ4dG9haXNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzODczNDQsImV4cCI6MjA3NTk2MzM0NH0._STcPPBqU6-_CfSAakcQ7DlwcSa3iOswRYaF2Ec57-U";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loadKeunggulan() {
  try {
    const { data, error } = await supabase
      .from("keunggulan")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;

    console.log("Data dari Supabase:", data);

    if (!data || data.length === 0) {
      console.warn("Data keunggulan kosong, fallback ke konten statis.");
      return;
    }

    // Ambil semua card statis di HTML
    const cards = document.querySelectorAll(".keunggulan-card");

    data.forEach((item, index) => {
      if (cards[index]) {
        // Update gambar
        const img = cards[index].querySelector(".card-image img");
        if (img && item.gambar) {
          img.src = item.gambar;
          img.alt = item.judul || "Keunggulan";
        }

        // Update judul
        const title = cards[index].querySelector(".card-title");
        if (title && item.judul) {
          title.textContent = item.judul;
        }

        // Update deskripsi
        const desc = cards[index].querySelector(".card-text");
        if (desc && item.deskripsi) {
          desc.textContent = item.deskripsi;
        }
      }
    });
  } catch (err) {
    console.error("Error load keunggulan:", err.message);
  }
}


// Jalankan setelah DOM siap
document.addEventListener("DOMContentLoaded", loadKeunggulan);