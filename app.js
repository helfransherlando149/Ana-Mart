require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const laporanRoutes = require('./routes/laporanRoutes');
const laporanBarangGudangRoutes = require('./routes/laporanBarangGudangRoutes');
const transaksiPenjualanRoutes = require('./routes/transaksiPenjualanRoutes');
const pemasukanPengeluaranRoutes = require('./routes/pemasukanPengeluaranRoutes');
const barangRoutes = require('./routes/barangRoutes');
const barangRusakRoutes = require('./routes/barangRusakRoutes');
const requestBarangRoutes = require('./routes/requestBarangRoutes');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Welcome to AnaMart');
});

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/auth', authRoutes );
app.use('/users', userRoutes);
app.use('/laporan', laporanRoutes);
app.use('/transaksi-penjualan', transaksiPenjualanRoutes);
app.use('/pemasukan-pengeluaran', pemasukanPengeluaranRoutes );
app.use('/barang', barangRoutes);
app.use('/laporan-barang-gudang', laporanBarangGudangRoutes);
app.use('/barang-rusak', barangRusakRoutes);
app.use('/request-barang', requestBarangRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => {
  console.log('Unable to connect to the database:', error);
});

module.exports = app;
