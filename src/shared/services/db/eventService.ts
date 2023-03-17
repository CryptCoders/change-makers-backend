import { IEventDocument } from '@events/interfaces/events.interface';
import { Helpers } from '@globals/helpers/helpers';
import { EventModel } from '@events/models/events.schema';

class EventService {
    public async createEvent(data: IEventDocument): Promise<void> {
        await EventModel.create(data);
    }
}

export const eventService: EventService = new EventService();