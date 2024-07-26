const Loan = require('../models/Loan');

// Get all loans
exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find().populate('id_anggota id_petugas id_buku');
    res.json(loans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single loan by ID
exports.getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id).populate('id_anggota id_petugas id_buku');
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }
    res.json(loan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new loan
exports.createLoan = async (req, res) => {
  const { id_anggota, id_petugas, id_buku, tanggal_pinjam, tanggal_kembali, denda_keterlambatan } = req.body;

  const loan = new Loan({
    id_anggota,
    id_petugas,
    id_buku,
    tanggal_pinjam,
    tanggal_kembali,
    denda_keterlambatan,
  });

  try {
    const newLoan = await loan.save();
    res.status(201).json(newLoan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an existing loan
exports.updateLoan = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    const { tanggal_kembali, denda_keterlambatan } = req.body;
    if (tanggal_kembali) loan.tanggal_kembali = tanggal_kembali;
    if (denda_keterlambatan) loan.denda_keterlambatan = denda_keterlambatan;

    const updatedLoan = await loan.save();
    res.json(updatedLoan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a loan
exports.deleteLoan = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    await loan.remove();
    res.json({ message: 'Loan removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

