import { ApiResponse } from './api.types';

export type GetCarouselResponse = ApiResponse<Carousel[]>;

export interface Carousel {
  id: number;
  priority: number;
  title: Title;
  subtitle: Subtitle;
  media_url: string;
  icon: string;
  is_active: boolean;
}

export interface CarouselRequest {
  title: Title;
  subtitle: Subtitle;
  icon: string;
  media_url: string;
  is_active: boolean;
}

export interface Subtitle {
  number: number;
  suffix: string;
  data: string;
}

export interface Title {
  normal: string;
  bold: string;
}
