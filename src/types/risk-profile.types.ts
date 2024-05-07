import { ApiResponse } from './api.types';

export type GetQuestionsResponse = ApiResponse<Question[]>;

export interface Question {
  id: number;
  priority: number;
  statement: string;
  type: string;
  info: string;
  note: string;
  is_risk_profile: boolean;
  is_optional: boolean;
  is_active: boolean;
  options: Option[];
}

export interface Option {
  id: number;
  question_id: number;
  serial_number: number;
  title: string;
  subtitle: string;
  icon: string;
  score: number;
}
