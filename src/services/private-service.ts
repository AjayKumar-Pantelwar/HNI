import axios from 'axios';
import { authSlice } from 'src/redux/slices/auth.slice';
import { store } from 'src/redux/store';

export class PrivateService {
  protected client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
  });

  protected interceptor = -1;

  constructor() {
    this.interceptor = this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) {
          store.dispatch(authSlice.actions.logout());
        }
        return Promise.reject(error);
      }
    );
  }
}
