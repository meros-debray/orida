import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

class User {
    id: string;

    email: string;

    passwordHash: string | null = null;

    isAdmin: boolean;

    constructor(email: string, isAdmin: boolean = false) {
        this.id = uuidv4();
        this.email = email;
        this.isAdmin = isAdmin;
    }

    async updatePassword(password: string): Promise<void> {
        this.passwordHash = await bcrypt.hash(password, 10);
    }

    async checkPassword(password: string): Promise<boolean> {
        if (this.passwordHash === null) {
            return false;
        }

        return bcrypt.compare(password, this.passwordHash);
    }
}

interface UserRepository {
    findOne(id: string): Promise<User | undefined>;
    findOne(condition: Partial<User>): Promise<User | undefined>;
    create(details: Partial<User>): User;
    save(user: User): Promise<User>;
}

export { User, UserRepository };
