import * as Yup from 'yup';
import { ApiResponse, Pagination } from './api.types';

export type Admin = {
  id: number;
  aid: string;
  username: string;
  name: string;
  email: string;
  is_password_change_required: boolean;
  is_totp_activated: boolean;
  is_blocked: boolean;
  rid: string;
  created_at: string;
  updated_at: string;
};

export type AdminResponse = ApiResponse<{ admins: Admin[]; count: number }>;

export const AdminRequestSchema = Yup.object()
  .shape({
    id: Yup.string(),
    aid: Yup.string(),
    username: Yup.string(),
    name: Yup.string(),
    email: Yup.string(),
    is_password_change_required: Yup.string(),
    is_totp_activated: Yup.string(),
    is_blocked: Yup.string(),
    rid: Yup.string(),
    created_at: Yup.string(),
    updated_at: Yup.string(),
  })
  .required();

export type AdminRequest = Yup.InferType<typeof AdminRequestSchema>;

export const CreateAdminSchema = Yup.object()
  .shape({
    name: Yup.string().required('Name is required'),
    // mobile_number: Yup.string()
    // .required('Phone number is required')
    // .test('valid-number', 'Enter a valid phone number', (val) => {
    //   if (val.match(/^[0-9]{10}$/)) {
    //     return true;
    //   }
    //   return false;
    // }),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    // is_pwd_change_required: Yup.boolean().required('Password is required'),
    rid: Yup.string().required('Role is required'),
    // description: Yup.string().test(
    //   'description_required',
    //   'description is required',
    //   (val, ctx) => ctx.parent.rid !== 'rm' || !!val
    // ),
    // experience: Yup.string().test(
    //   'experience_required',
    //   'experience is required',
    //   (val, ctx) => ctx.parent.rid !== 'rm' || !!val
    // ),
    // location: Yup.string().test(
    //   'location_required',
    //   'location is required',
    //   (val, ctx) => ctx.parent.rid !== 'rm' || !!val
    // ),
    // languages: Yup.string().test(
    //   'languages_required',
    //   'languages is required',
    //   (val, ctx) => ctx.parent.rid !== 'rm' || !!val
    // ),
    // specializes_in_1: Yup.string().test(
    //   'specialization_required',
    //   'specialization is required',
    //   (val, ctx) => ctx.parent.rid !== 'rm' || !!val
    // ),
    // specializes_in_2: Yup.string().test(
    //   'specialization_required',
    //   'specialization is required',
    //   (val, ctx) => ctx.parent.rid !== 'rm' || !!val
    // ),
    // specializes_in_3: Yup.string().test(
    //   'specialization_required',
    //   'specialization is required',
    //   (val, ctx) => ctx.parent.rid !== 'rm' || !!val
    // ),
    // profile_img: Yup.mixed()
    //   .test(
    //     'profileimg_required',
    //     'profile image is required',
    //     (val, ctx) => ctx.parent.rid !== 'rm' || !!val
    //   )
    //   .nullable(),
  })
  .required();
export type CreateAdminRequest = Yup.InferType<typeof CreateAdminSchema>;

export type CreateAdminResponse = ApiResponse;

export type EditAdminRequest = {
  name: string;
  username: string;
  // mobile_number: string;
  email: string;
  aid: string;
  // experience?: number;
  // location?: string;
  // specializes_in_1?: string;
  // specializes_in_2?: string;
  // specializes_in_3?: string;
  // description?: string;
};

export type EditAdminResponse = ApiResponse;

export type BlockAdminRequest = {
  aid: string;
  to_block: boolean;
};

/// Admin Action Types

export type AdminActionResponse = ApiResponse<AdminActionsData>;

export type AdminActionsData = {
  actions: Action[];
  count: number;
};

export type Action = {
  action_id: string;
  aid: string;
  event_type: string;
  source_id: string;
  request: string;
  response: string;
  created_at: Date;
};

export type AdminActionRequest = {
  aid: string;
  action_id: string;
  source_id: string;
  event_type: string;
} & Pagination;

export type UpdateRoleRequest = {
  aid: string;
  rid: string;
};
