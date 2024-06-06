import { ApiResponse } from './api.types';

export type GetUserResponse = ApiResponse<User[]>;

export interface GetUserRequest {
  name: string;
  mobile: string;
  pan: string;
  kyc_mismatch: boolean;
  aml: boolean;
  calibre: boolean;
  total_records: number;
  total_pages: number;
}

export interface User {
  id: number;
  client_name: string;
  email: string;
  mobile_number: string;
  pan: string;
  kyc_mismatch: boolean;
  aml: boolean;
  calibre: boolean;
  is_blocked: boolean;
  name: string;
  mobile: string;
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
  CALIBER_BYPASS = 'caliber-bypass',
  BLOCK_USER = 'block-user',
}

export interface UpdateUserRequest {
  action: UserActions;
  mobile_number: string;
  status: boolean;
  reason: string;
}
