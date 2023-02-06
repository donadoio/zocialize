export type AuthStateType = {
  loading: boolean;
  error: string;
  authenticated: boolean;
  confirmed: boolean;
  refreshTokenPromise: Promise<any> | null;
  access_token: string | null | undefined;
  refresh_token: string | null | undefined;
};
export type ConfirmEmailFulfilled = {
  access_token: string;
  refresh_token: string;
};
export type RegisterAccountFulfilled = {
  access_token: string;
  refresh_token: string;
  confirmed: boolean;
};
export type ValidationError = {
  error: string;
  statusCode: string;
  message: string;
};
