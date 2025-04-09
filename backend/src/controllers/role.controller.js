
const db = require('../config/database');
const { AppError } = require('../utils/appError');
const { logger } = require('../utils/logger');

// Get all roles
const getAllRoles = async (req, res, next) => {
  try {
    const rolesResult = await db.query('SELECT * FROM roles ORDER BY name');
    
    res.status(200).json({
      status: 'success',
      data: {
        roles: rolesResult.rows
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get role by ID with permissions
const getRoleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Get role data
    const roleResult = await db.query('SELECT * FROM roles WHERE id = $1', [id]);
    
    if (roleResult.rows.length === 0) {
      return next(new AppError('Role not found', 404));
    }
    
    // Get role permissions
    const permissionsResult = await db.query(
      `SELECT p.id, a.name as application, p.can_view, p.can_create, p.can_edit, p.can_delete 
       FROM permissions p 
       JOIN applications a ON p.application_id = a.id 
       WHERE p.role_id = $1`,
      [id]
    );
    
    res.status(200).json({
      status: 'success',
      data: {
        role: roleResult.rows[0],
        permissions: permissionsResult.rows
      }
    });
  } catch (error) {
    next(error);
  }
};

// Create new role
const createRole = async (req, res, next) => {
  try {
    const { name, description, permissions } = req.body;
    
    // Check if role name already exists
    const existingRole = await db.query('SELECT * FROM roles WHERE name = $1', [name]);
    
    if (existingRole.rows.length > 0) {
      return next(new AppError('Role name already in use', 400));
    }
    
    // Start transaction
    const client = await db.getClient();
    
    try {
      await client.query('BEGIN');
      
      // Create new role
      const newRoleResult = await client.query(
        'INSERT INTO roles (name, description) VALUES ($1, $2) RETURNING id',
        [name, description]
      );
      
      const roleId = newRoleResult.rows[0].id;
      
      // Add permissions
      if (permissions && permissions.length > 0) {
        for (const permission of permissions) {
          await client.query(
            `INSERT INTO permissions (role_id, application_id, can_view, can_create, can_edit, can_delete)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [
              roleId,
              permission.application_id,
              permission.can_view || false,
              permission.can_create || false,
              permission.can_edit || false,
              permission.can_delete || false
            ]
          );
        }
      }
      
      await client.query('COMMIT');
      
      res.status(201).json({
        status: 'success',
        message: 'Role created successfully',
        data: {
          id: roleId
        }
      });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    next(error);
  }
};

// Update role
const updateRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, permissions } = req.body;
    
    // Check if role exists
    const roleResult = await db.query('SELECT * FROM roles WHERE id = $1', [id]);
    
    if (roleResult.rows.length === 0) {
      return next(new AppError('Role not found', 404));
    }
    
    // Start transaction
    const client = await db.getClient();
    
    try {
      await client.query('BEGIN');
      
      // Update role
      await client.query(
        'UPDATE roles SET name = $1, description = $2, updated_at = NOW() WHERE id = $3',
        [name, description, id]
      );
      
      // Update permissions if provided
      if (permissions) {
        // Remove existing permissions
        await client.query('DELETE FROM permissions WHERE role_id = $1', [id]);
        
        // Add new permissions
        for (const permission of permissions) {
          await client.query(
            `INSERT INTO permissions (role_id, application_id, can_view, can_create, can_edit, can_delete)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [
              id,
              permission.application_id,
              permission.can_view || false,
              permission.can_create || false,
              permission.can_edit || false,
              permission.can_delete || false
            ]
          );
        }
      }
      
      await client.query('COMMIT');
      
      res.status(200).json({
        status: 'success',
        message: 'Role updated successfully'
      });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    next(error);
  }
};

// Delete role
const deleteRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if role exists
    const roleResult = await db.query('SELECT * FROM roles WHERE id = $1', [id]);
    
    if (roleResult.rows.length === 0) {
      return next(new AppError('Role not found', 404));
    }
    
    // Check if role is in use
    const userRolesResult = await db.query('SELECT * FROM user_roles WHERE role_id = $1 LIMIT 1', [id]);
    
    if (userRolesResult.rows.length > 0) {
      return next(new AppError('Cannot delete role that is assigned to users', 400));
    }
    
    // Delete role
    await db.query('DELETE FROM roles WHERE id = $1', [id]);
    
    res.status(200).json({
      status: 'success',
      message: 'Role deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole
};
