// Pastikan kamu sudah menyertakan script Supabase di HTML kamu:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

import { supabase } from "./supabase.js";

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
