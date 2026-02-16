const sheetURL = "MASUKKAN_LINK_CSV_DISINI";

let allData = [];

fetch(sheetURL)
  .then(res => res.text())
  .then(data => {
    const rows = data.split("\n").slice(1);

    rows.forEach(row => {
      const cols = row.split(",");
      if(cols.length > 6){
        allData.push({
          judul: cols[0],
          kategori: cols[1],
          lokasi: cols[2],
          harga: cols[3],
          gambar: cols[4],
          deskripsi: cols[5],
          whatsapp: cols[6]
        });
      }
    });

    tampilkanData("Semua");
  });

function tampilkanData(kategori){
  const container = document.getElementById("property-container");
  container.innerHTML = "";

  allData.forEach(item => {
    if(kategori === "Semua" || item.kategori === kategori){
      container.innerHTML += `
        <div class="card">
          <img src="${item.gambar}">
          <div class="card-content">
            <h3>${item.judul}</h3>
            <p>${item.lokasi}</p>
            <div class="price">Rp ${parseInt(item.harga).toLocaleString()}</div>
            <a class="btn-wa" href="https://wa.me/${item.whatsapp}" target="_blank">WhatsApp</a>
          </div>
        </div>
      `;
    }
  });
}

function filterKategori(kategori){
  tampilkanData(kategori);
}
