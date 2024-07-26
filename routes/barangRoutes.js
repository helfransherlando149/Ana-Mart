// Mengimpor library Express untuk membuat dan mengelola router.
const express = require('express');

// Mengimpor fungsi dari barangController yang akan menangani permintaan.
const { createBarang, getAllBarang } = require('../controllers/barangController');

// Mengimpor middleware otentikasi untuk melindungi rute.
const auth = require('../middleware/auth');

// Membuat instance router baru dari Express.
const router = new express.Router();

// Mendefinisikan rute POST untuk URL dasar ('/').
// Rute ini dilindungi untuk peran 'petugas'.
// Fungsi 'createBarang' akan menangani permintaan untuk membuat barang baru.
router.post('/', auth('petugas'), createBarang);

// Mendefinisikan rute GET untuk URL dasar ('/').
// Rute ini dilindungi untu peran 'manager'.
// Fungsi 'getAllBarang' akan menangani permintaan untuk mengambil semua barang.
router.get('/', auth('manager'), getAllBarang);

// Mengekspor module router untuk digunakan di bagian lain dari aplikasi.
module.exports = router;
