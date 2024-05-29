import axios from 'axios';
import { store } from 'src/redux/store';

export class PublicService {
  protected client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
  });

  protected interceptor = -1;

  constructor() {
    this.interceptor = this.client.interceptors.request.use(
      (request) => {
        if (!request.url?.includes('login')) {
          request.headers['X-aid'] = store.getState().auth.user?.aid || '';
          return request;
        }
        return request;
      },
      (error) => Promise.reject(error)
    );
  }
}
