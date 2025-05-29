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

export interface Teacher {
  id: string;
  name: string;
  email: string;
  subjects: string[];
  grade: string;
  batch: string;
  created_at: string;
}

export interface HOD {
  id: string;
  name: string;
  email: string;
  department: string;
  created_at: string;
}

export interface HOS {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export interface TeacherEndorsement {
  id: string;
  teacher_id: string;
  teacher_name: string;
  grade: string;
  batch: string;
  subjects: string[];
  created_at: string;
}

export interface HODEndorsement {
  id: string;
  hod_id: string;
  hod_name: string;
  phase: 'Primary' | 'Middle' | 'Secondary' | 'Higher Secondary';
  subjects: string[];
  created_at: string;
}

export interface HOSEndorsement {
  id: string;
  hos_id: string;
  hos_name: string;
  session: 'Morning' | 'Afternoon';
  curriculum: string;
  class: string;
  created_at: string;
}
