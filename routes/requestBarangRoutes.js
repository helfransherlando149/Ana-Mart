const express = require('express');
const { createRequestBarang, getRequestBarang } = require('../controllers/requestBarangController');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/', auth('petugas'), createRequestBarang);
router.get('/', auth('manager'), getRequestBarang);

module.exports = router;
