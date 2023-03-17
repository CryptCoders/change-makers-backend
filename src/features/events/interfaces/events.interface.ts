import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export interface IEventDocument extends Document {
    _id: string | ObjectId;
    siteId: string | ObjectId;
    name: string;
    image: string;
    description: string;
    date: Date;
}