const mongoose = require('mongoose');
const Member = require('./Member');
const { v4: uuidv4 } = require('uuid');

const StudentSchema = new mongoose.Schema({
  id_mahasiswa: { type: String, default: uuidv4 },
});

module.exports = Member.discriminator('Student', StudentSchema);

