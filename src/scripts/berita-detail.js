import { getBeritaBySlug } from "./loaderBerita.js";

const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get("slug");

async function renderBerita() {
  if (!slug) {
    document.getElementById("postContent").innerHTML =
      "<p>Slug tidak ditemukan.</p>";
    return;
  }

  const post = await getBeritaBySlug(slug);

  if (!post) {
    document.getElementById("postContent").innerHTML =
      "<p>Artikel tidak ditemukan.</p>";
    return;
  }

  // =====================
  // HERO
  // =====================
  document.getElementById("heroImage").src =
    post.hero_url || "../images/default-hero.jpg";

  document.getElementById("postTitle").textContent = post.title;

  document.getElementById("postDate").textContent = new Date(
    post.created_at
  ).toLocaleDateString("id-ID");

  // =====================
  // CONTENT (Markdown → HTML)
  // =====================
  document.getElementById("postContent").innerHTML =
    marked.parse(post.content);

  // =====================
  // 🔥 SHARE FEATURE
  // =====================
  const currentUrl = window.location.href;
  const text = encodeURIComponent(post.title);
  const url = encodeURIComponent(currentUrl);

  // WhatsApp
  const waBtn = document.getElementById("shareWhatsapp");
  if (waBtn) {
    waBtn.href = `https://wa.me/?text=${text}%20${url}`;
  }

  // Facebook
  const fbBtn = document.getElementById("shareFacebook");
  if (fbBtn) {
    fbBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  }

  // Copy Link
  const copyBtn = document.getElementById("copyLink");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(currentUrl);
      alert("Link berhasil disalin!");
    });
  }
}

// Jalankan
renderBerita();