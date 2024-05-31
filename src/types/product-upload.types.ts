import { ApiResponse } from './api.types';

export enum ExcelUploadTabs {
  MUTUAL_FUND = 'Mutual Funds',
  PMS = 'PMS',
  AIF = 'AIF',
  GLOBAL_INVESTING = 'Global Investing',
  EXCLUSIVES = 'Exclusives',
}

export enum PDFUploadTabs {
  MUTUAL_FUND = 'Mutual Funds',
  PMS = 'PMS',
  AIF = 'AIF',
}

export interface PDFUploadData {
  product_id: number;
  product_name: string;
  PDF1: boolean;
  PDF2: boolean;
  PDF3: boolean;
  PDF4: boolean;
}

export type UploadExcelResponse = ApiResponse<UploadResponseData>;

export interface UploadResponseData {
  success: Success[];
  error: ErrorElement[];
}

export interface ErrorElement {
  error: ErrorError;
  scheme_id: string;
  row_number: number;
}

export interface ErrorError {}

export interface Success {
  scheme_id: string;
  row_number: number;
}

export const pdfUploadData: PDFUploadData[] = [
  {
    product_id: 1,
    product_name: 'Zamit',
    PDF1: false,
    PDF2: false,
    PDF3: false,
    PDF4: false,
  },
  {
    product_id: 2,
    product_name: 'Flowdesk',
    PDF1: true,
    PDF2: true,
    PDF3: true,
    PDF4: false,
  },
  {
    product_id: 3,
    product_name: 'It',
    PDF1: false,
    PDF2: false,
    PDF3: false,
    PDF4: false,
  },
  {
    product_id: 4,
    product_name: 'Namfix',
    PDF1: false,
    PDF2: true,
    PDF3: false,
    PDF4: false,
  },
  {
    product_id: 5,
    product_name: 'Stringtough',
    PDF1: true,
    PDF2: false,
    PDF3: false,
    PDF4: true,
  },
  {
    product_id: 6,
    product_name: 'Ventosanzap',
    PDF1: true,
    PDF2: false,
    PDF3: false,
    PDF4: false,
  },
  {
    product_id: 7,
    product_name: 'Alpha',
    PDF1: false,
    PDF2: true,
    PDF3: true,
    PDF4: true,
  },
  {
    product_id: 8,
    product_name: 'Voltsillam',
    PDF1: false,
    PDF2: false,
    PDF3: true,
    PDF4: true,
  },
  {
    product_id: 9,
    product_name: 'Vagram',
    PDF1: false,
    PDF2: true,
    PDF3: true,
    PDF4: true,
  },
  {
    product_id: 10,
    product_name: 'Stim',
    PDF1: true,
    PDF2: false,
    PDF3: true,
    PDF4: true,
  },
];
