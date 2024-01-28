export interface BaseErrorModel {
  statusCode: number;
  error: string;
  isError: boolean;
  message: string;
  timestamp: string;
  path: string;
  data: null;
}

export interface BaseModel<T> {
  data: T;
  isError: boolean;
  message: string;
}
