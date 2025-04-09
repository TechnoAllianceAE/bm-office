
-- RBAC Database Schema for User Management
-- This file contains table definitions and seed data for a role-based access control system

-- ============================================================
-- Table Definitions
-- ============================================================

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  last_login TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Roles table
CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Applications/Modules table
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  route VARCHAR(100),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- User-Role assignments
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, role_id)
);

-- Permissions table
CREATE TABLE IF NOT EXISTS permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  can_view BOOLEAN NOT NULL DEFAULT FALSE,
  can_create BOOLEAN NOT NULL DEFAULT FALSE,
  can_edit BOOLEAN NOT NULL DEFAULT FALSE,
  can_delete BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(role_id, application_id)
);

-- Security settings table
CREATE TABLE IF NOT EXISTS security_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  min_password_length INTEGER NOT NULL DEFAULT 8,
  require_uppercase BOOLEAN NOT NULL DEFAULT TRUE,
  require_lowercase BOOLEAN NOT NULL DEFAULT TRUE,
  require_numbers BOOLEAN NOT NULL DEFAULT TRUE,
  require_special_chars BOOLEAN NOT NULL DEFAULT TRUE,
  password_expiry_days INTEGER NOT NULL DEFAULT 90,
  max_login_attempts INTEGER NOT NULL DEFAULT 5,
  google_sso_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  microsoft_sso_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  linkedin_sso_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- User settings table
CREATE TABLE IF NOT EXISTS user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  theme VARCHAR(50) NOT NULL DEFAULT 'light',
  background_image VARCHAR(255) DEFAULT 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2070&q=80',
  email_notifications BOOLEAN NOT NULL DEFAULT TRUE,
  push_notifications BOOLEAN NOT NULL DEFAULT TRUE,
  timesheet_reminders BOOLEAN NOT NULL DEFAULT TRUE,
  project_updates BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Audit log table
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(100) NOT NULL,
  entity_id UUID,
  details JSONB,
  ip_address VARCHAR(50),
  user_agent TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Seed Data
-- ============================================================

-- Roles seed data
INSERT INTO roles (id, name, description) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Super Admin', 'Full access to all systems'),
  ('22222222-2222-2222-2222-222222222222', 'Admin', 'Administrative access to most systems'),
  ('33333333-3333-3333-3333-333333333333', 'Manager', 'Management access to team resources'),
  ('44444444-4444-4444-4444-444444444444', 'HR', 'Human Resources department'),
  ('55555555-5555-5555-5555-555555555555', 'Employee', 'Regular employee access'),
  ('66666666-6666-6666-6666-666666666666', 'Contractor', 'External contractor with limited access'),
  ('77777777-7777-7777-7777-777777777777', 'Intern', 'Intern with restricted access'),
  ('88888888-8888-8888-8888-888888888888', 'Content Manager', 'LMS content management access')
ON CONFLICT (name) DO NOTHING;

-- Applications/Modules seed data
INSERT INTO applications (id, name, description, route) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Dashboard', 'Main dashboard', '/dashboard'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Timesheet', 'Time tracking', '/timesheet'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Projects', 'Project management', '/projects'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Calendar', 'Calendar and scheduling', '/calendar'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'HR', 'Human Resources', '/hr'),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Directory', 'Employee directory', '/directory'),
  ('gggggggg-gggg-gggg-gggg-gggggggggggg', 'Mailbox', 'Internal mail system', '/mailbox'),
  ('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', 'AI Assistant', 'AI tools', '/ai-assistant'),
  ('iiiiiiii-iiii-iiii-iiii-iiiiiiiiiiii', 'AI Workflow', 'AI workflow automation', '/ai-workflow'),
  ('jjjjjjjj-jjjj-jjjj-jjjj-jjjjjjjjjjjj', 'Document Manager', 'Document storage', '/document-manager'),
  ('kkkkkkkk-kkkk-kkkk-kkkk-kkkkkkkkkkkk', 'Analytics', 'Data analytics', '/analytics'),
  ('llllllll-llll-llll-llll-llllllllllll', 'MIS', 'Management Information Systems', '/mis'),
  ('mmmmmmmm-mmmm-mmmm-mmmm-mmmmmmmmmmmm', 'Requisition', 'Purchase requisitions', '/requisition'),
  ('nnnnnnnn-nnnn-nnnn-nnnn-nnnnnnnnnnnn', 'Help Desk', 'IT support tickets', '/helpdesk'),
  ('oooooooo-oooo-oooo-oooo-oooooooooooo', 'LMS', 'Learning Management System', '/lms'),
  ('pppppppp-pppp-pppp-pppp-pppppppppppp', 'LMS Content Manager', 'Course management', '/lms/content-manager'),
  ('qqqqqqqq-qqqq-qqqq-qqqq-qqqqqqqqqqqq', 'Claims', 'Expense claims', '/claims'),
  ('rrrrrrrr-rrrr-rrrr-rrrr-rrrrrrrrrrrr', 'User Management', 'User and role management', '/usermanagement'),
  ('ssssssss-ssss-ssss-ssss-ssssssssssss', 'Settings', 'System settings', '/settings'),
  ('tttttttt-tttt-tttt-tttt-tttttttttttt', 'Timesheet Approval', 'Timesheet approval workflow', '/timesheet/approve'),
  ('uuuuuuuu-uuuu-uuuu-uuuu-uuuuuuuuuuuu', 'Referrals', 'Employee referral program', '/referrals'),
  ('vvvvvvvv-vvvv-vvvv-vvvv-vvvvvvvvvvvv', 'Handy Tools', 'Productivity tools', '/handy-tools')
ON CONFLICT (name) DO NOTHING;

-- Users seed data (passwords would be hashed in a real application)
INSERT INTO users (id, email, password_hash, full_name, status, last_login, created_at) VALUES
  ('a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1', 'admin@example.com', '$2b$10$dPzEtl2tDS1Z7hi/N5jhg.m2VeU2hk3Hfj1cJtKswb8yp6oiylUZK', 'Admin User', 'active', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '30 days'),
  ('b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2', 'manager@example.com', '$2b$10$dPzEtl2tDS1Z7hi/N5jhg.m2VeU2hk3Hfj1cJtKswb8yp6oiylUZK', 'Manager User', 'active', NOW() - INTERVAL '1 day', NOW() - INTERVAL '60 days'),
  ('c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c3', 'hr@example.com', '$2b$10$dPzEtl2tDS1Z7hi/N5jhg.m2VeU2hk3Hfj1cJtKswb8yp6oiylUZK', 'HR User', 'active', NOW() - INTERVAL '5 days', NOW() - INTERVAL '90 days'),
  ('d4d4d4d4-d4d4-d4d4-d4d4-d4d4d4d4d4d4', 'employee1@example.com', '$2b$10$dPzEtl2tDS1Z7hi/N5jhg.m2VeU2hk3Hfj1cJtKswb8yp6oiylUZK', 'Employee One', 'active', NOW() - INTERVAL '12 hours', NOW() - INTERVAL '45 days'),
  ('e5e5e5e5-e5e5-e5e5-e5e5-e5e5e5e5e5e5', 'employee2@example.com', '$2b$10$dPzEtl2tDS1Z7hi/N5jhg.m2VeU2hk3Hfj1cJtKswb8yp6oiylUZK', 'Employee Two', 'active', NOW() - INTERVAL '3 days', NOW() - INTERVAL '40 days'),
  ('f6f6f6f6-f6f6-f6f6-f6f6-f6f6f6f6f6f6', 'contractor1@example.com', '$2b$10$dPzEtl2tDS1Z7hi/N5jhg.m2VeU2hk3Hfj1cJtKswb8yp6oiylUZK', 'Contractor One', 'active', NOW() - INTERVAL '7 days', NOW() - INTERVAL '20 days'),
  ('g7g7g7g7-g7g7-g7g7-g7g7-g7g7g7g7g7g7', 'intern1@example.com', '$2b$10$dPzEtl2tDS1Z7hi/N5jhg.m2VeU2hk3Hfj1cJtKswb8yp6oiylUZK', 'Intern One', 'active', NOW() - INTERVAL '1 hour', NOW() - INTERVAL '15 days'),
  ('h8h8h8h8-h8h8-h8h8-h8h8-h8h8h8h8h8h8', 'contentmanager@example.com', '$2b$10$dPzEtl2tDS1Z7hi/N5jhg.m2VeU2hk3Hfj1cJtKswb8yp6oiylUZK', 'Content Manager', 'active', NOW() - INTERVAL '4 hours', NOW() - INTERVAL '25 days'),
  ('i9i9i9i9-i9i9-i9i9-i9i9-i9i9i9i9i9i9', 'inactive@example.com', '$2b$10$dPzEtl2tDS1Z7hi/N5jhg.m2VeU2hk3Hfj1cJtKswb8yp6oiylUZK', 'Inactive User', 'inactive', NOW() - INTERVAL '60 days', NOW() - INTERVAL '100 days')
ON CONFLICT (email) DO NOTHING;

-- User-Role assignments
INSERT INTO user_roles (user_id, role_id) VALUES
  ('a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1', '11111111-1111-1111-1111-111111111111'), -- Admin -> Super Admin
  ('b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2', '33333333-3333-3333-3333-333333333333'), -- Manager User -> Manager
  ('c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c3', '44444444-4444-4444-4444-444444444444'), -- HR User -> HR
  ('d4d4d4d4-d4d4-d4d4-d4d4-d4d4d4d4d4d4', '55555555-5555-5555-5555-555555555555'), -- Employee One -> Employee
  ('e5e5e5e5-e5e5-e5e5-e5e5-e5e5e5e5e5e5', '55555555-5555-5555-5555-555555555555'), -- Employee Two -> Employee
  ('f6f6f6f6-f6f6-f6f6-f6f6-f6f6f6f6f6f6', '66666666-6666-6666-6666-666666666666'), -- Contractor One -> Contractor
  ('g7g7g7g7-g7g7-g7g7-g7g7-g7g7g7g7g7g7', '77777777-7777-7777-7777-777777777777'), -- Intern One -> Intern
  ('h8h8h8h8-h8h8-h8h8-h8h8-h8h8h8h8h8h8', '88888888-8888-8888-8888-888888888888')  -- Content Manager -> Content Manager
ON CONFLICT DO NOTHING;

-- Permissions for Super Admin (all permissions)
INSERT INTO permissions (role_id, application_id, can_view, can_create, can_edit, can_delete)
SELECT 
  '11111111-1111-1111-1111-111111111111' as role_id, 
  id as application_id, 
  TRUE as can_view, 
  TRUE as can_create, 
  TRUE as can_edit, 
  TRUE as can_delete
FROM applications
ON CONFLICT (role_id, application_id) DO NOTHING;

-- Permissions for Admin (most permissions)
INSERT INTO permissions (role_id, application_id, can_view, can_create, can_edit, can_delete)
SELECT 
  '22222222-2222-2222-2222-222222222222' as role_id, 
  id as application_id, 
  TRUE as can_view, 
  TRUE as can_create, 
  TRUE as can_edit, 
  CASE WHEN name IN ('User Management', 'Security Settings') THEN FALSE ELSE TRUE END as can_delete
FROM applications
ON CONFLICT (role_id, application_id) DO NOTHING;

-- Permissions for Manager
INSERT INTO permissions (role_id, application_id, can_view, can_create, can_edit, can_delete)
SELECT 
  '33333333-3333-3333-3333-333333333333' as role_id, 
  id as application_id, 
  TRUE as can_view, 
  CASE WHEN name IN ('Dashboard', 'Timesheet', 'Projects', 'Calendar', 'Directory', 'Mailbox', 'AI Assistant', 'Document Manager', 'Timesheet Approval', 'Referrals') THEN TRUE ELSE FALSE END as can_create,
  CASE WHEN name IN ('Dashboard', 'Timesheet', 'Projects', 'Calendar', 'Directory', 'Mailbox', 'AI Assistant', 'Document Manager', 'Timesheet Approval', 'Referrals') THEN TRUE ELSE FALSE END as can_edit,
  CASE WHEN name IN ('Timesheet', 'Projects', 'Calendar', 'Mailbox', 'Document Manager') THEN TRUE ELSE FALSE END as can_delete
FROM applications
ON CONFLICT (role_id, application_id) DO NOTHING;

-- Permissions for HR
INSERT INTO permissions (role_id, application_id, can_view, can_create, can_edit, can_delete)
SELECT 
  '44444444-4444-4444-4444-444444444444' as role_id, 
  id as application_id, 
  CASE WHEN name IN ('Dashboard', 'HR', 'Directory', 'Mailbox', 'Document Manager', 'Referrals', 'Calendar', 'Timesheet Approval') THEN TRUE ELSE FALSE END as can_view,
  CASE WHEN name IN ('HR', 'Directory', 'Mailbox', 'Document Manager', 'Referrals') THEN TRUE ELSE FALSE END as can_create,
  CASE WHEN name IN ('HR', 'Directory', 'Mailbox', 'Document Manager', 'Referrals') THEN TRUE ELSE FALSE END as can_edit,
  CASE WHEN name IN ('HR', 'Mailbox', 'Document Manager') THEN TRUE ELSE FALSE END as can_delete
FROM applications
ON CONFLICT (role_id, application_id) DO NOTHING;

-- Permissions for Employee
INSERT INTO permissions (role_id, application_id, can_view, can_create, can_edit, can_delete)
SELECT 
  '55555555-5555-5555-5555-555555555555' as role_id, 
  id as application_id, 
  CASE WHEN name IN ('Dashboard', 'Timesheet', 'Calendar', 'Directory', 'Mailbox', 'AI Assistant', 'Document Manager', 'Help Desk', 'LMS', 'Claims', 'Referrals', 'Handy Tools') THEN TRUE ELSE FALSE END as can_view,
  CASE WHEN name IN ('Timesheet', 'Calendar', 'Mailbox', 'Document Manager', 'Help Desk', 'Claims', 'Referrals') THEN TRUE ELSE FALSE END as can_create,
  CASE WHEN name IN ('Timesheet', 'Calendar', 'Mailbox', 'Document Manager', 'Help Desk', 'Claims') THEN TRUE ELSE FALSE END as can_edit,
  CASE WHEN name IN ('Mailbox', 'Document Manager') THEN TRUE ELSE FALSE END as can_delete
FROM applications
ON CONFLICT (role_id, application_id) DO NOTHING;

-- Permissions for Contractor
INSERT INTO permissions (role_id, application_id, can_view, can_create, can_edit, can_delete)
SELECT 
  '66666666-6666-6666-6666-666666666666' as role_id, 
  id as application_id, 
  CASE WHEN name IN ('Dashboard', 'Timesheet', 'Calendar', 'Mailbox', 'Document Manager', 'Help Desk') THEN TRUE ELSE FALSE END as can_view,
  CASE WHEN name IN ('Timesheet', 'Calendar', 'Mailbox', 'Help Desk') THEN TRUE ELSE FALSE END as can_create,
  CASE WHEN name IN ('Timesheet', 'Calendar', 'Mailbox') THEN TRUE ELSE FALSE END as can_edit,
  CASE WHEN name IN ('Mailbox') THEN TRUE ELSE FALSE END as can_delete
FROM applications
ON CONFLICT (role_id, application_id) DO NOTHING;

-- Permissions for Intern
INSERT INTO permissions (role_id, application_id, can_view, can_create, can_edit, can_delete)
SELECT 
  '77777777-7777-7777-7777-777777777777' as role_id, 
  id as application_id, 
  CASE WHEN name IN ('Dashboard', 'Timesheet', 'Calendar', 'Directory', 'Mailbox', 'Help Desk', 'LMS') THEN TRUE ELSE FALSE END as can_view,
  CASE WHEN name IN ('Timesheet', 'Calendar', 'Mailbox', 'Help Desk') THEN TRUE ELSE FALSE END as can_create,
  CASE WHEN name IN ('Timesheet', 'Calendar', 'Mailbox') THEN TRUE ELSE FALSE END as can_edit,
  FALSE as can_delete
FROM applications
ON CONFLICT (role_id, application_id) DO NOTHING;

-- Permissions for Content Manager
INSERT INTO permissions (role_id, application_id, can_view, can_create, can_edit, can_delete)
SELECT 
  '88888888-8888-8888-8888-888888888888' as role_id, 
  id as application_id, 
  CASE WHEN name IN ('Dashboard', 'LMS', 'LMS Content Manager', 'Document Manager', 'Mailbox', 'Calendar') THEN TRUE ELSE FALSE END as can_view,
  CASE WHEN name IN ('LMS', 'LMS Content Manager', 'Document Manager', 'Mailbox', 'Calendar') THEN TRUE ELSE FALSE END as can_create,
  CASE WHEN name IN ('LMS', 'LMS Content Manager', 'Document Manager', 'Mailbox', 'Calendar') THEN TRUE ELSE FALSE END as can_edit,
  CASE WHEN name IN ('LMS', 'LMS Content Manager', 'Document Manager', 'Mailbox') THEN TRUE ELSE FALSE END as can_delete
FROM applications
ON CONFLICT (role_id, application_id) DO NOTHING;

-- Security settings
INSERT INTO security_settings (min_password_length, require_uppercase, require_lowercase, require_numbers, require_special_chars, password_expiry_days, max_login_attempts)
VALUES (8, TRUE, TRUE, TRUE, TRUE, 90, 5)
ON CONFLICT DO NOTHING;

-- User settings
INSERT INTO user_settings (user_id, theme, background_image, email_notifications, push_notifications, timesheet_reminders, project_updates)
SELECT 
  id as user_id,
  CASE 
    WHEN id = 'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1' THEN 'dark'
    WHEN id = 'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2' THEN 'blue'
    WHEN id = 'c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c3' THEN 'purple'
    ELSE 'light'
  END as theme,
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2070&q=80' as background_image,
  TRUE as email_notifications,
  TRUE as push_notifications,
  TRUE as timesheet_reminders,
  TRUE as project_updates
FROM users
ON CONFLICT (user_id) DO NOTHING;

-- Add some audit logs
INSERT INTO audit_logs (user_id, action, entity_type, entity_id, details, ip_address, created_at)
VALUES
  ('a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1', 'login', 'auth', NULL, '{"browser": "Chrome", "os": "Windows"}', '192.168.1.1', NOW() - INTERVAL '2 hours'),
  ('a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1', 'create', 'user', 'i9i9i9i9-i9i9-i9i9-i9i9-i9i9i9i9i9i9', '{"email": "inactive@example.com"}', '192.168.1.1', NOW() - INTERVAL '100 days'),
  ('b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2', 'login', 'auth', NULL, '{"browser": "Firefox", "os": "MacOS"}', '192.168.1.2', NOW() - INTERVAL '1 day'),
  ('c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c3', 'create', 'document', NULL, '{"name": "HR Policy Update"}', '192.168.1.3', NOW() - INTERVAL '5 days'),
  ('d4d4d4d4-d4d4-d4d4-d4d4-d4d4d4d4d4d4', 'submit', 'timesheet', NULL, '{"week": "2025-04-01", "hours": 40}', '192.168.1.4', NOW() - INTERVAL '3 days'),
  ('b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2', 'approve', 'timesheet', NULL, '{"employee": "d4d4d4d4-d4d4-d4d4-d4d4-d4d4d4d4d4d4", "week": "2025-04-01"}', '192.168.1.2', NOW() - INTERVAL '2 days');

-- ============================================================
-- Views for convenience
-- ============================================================

-- View that shows users with their roles
CREATE OR REPLACE VIEW user_with_roles AS
SELECT 
  u.id as user_id,
  u.full_name,
  u.email,
  u.status,
  u.last_login,
  r.id as role_id,
  r.name as role_name
FROM users u
JOIN user_roles ur ON u.id = ur.user_id
JOIN roles r ON ur.role_id = r.id;

-- View that shows role permissions by application
CREATE OR REPLACE VIEW role_permissions AS
SELECT 
  r.id as role_id,
  r.name as role_name,
  a.id as application_id,
  a.name as application_name,
  a.route,
  p.can_view,
  p.can_create,
  p.can_edit,
  p.can_delete
FROM roles r
JOIN permissions p ON r.id = p.role_id
JOIN applications a ON p.application_id = a.id;

-- View that shows user permissions by application
CREATE OR REPLACE VIEW user_permissions AS
SELECT 
  u.id as user_id,
  u.full_name,
  u.email,
  r.id as role_id,
  r.name as role_name,
  a.id as application_id,
  a.name as application_name,
  a.route,
  p.can_view,
  p.can_create,
  p.can_edit,
  p.can_delete
FROM users u
JOIN user_roles ur ON u.id = ur.user_id
JOIN roles r ON ur.role_id = r.id
JOIN permissions p ON r.id = p.role_id
JOIN applications a ON p.application_id = a.id;

-- ============================================================
-- Functions for common operations
-- ============================================================

-- Function to check if a user has a specific permission on an application
CREATE OR REPLACE FUNCTION check_user_permission(
  p_user_id UUID,
  p_application_name VARCHAR,
  p_permission VARCHAR
) RETURNS BOOLEAN AS $$
DECLARE
  has_permission BOOLEAN;
BEGIN
  SELECT 
    CASE 
      WHEN p_permission = 'view' THEN can_view
      WHEN p_permission = 'create' THEN can_create
      WHEN p_permission = 'edit' THEN can_edit
      WHEN p_permission = 'delete' THEN can_delete
      ELSE FALSE
    END INTO has_permission
  FROM user_permissions
  WHERE user_id = p_user_id AND application_name = p_application_name
  LIMIT 1;
  
  RETURN COALESCE(has_permission, FALSE);
END;
$$ LANGUAGE plpgsql;

-- Function to get all permissions for a user
CREATE OR REPLACE FUNCTION get_user_permissions(p_user_id UUID)
RETURNS TABLE (
  application_name VARCHAR,
  route VARCHAR,
  can_view BOOLEAN,
  can_create BOOLEAN,
  can_edit BOOLEAN,
  can_delete BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT
    up.application_name,
    up.route,
    up.can_view,
    up.can_create,
    up.can_edit,
    up.can_delete
  FROM user_permissions up
  WHERE up.user_id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- Function to add audit log
CREATE OR REPLACE FUNCTION add_audit_log(
  p_user_id UUID,
  p_action VARCHAR,
  p_entity_type VARCHAR,
  p_entity_id UUID,
  p_details JSONB,
  p_ip_address VARCHAR
)
RETURNS UUID AS $$
DECLARE
  log_id UUID;
BEGIN
  INSERT INTO audit_logs (user_id, action, entity_type, entity_id, details, ip_address)
  VALUES (p_user_id, p_action, p_entity_type, p_entity_id, p_details, p_ip_address)
  RETURNING id INTO log_id;
  
  RETURN log_id;
END;
$$ LANGUAGE plpgsql;
