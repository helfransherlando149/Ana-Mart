const express = require('express');
const { createLaporan, getAllLaporan, downloadLaporan } = require('../controllers/laporanController');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/', auth('manager'), createLaporan);
router.get('/', auth('manager'), getAllLaporan);
router.get('/download', auth('manager'), downloadLaporan);

module.exports = router;
