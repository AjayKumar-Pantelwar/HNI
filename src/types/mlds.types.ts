import { ApiResponse } from './api.types';

export type GetMLDsResponse = ApiResponse<MLDsData>;

export interface MLDsData {
  mlds: MLD[];
}

export interface CreateMLDRequest {
  nm: Nm;
}

export interface UpdateMLDRequest {
  nm: Nm;
  id: string;
}
export interface Nm {
  name: string;
  min_investment: number;
  yield: string;
  sec_identifier: string;
  description: string;
  is_activated: boolean;
  is_certified: boolean;
}

export interface MLD {
  id: string;
  mld_name: string;
  min_investment: number;
  sec_identifier: string;
  yield: string;
  rating: string;
  issue_date: Date;
  description: string;
  underlying: string;
  maturity_date: Date;
  principal_protected: boolean;
  issuer_name: string;
  is_activated: boolean;
  is_certified: boolean;
  offer_close_date: Date;
  updated_at: Date;
  created_at: Date;
}
