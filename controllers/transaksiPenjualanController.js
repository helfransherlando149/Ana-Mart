const createTransaction = require('../helpers/createTransaction');
const TransaksiPenjualan = require('../models/TransaksiPenjualan');
const sequelize = require('../config/database');


exports.createTransaksi = async (req, res) => {
  const { barangterjual } = req.body;

  try {
    const transaksi = await createTransaction({
      barangterjual,
      id_user: req.user.id,
    });

    res.status(201).send({ transaksi });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};

exports.getAllTransaksi = async (req, res) => {
  try {
    const transaksiPenjualan = await TransaksiPenjualan.findAll();
    if (transaksiPenjualan.length === 0) {
      return res.status(404).send('No Transaksi Penjualan found');
    }
    res.json(transaksiPenjualan);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};
