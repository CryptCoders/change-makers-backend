import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { Helpers } from '@globals/helpers/helpers';
import { AuthModel } from '@auth/models/auth.schema';

class AuthService {
    public async getUserByEmail(email: string): Promise<IAuthDocument> {
        const query = {
            email: Helpers.lowercase(email)
        }

        return await AuthModel.findOne(query).exec() as IAuthDocument;
    }

    public async createAuthUser(data: IAuthDocument): Promise<void> {
        await AuthModel.create(data);
    }
}

export const authService: AuthService = new AuthService();