export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  is_pwd_change_required: boolean;
  is_totp_activated: boolean;
  req_token: string;
};
