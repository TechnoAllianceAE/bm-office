
# RBAC Database Schema

This directory contains the database schema and seed data for the Role-Based Access Control (RBAC) system used in the application.

## Schema Overview

The database follows a standard RBAC model with the following key entities:

1. **Users** - Application users
2. **Roles** - Predefined roles that users can be assigned to
3. **Applications** - Different modules/sections of the application
4. **Permissions** - Role-based permissions for each application
5. **User-Role Assignments** - Mapping between users and roles
6. **Security Settings** - Global security configuration
7. **User Settings** - User-specific preferences
8. **Audit Logs** - Tracking of user actions

## Entity Relationships

- A user can have one or more roles
- A role has permissions for various applications
- Permissions define what actions (view, create, edit, delete) a role can perform on an application

## Using the Schema

### Setup

To initialize the database with this schema:

```bash
psql -U your_username -d your_database_name -f rbac_schema.sql
```

### Database Views

The schema includes several views for easy querying:

- `user_with_roles` - Shows users with their assigned roles
- `role_permissions` - Shows permissions for each role by application
- `user_permissions` - Shows all user permissions through their roles

### Helper Functions

- `check_user_permission(user_id, application, permission)` - Check if a user has a specific permission
- `get_user_permissions(user_id)` - Get all permissions for a user
- `add_audit_log(...)` - Add an entry to the audit log

## Integration with Node.js

When connecting this schema with your Node.js backend:

1. Use a PostgreSQL client like `pg` or an ORM like `Prisma` or `Sequelize`
2. Create service/repository classes for each entity
3. Implement middleware for checking permissions
4. Set up user authentication that ties into this RBAC system

Example middleware for checking permissions:

```javascript
const checkPermission = (application, permission) => {
  return async (req, res, next) => {
    const userId = req.user.id;
    
    const { rows } = await pool.query(
      'SELECT * FROM check_user_permission($1, $2, $3)',
      [userId, application, permission]
    );
    
    if (rows[0].check_user_permission) {
      return next();
    }
    
    return res.status(403).json({ 
      error: 'Forbidden', 
      message: 'You do not have permission to perform this action' 
    });
  };
};
```

## Extending the Schema

To add new applications or roles:

1. Insert new entries into the `applications` or `roles` tables
2. Set up appropriate permissions in the `permissions` table
3. Assign roles to users as needed
