const User = require('../models/User');
const Barang = require('../models/Barang');
const RequestBarang = require('../models/RequestBarang');


exports.createRequestBarang = async (req, res) => {
  const { id_barang, jumlah } = req.body;

  try {
    const requestBarang = await RequestBarang.create({
      id_barang,
      tanggal_request: new Date(),
      jumlah,
      id_user: req.user.id,
    });
    res.status(201).send({requestBarang});
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.getRequestBarang = async (req, res) => {
  try {
    const requestBarang = await RequestBarang.findAll();
    res.json(requestBarang);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};