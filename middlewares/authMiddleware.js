const jwt = require('jsonwebtoken');
const Staff = require('../models/Staff');
const Member = require('../models/Member');

// Middleware to authenticate and authorize based on role
const authMiddleware = (requiredRoles) => {
  return async (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      let user;
      if (decoded.role === 'staff') {
        user = await Staff.findById(decoded.id).select('-password');
      } else if (decoded.role === 'member') {
        user = await Member.findById(decoded.id).select('-password');
      } else {
        return res.status(401).json({ message: 'Invalid token' });
      }

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      req.userDetails = user;

      // Check if the user has one of the required roles
      if (requiredRoles && !requiredRoles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      next();
    } catch (err) {
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
};

module.exports = authMiddleware;
