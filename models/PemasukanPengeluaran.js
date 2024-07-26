const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PemasukanPengeluaran = sequelize.define('PemasukanPengeluaran', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tanggal: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  jenis: {
    type: DataTypes.ENUM('pemasukan', 'pengeluaran'),
    allowNull: false,
  },
  jumlah: {
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

module.exports = PemasukanPengeluaran;
