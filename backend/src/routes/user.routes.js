
const express = require('express');
const { verifyToken, checkPermission } = require('../middleware/auth');
const userController = require('../controllers/user.controller');

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

// Get all users (requires User Management view permission)
router.get('/', checkPermission('User Management', 'view'), userController.getAllUsers);

// Get user by ID (requires User Management view permission)
router.get('/:id', checkPermission('User Management', 'view'), userController.getUserById);

// Create new user (requires User Management create permission)
router.post('/', checkPermission('User Management', 'create'), userController.createUser);

// Update user (requires User Management edit permission)
router.put('/:id', checkPermission('User Management', 'edit'), userController.updateUser);

// Delete user (requires User Management delete permission)
router.delete('/:id', checkPermission('User Management', 'delete'), userController.deleteUser);

module.exports = router;
