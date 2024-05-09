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
