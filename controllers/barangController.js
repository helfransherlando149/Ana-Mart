const Barang = require('../models/Barang');
const User = require('../models/Barang');

exports.createBarang = async (req, res) => {
  const { nama_barang, jumlah, harga } = req.body;

  try {
    const barang = await Barang.create({
      nama_barang,
      jumlah,
      harga,
      id_user: req.user.id,
    });

    res.status(201).send({ barang });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};

exports.getAllBarang = async (req, res) => {
  try {
    const barang = await Barang.findAll();
    res.json(barang);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};
