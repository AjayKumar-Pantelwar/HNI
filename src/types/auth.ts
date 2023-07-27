export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  is_pwd_change_required: boolean;
  is_totp_activated: boolean;
  req_token: string;
};

export type GenerateTotpRequest = {
  username: string;
  req_token: string;
};

export type GenerateTotpResponse = {
  req_token: string;
  secret: string;
  url: string;
};

export type ActivateTotpRequest = {
  username: string;
  req_token: string;
  totp: string;
};

export type ActivateTotpResponse = never;

export type ValidateTotpRequest = {
  username: string;
  req_token: string;
  totp: string;
};

export type ValidateTotpResponse = never;

export type ChangePasswordRequest = {
  username: string;
  req_token: string;
  password: string;
};

export type ChangePasswordResponse = {
  is_pwd_change_required: boolean;
  is_totp_activated: boolean;
};
