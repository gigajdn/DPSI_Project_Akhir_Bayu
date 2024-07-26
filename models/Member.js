const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const MemberSchema = new mongoose.Schema({
  id_anggota: { type: String, default: uuidv4 },
  email: { type: String, required: true, unique: true },
  nama: { type: String, required: true },
  alamat: { type: String, required: true },
  nomor_tlp: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Member', MemberSchema);
