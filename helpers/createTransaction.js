const TransaksiPenjualan = require('../models/TransaksiPenjualan');
const Barang = require('../models/Barang');
const LaporanBarangGudang = require('../models/LaporanBarangGudang');
const sequelize = require('../config/database');

const createTransaction = async ({ barangterjual, id_user }) => {
  let totaltransaksi = 0;

  const transaction = await sequelize.transaction();

  try {
    for (const item of barangterjual) {
      const barang = await Barang.findByPk(item.id_barang, { transaction });
      if (!barang) {
        throw new Error(`Barang with id ${item.id_barang} not found`);
      }
      totaltransaksi += barang.harga * item.jumlah;
      
      // Update stok barang
      const jumlahBaru = barang.jumlah - item.jumlah;
      await barang.update({ jumlah: jumlahBaru }, { transaction });

      // Log perubahan stok
      await LaporanBarangGudang.create({
        id_barang: item.id_barang,
        tanggal: new Date(),
        perubahan: 'Penjualan',
        jumlah: item.jumlah,
        id_user,
      }, { transaction });
    }

    const transaksi = await TransaksiPenjualan.create({
      tanggal: new Date(),
      barangterjual,
      totaltransaksi,
      id_user,
    }, { transaction });

    await transaction.commit();
    return transaksi;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = createTransaction;
