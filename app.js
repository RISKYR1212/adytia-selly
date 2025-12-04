// URL Google Apps Script kamu
const GAS_URL = "https://script.google.com/macros/s/AKfycbzstQkc7TrpFejH_AcdoQlA1wvM3hrT9-4JpP-S-MnjFU_1-ar6s9PdRAEXLI2DSVboAw/exec";


// ===================================================
// KIRIM DATA KE GOOGLE SHEET
// ===================================================
function kirimUcapan(data) {
  fetch(GAS_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(() => console.log("Data terkirim"))
    .catch(err => console.error("POST ERROR:", err));
}


// ===================================================
// AMBIL DATA DARI SHEET
// ===================================================
function ambilUcapan() {
  fetch(GAS_URL)
    .then(res => res.json())
    .then(data => {
      renderUcapan(data);
    })
    .catch(err => console.error("GET ERROR:", err));
}


// ===================================================
// RENDER DATA KE HTML
// ===================================================
function renderUcapan(list) {
  const box = document.getElementById("wish-list");

  if (!box) {
    console.error("Element #wish-list tidak ditemukan!");
    return;
  }

  box.innerHTML = "";

  list.forEach(item => {
    const bubble = `
      <div class="wish-item p-3 mb-3 rounded" style="background:#fff;">
        <strong>${item.nama}</strong><br>
        ${item.ucapan}<br>
        <small>${item.kehadiran} - ${item.waktu}</small>
        <hr>
      </div>
    `;
    box.innerHTML += bubble;
  });
}


// ===================================================
// DOM Loaded
// ===================================================
document.addEventListener("DOMContentLoaded", () => {

  /* ============================
     FORM HANDLER
  ============================ */
  const form = document.getElementById("wishForm");

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      const data = {
        nama: document.getElementById("wish-name").value,
        ucapan: document.getElementById("wish-message").value,
        kehadiran: document.getElementById("wish-kehadiran").value,
      };

      kirimUcapan(data);

      setTimeout(ambilUcapan, 1500); // refresh list
    });
  }

  /* ============================
     OPENING SCREEN
  ============================ */
  const openBtn = document.getElementById("openBtn");
  const opening = document.getElementById("opening");
  const main = document.getElementById("main");
  const weddingMusic = document.getElementById("weddingMusic");

  if (openBtn && opening && main) {
    openBtn.addEventListener("click", () => {
      opening.style.transition = "opacity 0.8s";
      opening.style.opacity = "0";

      setTimeout(() => {
        opening.style.display = "none";
        main.classList.remove("hidden");
        main.style.opacity = 0;
        main.style.transition = "opacity 1s";

        setTimeout(() => (main.style.opacity = 1), 50);

        triggerAnimations();
        startPetals();

        main.scrollIntoView({ behavior: "smooth" });

        weddingMusic?.play().catch(() => {});
      }, 800);
    });
  }

  /* ============================
     Animations
  ============================ */
  function triggerAnimations() {
    document.querySelectorAll(".fade-slide").forEach((el, i) =>
      setTimeout(() => el.classList.add("show"), i * 200)
    );
  }

  /* ============================
     Parallax
  ============================ */
  window.addEventListener("scroll", () => {
    document.querySelectorAll(".parallax-img").forEach(img => {
      img.style.transform = `translateY(${window.scrollY * 0.25}px)`;
    });
  });

  /* ============================
     Falling Petals
  ============================ */
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

  // Ambil data saat halaman pertama kali dibuka
  ambilUcapan();
});


// ===================================================
// BUKA GOOGLE MAPS
// ===================================================
function openLocation(url) {
  window.open(url, "_blank");
}
