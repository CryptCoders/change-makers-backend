import { Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import { Config } from '@root/config';
import { joiValidation } from '@globals/decorators/joiValidationDecorators';
import HTTP_STATUS from 'http-status-codes';
import { authService } from '@services/db/authService';
import { BadRequestError } from '@globals/helpers/errorHandler';
import { signinSchema } from '@auth/schemes/signin.scheme';
import { IAuthDocument } from '@auth/interfaces/auth.interface';
import publicIp from 'ip';

export class SignIn {
    @joiValidation(signinSchema)
    public async read(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        const authUser: IAuthDocument = await authService.getUserByEmail(email);

        if (!authUser) {
            throw new BadRequestError('No such email exists!');
        }

        const passwordMatch: boolean = await authUser.comparePassword(password);

        if (!passwordMatch) {
            throw new BadRequestError('Incorrect password!');
        }

        const authJwt: string = JWT.sign({
            id: authUser._id,
            email: authUser.email,
        }, Config.JWT_TOKEN!);

        req.session = { jwt: authJwt };

        res.status(HTTP_STATUS.OK).json({ message: 'User logged in successfully', token: authJwt });
    }
}
