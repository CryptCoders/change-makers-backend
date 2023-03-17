import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { ISiteDocument } from '@site/interfaces/site.interface';
import { IAuthDocument} from '@auth/interfaces/auth.interface';
import { siteService } from '@services/db/siteService';
import { authService } from '@services/db/authService';
import { BadRequestError } from '@globals/helpers/errorHandler';
import { Config } from '@root/config';
import { UploadApiResponse } from 'cloudinary';
import HTTP_STATUS from 'http-status-codes';
import { Helpers } from '@globals/helpers/helpers';

export class GetSite {
    public async get(req: Request, res: Response): Promise<void> {
        const { name } = req.params;
        const site: ISiteDocument = await siteService.getSiteByName(name);

        if (!site) {
            throw new BadRequestError('No such organization exists');
        }

        const user: IAuthDocument = await authService.getUserByAuthId(site.authId);

        res.status(HTTP_STATUS.OK).json({ site: site, email: user.email });
    }
}