import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { joiValidation } from '@globals/decorators/joiValidationDecorators';
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

export class EditSite {
    public async create(req: Request, res: Response): Promise<void> {
        const { siteName } = req.params;
        const { description, image, address, phone_no, social_fb, social_insta } = req.body;

        const site: ISiteDocument = await siteService.getSiteByName(siteName);

        const siteData: ISiteDocument = {
            authId: req.currentUser!.id,
            description: description,
            address: address,
            phone_no: phone_no,
            social_fb: social_fb,
            social_insta: social_insta
        } as ISiteDocument;

        siteData.name = siteData.name ? siteData.name : site.name;
        siteData.description = siteData.description ? siteData.description : site.description;
        siteData.address = siteData.address ? siteData.address : site.address;
        siteData.phone_no = siteData.phone_no ? siteData.phone_no : site.phone_no;
        siteData.social_fb = siteData.social_fb ? siteData.social_fb : site.social_fb;
        siteData.social_insta = siteData.social_insta ? siteData.social_insta : site.social_insta;

        if (image)
        {
            const result: UploadApiResponse = await uploads(image, `${req.currentUser!.id}`, true, true) as UploadApiResponse;
            if (!result?.public_id)
                throw new BadRequestError(result.message);

            siteData.image = `https://res.cloudinary.com/${Config.CLOUD_NAME}/image/upload/v${result.version}/${req.currentUser!.id}`;
        }
        else
            siteData.image = site.image;

        await siteService.updateSite(siteData.name, siteData);
        res.status(HTTP_STATUS.OK).json({ message: 'Site edited successfully.', site: siteData });
    }
}