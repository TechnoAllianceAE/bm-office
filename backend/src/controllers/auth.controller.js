
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const { AppError } = require('../utils/appError');
const { sendOtpEmail } = require('../utils/email');
const { logger } = require('../utils/logger');

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP for email verification
const sendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(new AppError('Email is required', 400));
    }

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + parseInt(process.env.OTP_EXPIRY || 10));

    // Check if user exists
    const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (userResult.rows.length === 0) {
      // Create new user in pending state
      await db.query(
        'INSERT INTO users (email, password_hash, full_name, status) VALUES ($1, $2, $3, $4)',
        [email, await bcrypt.hash('temp-password', 10), 'New User', 'pending']
      );
    }

    // Store OTP in database
    await db.query(
      'INSERT INTO otp_codes (email, code, expires_at) VALUES ($1, $2, $3) ON CONFLICT (email) DO UPDATE SET code = $2, expires_at = $3',
      [email, otp, expiresAt]
    );

    // Send OTP email
    await sendOtpEmail(email, otp);

    res.status(200).json({
      status: 'success',
      message: 'OTP sent successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Verify OTP and complete login/signup
const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return next(new AppError('Email and OTP are required', 400));
    }

    // Check if OTP exists and is valid
    const otpResult = await db.query(
      'SELECT * FROM otp_codes WHERE email = $1 AND code = $2 AND expires_at > NOW()',
      [email, otp]
    );

    if (otpResult.rows.length === 0) {
      return next(new AppError('Invalid or expired OTP', 400));
    }

    // Get user info
    const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = userResult.rows[0];

    // If user status is pending, update to active
    if (user.status === 'pending') {
      await db.query('UPDATE users SET status = $1 WHERE id = $2', ['active', user.id]);
    }

    // Delete used OTP
    await db.query('DELETE FROM otp_codes WHERE email = $1', [email]);

    // Get user roles and permissions
    const rolesResult = await db.query(
      'SELECT r.name FROM roles r JOIN user_roles ur ON r.id = ur.role_id WHERE ur.user_id = $1',
      [user.id]
    );
    
    const roles = rolesResult.rows.map(row => row.name);

    // Create and send JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        roles
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          roles
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// Social login (Google, Microsoft, LinkedIn, Apple)
const socialLogin = async (req, res, next) => {
  try {
    const { provider, token, userData } = req.body;

    if (!provider || !userData || !userData.email) {
      return next(new AppError('Provider and user data are required', 400));
    }

    // In a real implementation, verify the token with the provider
    // For now, we'll just use the provided user data
    
    // Check if user exists
    const userResult = await db.query('SELECT * FROM users WHERE email = $1', [userData.email]);
    
    let user;
    
    if (userResult.rows.length === 0) {
      // Create new user
      const newUserResult = await db.query(
        'INSERT INTO users (email, password_hash, full_name, status) VALUES ($1, $2, $3, $4) RETURNING *',
        [userData.email, await bcrypt.hash('social-login-no-password', 10), userData.name || 'Social User', 'active']
      );
      
      user = newUserResult.rows[0];
      
      // Assign default role (Employee)
      await db.query(
        'INSERT INTO user_roles (user_id, role_id) VALUES ($1, (SELECT id FROM roles WHERE name = $2))',
        [user.id, 'Employee']
      );
    } else {
      user = userResult.rows[0];
    }

    // Get user roles
    const rolesResult = await db.query(
      'SELECT r.name FROM roles r JOIN user_roles ur ON r.id = ur.role_id WHERE ur.user_id = $1',
      [user.id]
    );
    
    const roles = rolesResult.rows.map(row => row.name);

    // Create and send JWT token
    const jwtToken = jwt.sign(
      { 
        id: user.id, 
        email: user.email,
        roles
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Update last login
    await db.query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          roles
        },
        token: jwtToken
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get current user profile
const getCurrentUser = async (req, res, next) => {
  try {
    const { id } = req.user;

    // Get user data
    const userResult = await db.query('SELECT id, email, full_name, status, last_login FROM users WHERE id = $1', [id]);
    
    if (userResult.rows.length === 0) {
      return next(new AppError('User not found', 404));
    }

    // Get user roles
    const rolesResult = await db.query(
      'SELECT r.name FROM roles r JOIN user_roles ur ON r.id = ur.role_id WHERE ur.user_id = $1',
      [id]
    );
    
    const roles = rolesResult.rows.map(row => row.name);

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          ...userResult.rows[0],
          roles
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendOTP,
  verifyOTP,
  socialLogin,
  getCurrentUser
};
