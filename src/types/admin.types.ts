import * as Yup from 'yup';
import { ApiResponse } from './api.types';
import { RequiredOrUndefinedProperties, RequiredProperties } from './ts.types';

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
  created_at: string;
  updated_at: string;
};

export type AdminResponse = ApiResponse<{ admins: Admin[] }>;

export const AdminRequestSchema = Yup.object()
  .shape({
    username: Yup.string(),
    email: Yup.string(),
    mobile_number: Yup.string(),
    is_blocked: Yup.string(),
    name: Yup.string(),
    rid: Yup.string(),
  })
  .required();

export type AdminRequest = {
  username: string | undefined;
  email: string | undefined;
  mobile_number: string | undefined;
  is_blocked: string | undefined;
  name: string | undefined;
  rid: string | undefined;
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

export type BlockAdminRequest = {
  username: string;
  is_blocked: boolean;
};
