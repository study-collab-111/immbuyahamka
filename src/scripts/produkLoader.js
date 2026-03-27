import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Konfigurasi Supabase
const SUPABASE_URL = "https://jqeithheusmnrxtoaisk.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZWl0aGhldXNtbnJ4dG9haXNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzODczNDQsImV4cCI6MjA3NTk2MzM0NH0._STcPPBqU6-_CfSAakcQ7DlwcSa3iOswRYaF2Ec57-U";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


// Nomor WhatsApp tetap
const nomorWA = "6282265024599";

async function loadProduk() {
  try {
    const { data, error } = await supabase
      .from("produk")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;
    if (!data || data.length === 0) {
      console.warn("Data produk kosong, fallback ke statis.");
      return;
    }

    // Ambil semua card statis
    const cards = document.querySelectorAll(".produk-card");

    data.forEach((item, index) => {
      if (cards[index]) {
        // Update gambar
        const img = cards[index].querySelector(".product-image img");
        if (img) {
          img.src = item.gambar;
          img.alt = item.judul;
        }

        // Update judul
        const title = cards[index].querySelector(".product-title");
        if (title) title.textContent = item.judul;

        // Update deskripsi
        const desc = cards[index].querySelector(".product-description");
        if (desc) desc.textContent = item.deskripsi;

        // Update harga & satuan
        const priceCurrent = cards[index].querySelector(".price-current");
        const priceUnit = cards[index].querySelector(".price-unit");
        if (priceCurrent) priceCurrent.textContent = item.harga;
        if (priceUnit) priceUnit.textContent = item.satuan || "";

        // Update tombol WhatsApp
        const link = cards[index].querySelector(".product-cta");
        if (link) {
          const encodedMsg = encodeURIComponent(item.pesan_wa);
          link.href = `https://wa.me/${nomorWA}?text=${encodedMsg}`;
        }
      }
    });
  } catch (err) {
    console.error("Error load produk:", err.message);
  }
}

loadProduk();
