const express = require('express');
const router = express.Router();
const LaporanBarangGudang = require('../models/LaporanBarangGudang');

router.get('/', async (req, res) => {
  try {
    const logs = await LaporanBarangGudang.findAll();
    res.json(logs);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
