import { Pagination } from './api.types';

export type GetPortfolioRequest = {
  cid: string;
} & Pagination;

export interface GetPortfolioResponse {
  data: PortfolioData;
}

export interface PortfolioData {
  portfolio: Portfolio[];
  total_records: string;
  total_pages: string;
}

export interface Portfolio {
  cid: string;
  email: string;
  total_commited: number;
  total_invested: number;
  invested: Ted;
  commited: Ted;
  created_at: Date;
  updated_at: Date;
}

export interface Ted {
  sector: Model[];
  tech: Model[];
  model: Model[];
}

export interface Model {
  name: string;
  amount: number;
}

export type GetTransactionsRequest = {
  cid: string;
} & Pagination;

export interface GetTransactionsResponse {
  data: TransactionData;
}

export interface TransactionData {
  txns: Txn[];
  total_records: string;
  total_pages: string;
}

export interface Txn {
  id: string;
  deal_name: string;
  brand_name: string;
  email: string;
  type: string;
  deal_id: string;
  company_id: string;
  cid: string;
  amount: number;
  currency: string;
  status: string;
  updated_at: Date;
  created_at: Date;
}
