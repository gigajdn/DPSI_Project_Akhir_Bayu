const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Staff = require('../models/Staff');
const Member = require('../models/Member');
const Student = require('../models/Student');
const Public = require('../models/Public');


// Register a new staff
exports.registerStaff = async (req, res) => {
  const { email, nomor_tlp, alamat, nama, password } = req.body;

  try {
    const existingUser = await Staff.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah digunakan' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const staff = new Staff({
      email,
      nomor_tlp,
      alamat,
      nama,
      password: hashedPassword,
    });

    const newStaff = await staff.save();
    res.status(201).json(newStaff);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Register a new member
exports.registerMember = async (req, res) => {
  const { email, nama, alamat, nomor_tlp, password, type, additionalInfo } = req.body;

  try {
    const existingUser = await Member.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah digunakan' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let member;
    if (type === 'Student') {
      member = new Student({ email, nama, alamat, nomor_tlp, id_mahasiswa: additionalInfo.id_mahasiswa, password: hashedPassword });
    } else if (type === 'Public') {
      member = new Public({ email, nama, alamat, nomor_tlp, nik: additionalInfo.nik, password: hashedPassword });
    } else {
      return res.status(400).json({ message: 'Invalid member type' });
    }

    const newMember = await member.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Login staff or member
exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;

    if (role === 'staff') {
      user = await Staff.findOne({ email });
    } else if (role === 'member') {
      user = await Member.findOne({ email });
    } else {
      return res.status(400).json({ message: 'Invalid role specified' });
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT secret not defined' });
    }

    const token = jwt.sign({ id: user.id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
