const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const authMiddleware = require('../middlewares/authMiddleware');

// Routes accessible to staff only
router.get('/', authMiddleware(['staff']), staffController.getAllStaff);
router.get('/:id', authMiddleware(['staff']), staffController.getStaffById);
router.post('/', authMiddleware(['staff']), staffController.createStaff);
router.put('/:id', authMiddleware(['staff']), staffController.updateStaff);
router.delete('/:id', authMiddleware(['staff']), staffController.deleteStaff);

module.exports = router;
