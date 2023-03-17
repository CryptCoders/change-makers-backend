import { IEventDocument } from '@events/interfaces/events.interface';
import mongoose, { model, Model, Schema } from 'mongoose';

const eventSchema: Schema = new Schema(
    {
        siteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Site' },
        name: { type: String },
        image: { type: String },
        description: { type: String },
        date: { type: Date }
    },
    {
        toJSON: {
            transform(_doc, ret) {
                return ret;
            }
        }
    }
);

export const EventModel: Model<IEventDocument> = model<IEventDocument>('Event', eventSchema, 'Event');