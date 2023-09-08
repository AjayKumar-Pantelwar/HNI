import { ApiResponse } from './api.types';

export type ConstantsResponse = ApiResponse<ConstantData>;

export type ConstantData = {
  // label value pairs
  sector: Sector;
  stages: { [key: string]: LabelValue };
  round_type: { [key: string]: LabelValue };

  // direct enum values
  valuation_type: string[];
  round_instrument: string[];
  media_type: string[];
  form: string[];
};

export type LabelValue = {
  label: string;
  value: string;
};

export type Sector = {
  primary: { [key: string]: LabelValue };
  sector_2: { [key: string]: LabelValue };
  sector_3: { [key: string]: LabelValue };
  model: { [key: string]: LabelValue };
  tech: { [key: string]: LabelValue };
};
