import { ApiResponse } from './api.types';

export interface UpdateAppVerionRequest {
  android_version: string;
  ios_version: string;
  title: string;
  subtitle: string;
  button1: string;
  button2?: string;
  play_store_url: string;
  app_store_url: string;
  android_mandatory: boolean;
  ios_mandatory: boolean;
  type: APPType;
}

export enum APPType {
  ANDROID = 'android',
  IOS = 'ios',
}

export type GetNotificationsResponse = ApiResponse<Notifications[]>;

export interface Notifications {
  id: string;
  title: string;
  subtitle: string;
  is_active: boolean;
  from_date: string;
  to_date: string;
}

export interface CreateNotificationRequest {
  title: string;
  subtitle: string;
  from_date: string;
  to_date: string;
}

export interface UpdateNotificationRequest {
  id: string;
  is_active: boolean;
}
