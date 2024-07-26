const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LaporanPenjualan = sequelize.define('LaporanPenjualan', {
  id_penjualan: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tanggal: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  totalpenjualan: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id_user'
    }
  },
});

module.exports = LaporanPenjualan;
