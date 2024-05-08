import { ApiResponse } from './api.types';

export type GetUserResponse = ApiResponse<User[]>;

export interface GetUserRequest {
  client_name: string;
  email: string;
  mobile_number: string;
  pan: string;
  kyc_mismatch: boolean;
  aml: boolean;
  calibre: boolean;
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
