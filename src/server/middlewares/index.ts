import { Application } from 'express'
import ignoreFavicon from './ignoreFavicon'
import setBodyParser from './bodyParser'
import setHeaders from './setHeaders'
import setEngineView from './engineView'

export default (app: Application) => {
    ignoreFavicon(app)
    setBodyParser(app)
    setHeaders(app)
    setEngineView(app)
}