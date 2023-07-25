import { LoginRequest, LoginResponse } from 'src/types/auth';
import { AxiosResponse } from 'axios';
import { ApiResponse } from 'src/types/api';
import { PrivateService } from './private-service';

export class AuthService extends PrivateService {
  login(request: LoginRequest): Promise<AxiosResponse<ApiResponse<LoginResponse>>> {
    return this.client.post('/api/auth/login', request);
  }
}

export const authService = new AuthService();
