const Member = require('../models/Member');
const Student = require('../models/Student');
const Public = require('../models/Public');
const bcrypt = require('bcryptjs');

// Get all members
exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single member by ID
exports.getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new member
exports.createMember = async (req, res) => {
  const { nama, alamat, nomor_tlp, password, type, additionalInfo } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let member;
    if (type === 'Student') {
      member = new Student({ nama, alamat, nomor_tlp, id_mahasiswa: additionalInfo.id_mahasiswa, password: hashedPassword });
    } else if (type === 'Public') {
      member = new Public({ nama, alamat, nomor_tlp, nik: additionalInfo.nik, password: hashedPassword });
    } else {
      return res.status(400).json({ message: 'Invalid member type' });
    }

    const newMember = await member.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an existing member
exports.updateMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    const { nama, alamat, nomor_tlp, password } = req.body;
    if (nama) member.nama = nama;
    if (alamat) member.alamat = alamat;
    if (nomor_tlp) member.nomor_tlp = nomor_tlp;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      member.password = await bcrypt.hash(password, salt);
    }

    const updatedMember = await member.save();
    res.json(updatedMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a member
exports.deleteMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    await member.remove();
    res.json({ message: 'Member removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
