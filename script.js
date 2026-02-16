<script>
const sheetURL = "https://opensheet.elk.sh/2PACX-1vTnJfpJJw13UmcMFX0pcrLqNW3twSFwk3KkCx54TSoRN3Vf83_tvZrLB5CF7yztmxsCTVPd_vKnZH9p/Sheet1";

let properties = [];
const container = document.getElementById("property-list");

container.innerHTML = "<p style='text-align:center;padding:40px;'>Memuat properti...</p>";

fetch(sheetURL)
.then(res => res.json())
.then(data => {

    // Normalisasi key supaya tidak sensitif huruf besar
    properties = data.map(item => ({
        judul: item.judul || item.Judul || "",
        kategori: item.kategori || item.Kategori || "",
        spesifikasi: item.spesifikasi || item.Spesifikasi || "",
        harga: item.harga || item.Harga || "0",
        gambar: item.gambar || item.Gambar || "",
        whatsapp: item.whatsapp || item.Whatsapp || "6281234567890"
    })).filter(p => p.judul && p.gambar);

    displayProperties(properties);
})
.catch(err => {
    container.innerHTML = "<p style='text-align:center;color:red;'>Gagal memuat data.</p>";
    console.error(err);
});

function displayProperties(data){
    container.innerHTML = "";

    if(data.length === 0){
        container.innerHTML = "<p style='text-align:center;'>Data tidak ditemukan</p>";
        return;
    }

    data.forEach(item => {

        let hargaClean = item.harga.toString().replace(/\D/g,'');
        let hargaFormat = parseInt(hargaClean || 0).toLocaleString('id-ID');

        container.innerHTML += `
        <div class="card">
            <img src="${item.gambar}" onerror="this.src='https://via.placeholder.com/400x250?text=No+Image'">
            <div class="card-body">
                <h3>${item.judul}</h3>
                <p>${item.spesifikasi}</p>
                <div class="price">RP ${hargaFormat}</div>
                <a class="btn-wa"
                href="https://wa.me/${item.whatsapp}?text=Halo saya tertarik dengan ${item.judul}"
                target="_blank">
                Tanya via WhatsApp
                </a>
            </div>
        </div>
        `;
    });
}
</script>
