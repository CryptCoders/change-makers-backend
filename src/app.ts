import express, { Express } from 'express';
import { ChangeMakersServer } from '@root/setupServer';
import { Config } from '@root/config';
import databaseConnection from '@root/setupDatabase';

class Application {
    public start(): void {
        this.loadConfig();
        databaseConnection();
        const app: Express = express();
        const server: ChangeMakersServer = new ChangeMakersServer(app);
        server.start();
    }

    private loadConfig(): void {
        Config.validateConfig();
        Config.cloudinaryConfig();
    }
}

const application: Application = new Application();
application.start();
