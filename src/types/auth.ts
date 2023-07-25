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

export type GenerateGauthResponse = {  
  req_token: string;
  secret: string;
  url: string;
}

export type ActivateGauthRequest = {
  username : string;
  req_token : string;
  totp : number;
}

export type ValidateTotpRequest = {
  username:  string;
  req_token: string;
  totp:      string;
}

export type ValidateTotpResponse = {
  
}