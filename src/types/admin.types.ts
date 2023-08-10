import * as Yup from 'yup';
import { ApiResponse } from './api.types';

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

export const CreateAdminSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  mobile_number: Yup.string().required('Phone number is required'),
  username: Yup.string().required('Username is required'),
  pwd: Yup.string().required('Password is required'),
  is_pwd_change_required: Yup.boolean().required('Password is required'),
  rid: Yup.string().required('Role is required'),
});

export type CreateAdminRequest = Yup.InferType<typeof CreateAdminSchema>;

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
