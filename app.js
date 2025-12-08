// ========================================
// URL GOOGLE APPS SCRIPT
// ========================================
const GAS_URL = "https://script.google.com/macros/s/AKfycbwPfsyUV4JlaL05_u1ZPoknGvLPM_kLVUZ9Ioe_opnZhlOzy7SkIMDo4H4NDv5dA8Vvrg/exec";


// ========================================//
// KIRIM UCAPAN
// ========================================//
async function kirimUcapan(data) {
  const formData = new FormData();
  formData.append("nama", data.nama);
  formData.append("ucapan", data.ucapan);
  formData.append("kehadiran", data.kehadiran);

  try {
    const res = await fetch(GAS_URL, {
      method: "POST",
      body: formData
    });

    const result = await res.json();
    console.log("POST OK:", result);
    alert("Ucapan berhasil dikirim!");

  } catch (err) {
    console.error("POST ERROR:", err);
    alert("Gagal mengirim ucapan!");
  }
}


// ========================================
// AMBIL UCAPAN
// ========================================
async function ambilUcapan() {
  try {
    const res = await fetch(GAS_URL);
    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("FORMAT SALAH:", data);
      return;
    }

    renderUcapan(data);

  } catch (err) {
    console.error("GET ERROR:", err);
  }
}



// ========================================
// TAMPILKAN DATA
// ========================================
function renderUcapan(list) {
  const box = document.getElementById("wishList"); // <- SUDAH BENAR
  box.innerHTML = "";

  list.forEach(item => {
    box.innerHTML += `
      <div class="wish-item mb-3 p-2" style="border-bottom:1px solid #fff3;">
        <strong>${item.nama}</strong><br>
        ${item.ucapan}<br>
        <small>${item.kehadiran} • ${item.waktu}</small>
      </div>
    `;
  });
}



// ========================================
// FORM SUBMIT
// ========================================
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("wishForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      nama: document.getElementById("wish-name").value.trim(),
      ucapan: document.getElementById("wish-message").value.trim(),
      kehadiran: document.getElementById("wish-kehadiran").value
    };

    if (!data.nama || !data.ucapan) {
      alert("Nama & ucapan wajib diisi!");
      return;
    }

    await kirimUcapan(data);
    form.reset();

    setTimeout(ambilUcapan, 500);
  });

  ambilUcapan();
});


// ===================================================
// BUKA GOOGLE MAPS
// ===================================================
function openLocation(url) {
  window.open(url, "_blank");
}
