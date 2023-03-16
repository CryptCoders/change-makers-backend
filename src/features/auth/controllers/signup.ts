import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { joiValidation } from '@globals/decorators/joiValidationDecorators';
import { passwordSchema, signupSchema } from '@auth/schemes/signup.scheme';
import { IAuthDocument, ISignupData } from '@auth/interfaces/auth.interface';
import { authService } from '@services/db/authService';
import { BadRequestError } from '@globals/helpers/errorHandler';
import { Helpers } from '@globals/helpers/helpers';
import HTTP_STATUS from 'http-status-codes';
import { Config } from '@root/config';
import { omit } from 'lodash';
import { valid } from 'joi';
import JWT from 'jsonwebtoken';

export class SignUp {
    @joiValidation(signupSchema)
    public async create(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        const err: any[] = passwordSchema.validate(password, { details: true }) as any[];
        if (err.length > 0)
            throw new BadRequestError(err[0].message);

        const checkIfUserExists: IAuthDocument = await authService.getUserByEmail(email);

        if (checkIfUserExists)
            throw new BadRequestError('Username or email already exists');

        const authObjectId: ObjectId = new ObjectId();
        const authData: IAuthDocument = SignUp.prototype.signUpData({
            _id: authObjectId,
            email: email,
            password: password
        });

        await authService.createAuthUser(authData);
        const userJwt: string = SignUp.prototype.signUpToken(authData);
        req.session = { jwt: userJwt };

        res.status(HTTP_STATUS.CREATED).json({ message: 'User created successfully', token: userJwt });
    }

    private signUpToken(data: IAuthDocument): string {
        return JWT.sign({
            id: data._id,
            email: data.email
        }, Config.JWT_TOKEN!);
    }

    private signUpData(data: ISignupData): IAuthDocument {
        return {
            _id: data._id,
            email: Helpers.lowercase(data.email),
            password: data.password
        } as IAuthDocument;
    }
}
