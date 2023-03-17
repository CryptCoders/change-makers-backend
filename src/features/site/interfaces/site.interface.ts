import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export interface ISiteDocument extends Document {
    _id: string | ObjectId;
    authId: string;
    name: string;
    description: string;
    image: string;
    events?: Array<string | ObjectId>;
    address: string;
    phone_no: string;
    social_fb?: string;
    social_insta?: string;
}
