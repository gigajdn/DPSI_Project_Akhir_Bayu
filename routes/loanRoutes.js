const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');
const authMiddleware = require('../middlewares/authMiddleware');
const loanMiddleware = require('../middlewares/loanMiddleware');

router.get('/', authMiddleware, loanController.getAllLoans);
router.get('/:id', authMiddleware, loanController.getLoanById);
router.post('/', authMiddleware, loanMiddleware, loanController.createLoan);
router.put('/:id', authMiddleware, loanController.updateLoan);
router.delete('/:id', authMiddleware, loanController.deleteLoan);

module.exports = router;
