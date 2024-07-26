const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, memberController.getAllMembers);
router.get('/:id', authMiddleware, memberController.getMemberById);
router.post('/', authMiddleware, memberController.createMember);
router.put('/:id', authMiddleware, memberController.updateMember);
router.delete('/:id', authMiddleware, memberController.deleteMember);

module.exports = router;
