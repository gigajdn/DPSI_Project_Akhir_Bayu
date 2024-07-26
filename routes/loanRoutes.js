const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');
const authMiddleware = require('../middlewares/authMiddleware');
const loanMiddleware = require('../middlewares/loanMiddleware');

// Routes accessible to both staff and members
router.get('/', authMiddleware(['staff', 'member']), loanController.getAllLoans);
router.get('/:id', authMiddleware(['staff', 'member']), loanController.getLoanById);

// Routes accessible to staff only
router.post('/', authMiddleware(['staff']), loanMiddleware, loanController.createLoan);
router.put('/:id', authMiddleware(['staff']), loanController.updateLoan);
router.delete('/:id', authMiddleware(['staff']), loanController.deleteLoan);

module.exports = router;
