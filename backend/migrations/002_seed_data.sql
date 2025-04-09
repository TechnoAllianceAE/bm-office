
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

-- Creating a sample admin user (password: admin123)
INSERT INTO users (id, email, password_hash, full_name, status, last_login, created_at) VALUES
  ('a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1', 'admin@example.com', '$2b$10$dPzEtl2tDS1Z7hi/N5jhg.m2VeU2hk3Hfj1cJtKswb8yp6oiylUZK', 'Admin User', 'active', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '30 days')
ON CONFLICT (email) DO NOTHING;

-- Assign Super Admin role to admin user
INSERT INTO user_roles (user_id, role_id) VALUES
  ('a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1', '11111111-1111-1111-1111-111111111111')
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

-- User settings for admin
INSERT INTO user_settings (user_id, theme, background_image)
VALUES ('a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1', 'dark', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2070&q=80')
ON CONFLICT (user_id) DO NOTHING;
