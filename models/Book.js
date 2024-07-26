const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const BookSchema = new mongoose.Schema({
  id_buku: { type: String, default: uuidv4 },
  judul: { type: String, required: true },
  deskripsi: { type: String, required: true },
  penulis: { type: String, required: true },
});

module.exports = mongoose.model('Book', BookSchema);
