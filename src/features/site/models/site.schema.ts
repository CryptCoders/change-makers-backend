import { ISiteDocument } from '@site/interfaces/site.interface';
import mongoose, { model, Model, Schema } from 'mongoose';

const siteSchema: Schema = new Schema(
    {
        authId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth', index: true },
        name: { type: String },
        description: { type: String },
        image: { type: String },
        events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
        address: { type: String },
        phone_no: { type: String },
        social_fb: { type: String },
        social_insta: { type: String }
    },
    {
        toJSON: {
            transform(_doc, ret) {
                return ret;
            }
        }
    }
);

export const SiteModel: Model<ISiteDocument> = model<ISiteDocument>('Site', siteSchema, 'Site');