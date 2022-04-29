import { callbackify } from 'util';
import { Authenticator } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User, userRepository } from '../domain/User';
import loginUser from '../useCases/auth/loginUser';
import UserError from '../useCases/auth/UserError';

const auth = new Authenticator();

// User serializing
auth.serializeUser(callbackify(async (user: User): Promise<string> => user.id));

auth.deserializeUser(
    callbackify(async (id: string): Promise<User | null> => {
        const user = await userRepository.findOne({ where: { id } });

        return user ?? null;
    }),
);

// Strategies
auth.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (username, password, done): Promise<void> => {
            try {
                done(null, await loginUser({ username, password })({ userRepository }));
            } catch (error) {
                if (error instanceof UserError) {
                    done(null, false, { message: error.message });
                } else {
                    done(error);
                }
            }
        },
    ),
);

export default auth;
