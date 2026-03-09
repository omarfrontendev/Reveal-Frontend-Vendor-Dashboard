import type { UserRole } from "@/constants/userRoles";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive: boolean;
  clientId: number;
  nationalId: string | null;
  phone: string | null
  dealerId?: string | null
  employeeCode?: string | null
};

export interface UsersTableOptions {
  pageIndex: number;
  pageSize: number;
  search: string;
  isActive: string | null;
  role?: string | null;
  roles: string[] | null;
  isFirstActivationPending: boolean
}

export interface GetUsersPayload {
  page: number;
  limit: number;
  search: string;
  isActive: boolean;
  isFirstActivationPending: boolean;
  roles: string[] | null;
  role?: string | null;
}

export interface CreateUserPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  clientId: number;
}

