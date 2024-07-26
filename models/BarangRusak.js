const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BarangRusak = sequelize.define('BarangRusak', {
  id_barangrusak: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_barang: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Barangs',
      key: 'id_barang'
    }
  },
  tanggal_lapor: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  kondisi: {
    type: DataTypes.STRING,
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

module.exports = BarangRusak;
