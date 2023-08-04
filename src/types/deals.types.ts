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
  sector: Sector;
  deal_name: string;
  deal_aggregation: DealAggregation;
  cover_image: File | null;
  is_deal_of_the_week: boolean;
  is_deal_trending: boolean;
  logo_link: File | null;
  round: Round[];
};

export type Round = {
  ask_from_ma?: string;
  is_active?: boolean;
  raised_in_perc?: string;
  min_investment?: string;
  externally_raised?: string;
  round_size?: string;
  valuation?: string;
  round_type?: RoundType;
};

export type CreateDealResponse = {
  data: {
    deal_id: string;
  };
};
export type Sector = {
  sector_1: string[];
  sector_2: string[];
  sector_3: string[];
  tech: string[];
  model: string[];
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

export type BasicInfoMediaRequest = {
  media: Media[];
  [key: `media_${number}`]: File;
  [key: `thumbnail_${number}`]: File;
};

export type Media = {
  link: string;
  description: string;
  thumbnail_link: string;
  type: string;
  priority: number;
  is_published: string;
};

export type PitchRequest = {
  info: string[];
  why_shortlist: string[];
  traction: Traction[];
};

export type Traction = {
  key: string;
  value: string;
};

export type HighlightsRequest = {
  highlights: {
    title: string;
    description: string;
  };
  [key: `icon_link_${number}`]: File;
};

export type BasicInfoMediaResponse = ApiResponse;
export type PitchResponse = ApiResponse;
export type HighlightsResponse = ApiResponse;

export enum Sector1 {
  AGRICULTURE = 'agriculture',
  AUTOMOBILES = 'automobiles',
  COMMUNICATION = 'communication',
}

export enum Sector2 {
  CLOUD_COMPUTING = 'cloud_computing',
  TWO_WHEELER = '2_wheeler',
}

export enum Sector3 {
  HYPER_LOCAL = 'hyper_local',
  SOFTWARE = 'software',
}

export enum Tech {
  CONSUMER = 'consumer',
  DEEP_TECH = 'deep_tech',
  HIGH_TECH = 'high_tech',
  TECH_ENABLED = 'tech_enabled',
}

export enum Model {
  ADVISORY = 'advisory',
  DELIVERY = 'delivery',
  MARKETPLACE = 'marketplace',
  PLATFORM = 'platform',
  PRODUCT = 'product',
  PRODUCTION_HOUSE = 'production_house',
  PUBLISHING_HOUSE = 'publishing_house',
  SAAS = 'saas',
}

export enum RoundType {
  PRE_SEED = 'pre_seed',
  SEED = 'seed',
  SERIES_A = 'series_a',
  SERIES_B = 'series_b',
}

export type GetDealResponse = ApiResponse<{ deals: Deal[] }>;

export type Deal = {
  deal_id: string;
  brand_name: string;
  company_name: string;
  one_liner: string;
  description: string;
  start_date: string;
  end_date: string;
  closing_soon_date: string;
  sector: Sector;
  deal_name: string;
  deal_aggregation: DealAggregation;
  cover_image: string | null;
  is_deal_of_the_week: boolean;
  is_deal_trending: boolean;
  logo_link: string | null;
  rounds: Round[];
};

export type GetDealRequest = {
  name: string;
  id: string;
};
