const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const LoanSchema = new mongoose.Schema({
  id_peminjaman: { type: String, default: uuidv4 },
  id_anggota: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  id_petugas: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
  id_buku: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  tanggal_pinjam: { type: Date, required: true },
  tanggal_kembali: { type: Date, required: true },
  denda_keterlambatan: { type: Number },
});

module.exports = mongoose.model('Loan', LoanSchema);

