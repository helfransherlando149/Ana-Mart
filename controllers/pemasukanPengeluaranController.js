const PemasukanPengeluaran = require('../models/PemasukanPengeluaran');
const sumTransactions = require('../helpers/sumTransaction');

exports.createPemasukanPengeluaran = async (req, res) => {
  const { tanggal, jenis, jumlah } = req.body;

  console.log('Request Body:', req.body);

  try {
    let calculatedJumlah = jumlah;

    if (jenis === 'pemasukan') {
      calculatedJumlah = await sumTransactions({ date: tanggal, jenis });
    } else if (jenis === 'pengeluaran') {
      // Directly use jumlah for pengeluaran
      if (jumlah == null) {
        return res.status(400).send('Jumlah is required for pengeluaran');
      }
      calculatedJumlah = jumlah;
    } else {
      return res.status(400).send('Invalid jenis value');
    }

    const pemasukanPengeluaran = await PemasukanPengeluaran.create({
      tanggal: new Date(),
      jenis,
      jumlah: calculatedJumlah,
      id_user: req.user.id,
    });

    res.status(201).json(pemasukanPengeluaran);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};


exports.getPemasukanPengeluaran = async (req, res) => {
  try {
    const pemasukanPengeluaran = await PemasukanPengeluaran.findAll();
    res.json(pemasukanPengeluaran);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};