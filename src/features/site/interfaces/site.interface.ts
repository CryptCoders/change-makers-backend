import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { IEventDocument } from '@events/interfaces/events.interface';

export interface ISiteDocument extends Document {
    _id: string | ObjectId;
    authId: string;
    name: string;
    description: string;
    image: string;
    event?: Array<IEventDocument>;
    address: string;
    phone_no: string;
    social_fb?: string;
    social_insta?: string;
}
