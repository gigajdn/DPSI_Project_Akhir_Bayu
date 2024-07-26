const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Staff = require('../models/Staff');
const Member = require('../models/Member');

// Register a new staff
exports.registerStaff = async (req, res) => {
  const { nomor_tlp, alamat, nama, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const staff = new Staff({
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

// Login staff or member
exports.login = async (req, res) => {
  const { nomor_tlp, password, role } = req.body;

  try {
    let user;

    if (role === 'staff') {
      user = await Staff.findOne({ nomor_tlp });
    } else if (role === 'member') {
      user = await Member.findOne({ nomor_tlp });
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

    const token = jwt.sign({ id: user.id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
