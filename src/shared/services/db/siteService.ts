import { ISiteDocument } from '@site/interfaces/site.interface';
import { Helpers } from '@globals/helpers/helpers';
import { SiteModel } from '@site/models/site.schema';

class SiteService {
    public async getSiteByName(name: string): Promise<ISiteDocument> {
        const query = {
            name: Helpers.lowercase(name)
        }

        return await SiteModel.findOne(query).exec() as ISiteDocument;
    }

    public async getSiteByAuthId(id: string): Promise<ISiteDocument> {
        const query = {
            authId: id
        }

        return await SiteModel.findOne(query).exec() as ISiteDocument;
    }

    public async createSite(data: ISiteDocument): Promise<void> {
        await SiteModel.create(data);
    }
}

export const siteService: SiteService = new SiteService();