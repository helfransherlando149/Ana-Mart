const User = require('../models/User');
const LaporanPenjualan = require('../models/LaporanPenjualan');
const TransaksiPenjualan = require('../models/TransaksiPenjualan');
const { Parser } = require('json2csv');
const sequelize = require('../config/database');
const path = require('path');
const { Op } = require('sequelize');
const moment = require('moment');

// Fungsi untuk mengambil total transaksi per minggu
async function getTotalTransaksiPerMinggu() {
  const startOfWeek = moment().startOf('week').toDate();
  const endOfWeek = moment().endOf('week').toDate();

  const result = await TransaksiPenjualan.findAll({
    where: {
      tanggal: {
        [Op.between]: [startOfWeek, endOfWeek],
      },
    },
    attributes: [
      [sequelize.fn('SUM', sequelize.col('totaltransaksi')), 'totalTransaksiMingguan'],
    ],
    raw: true,
  });

  return result[0].totalTransaksiMingguan || 0;
}

// Fungsi untuk mengekspor transaksi ke CSV dan mengembalikan CSV dan rentang minggu
async function exportTransaksiToCSV() {
  const startOfWeek = moment().startOf('week').format('YYYY-MM-DD');
  const endOfWeek = moment().endOf('week').format('YYYY-MM-DD');

  const transaksi = await TransaksiPenjualan.findAll({
    where: {
      tanggal: {
        [Op.between]: [moment(startOfWeek).toDate(), moment(endOfWeek).toDate()],
      },
    },
    attributes: ['id_penjualan', 'tanggal', 'barangterjual', 'totaltransaksi', 'id_user'],
  });

  const transaksiJSON = transaksi.map(t => t.toJSON());
  const json2csvParser = new Parser();
  const csv = json2csvParser.parse(transaksiJSON);

  return { csv, startOfWeek, endOfWeek };
}

// Controller untuk membuat laporan
exports.createLaporan = async (req, res) => {
  try {
    const totalTransaksiMingguan = await getTotalTransaksiPerMinggu();

    const laporan = await LaporanPenjualan.create({
      id_user: req.user.id,
      tanggal: new Date(),
      totalpenjualan: totalTransaksiMingguan,
    });

    res.status(201).send(laporan);
  } catch (error) {
    console.log(error)
    res.status(500).send('Server Error');
  }
};

// Controller untuk mendapatkan laporan berdasarkan ID
exports.getAllLaporan = async (req, res) => {
  try {
    const laporan = await LaporanPenjualan.findAll();
    if (!laporan) return res.status(404).send('Laporan not found');
    res.json(laporan);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Controller untuk mengunduh laporan transaksi per minggu dalam bentuk CSV
exports.downloadLaporan = async (req, res) => {
  try {
    const { csv, startOfWeek, endOfWeek } = await exportTransaksiToCSV();
    const fileName = `transaksi_mingguan_${startOfWeek}_to_${endOfWeek}.csv`;
    res.header('Content-Type', 'text/csv');
    res.attachment(fileName);
    res.send(csv);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};
