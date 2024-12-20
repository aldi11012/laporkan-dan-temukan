document.getElementById('report-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert("Laporan Barang Hilang Anda telah dikirim.");
});

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert("Pencarian barang yang ditemukan sedang diproses.");
});
