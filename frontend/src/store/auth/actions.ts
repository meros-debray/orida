import { ReduxDispatch } from '@hooks/useThunkDispatch';
import AuthService, { LoginProps } from '@services/auth';

import {
    AuthActionTypes,
    LOGIN,
    Login,
    LOGOUT,
} from './types';

export const loginAction = (payload: Omit<Login, 'type'>): AuthActionTypes => ({
    type: LOGIN,
    ...payload,
});

export const logoutAction = (): AuthActionTypes => ({
    type: LOGOUT,
});

export const login = (props: LoginProps) => async (
    dispatch: ReduxDispatch,
): Promise<any> => {
    const result = await AuthService.login(props);
    dispatch(loginAction(result));
};

export const logout = () => async (
    dispatch: ReduxDispatch,
): Promise<any> => {
    await AuthService.logout();
    dispatch(logoutAction());
};

export const register = (props: LoginProps) => async (
): Promise<any> => {
    const actionResult = await AuthService.register(props);
    console.error({ actionResult });
    throw Error('Store::Auth::Register Missing implementation');
};