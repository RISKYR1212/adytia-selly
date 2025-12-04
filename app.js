document.addEventListener("DOMContentLoaded", () => {

  const GAS_URL = "https://script.google.com/macros/s/AKfycbzstQkc7TrpFejH_AcdoQlA1wvM3hrT9-4JpP-S-MnjFU_1-ar6s9PdRAEXLI2DSVboAw/exec";

  /* =======================
        SUBMIT FORM
  ======================= */
  document.getElementById("wishForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const ucapan = document.getElementById("ucapan").value.trim();
    const kehadiran = document.getElementById("kehadiran").value;

    if (!nama || !ucapan || !kehadiran) {
      alert("Mohon lengkapi semua data.");
      return;
    }

    try {
      const res = await fetch(GAS_URL, {
        method: "POST",
        body: JSON.stringify({ nama, ucapan, kehadiran })
      });

      const result = await res.json();

      tambahBubble(nama, ucapan, kehadiran, result.waktu);

      document.getElementById("wishForm").reset();

    } catch (error) {
      console.error("POST Error:", error);
      alert("Gagal mengirim ucapan!");
    }
  });


  /* =======================
      TAMPILKAN DATA (GET)
  ======================= */
  function loadUcapan() {
    fetch(GAS_URL)
      .then(res => res.json())
      .then(data => {
        let container = document.getElementById("wishList");
        container.innerHTML = "";

        data.reverse().forEach(item => {
          tambahBubble(item.nama, item.ucapan, item.kehadiran, item.waktu);
        });
      })
      .catch(err => console.error("GET Error:", err));
  }

  loadUcapan();


  /* =======================
      TAMPILKAN BUBBLE BARU
  ======================= */
  function tambahBubble(nama, ucapan, kehadiran, waktu) {
    const bubble = document.createElement("div");
    bubble.className = "p-3 mb-3 rounded";
    bubble.style.background = "#fff";
    bubble.innerHTML = `
      <strong>${nama}</strong><br>
      <span>${ucapan}</span><br>
      <small>${kehadiran} - ${waktu}</small>
    `;
    document.getElementById("wishList").prepend(bubble);
  }

});

/* ============================================================
      OPENING SCREEN
  ============================================================ */
  openBtn.addEventListener("click", () => {
    opening.style.transition = "opacity 0.8s ease";
    opening.style.opacity = "0";

    setTimeout(() => {
      opening.style.display = "none";
      main.classList.remove("hidden");

      main.style.opacity = 0;
      main.style.transition = "opacity 1s ease";
      setTimeout(() => (main.style.opacity = 1), 50);

      triggerAnimations();
      startPetals();
      main.scrollIntoView({ behavior: "smooth" });

      weddingMusic.play().catch(err => console.log("Autoplay error:", err));
    }, 800);
  });


  /* ============================================================
      Fade + Slide Animation
  ============================================================ */
  function triggerAnimations() {
    document.querySelectorAll(".fade-slide").forEach((el, i) =>
      setTimeout(() => el.classList.add("show"), i * 200)
    );
  }


  /* ============================================================
      Parallax Effect
  ============================================================ */
  window.addEventListener("scroll", () => {
    document.querySelectorAll(".parallax-img").forEach(img => {
      img.style.transform = `translateY(${window.scrollY * 0.25}px)`;
    });
  });


  /* ============================================================
      Falling Petals Animation
  ============================================================ */
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

;


/* ============================================================
   OPEN GOOGLE MAPS
============================================================ */
function openLocation(url) {
  window.open(url, "_blank");
}
