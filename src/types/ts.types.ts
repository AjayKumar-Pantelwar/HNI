export type RequiredProperties<T> = {
  [P in keyof T]-?: T[P];
};

export type RequiredOrUndefinedProperties<T> = {
  [P in keyof T]: T[P] | undefined;
};
