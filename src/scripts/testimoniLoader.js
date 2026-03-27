import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// === KONFIGURASI SUPABASE ===
const SUPABASE_URL = "https://jqeithheusmnrxtoaisk.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZWl0aGhldXNtbnJ4dG9haXNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzODczNDQsImV4cCI6MjA3NTk2MzM0NH0._STcPPBqU6-_CfSAakcQ7DlwcSa3iOswRYaF2Ec57-U";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


// === TESTIMONI LOADER ===
async function testimoniLoader() {
  try {
    const { data, error } = await supabase
      .from("testimoni")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;
    if (!data || data.length === 0) {
      console.warn("Data testimoni kosong.");
      return;
    }

    const container = document.querySelector(".testimoni-container");
    container.innerHTML = "";

    data.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("testimoni-card");
      card.innerHTML = `
        <p class="testimoni-quote">“${item.komentar}”</p>
        <div class="testimoni-user">
          <img src="${item.foto || "images/default-user.png"}" alt="${
        item.nama
      }">
          <div class="testimoni-info">
            <h4>${item.nama}</h4>
            <span>${item.pekerjaan || "Pelanggan"}</span>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error load testimoni:", err.message);
  }
}

testimoniLoader();
