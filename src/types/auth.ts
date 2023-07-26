import { ApiResponse } from "./api";

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

export type ValidateTotpResponse = ApiResponse<{}>

export type CreateRoleRequest = {
  name:       string;
  permission: Permission[];
}

export type Permission = {
  module: string;
  view:   boolean;
  edit:   boolean;
}

export type GetRolesResponse = ApiResponse<{roles: Role[];}>

export type Role = {
  rid:        string;
  name:       string;
  permission: Permission[];
  is_active:  boolean;
  created_at: Date;
  updated_at: Date;
}

