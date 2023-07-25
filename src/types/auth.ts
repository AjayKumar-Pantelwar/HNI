export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  is_pwd_change_required: boolean;
  is_totp_activated: boolean;
  req_token: string;
};

export type GenerateGauthRequest = {  
    username: string;
    req_token: string;
}

export type ActivateGauthRequest = {
  username : string;
  req_token : string;
  totp : number;
}

export type ValidateTotp = {
  username:  string;
  req_token: string;
  totp:      string;
}
