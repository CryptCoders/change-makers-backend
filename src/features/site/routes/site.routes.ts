import express, { Router } from 'express';
import { CreateSite } from '@site/controllers/create.site';
import { GetSite } from '@site/controllers/get.site';
import { authMiddleware } from '@globals/helpers/authMiddleware';

class SiteRoutes
{
    private readonly routes;

    constructor () {
        this.routes = express.Router();
    }

    public site(): Router {
        this.routes.post('/create', authMiddleware.checkAuthentication, CreateSite.prototype.create);

        return this.routes;
    }

    public get(): Router {
        this.routes.get('/get/:name', GetSite.prototype.get);

        return this.routes;
    }
}

export const siteRoutes: SiteRoutes = new SiteRoutes();