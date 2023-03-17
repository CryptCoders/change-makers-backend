import { Application, NextFunction, Request, Response } from 'express';
import { authRoutes } from '@auth/routes/auth.routes';
import { siteRoutes } from '@site/routes/site.routes';
import { eventRoutes } from '@events/routes/events.routes';
import { authMiddleware } from '@globals/helpers/authMiddleware';

const BASE_PATH = '/api/v1';

export default (app: Application) => {
    const routes = () => {
        app.use(BASE_PATH, authRoutes.routes());
        app.use(BASE_PATH, siteRoutes.get());

        app.use(BASE_PATH, authMiddleware.verifyUser, authRoutes.signoutRoute());
        app.use(BASE_PATH, authMiddleware.verifyUser, siteRoutes.site());
        app.use(BASE_PATH, authMiddleware.verifyUser, eventRoutes.routes());
    };

    routes();
}