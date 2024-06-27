import { ApiResponse } from './api.types';

export type GetUserResponse = ApiResponse<{
  users: User[];
  total_pages: number;
  total_records: number;
}>;

export interface GetUserRequest {
  name: string;
  mobile: string;
  pan: string;
  kyc_mismatch: string;
  is_aml: string;
  is_caliber: string;
  total_records: number;
  total_pages: number;
}

export interface User {
  id: number;
  name: string;
  pan: string;
  mobile: string;
  email: string;
  is_blocked: boolean;
  is_kyc_mismatched: boolean;
  is_aml_present: boolean;
  is_calibre_user: boolean;
  aml_bypassed: boolean;
  calibre_allowed: boolean;
  kyc_mismatch_allowed: boolean;
}

export enum UserActions {
  CKYC_MISMATCH = 'ckyc-mismatch',
  AML_BYPASS = 'aml-bypass',
  CALIBRE_BYPASS = 'calibre-bypass',
  BLOCK_USER = 'block-user',
}

export interface UpdateUserRequest {
  action: UserActions;
  mobile_number: string;
  status: boolean;
  reason: string;
}
