import { ApiResponse, Pagination, Time } from './api.types';

export type GetInvestorsRequest = {
  cid?: string;
  mobile_number?: string;
  email?: string;
  irm_id?: string;
  is_subscribed?: string;
  pan_number?: string;
} & Pagination;

export type GetInvestorsResponse = ApiResponse<{
  investors: Investor[];
  total_records: string;
  total_pages: string;
}>;

export type Investor = {
  cid: string;
  otp_details: OtpDetails;
  t_and_c_consent: boolean;
  stage: string;
  mobile_number: string;
  dial_code: string;
  email_info: EmailInfo;
  cust_status: string;
  type: string;
  code: string;
  irm_id: string;
  pan_details: PanDetails;
  preferred_name: string;
  blocked_details: BlockedDetails;
  location_info: LocationInfo;
  cust_details: CustDetails;
  receive_updates_other_prods: boolean;
  is_subscribed: boolean;
  created_at: Time;
  updated_at: Time;
  last_login_time: Time;
  last_login_ip: string;
  last_device_name: string;
};

export type BlockedDetails = {
  is_blocked: boolean;
  blocked_reason: string;
  blocked_at: Date;
};

export type CustDetails = {
  cust_type: string;
  gst: string;
  address: string;
  entity_name: string;
};

export type EmailInfo = {
  email: string;
  is_verified: boolean;
  expiry: Date;
  cool_off_time: Date;
  retry_count: number;
  verified_on: Date;
};

export type LocationInfo = {
  state: string;
  city: string;
  country_code: string;
};

export type OtpDetails = {
  expiry: Date;
  cool_off_time: Date;
  retry: number;
};

export type PanDetails = {
  pan: string;
  name: string;
  father_name: string;
  dob: string;
  is_verified: boolean;
  verified_on: Date;
};

export type AssignRMRequest = { cid: string; irm_id: string };

export type AssignRMResponse = ApiResponse<unknown>;
