const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.registerStaff);
router.post('/registerMember', authController.registerMember);
router.post('/login', authController.login);

module.exports = router;
