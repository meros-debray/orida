export const LOGOUT = 'LOGOUT';
export const SIGN_OUT = 'SIGN_OUT';
export const LOGIN = 'LOGIN';

export interface Login {
    type: typeof LOGIN;
    id: string;
    email: string;
}

interface Logout {
    type: typeof LOGOUT;
}

export type AuthActionTypes = Logout | Login;

export interface AuthState {
    email: string;
    id: string;
    token: string;
}