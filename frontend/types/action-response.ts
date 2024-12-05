export type SuccessResponse<T = any> = {
  success: true;
  message: string;
  data: T;
};

export type ErrorResponse = {
  success: false;
  message: string;
  data: null;
};

export type ActionResponse<T = any> = SuccessResponse<T> | ErrorResponse;
