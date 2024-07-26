const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Barang = sequelize.define('Barang', {
  id_barang: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nama_barang: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jumlah: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  harga : {
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


module.exports = Barang;
