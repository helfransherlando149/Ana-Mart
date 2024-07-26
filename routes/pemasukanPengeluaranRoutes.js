const express = require('express');
const { createPemasukanPengeluaran, getPemasukanPengeluaran} = require('../controllers/pemasukanPengeluaranController');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/', auth('kasir'), createPemasukanPengeluaran);
router.get('/', auth('manager'), getPemasukanPengeluaran);

module.exports = router;
