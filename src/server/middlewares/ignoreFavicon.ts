import { Application } from 'express';

interface IMiddleware {
    (req: any, res: any, next: any): void
}

export const ignoreFavicon: IMiddleware = (req, res, next) => {
    if (req.originalUrl === '/favicon.ico') {
        res.status(204).json({ nope: true });
    } else {
        next();
    }
}

export default (app: Application) => app.use(ignoreFavicon)