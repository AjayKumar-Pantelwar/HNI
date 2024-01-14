import { ApiResponse } from './api.types';

export type GetBondsResponse = ApiResponse<BondsData>;

export interface BondsData {
  bonds: Bond[];
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

export interface Bond {
  bond_name: string;
  min_investment: number;
  yield: number;
  security: string;
  description: string;
  rating: string;
  bond_id: string;
  maturity_date: Date;
  next_iterest_date: Date;
  coupon_payout: string;
  issuer_name: string;
  face_value: number;
  type: string;
  is_certified: boolean;
  is_activated: boolean;
  offer_close_date: Date;
  created_at: Date;
  updated_at: Date;
}
