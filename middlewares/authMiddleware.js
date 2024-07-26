const jwt = require('jsonwebtoken');
const Staff = require('../models/Staff');
const Member = require('../models/Member');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (decoded.role === 'staff') {
      req.userDetails = await Staff.findById(decoded.id).select('-password');
    } else if (decoded.role === 'member') {
      req.userDetails = await Member.findById(decoded.id).select('-password');
    } else {
      return res.status(401).json({ message: 'Invalid token' });
    }

    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
