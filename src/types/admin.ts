import { ApiResponse } from './api';

export type Admin = {
  aid: string;
  name: string;
  username: string;
  mobile_number: string;
  email: string;
  rid: string;
  type: string;
  is_pwd_change_required: boolean;
  is_totp_activated: boolean;
  is_blocked: boolean;
  created_at: Date;
  updated_at: Date;
};

export type AdminResponse = ApiResponse<{ admins: Admin[] }>;

export type AdminRequest = {
  name: string;
  username: string;
  mobile_number: string;
  rid: string;
  email: string;
  is_blocked: string;
};

export type CreateAdminRequest = {
  name: string;
  username: string;
  mobile_number: string;
  email: string;
  rid: string;
  pwd: string;
  is_pwd_change_required: boolean;
};

export type CreateAdminResponse = ApiResponse;

export type EditAdminRequest = {
  name: string;
  username: string;
  mobile_number: string;
  email: string;
  id: string;
};

export type EditAdminResponse = ApiResponse;
