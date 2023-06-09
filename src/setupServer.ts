import { Application, json, urlencoded, Response, Request, NextFunction } from 'express';
import { Config } from '@root/config';
import applicationRoutes from '@root/routes';
import { BadRequestError, NotFoundError, FileTooLargeError, JoiRequestValidationError, IErrorResponse, CustomError } from '@globals/helpers/errorHandler';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import cookierSession from 'cookie-session';
import Logger from 'bunyan';
import HTTP_STATUS from 'http-status-codes';
import { Server } from 'socket.io';
import { createClient } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';
import 'express-async-errors';

const SERVER_PORT = 8000;
const log: Logger = Config.createLogger('server');

export class ChangeMakersServer {
    private readonly app: Application;

    constructor (app: Application) {
        this.app = app;
    }

    private securityMiddleware(app: Application): void {
        app.use(
            cookierSession ({
                name: 'session',
                keys: [Config.SECRET_KEY_ONE!, Config.SECRET_KEY_TWO!],
                maxAge: 24 * 3600 * 1000,
                secure: Config.NODE_ENV !== 'development',
            })
        );

        app.use(hpp());
        app.use(helmet());

        app.use(
            cors ({
                origin: [Config.CLIENT_URL!, 'http://127.0.0.1:8000'],
                credentials: true,
                optionsSuccessStatus: 200,
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            })
        );
    };

    private standardMiddleware(app: Application): void {
        app.use(compression());
        app.use(json({limit: '50mb',}));
        app.use(urlencoded({extended: true, limit: '50mb',}));
    };

    private routeMiddleware(app: Application): void {
        applicationRoutes(app);
    };

    private globalErrorMiddleware(app: Application): void {
        app.all('*', (req: Request, res: Response) => {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: `${req.originalUrl} not found`,
            });
        });

        app.use((err: IErrorResponse, req: Request, res: Response, next: NextFunction) => {
            log.error(err);
            if (err instanceof CustomError) {
                return res.status(err.code).json(err.serializeErrors());
            }
            next();
        });
    };

    private async startServer(app: Application): Promise<void> {
        try {
            const httpServer: http.Server = new http.Server(app);
            this.startHttpServer(httpServer);
        }
        catch (err) {
            log.error(err);
        }
    };

    private startHttpServer(httpServer: http.Server): void {
        httpServer.listen(SERVER_PORT, () => {
            log.info(`Server running on port ${SERVER_PORT}`);
        })
    };

    public start() : void {
        this.securityMiddleware(this.app);
        this.standardMiddleware(this.app);
        this.routeMiddleware(this.app);
        this.globalErrorMiddleware(this.app);
        this.startServer(this.app);
    };
}
