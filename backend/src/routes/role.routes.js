
const express = require('express');
const { verifyToken, checkPermission } = require('../middleware/auth');
const roleController = require('../controllers/role.controller');

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

// Get all roles (requires User Management view permission)
router.get('/', checkPermission('User Management', 'view'), roleController.getAllRoles);

// Get role by ID (requires User Management view permission)
router.get('/:id', checkPermission('User Management', 'view'), roleController.getRoleById);

// Create new role (requires User Management create permission)
router.post('/', checkPermission('User Management', 'create'), roleController.createRole);

// Update role (requires User Management edit permission)
router.put('/:id', checkPermission('User Management', 'edit'), roleController.updateRole);

// Delete role (requires User Management delete permission)
router.delete('/:id', checkPermission('User Management', 'delete'), roleController.deleteRole);

module.exports = router;
