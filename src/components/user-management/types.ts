
export interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
  status: string;
  last_login: string | null;
  created_at: string;
}

export interface Role {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface Permission {
  id: string;
  role_id: string;
  application: string;
  can_view: boolean;
  can_create: boolean;
  can_edit: boolean;
  can_delete: boolean;
  created_at: string;
}

export interface Student {
  id: string;
  admission_no: string;
  name: string;
  address: string;
  phone: string;
  father_name: string;
  mother_name?: string;
  mother_email?: string;
  email: string;
  school: string;
  gender: 'Male' | 'Female' | 'Other';
  session: string;
  curriculum: string;
  grade: string;
  batch: string;
  age: number;
  profile_pic?: string;
  created_at: string;
}

export interface Parent {
  id: string;
  name: string;
  email: string;
  address: string;
  state: string;
  country: string;
  phone: string;
  relationship: 'Father' | 'Mother' | 'Guardian';
  created_at: string;
}

export interface ParentMapping {
  id: string;
  student_id: string;
  parent_id: string;
  student_name: string;
  parent_name: string;
  parent_relationship: string;
  created_at: string;
}
