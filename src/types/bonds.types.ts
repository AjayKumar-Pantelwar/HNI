import { ApiResponse } from './api.types';

export type GetBondsResponse = ApiResponse<BondsData>;

export interface BondsData {
  bonds: BondElement[];
}

export interface UpdateBondRequest {
  name: string;
  min_investment: number;
  yield: number;
  security: string;
  description: string;
  is_certified: boolean;
  is_activated: boolean;
  bond_id: string;
}
export interface CreateBondRequest {
  name: string;
  min_investment: number;
  yield: number;
  security: string;
  description: string;
  is_certified: boolean;
  is_activated: boolean;
}

export interface BondElement {
  bond: Bond;
  amc: Amc;
}

export interface Amc {
  amc_id: string;
  amc_name: string;
  amc_description: string;
  amc_logo: string;
  amc_type: string;
  amc_home_page: string;
  created_at: string;
  updated_at: string;
}
export interface Bond {
  bond_name: string;
  min_investment: number;
  yield: number;
  security: string;
  description: string;
  rating: string;
  bond_id: string;
  maturity_date: string;
  issue_date: string;
  next_interest_date: string;
  coupon_payout: string;
  amc_id: string;
  face_value: number;
  type: string;
  is_certified: boolean;
  is_activated: boolean;
  offer_close_date: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateBondAMCRequest {
  home_page: string;
  description: string;
  type: string;
  logo: File;
  bond_id: string;
}
