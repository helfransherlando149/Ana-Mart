const { Op } = require('sequelize');
const TransaksiPenjualan = require('../models/TransaksiPenjualan');
const moment = require('moment');

const sumTransactions = async ({ date, jenis }) => {
  console.log('sumTransactions called with:', { date, jenis });

  if (jenis === 'pemasukan') {
    // Convert the date to ISO format and get the start and end of the day in UTC
    const formattedDate = moment.utc(date, 'YYYY-MM-DD').startOf('day');
    const startOfDay = formattedDate.toDate();
    const endOfDay = formattedDate.endOf('day').toDate();

    console.log('Start of Day:', startOfDay);
    console.log('End of Day:', endOfDay);

    const transactions = await TransaksiPenjualan.findAll({
      where: {
        tanggal: {
          [Op.between]: [startOfDay, endOfDay]
        }
      }
    });

    console.log('Transactions Found:', transactions);

    const totalIncome = transactions.reduce((sum, transaction) => {
      return sum + transaction.totaltransaksi;
    }, 0);

    console.log('Total Income:', totalIncome);

    return totalIncome;
  }

  // If jenis is 'pengeluaran', this function should not calculate anything
  throw new Error('Pengeluaran should not be calculated by this function');
};

module.exports = sumTransactions;
