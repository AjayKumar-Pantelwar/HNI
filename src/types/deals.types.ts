import { ApiResponse, Time } from './api.types';

export * from './deals/company-info.types';

export enum Stage {
  IN_PROGRESS = 'in_progress',
}

export type DealsResponse = ApiResponse<{ deals: Deal[] }>;

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
  cover_image: File | null;
  logo_link: File | null;
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
  type: 'video' | 'image';
  priority: number;
  is_published: string;
};

export type PitchRequest = {
  deal_id: string;
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
  }[];
  [key: `icon_link_${number}`]: File;
};

export type BasicInfoMediaResponse = ApiResponse;
export type PitchResponse = ApiResponse;
export type HighlightsResponse = ApiResponse;

export type GetDealResponse = ApiResponse<{ deals: Deal[] }>;

export type Deal = {
  deal_id: string;
  brand_name: string;
  cover_image: string;
  is_deal_of_the_week: boolean;
  is_deal_trending: boolean;
  company_name: string;
  company_info?: CompanyInfo;
  one_liner: string;
  description: string;
  start_date: Time;
  end_date: Time;
  closing_soon_date: Time;
  sector: Sector;
  deal_name: string;
  logo_link: string;
  stage: Stage;
  is_active: true;
  media: Media[];
  rounds: Round[];
  pitch?: Pitch;
  deal_aggregation: DealAggregation;
  created_at: Time;
  updated_at: Time;
};

export type Highlight = {
  title: string;
  description: string;
  icon_link: string;
};

export type CompanyInfo = {
  form: string;
  incorporated_date: Time;
  legal_name: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  website_link: string;
  team: Team[];
  investors: Investor[];
  news: News[];
  company_name: string;
  cover_image: string;
};

export type Team = {
  file: File;
  name: string;
  designation: string;
  social: string;
  link: string;
};

export type Investor = {
  file: File;
  name: string;
  designation: string;
};

export type News = {
  file: File;
  title: string;
};

export type Pitch = {
  info: string[];
  why_shortlist: string[];
  traction: Traction[];
  highlights?: Highlight[];
};

export type GetDealRequest = {
  name?: string;
  deal_id?: string;
};

export enum Sector1 {
  AGRICULTURE = 'agriculture',
  AUTOMOBILES = 'automobiles',
  COMMUNICATION = 'communication',
  DEFENCE = 'defence',
  EDUCATION = 'education',
  FASHION = 'fashion',
  FINANCE = 'finance',
  FOOD_AND_BEVERAGES = 'food_and_beverages',
  FURNITURE_AND_FURNISHINGS = 'furniture_and_furnishings',
  GREEN_TECH = 'green_tech',
  HEALTHCARE = 'healthcare',
  HUMAN_RESOURCES = 'human_resources',
  IMPACT = 'impact',
  LEGAL = 'legal',
  LOGISTICS = 'logistics',
  MANUFACTURING = 'manufacturing',
  MARKETING = 'marketing',
  MOBILITY = 'mobility',
  PERSONAL_CARE = 'personal_care',
  REAL_ESTATE = 'real_estate',
  RETAIL = 'retail',
  SPACE = 'space',
  SUPPLY_CHAIN = 'supply_chain',
  TRAVEL_AND_HOSPITALITY = 'travel_and_hospitality',
}

export enum Sector2 {
  CLOUD_COMPUTING = 'cloud_computing',
  TWO_WHEELER = '2_wheeler',
  ADVERTISEMENTS = 'advertisements',
  AI = 'ai',
  ALCOHOLIC_DRINKS = 'alcoholic_drinks',
  ANALYTICS = 'analytics',
  APPAREL = 'apparel',
  BATTERIES = 'batteries',
  CARE_CLINIC = 'care_clinic',
  CHARGING_STATIONS = 'charging_stations',
  CLINICAL_TRIALS = 'clinical_trials',
  CLOUD_KITCHEN = 'cloud_kitchen',
  COLD_CHAIN = 'cold_chain',
  COMPETITIVE_EXAMS = 'competitive_exams',
  COSMETICS = 'cosmetics',
  CREATOR_ECONOMY = 'creator_economy',
  CROWDFUNDING = 'crowdfunding',
  CRYPTO_EXCHANGE = 'crypto_exchange',
  CYBER_SECURITY = 'cyber_security',
  DAIRY_PRODUCTS = 'dairy_products',
  DARK_STORES = 'dark_stores',
  DATING = 'dating',
  DEBT_COLLECTION = 'debt_collection',
  DIAGNOSTICS = 'diagnostics',
  DIGITAL_MARKETING = 'digital_marketing',
  DOCUMENTATION = 'documentation',
  DRONE = 'drone',
  EDUCATION = 'education',
  ERP = 'erp',
  EV = 'ev',
  FARMING = 'farming',
  FINANCE = 'finance',
  FITNESS = 'fitness',
  RIDE_HAILING = 'ride_hailing',
  SKILLING = 'skilling',
  SKINCARE = 'skincare',
  SMALL_SATELLITE = 'small_satellite',
  SOLAR = 'solar',
  STEM = 'stem',
  SUPPLEMENTS = 'supplements',
  SUPPLY_CHAIN = 'supply_chain',
  TEA = 'tea',
  TELECOM = 'telecom',
  TELEMEDICINE = 'telemedicine',
  TOURISM = 'tourism',
  TRADING = 'trading',
  VERNACULAR = 'vernacular',
}

export enum Sector3 {
  HYPER_LOCAL = 'hyper_local',
  SOFTWARE = 'software',
  SAUCES = 'sauces',
  DRIED_FRUITS = 'dried_fruits',
  RESTAURANTS = 'restaurants',
  PROBIOTICS = 'probiotics',
  ENGLISH = 'english',
  CO_LIVING = 'co_living',
  FINANCE = 'finance',
  RIDE_HAILING = 'ride_hailing',
  SKILLING = 'skilling',
  PLANT_PROTEIN = 'plant_protein',
  HEMP_BASED = 'hemp_based',
  HOSTELS = 'hostels',
  LOYALTY_PROGRAMS = 'loyalty_programs',
  MUSIC = 'music',
  BLUE_COLLAR_JOBS = 'blue_collar_jobs',
  CREATOR_ECONOMY = 'creator_economy',
  DISPUTE_RESOLUTION = 'dispute_resolution',
  WEB3_0_METAVARSE = 'web3_0_metaverse',
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
