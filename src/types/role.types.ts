import { ApiResponse } from './api.types';

export type Role = {
  rid: string;
  name: string;
  permission: Permission[];
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
};

export type CreateRoleRequest = {
  name: string;
  permission: Permission[];
};

export type EditRoleRequest = {
  id: string;
  name: string;
  permission: Permission[];
};

export type Permission = {
  module: string;
  view: boolean;
  edit: boolean;
};

export type GetRolesResponse = ApiResponse<{ roles: Role[] }>;

export enum Module {
  IR = 'ir',
  INVESTOR = 'investor',
}

export interface GetPermissionsResponse {
  data: PermissionsData;
}

export interface PermissionsData {
  permissions: Permissions;
}

export interface Permissions {
  [key: string]: PermissionObj;
}

export interface PermissionObj {
  value: string;
  title: string;
}
