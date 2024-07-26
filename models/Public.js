const mongoose = require('mongoose');
const Member = require('./Member');
const { v4: uuidv4 } = require('uuid');

const PublicSchema = new mongoose.Schema({
  nik: { type: String, default: uuidv4 },
});

module.exports = Member.discriminator('Public', PublicSchema);

