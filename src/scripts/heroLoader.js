// Pastikan kamu sudah menyertakan script Supabase di HTML kamu:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

const SUPABASE_URL = "https://jqeithheusmnrxtoaisk.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZWl0aGhldXNtbnJ4dG9haXNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzODczNDQsImV4cCI6MjA3NTk2MzM0NH0._STcPPBqU6-_CfSAakcQ7DlwcSa3iOswRYaF2Ec57-U";

// ✅ INISIALISASI BENAR
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function fetchHeroData() {
  try {
    const { data, error } = await supabase
      .from("hero_section")
      .select("*")
      .eq("is_active", true)
      .limit(1)
      .single();

    if (error) {
      console.error("❌ Error fetch hero data:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("❌ Unexpected error:", err);
    return null;
  }
}

function updateHeroSection(heroData) {
  if (!heroData) return;

  const heroTitle = document.querySelector(".hero_title");
  const heroSubtitle = document.querySelector(".hero_subtitle");
  const heroImage = document.querySelector(".hero-image");

  if (heroTitle && heroData.title) heroTitle.textContent = heroData.title;
  if (heroSubtitle && heroData.subtitle)
    heroSubtitle.textContent = heroData.subtitle;
  if (heroImage && heroData.image_url) {
    heroImage.src = heroData.image_url;
    heroImage.alt = heroData.image_alt || "immkomikes";
  }
}

async function loadHeroSection() {
  const heroData = await fetchHeroData();
  updateHeroSection(heroData);
}

document.addEventListener("DOMContentLoaded", loadHeroSection);
