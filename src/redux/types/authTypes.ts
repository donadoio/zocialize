
export type AuthStateType = {
    loading: boolean,
    error: string,
    authenticated: boolean,
    access_token: string | null | undefined,
    refresh_token: string | null | undefined,
};
