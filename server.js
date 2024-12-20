const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint untuk melaporkan barang hilang
app.post('/laporkan', (req, res) => {
    const { nama, penerbangan, lokasi, deskripsi, email } = req.body;

    // Setup transporter untuk mengirim email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'youremail@gmail.com', // Ganti dengan email Anda
            pass: 'yourpassword' // Ganti dengan password Anda
        }
    });

    // Set up email content
    const mailOptions = {
        from: 'youremail@gmail.com',
        to: email,
        subject: 'Laporan Barang Hilang',
        text: `Halo ${nama},\n\nBarang hilang Anda dengan penerbangan ${penerbangan} telah dilaporkan pada lokasi ${lokasi}. Deskripsi barang: ${deskripsi}.\nKami akan menghubungi Anda jika barang ditemukan.\n\nTerima kasih.`
    };

    // Mengirim email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Terjadi kesalahan saat mengirim email');
        }
        res.status(200).send('Laporan Anda telah berhasil dikirim, email konfirmasi telah dikirim!');
    });
});

// Endpoint untuk pencarian barang ditemukan
app.post('/cari', (req, res) => {
    const { kategori, tanggal, email } = req.body;

    // Email pemberitahuan jika pencarian berhasil
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'aldipras110@gmail.com',
            pass: 'yourpassword'
        }
    });

    const mailOptions = {
        from: 'youremail@gmail.com',
        to: email,
        subject: 'Status Pencarian Barang Ditemukan',
        text: `Pencarian untuk barang dengan kategori ${kategori} dan tanggal ${tanggal} sedang diproses. Kami akan menghubungi Anda jika barang ditemukan.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Terjadi kesalahan saat mengirim email');
        }
        res.status(200).send('Pencarian Anda sedang diproses, email konfirmasi telah dikirim!');
    });
});

// Menjalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
