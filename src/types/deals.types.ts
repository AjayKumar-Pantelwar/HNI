import { ApiResponse } from './api';

export type Deals = {};

export type DealsResponse = ApiResponse<{ deals: Deals[] }>;

export type CreateDealRequest = {
  brand_name: string;
  company_name: string;
  one_liner: string;
  description: string;
  start_date: string;
  end_date: string;
  closing_soon_date: string;
  sector: Sector[];
  deal_name: string;
  tech_placeholder: TechPlaceholder[];
  deal_aggregation: DealAggregation;
  cover_image: File;
  is_deal_of_the_week: boolean;
  is_deal_trending: boolean;
  logo_link: File;
};

export type CreateDealResponse = {
  data: {
    deal_id: string;
  };
};
export type Sector = {
  sector: {
    id: string;
    name: string;
  }[];
};

export type TechPlaceholder = {
  id: string;
  name: string;
};

export type DealAggregation = {
  total_user_interest: string;
  total_user_committed: string;
  total_amount_committed: string;
};
