import express, { Router } from 'express';
import { CreateEvent } from '@events/controllers/create.event';
import { authMiddleware } from '@globals/helpers/authMiddleware';

class EventsRoutes
{
    private readonly eventRouter;

    constructor () {
        this.eventRouter = express.Router();
    }

    public routes(): Router {
        this.eventRouter.post('/create', authMiddleware.checkAuthentication, CreateEvent.prototype.create);

        return this.eventRouter;
    }
}

export const eventRoutes: EventsRoutes = new EventsRoutes();