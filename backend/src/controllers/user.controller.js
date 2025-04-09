
const bcrypt = require('bcrypt');
const db = require('../config/database');
const { AppError } = require('../utils/appError');
const { logger } = require('../utils/logger');

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '', status = '' } = req.query;
    const offset = (page - 1) * limit;
    
    let query = 'SELECT id, email, full_name, status, last_login, created_at FROM users';
    let countQuery = 'SELECT COUNT(*) FROM users';
    let queryParams = [];
    let whereClause = [];
    
    // Add search filter
    if (search) {
      whereClause.push('(email ILIKE $1 OR full_name ILIKE $1)');
      queryParams.push(`%${search}%`);
    }
    
    // Add status filter
    if (status) {
      whereClause.push(`status = $${queryParams.length + 1}`);
      queryParams.push(status);
    }
    
    // Add WHERE clause if any filters are applied
    if (whereClause.length > 0) {
      query += ' WHERE ' + whereClause.join(' AND ');
      countQuery += ' WHERE ' + whereClause.join(' AND ');
    }
    
    // Add pagination
    query += ' ORDER BY created_at DESC LIMIT $' + (queryParams.length + 1) + ' OFFSET $' + (queryParams.length + 2);
    queryParams.push(limit, offset);
    
    // Execute queries
    const usersResult = await db.query(query, queryParams);
    const countResult = await db.query(countQuery, queryParams.slice(0, whereClause.length));
    
    const totalUsers = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalUsers / limit);
    
    res.status(200).json({
      status: 'success',
      data: {
        users: usersResult.rows,
        pagination: {
          total: totalUsers,
          pages: totalPages,
          page: parseInt(page),
          limit: parseInt(limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get user by ID
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Get user data
    const userResult = await db.query(
      'SELECT id, email, full_name, status, last_login, created_at FROM users WHERE id = $1',
      [id]
    );
    
    if (userResult.rows.length === 0) {
      return next(new AppError('User not found', 404));
    }
    
    // Get user roles
    const rolesResult = await db.query(
      'SELECT r.id, r.name FROM roles r JOIN user_roles ur ON r.id = ur.role_id WHERE ur.user_id = $1',
      [id]
    );
    
    res.status(200).json({
      status: 'success',
      data: {
        user: {
          ...userResult.rows[0],
          roles: rolesResult.rows
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Create new user
const createUser = async (req, res, next) => {
  try {
    const { email, full_name, password, roles } = req.body;
    
    // Check if email already exists
    const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (existingUser.rows.length > 0) {
      return next(new AppError('Email already in use', 400));
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUserResult = await db.query(
      'INSERT INTO users (email, password_hash, full_name, status) VALUES ($1, $2, $3, $4) RETURNING id',
      [email, passwordHash, full_name, 'active']
    );
    
    const userId = newUserResult.rows[0].id;
    
    // Assign roles
    if (roles && roles.length > 0) {
      for (const roleId of roles) {
        await db.query(
          'INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)',
          [userId, roleId]
        );
      }
    } else {
      // Assign default role (Employee)
      await db.query(
        'INSERT INTO user_roles (user_id, role_id) VALUES ($1, (SELECT id FROM roles WHERE name = $2))',
        [userId, 'Employee']
      );
    }
    
    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: {
        id: userId
      }
    });
  } catch (error) {
    next(error);
  }
};

// Update user
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { full_name, status, roles } = req.body;
    
    // Check if user exists
    const userResult = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    
    if (userResult.rows.length === 0) {
      return next(new AppError('User not found', 404));
    }
    
    // Start transaction
    const client = await db.getClient();
    
    try {
      await client.query('BEGIN');
      
      // Update user
      await client.query(
        'UPDATE users SET full_name = $1, status = $2, updated_at = NOW() WHERE id = $3',
        [full_name, status, id]
      );
      
      // Update roles if provided
      if (roles) {
        // Remove existing roles
        await client.query('DELETE FROM user_roles WHERE user_id = $1', [id]);
        
        // Add new roles
        for (const roleId of roles) {
          await client.query(
            'INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)',
            [id, roleId]
          );
        }
      }
      
      await client.query('COMMIT');
      
      res.status(200).json({
        status: 'success',
        message: 'User updated successfully'
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

// Delete user
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if user exists
    const userResult = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    
    if (userResult.rows.length === 0) {
      return next(new AppError('User not found', 404));
    }
    
    // Delete user
    await db.query('DELETE FROM users WHERE id = $1', [id]);
    
    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
