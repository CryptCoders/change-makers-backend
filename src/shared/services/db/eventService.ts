import { IEventDocument } from '@events/interfaces/events.interface';
import { Helpers } from '@globals/helpers/helpers';
import { EventModel } from '@events/models/events.schema';
import {SiteModel} from "@site/models/site.schema";
import {ISiteDocument} from "@site/interfaces/site.interface";

class EventService {
    public async createEvent(data: IEventDocument): Promise<void> {
        await EventModel.create(data);
        const site: ISiteDocument = await SiteModel.findOne({ _id: data.siteId }) as ISiteDocument;
        let newEvent = site.event;
        newEvent!.push(data);
        console.log(newEvent);
        await SiteModel.updateOne({ _id: data.siteId }, { $set: { event: newEvent } })
    }
}

export const eventService: EventService = new EventService();