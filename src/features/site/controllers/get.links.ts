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

export class GetSiteLinks {
    public async get(req: Request, res: Response): Promise<void> {
        const links: ISiteDocument[] = await siteService.getSiteByAuthId(req.currentUser!.id);
        const res_links: string[] = [];

        for (let link of links) {
            res_links.push(`${Config.CLIENT_URL!}/ngo/${link.name}`);
        }

        res.status(HTTP_STATUS.OK).json({ links: res_links });
    }
}
