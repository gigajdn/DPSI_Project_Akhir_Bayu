const Staff = require('../models/Staff');

// Get all staff
exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single staff by ID
exports.getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new staff
exports.createStaff = async (req, res) => {
  const { nomor_tlp, alamat, nama, password } = req.body;

  const staff = new Staff({
    nomor_tlp,
    alamat,
    nama,
    password,
  });

  try {
    const newStaff = await staff.save();
    res.status(201).json(newStaff);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an existing staff
exports.updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    const { nomor_tlp, alamat, nama, password } = req.body;
    if (nomor_tlp) staff.nomor_tlp = nomor_tlp;
    if (alamat) staff.alamat = alamat;
    if (nama) staff.nama = nama;
    if (password) staff.password = password;

    const updatedStaff = await staff.save();
    res.json(updatedStaff);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a staff
exports.deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    await staff.remove();
    res.json({ message: 'Staff removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

