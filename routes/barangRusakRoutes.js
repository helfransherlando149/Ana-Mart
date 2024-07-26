const express = require('express');
const { createBarangRusak, getAllBarangRusak } = require('../controllers/barangRusakController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth('petugas'), createBarangRusak);
router.get('/', auth('manager'), getAllBarangRusak);

module.exports = router;
