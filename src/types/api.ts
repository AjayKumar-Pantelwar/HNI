export type ApiResponse<T = never> = {
  data: T;
  error?: string;
};
