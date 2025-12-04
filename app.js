// ===============================================
// KONFIGURASI
// ===============================================
const GAS_URL = "https://script.google.com/macros/s/AKfycbxEivk56LHkyGF5K6z64t9Mx5BQMuG1E0g7sCtujCQ3lyiN26IMFvQHD4JNNnBCjATs-w/exec"; 


// ===============================================
// KIRIM UCAPAN (POST)
// ===============================================
async function kirimUcapan(data) {
  try {
    const res = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.status === "sukses") {
      alert("Ucapan berhasil dikirim!");
    } else {
      alert("Gagal mengirim: " + result.message);
    }
  } catch (err) {
    console.error("POST ERROR:", err);
    alert("Gagal mengirim ucapan (Network error)");
  }
}


// ===============================================
// AMBIL DATA DARI SHEET (GET)
// ===============================================
function ambilUcapan() {
  fetch(GAS_URL)
    .then(res => res.json())
    .then(data => {
      renderUcapan(data);
    })
    .catch(err => console.error("GET ERROR:", err));
}


// ===============================================
// RENDER UCAPAN KE HTML
// ===============================================
function renderUcapan(list) {
  const box = document.getElementById("wish-list");
  if (!box) return;

  box.innerHTML = ""; // Bersihkan dulu

  list.forEach((item, index) => {
    const card = `
      <div class="wish-item-card" style="animation-delay:${index * 0.08}s">
        <div class="wish-name">${item.nama}</div>
        <div class="wish-text">${item.ucapan}</div>
        <div class="wish-meta">${item.kehadiran} • ${item.waktu}</div>
      </div>
    `;
    box.innerHTML += card;
  });
}


// ===============================================
// DOM READY
// ===============================================
document.addEventListener("DOMContentLoaded", () => {

  // =================================================
  // FORM HANDLE
  // =================================================
  const form = document.getElementById("wishForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = {
        nama: document.getElementById("wish-name").value,
        ucapan: document.getElementById("wish-message").value,
        kehadiran: document.getElementById("wish-kehadiran").value,
      };

      kirimUcapan(data);
      form.reset();

      setTimeout(ambilUcapan, 1200);
    });
  }

  // =================================================
  // OPENING SCREEN
  // =================================================
  const openBtn = document.getElementById("openBtn");
  const opening = document.getElementById("opening");
  const main = document.getElementById("main");
  const weddingMusic = document.getElementById("weddingMusic");

  if (openBtn && opening && main) {
    openBtn.addEventListener("click", () => {
      opening.style.opacity = "0";
      opening.style.transition = "opacity 0.8s";

      setTimeout(() => {
        opening.style.display = "none";
        main.classList.remove("hidden");
        main.style.opacity = 0;
        main.style.transition = "opacity 1s";

        setTimeout(() => (main.style.opacity = 1), 50);

        triggerAnimations();
        startPetals();
        main.scrollIntoView({ behavior: "smooth" });

        // Play background music
        weddingMusic?.play().catch(() => {});
      }, 800);
    });
  }

  // =================================================
  // Animasi Fade Slide
  // =================================================
  function triggerAnimations() {
    document.querySelectorAll(".fade-slide").forEach((el, i) => {
      setTimeout(() => el.classList.add("show"), i * 150);
    });
  }

  // =================================================
  // Parallax Foto
  // =================================================
  window.addEventListener("scroll", () => {
    document.querySelectorAll(".parallax-img").forEach(img => {
      img.style.transform = `translateY(${window.scrollY * 0.25}px)`;
    });
  });

  // =================================================
  // Bunga Jatuh
  // =================================================
  function startPetals() {
    const container = document.getElementById("petal-container");
    if (!container) return;

    for (let i = 0; i < 30; i++) {
      let p = document.createElement("div");
      p.className = "petal";
      p.style.left = Math.random() * 100 + "%";
      p.style.animationDuration = (4 + Math.random() * 4) + "s";
      p.style.animationDelay = Math.random() * 5 + "s";

      let size = 15 + Math.random() * 20;
      p.style.width = size + "px";
      p.style.height = size + "px";

      container.appendChild(p);
    }
  }

  // Ambil ucapan pertama kali saat halaman terbuka
  ambilUcapan();
});


// ===============================================
// BUKA GOOGLE MAPS
// ===============================================
function openLocation(url) {
  window.open(url, "_blank");
}
