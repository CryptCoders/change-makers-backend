import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { IAuthDocument } from '@auth/interfaces/auth.interface';

export class CurrentUser {
    public async read(req: Request, res: Response): Promise<void> {
        res.status(HTTP_STATUS.OK).json({ user: req.currentUser! });
    }
}
