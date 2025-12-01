document.addEventListener("DOMContentLoaded", () => {

document.addEventListener("DOMContentLoaded", () => {

  const opening = document.getElementById("opening");
  const main = document.getElementById("main");
  const openBtn = document.getElementById("openBtn");
  const weddingMusic = document.getElementById("bg-music");

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

      /** PLAY MUSIK **/
      weddingMusic.play().catch(err => {
        console.log("Autoplay error:", err);
      });

    }, 800);
  });

});


  /* ========================
     Fade + Slide Animation
  ========================= */
  function triggerAnimations() {
    document.querySelectorAll(".fade-slide").forEach((el, i) =>
      setTimeout(() => el.classList.add("show"), i * 200)
    );
  }

  /* ========================
     Parallax
  ========================= */
  window.addEventListener("scroll", () => {
    document.querySelectorAll(".parallax-img").forEach(img => {
      img.style.transform = `translateY(${window.scrollY * 0.25}px)`;
    });
  });

  /* ========================
     Falling Petals
  ========================= */
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

});
