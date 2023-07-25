import { LoginRequest, LoginResponse } from 'src/types/auth';
import { AxiosResponse } from 'axios';
import { ApiResponse } from 'src/types/api';
import { PrivateService } from './private-service';

export class AuthService extends PrivateService {
  login(request: LoginRequest): Promise<AxiosResponse<ApiResponse<LoginResponse>>> {
    return this.client.post('/api/auth/login', request);
  }

  logout(): Promise<AxiosResponse<ApiResponse>> {
    return this.client.post('/api/auth/logout')
  }
  
  generateGauth(request: { username: string, req_token: string }): Promise<AxiosResponse<ApiResponse>> {
    return this.client.post('/api/auth/generate-gauth', request);
  }
  
  activateGauth(request: { username: string, req_token: string, totp: number }): Promise<AxiosResponse<ApiResponse>> {
    return this.client.post('/api/auth/activate-gauth', request);
  }

  changePassword(request: { username: string, req_token: string, password: string }): Promise<AxiosResponse<ApiResponse>> {
    return this.client.post('/api/auth/change-password', request);
  }

  validateTotp(request: { username: string, req_token: string, totp: string }): Promise<AxiosResponse<ApiResponse>> {
    return this.client.post('/api/auth/validate-totp', request);
  }

  createRole(request: { username: string, req_token: string }): Promise<AxiosResponse<ApiResponse>> {
    return this.client.post('/api/auth/create-role', request);
  }

  getRoles(): Promise<AxiosResponse<ApiResponse>> {
    return this.client.get('/api/auth/get-roles');
  }

  editRole(request: { username: string, req_token: string }): Promise<AxiosResponse<ApiResponse>> {
    return this.client.post('/api/auth/edit-role', request);
  }

  createAdmin(request: { username: string, req_token: string }): Promise<AxiosResponse<ApiResponse>> {
    return this.client.post('/api/auth/create-admin', request);
  }

  editAdmin(request: { username: string, req_token: string }): Promise<AxiosResponse<ApiResponse>> {
    return this.client.post('/api/auth/edit-admin', request);
  }
}


export const authService = new AuthService();
