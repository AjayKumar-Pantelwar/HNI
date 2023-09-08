export type ApiResponse<T = never> = {
  data: T;
  error?: string;
};

export type Time = string;

export type Pagination = { page_no?: number; no_of_records?: number };
