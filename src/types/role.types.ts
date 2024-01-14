import { ApiResponse } from './api.types';

export type Role = {
  id: number;
  rname: string;
  rid: string;
  created_at: string;
  updated_at: string;
};

export type CreateRoleRequest = {
  rname: string;
  policies: Permission[];
};

export type EditRoleRequest = {
  id: string;
  rname: string;
  policies: Permission[];
};

export type Permission = {
  module_name: string;
  view: boolean;
  edit: boolean;
  publish: boolean;
};

export type GetRolesResponse = ApiResponse<Role[]>;

export enum Module {
  IR = 'ir',
  INVESTOR = 'investor',
}

export type PermissionsData = {
  id: number;
  rid: string;
  module_name: string;
  view: boolean;
  edit: boolean;
  publish: boolean;
  created_at: Date;
  updated_at: Date;
};

export type Modules = {
  placeholder: string;
  value: string;
};

export type GetPermissionResponse = ApiResponse<PermissionsData[]>;

export type GetModulesResponse = ApiResponse<Modules[]>;

export type Permissions = {
  value: string;
  title: string;
  is_view_enabled: boolean;
  is_edit_enabled: boolean;
};
