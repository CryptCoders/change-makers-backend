import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { joiValidation } from '@globals/decorators/joiValidationDecorators';
import { createSchema } from '@events/schemes/events.scheme';
import { IEventDocument } from '@events/interfaces/events.interface';
import { ISiteDocument } from '@site/interfaces/site.interface';
import { eventService } from '@services/db/eventService';
import { siteService } from '@services/db/siteService';
import { BadRequestError } from '@globals/helpers/errorHandler';
import { Config } from '@root/config';
import { UploadApiResponse } from 'cloudinary';
import { uploads } from '@globals/helpers/cloudinaryUpload';
import HTTP_STATUS from 'http-status-codes';
import { Helpers } from '@globals/helpers/helpers';

export class CreateEvent {
    @joiValidation(createSchema)
    public async create(req: Request, res: Response): Promise<void> {
        const { siteName } = req.params;
        const { name, description, image } = req.body;

        const eventId = new ObjectId();
        const site = await siteService.getSiteByName(siteName);

        const eventData: IEventDocument = {
            _id: eventId,
            siteId: site._id,
            name: Helpers.lowercase(name),
            description: description
        } as IEventDocument;

        const result: UploadApiResponse = await uploads(image, `${req.currentUser!.id}`, true, true) as UploadApiResponse;
        if (!result?.public_id)
            throw new BadRequestError(result.message);

        eventData.image = `https://res.cloudinary.com/${Config.CLOUD_NAME}/image/upload/v${result.version}/${req.currentUser!.id}`;

        await eventService.createEvent(eventData);
        res.status(HTTP_STATUS.OK).json({ message: 'Event created successfully.', site: eventData });
    }
}