const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authMiddleware');

// Routes accessible to both staff and members
router.get('/', authMiddleware(['staff', 'member']), bookController.getAllBooks);
router.get('/:id', authMiddleware(['staff', 'member']), bookController.getBookById);

// Routes accessible to staff only
router.post('/', authMiddleware(['staff']), bookController.createBook);
router.put('/:id', authMiddleware(['staff']), bookController.updateBook);
router.delete('/:id', authMiddleware(['staff']), bookController.deleteBook);

module.exports = router;
