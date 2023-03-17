import express, { Router } from 'express';
import { CreateSite } from '@site/controllers/create.site';
import { GetSite } from '@site/controllers/get.site';
import { authMiddleware } from '@globals/helpers/authMiddleware';

class SiteRoutes
{
    private readonly createRouter;
    private readonly getRouter;

    constructor () {
        this.createRouter = express.Router();
        this.getRouter = express.Router();
    }

    public site(): Router {
        this.createRouter.post('/create', authMiddleware.checkAuthentication, CreateSite.prototype.create);

        return this.createRouter;
    }

    public get(): Router {
        this.getRouter.get('/get/:name', GetSite.prototype.get);

        return this.getRouter;
    }
}

export const siteRoutes: SiteRoutes = new SiteRoutes();