import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

declare global {
    namespace Express {
        interface Request {
            currentUser?: AuthPayload;
        }
    }
}

export interface AuthPayload {
    id: string;
    email: string;
    username: string;
}

export interface IAuthDocument extends Document {
    _id: string | ObjectId;
    email: string;
    password?: string;
    comparePassword(password: string): Promise<boolean>;
    hashPassword(password: string): Promise<string>;
}

export interface ISignupData {
    _id: ObjectId;
    email: string;
    password: string;
}

export interface IAuthJob {
    value?: string | IAuthDocument;
}