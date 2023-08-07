import axios from 'axios';

export class PublicService {
  protected client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
  });
}
