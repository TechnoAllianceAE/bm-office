
# BM Office Backend

This is the Node.js backend service for the BM Office application, handling authentication, user management, and RBAC (Role-Based Access Control).

## Features

- Email/OTP authentication
- Social login (Google, Microsoft, LinkedIn, Apple)
- Role-based access control (RBAC)
- User management
- Role and permission management
- PostgreSQL database integration

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

3. Update the environment variables in the `.env` file.

4. Initialize the database:

```bash
psql -U your_username -d your_database_name -f migrations/001_initial_schema.sql
psql -U your_username -d your_database_name -f migrations/002_seed_data.sql
```

5. Start the development server:

```bash
npm run dev
```

## API Documentation

### Authentication

- `POST /api/auth/otp/send` - Send OTP to email
- `POST /api/auth/otp/verify` - Verify OTP and login/register
- `POST /api/auth/social` - Social login
- `GET /api/auth/me` - Get current user profile (protected)

### User Management

- `GET /api/users` - Get all users (protected)
- `GET /api/users/:id` - Get user by ID (protected)
- `POST /api/users` - Create new user (protected)
- `PUT /api/users/:id` - Update user (protected)
- `DELETE /api/users/:id` - Delete user (protected)

### Role Management

- `GET /api/roles` - Get all roles (protected)
- `GET /api/roles/:id` - Get role by ID with permissions (protected)
- `POST /api/roles` - Create new role (protected)
- `PUT /api/roles/:id` - Update role (protected)
- `DELETE /api/roles/:id` - Delete role (protected)

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `DB_HOST` - PostgreSQL host
- `DB_PORT` - PostgreSQL port
- `DB_USER` - PostgreSQL user
- `DB_PASSWORD` - PostgreSQL password
- `DB_NAME` - PostgreSQL database name
- `JWT_SECRET` - Secret for JWT tokens
- `JWT_EXPIRES_IN` - JWT expiration time
- `EMAIL_HOST` - SMTP host for sending emails
- `EMAIL_PORT` - SMTP port
- `EMAIL_USER` - SMTP username
- `EMAIL_PASS` - SMTP password
- `EMAIL_FROM` - From email address
- `OTP_EXPIRY` - OTP expiry time in minutes

## Default Login

- Email: admin@example.com
- Password: admin123
