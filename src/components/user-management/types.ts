
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
}
