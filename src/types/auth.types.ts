export type LoginRequest = {
  username: string;
  password: string;
};

export interface LoginResponse {
  is_password_changed_required: boolean;
  is_totp_activated: boolean;
  session_token: string;
  is_blocked: boolean;
  aid: string;
}

export interface LoginResponseData {}

export type GenerateTotpRequest = {
  username: string;
  session_token: string;
};

export interface GenerateTotpResponse {
  session_token: string;
  url: string;
}

export type ActivateTotpRequest = {
  username: string;
  session_token: string;
  totp: string;
};

export type ActivateTotpResponse = unknown;

export type ValidateTotpRequest = {
  username: string;
  session_token: string;
  totp: string;
};

export type ValidateTotpResponse = unknown;

export type ChangePasswordRequest = {
  username: string;
  session_token: string;
  password: string;
};

export interface ChangePasswordResponse {
  is_password_changed_required: boolean;
  is_totp_activated: boolean;
  session_token: string;
  is_blocked: boolean;
  aid: string;
}

export type User = LoginResponse & {
  username: string;
};

export type ApiResponse = {
  message: string;
  status: string;
  error?: string;
};

export enum Permissions {
  ADMIN_ACTIONS = 'admin_actions',
  ADMIN_MANAGEMENT = 'admin_management',
  DEAL = 'deal',
  DEAL_STAGE = 'deal_stage',
  INTERESTS = 'interests',
  INVESTMENTS = 'investments',
  INVESTOR = 'investor',
  PAYMENT_DETAILS = 'payment_details',
  PORTFOLIO = 'portfolio',
  PUBLISH = 'publish',
  DEAL_MANAGER = 'deal_manager',
}
