import bodyParser from 'body-parser'
import { Application } from 'express'

export default (app: Application) => {
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
}