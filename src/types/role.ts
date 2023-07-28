import { ApiResponse } from './api';

export type CreateRoleRequest = {
  name: string;
  permission: Permission[];
};

export type EditRoleRequest = {
  name: string;
  permission: Permission[];
};

export type Permission = {
  module: string;
  view: boolean;
  edit: boolean;
};

export type GetRolesResponse = ApiResponse<{ roles: Role[] }>;

export type Role = {
  rid: string;
  name: string;
  permission: Permission[];
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
};
