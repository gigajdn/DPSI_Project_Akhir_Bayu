const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const authMiddleware = require('../middlewares/authMiddleware');

// Routes accessible to staff only
router.get('/', authMiddleware(['staff']), memberController.getAllMembers);
router.get('/:id', authMiddleware(['staff']), memberController.getMemberById);
router.post('/', authMiddleware(['staff']), memberController.createMember);
router.put('/:id', authMiddleware(['staff']), memberController.updateMember);
router.delete('/:id', authMiddleware(['staff']), memberController.deleteMember);

module.exports = router;
