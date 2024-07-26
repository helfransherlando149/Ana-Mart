const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RequestBarang = sequelize.define('RequestBarang', {
  id_request: {
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
  tanggal_request: {
    type: DataTypes.DATE,
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
  },
});

module.exports = RequestBarang;
