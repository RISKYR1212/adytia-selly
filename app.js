// URL Google Apps Script kamu
const GAS_URL = "https://script.google.com/macros/s/AKfycbwPfsyUV4JlaL05_u1ZPoknGvLPM_kLVUZ9Ioe_opnZhlOzy7SkIMDo4H4NDv5dA8Vvrg/exec";

// ===================================================
// KIRIM DATA KE GOOGLE SHEET
// ===================================================
function kirimUcapan(data) {
  const formData = new FormData();
  formData.append("nama", data.nama);
  formData.append("ucapan", data.ucapan);
  formData.append("kehadiran", data.kehadiran);

  fetch(GAS_URL, {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(r => console.log("POST OK:", r))
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
        <small>${item.kehadiran} • ${item.waktu}</small>
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
        nama: document.getElementById("wish-name").value.trim(),
        ucapan: document.getElementById("wish-message").value.trim(),
        kehadiran: document.getElementById("wish-kehadiran").value,
      };

      if (!data.nama || !data.ucapan) {
        alert("Nama & ucapan harus diisi!");
        return;
      }

      kirimUcapan(data);

      form.reset();

      setTimeout(ambilUcapan, 800);
    });
  }

  ambilUcapan();
});

// ===================================================
// BUKA GOOGLE MAPS
// ===================================================
function openLocation(url) {
  window.open(url, "_blank");
}
