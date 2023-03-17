import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { joiValidation } from '@globals/decorators/joiValidationDecorators';
import validate, { createSchema } from '@site/schemes/site.scheme';
import { ISiteDocument } from '@site/interfaces/site.interface';
import { siteService } from '@services/db/siteService';
import { BadRequestError } from '@globals/helpers/errorHandler';
import { Config } from '@root/config';
import { UploadApiResponse } from 'cloudinary';
import { uploads } from '@globals/helpers/cloudinaryUpload';
import HTTP_STATUS from 'http-status-codes';
import { Helpers } from '@globals/helpers/helpers';
import Logger from 'bunyan';
import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { authService } from '@services/db/authService';

const log: Logger = Config.createLogger('createSite');

export class CreateSite {
    @joiValidation(createSchema)
    public async create(req: Request, res: Response): Promise<void> {
        const { name, description, image, address, phone_no, social_fb, social_insta } = req.body;
        const site: ISiteDocument = await siteService.getSiteByName(name);

        if (site) {
            throw new BadRequestError('An organization with this name already exists');
        }

        validate(phone_no, social_fb, social_insta);

        const siteId = new ObjectId();

        const siteData: ISiteDocument = {
            _id: siteId,
            authId: req.currentUser!.id,
            name: Helpers.lowercase(name),
            description: description,
            address: address,
            phone_no: phone_no,
            social_fb: social_fb,
            social_insta: social_insta
        } as ISiteDocument;

        const result: UploadApiResponse = await uploads(image, `${req.currentUser!.id}`, true, true) as UploadApiResponse;
        if (!result?.public_id)
            throw new BadRequestError(result.message);

        siteData.image = `https://res.cloudinary.com/${Config.CLOUD_NAME}/image/upload/v${result.version}/${req.currentUser!.id}`;
        await siteService.createSite(siteData);

        res.status(HTTP_STATUS.OK).json({ message: 'Site hosted successfully.', site: siteData });
    }
}