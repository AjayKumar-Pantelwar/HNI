export type ApiResponse<T = never> = {
  data: T;
  error?: string;
};

export type Time = {
  seconds: number;
  nanos?: number;
};
