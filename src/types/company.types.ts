import * as Yup from 'yup';
import { ApiResponse } from './api.types';

export type Company = {
  company_id: string;
  legal_name: string;
  incorporated_date: string;
  form: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  website_link: string;
  branch_name: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type CompanyRequest = {
  company_id?: string;
  legal_name?: string;
};

export type CompanyResponse = ApiResponse<{ company: Company[] }>;

export const CompanyRequestSchema = Yup.object().shape({
  legal_name: Yup.string().required('Company name is required'),
  incorporated_date: Yup.string().required('Incorporated date is required'),
  form: Yup.string().required('Form is required'),
  location: Yup.object().shape({
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
  }),
  website_link: Yup.string().required('Website link is required'),
  branch_name: Yup.string().required('Branch name is required'),
  description: Yup.string().required('Description is required'),
});

export type AddCompanyRequest = Yup.InferType<typeof CompanyRequestSchema>;

export type AddCompanyResponse = ApiResponse;

export type EditCompanyRequest = Omit<Company, 'created_at' | 'updated_at'>;

export type EditCompanyResponse = ApiResponse;
