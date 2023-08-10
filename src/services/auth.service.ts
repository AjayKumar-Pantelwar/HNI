import {
  ActivateTotpRequest,
  ActivateTotpResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  GenerateTotpRequest,
  GenerateTotpResponse,
  LoginRequest,
  LoginResponse,
  ValidateTotpRequest,
  ValidateTotpResponse,
} from 'src/types/auth.types';
import { AxiosResponse } from 'axios';
import { ApiResponse } from 'src/types/api.types';
import { PublicService } from './public-service';

class AuthService extends PublicService {
  login(request: LoginRequest): Promise<AxiosResponse<ApiResponse<LoginResponse>>> {
    return this.client.post('/api/auth/login', request);
  }

  logout(): Promise<AxiosResponse<ApiResponse>> {
    return this.client.post('/api/auth/logout');
  }

  generateTotp(
    request: GenerateTotpRequest
  ): Promise<AxiosResponse<ApiResponse<GenerateTotpResponse>>> {
    return this.client.post('/api/auth/totp/generate', request);
  }

  activateTotp(
    request: ActivateTotpRequest
  ): Promise<AxiosResponse<ApiResponse<ActivateTotpResponse>>> {
    return this.client.post('/api/auth/totp/activate', request);
  }

  changePassword(
    request: ChangePasswordRequest
  ): Promise<AxiosResponse<ApiResponse<ChangePasswordResponse>>> {
    return this.client.post('/api/auth/change-password', request);
  }

  validateTotp(
    request: ValidateTotpRequest
  ): Promise<AxiosResponse<ApiResponse<ValidateTotpResponse>>> {
    return this.client.post('/api/auth/totp/verify', request);
  }
}

export const authService = new AuthService();
