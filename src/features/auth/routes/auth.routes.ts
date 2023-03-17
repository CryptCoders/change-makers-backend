import express, { Router } from 'express';
import { SignUp } from '@auth/controllers/signup';
import { SignIn } from '@auth/controllers/signin';
import { Signout } from '@auth/controllers/signout';
import { CurrentUser } from '@auth/controllers/currentUser';
import { authMiddleware } from '@globals/helpers/authMiddleware';

class AuthRoutes {
    private readonly authRouter: Router;
    private readonly signoutRouter: Router;

    constructor () {
        this.authRouter = express.Router();
        this.signoutRouter = express.Router();
    }

    public routes(): Router {
        this.authRouter.post('/signup', SignUp.prototype.create);
        this.authRouter.post('/signin', SignIn.prototype.read);

        return this.authRouter;
    }

    public signoutRoute(): Router {
        this.signoutRouter.get('/signout', authMiddleware.checkAuthentication, Signout.prototype.signout);
        this.signoutRouter.get('/currentUser', authMiddleware.checkAuthentication, CurrentUser.prototype.read);

        return this.signoutRouter;
    }
}

export const authRoutes: AuthRoutes = new AuthRoutes();