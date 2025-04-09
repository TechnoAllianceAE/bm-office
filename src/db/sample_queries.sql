
-- Sample queries for working with the RBAC database schema

-- 1. Get all users with their roles
SELECT * FROM user_with_roles;

-- 2. Get all permissions for a specific role
SELECT * FROM role_permissions WHERE role_name = 'Manager';

-- 3. Get all applications a specific user can access
SELECT DISTINCT application_name, route 
FROM user_permissions 
WHERE user_id = 'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1' AND can_view = TRUE;

-- 4. Check if a user has specific permission
SELECT check_user_permission(
  'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1', -- Super Admin user ID
  'User Management',                       -- Application name
  'edit'                                   -- Permission to check
);

-- 5. Get all permissions for a user
SELECT * FROM get_user_permissions('b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2');

-- 6. Add a new role
INSERT INTO roles (name, description)
VALUES ('Auditor', 'Read-only access to financial and operational data');

-- 7. Add permissions for a new role
INSERT INTO permissions (role_id, application_id, can_view, can_create, can_edit, can_delete)
SELECT 
  (SELECT id FROM roles WHERE name = 'Auditor'), -- role_id 
  id, -- application_id
  TRUE, -- can_view
  FALSE, -- can_create
  FALSE, -- can_edit
  FALSE -- can_delete
FROM applications 
WHERE name IN ('Dashboard', 'Analytics', 'MIS', 'Projects', 'Timesheet');

-- 8. Assign a role to a user
INSERT INTO user_roles (user_id, role_id)
VALUES (
  (SELECT id FROM users WHERE email = 'employee1@example.com'),
  (SELECT id FROM roles WHERE name = 'Auditor')
);

-- 9. Get users without login in last 30 days
SELECT * 
FROM users 
WHERE last_login < NOW() - INTERVAL '30 days' OR last_login IS NULL;

-- 10. Get count of users by role
SELECT r.name AS role_name, COUNT(u.id) AS user_count
FROM roles r
LEFT JOIN user_roles ur ON r.id = ur.role_id
LEFT JOIN users u ON ur.user_id = u.id AND u.status = 'active'
GROUP BY r.name
ORDER BY user_count DESC;

-- 11. Get audit logs for a specific user
SELECT * FROM audit_logs WHERE user_id = 'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1'
ORDER BY created_at DESC;

-- 12. Add a new audit log entry
SELECT add_audit_log(
  'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1', -- user_id
  'update',                               -- action
  'security_settings',                    -- entity_type
  NULL,                                   -- entity_id
  '{"field": "min_password_length", "old_value": 8, "new_value": 10}'::JSONB, -- details
  '192.168.1.1'                           -- ip_address
);

-- 13. Update user status to inactive
UPDATE users SET status = 'inactive' WHERE last_login < NOW() - INTERVAL '90 days';

-- 14. Find all applications a role doesn't have access to
SELECT a.name AS application_name
FROM applications a
LEFT JOIN permissions p ON a.id = p.application_id AND p.role_id = (SELECT id FROM roles WHERE name = 'Contractor')
WHERE p.id IS NULL;

-- 15. Check which roles can access a specific application
SELECT r.name AS role_name, 
       p.can_view, p.can_create, p.can_edit, p.can_delete
FROM roles r
JOIN permissions p ON r.id = p.role_id
JOIN applications a ON p.application_id = a.id
WHERE a.name = 'User Management'
ORDER BY r.name;
