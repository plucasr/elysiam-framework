import { Application } from 'express';

interface IMiddleware {
    (req: any, res: any, next: any): void
}

export const setHeaders: IMiddleware = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Origin", "*");
    next();
}

export default (app: Application) => app.use(setHeaders)
