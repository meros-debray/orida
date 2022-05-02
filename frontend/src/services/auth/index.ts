import { GET, POST } from '@utils/http';

import { AuthConverter, AuthError, LoginProps, LoginResponse, RegisterProps } from './types';

async function login({ email, password }: LoginProps): Promise<LoginResponse> {
    try {
        const response = await POST<LoginResponse>('/api/auth/login', { email, password });

        return AuthConverter.fromApi(response);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('AuthService::login Unhandled error');
    }
}

async function register(props: RegisterProps) {
    try {
        const response = await POST<LoginResponse>('/api/auth/register', { ...props });

        return AuthConverter.fromApi(response);
    } catch (error: any) {
        if (error.status === 409) {
            throw Error(AuthError.RegisterEmailAlreadyInUse);
        }
        // TODO::error handling
        console.error(error);
        throw Error('AuthService::register  Unhandled error');
    }
}

async function logout() {
    try {
        await POST('/api/auth/logout');

        return true;
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('AuthService::logout  Unhandled error');
    }
}

async function me() {
    try {
        const result = await GET<LoginResponse>('/api/auth/me');

        return AuthConverter.fromApi(result);
    } catch (error: any) {
        if (error.status === 404) {
            return null;
        }
        // TODO::error handling
        console.error(error);
        throw Error('AuthService::me  Unhandled error');
    }
}

const AuthService = {
    login,
    logout,
    me,
    register,
};

export default AuthService;
export * from './types';
