const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LaporanBarangGudang = sequelize.define('LaporanBarangGudang', {
  id_log: {
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
  tanggal: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  perubahan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jumlah: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id_user'
    }
  }
});

module.exports = LaporanBarangGudang;
