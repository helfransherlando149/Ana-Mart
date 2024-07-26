const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TransaksiPenjualan = sequelize.define('TransaksiPenjualan', {
  id_penjualan: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tanggal: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  barangterjual: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('barangterjual');
      return rawValue ? JSON.parse(rawValue) : null;
    },
    set(value) {
      this.setDataValue('barangterjual', JSON.stringify(value));
    },
  },
  totaltransaksi: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id_user',
    },
  },
});

module.exports = TransaksiPenjualan;
