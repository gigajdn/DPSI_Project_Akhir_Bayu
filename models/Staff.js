const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const StaffSchema = new mongoose.Schema({
  id_petugas: { type: String, default: uuidv4 },
  nomor_tlp: { type: String, required: true },
  alamat: { type: String, required: true },
  nama: { type: String, required: true },
});

module.exports = mongoose.model('Staff', StaffSchema);
