
const jwt = require('jsonwebtoken');
const { AppError } = require('../utils/appError');
const db = require('../config/database');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No token provided', 401);
    }

    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user info to request object
    req.user = decoded;
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(new AppError('Invalid token', 401));
    }
    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Token expired', 401));
    }
    next(error);
  }
};

// Middleware to check role permissions
const checkPermission = (application, permission) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id;
      
      // Query user permissions
      const { rows } = await db.query(
        'SELECT * FROM user_permissions WHERE user_id = $1 AND application_name = $2',
        [userId, application]
      );
      
      if (rows.length === 0) {
        return next(new AppError('You do not have access to this resource', 403));
      }
      
      const userPermission = rows[0];
      
      // Check if user has the required permission
      if (permission === 'view' && !userPermission.can_view) {
        return next(new AppError('You do not have permission to view this resource', 403));
      }
      if (permission === 'create' && !userPermission.can_create) {
        return next(new AppError('You do not have permission to create this resource', 403));
      }
      if (permission === 'edit' && !userPermission.can_edit) {
        return next(new AppError('You do not have permission to edit this resource', 403));
      }
      if (permission === 'delete' && !userPermission.can_delete) {
        return next(new AppError('You do not have permission to delete this resource', 403));
      }
      
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { verifyToken, checkPermission };
