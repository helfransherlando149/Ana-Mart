const BarangRusak = require('../models/BarangRusak');
const Barang  = require('../models/Barang');
const User = require('../models/User');

exports.createBarangRusak = async (req, res) => {
  const { id_barang, kondisi } = req.body;

  try {
    const barangRusak = await BarangRusak.create({
      id_barang,
      tanggal_lapor: new Date(),
      kondisi,
      id_user: req.user.id,
    });
    res.status(201).send({ barangRusak });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};

exports.getAllBarangRusak = async (req, res) => {
  try {
    const barangRusak = await BarangRusak.findAll();
    if (barangRusak.length === 0) {
      return res.status(404).send('No Barang Rusak found');
    }
    res.json(barangRusak);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};

