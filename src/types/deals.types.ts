import * as Yup from 'yup';

import { isBefore } from 'date-fns';
import { pDate } from 'src/utils/format-time';
import { ApiResponse, Time } from './api.types';

export * from './deals/company-info.types';

export enum Stage {
  IN_PROGRESS = 'in_progress',
}

export type DealsResponse = ApiResponse<{ deals: Deal[] }>;

export const DealTermsScehma = Yup.object().shape({
  ask_from_ma: Yup.string().required('Asking amount from MA is required'),
  is_active: Yup.boolean().required('Active status is required'),
  min_investment: Yup.number().required('Minimum investment is required'),
  externally_raised: Yup.number().required('Externally raised amount is required'),
  round_size: Yup.string().required('Round size is required'),
  round_type: Yup.string().required('Round type is required'),
  round_instrument: Yup.string().required('Round instrument is required'),
  valuation_type: Yup.string().required('Valuation type is required'),
  subscription_in_perc: Yup.string().required('Subscription in percentage is required'),
  floor: Yup.string().test((value, context) => {
    if (context.parent.valuation_type === ValuationType.VARIABLE && !value) {
      return context.createError({ message: 'Floor amount is required' });
    }
    return true;
  }),
  cap: Yup.string().test((value, context) => {
    if (context.parent.valuation_type === ValuationType.VARIABLE && !value) {
      return context.createError({ message: 'Cap amount is required' });
    }
    return true;
  }),
  valuation: Yup.string().test((value, context) => {
    if (context.parent.valuation_type === ValuationType.FIXED && !value) {
      return context.createError({ message: 'Valuation is required' });
    }
    return true;
  }),
  disc_matrix: Yup.array().of(
    Yup.object().shape({
      total_months: Yup.string().required('Total months is required'),
      perc: Yup.string().required('Percentage is required'),
    })
  ),
  cap_table: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Name is required'),
      perc: Yup.string().required('Percentage is required'),
    })
  ),
  co_investors: Yup.array().of(Yup.string()).required('Co-investors are required'),
  deal_price: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('Title is required'),
      perc: Yup.string().required('Percentage is required'),
      info: Yup.string().required('Information is required'),
    })
  ),
  rules_of_allocation: Yup.array().of(Yup.string()).required('Rules of allocation are required'),
  note: Yup.string().required('Note is required'),
  read_qualification_criteria_link: Yup.string().required('Link is required'),
});

export type CreateDealTerms = Yup.InferType<typeof DealTermsScehma>;

export const CreateDealSchema = Yup.object().shape({
  brand_name: Yup.string().required('Brand name  is required'),
  company_name: Yup.string().required('Company name is required'),
  one_liner: Yup.string().required('One liner is required'),
  description: Yup.string()
    .required('Description is required')
    .min(100, 'Description must have a minimum of 100 words')
    .max(250, 'Description must have a maximum of 250 words'),
  start_date: Yup.string().required('Start date is required'),
  end_date: Yup.string()
    .required('End date is required')
    .test((value, context) => {
      const startDate = pDate(context.parent.end_date);
      const endDate = pDate(value);
      if (startDate && endDate && isBefore(endDate, startDate)) {
        return context.createError({
          message: 'End date must be after start date',
        });
      }
      return true;
    }),
  closing_soon_date: Yup.string()
    .required('Closing soon date is required')
    .test((value, context) => {
      const closingSoonDate = pDate(value);
      const endDate = pDate(context.parent.end_date);
      if (closingSoonDate && endDate && isBefore(endDate, closingSoonDate)) {
        return context.createError({
          message: 'Closing soon date must be before end date',
        });
      }
      return true;
    }),
  deal_name: Yup.string().required('Deal name is required'),
  cover_image: Yup.mixed().required('Cover image is required').nullable(),
  logo_link: Yup.mixed().required('Logo link is required').nullable(),
  pitch_deck: Yup.mixed().required('Logo link is required').nullable(),
  primary: Yup.string().required('Primary sector is required'),
  sector_2: Yup.string(),
  sector_3: Yup.string(),
  tech: Yup.string().required('Tech is required'),
  model: Yup.string().required('Model is required'),
  company_id: Yup.string().required('Company is required'),
});

export type CreateDealRequest = Yup.InferType<typeof CreateDealSchema>;

export const DataroomSchema = Yup.object().shape({
  pitch_pdf_link: Yup.string().required(),
  document_link: Yup.string().required(),
});

export const DDReportSchema = Yup.object().shape({
  dd_report_link: Yup.string().required(),
});

export type Round = {
  ask_from_ma?: string;
  is_active?: boolean;
  raised_in_perc?: string;
  min_investment?: number;
  externally_raised?: number;
  round_size?: string;
  valuation?: string;
  round_instrument?: RoundInstrument;
  valuation_type?: string;
  subscription_in_perc?: string;
  floor?: string;
  cap?: string;
  cap_table: CapTableEntry[];
  disc_matrix?: DiscountMatrixItem[];
  co_investors?: string[];
  round_type?: RoundType;
  deal_price?: DealPrice[];
  rules_of_allocation?: string[];
  note?: string;
  read_qualification_criteria_link?: string;
};

export type DealPrice = {
  title: string;
  perc: string;
  info: string;
};

export type CapTableEntry = {
  name: string;
  perc: string;
};

export type DiscountMatrixItem = {
  total_months: string;
  perc: string;
};

export type CreateDealResponse = {
  data: {
    deal_id: string;
  };
};
export type Sector = {
  primary: string;
  sector_1: string;
  sector_2: string;
  sector_3: string;
  tech: string;
  model: string;
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
  thumbnail_link: string; // required when uploading video
  type: 'video' | 'image' | 'pitch_video';
  priority: number; // pitch_video priority is always -1
  is_published: string;
};

export type PitchRequest = {
  deal_id: string;
  info: string[];
  why_shortlist: string[];
  traction: Traction[];
  project_revenue_graph_data: ProjectRevenueGraphEntry[];
  usage_of_funds_data: FundData[];
};

export type FundData = {
  title: string;
  funds_in_perc: string;
};

export type ProjectRevenueGraphEntry = {
  year: string;
  revenue_in_inr: string;
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
  team: Team[];
  investors: Investor[];
  news: News[];
  one_liner: string;
  description: string;
  deal_manager: string[] | null;
  start_date: Time;
  pitch_deck: string;
  end_date: Time;
  closing_soon_date: Time;
  sector: Sector;
  company_id: string;
  deal_name: string;
  logo_link: string;
  stage: Stage;
  dataroom: Dataroom;
  is_active: true;
  media: Media[];
  round: Round;
  pitch?: Pitch;
  deal_aggregation: DealAggregation;
  created_at: Time;
  updated_at: Time;
  project_revenue_graph_data: ProjectRevenueGraphEntry[];
  usage_of_funds_data: FundData[];
  dd_report: string;
};

export type Dataroom = {
  pitch_pdf_link: string;
  document_link: string;
};

export type Highlight = {
  title: string;
  description: string;
  icon_link: string;
};

export type Team = {
  name: string;
  designation: string;
  id: string;
  image_link: string;
  profile_links: { social: string; link: string }[];
};

export type Investor = {
  image_link: string;
  id: string;
  name: string;
  designation: string;
};

export type News = {
  title: string;
  id: string;
  article_link: string;
  thumbnail_link: string;
};

export type Pitch = {
  info: string[];
  why_shortlist: string[];
  traction: Traction[];
  highlights?: Highlight[];
  project_revenue_graph_data: ProjectRevenueGraphEntry[];
  usage_of_funds_data: FundData[];
};

export type GetDealRequest = {
  name?: string;
  deal_id?: string;
};

export enum RoundType {
  PRE_SEED = 'pre_seed',
  SEED = 'seed',
  SERIES_A = 'series_a',
  SERIES_B = 'series_b',
}

export enum RoundInstrument {
  CCPS = 'ccps',
  CCD = 'ccd',
  EQUITY = 'equity',
  CONVERTIBLE_NOTE = 'convertible_note',
}

export enum ValuationType {
  FIXED = 'fixed',
  VARIABLE = 'variable',
}

export type AssignDMRequest = {
  dm_id: string[];
  deal_id: string;
};

export type AssignDMResponse = unknown;

export type DealStageRequest = {
  stage: string;
  deal_id: string;
};

export type DealStageResponse = unknown;

export type DealStatusRequest = {
  deal_id: string;
  status: boolean;
};

export type DealStatusResponse = unknown;

export type SaveInvestedRequest = {
  deal_id: string;
  cid: string;
  amount: number;
};

export type SaveInvestedResponse = unknown;

export type UpdateDDReportRequest = {
  dd_report_link: string;
  deal_id: string;
};

export type UpdateDDReportResponse = unknown;
