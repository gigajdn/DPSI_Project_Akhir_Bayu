const Loan = require('../models/Loan');
const Book = require('../models/Book');

const loanMiddleware = async (req, res, next) => {
  const { id_buku } = req.body;

  try {
    const book = await Book.findById(id_buku);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const activeLoans = await Loan.find({ id_buku, tanggal_kembali: null });

    if (activeLoans.length > 0) {
      return res.status(400).json({ message: 'Book is already loaned out' });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = loanMiddleware;
