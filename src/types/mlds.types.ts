import { ApiResponse } from './api.types';

export type GetMLDsResponse = ApiResponse<MLDsData>;

export interface MLDsData {
  mlds: MldElement[];
}

export interface MldElement {
  amc: Amc;
  mld: MLD;
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
  // sec_identifier: string;
  description: string;
  is_activated: boolean;
  is_certified: boolean;
}

export interface Amc {
  created_at: string;
  updated_at: string;
  amc_id: string;
  amc_name: string;
  amc_description: string;
  amc_logo: string;
  amc_type: string;
  amc_home_page: string;
}

export interface MLD {
  maturity_date: string;
  issuer_date: string;
  updated_at: string;
  created_at: string;
  offer_close_date: string;
  underlying: string;
  mld_id: string;
  description: string;
  amc_id: string;
  name: string;
  rating: string;
  yield: string;
  min_investment: number;
  principal_protected: boolean;
  is_certified: boolean;
  is_activated: boolean;
}
