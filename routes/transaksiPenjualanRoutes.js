const express = require('express');
const { createTransaksi, getAllTransaksi } = require('../controllers/transaksiPenjualanController');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/', auth('kasir'), createTransaksi);
router.get('/', auth('manager'), getAllTransaksi);

module.exports = router;
