
// Define interfaces for User Management components

export interface Role {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface Application {
  name: string;
  description: string;
}

export interface Permission {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
}

export interface PermissionRecord {
  id: string;
  role_id: string;
  application: string;
  can_view: boolean;
  can_create: boolean;
  can_edit: boolean;
  can_delete: boolean;
  created_at: string;
}

export interface PermissionsMap {
  [application: string]: Permission;
}

export interface User {
  id: string;
  user_id: string | null;
  full_name: string;
  email: string;
  role: string;
  status: string;
  last_login: string | null;
  created_at: string;
}
