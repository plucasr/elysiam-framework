import path from 'path'
import exphbs from 'express-handlebars'
import { Application } from 'express'
import { rootPath } from '../../config'
import express from 'express'

const setEngineView = (app: Application) => {

    var hbs = exphbs.create({
        helpers: {
            testing: function (paramenter: string) {
                return paramenter;
            }
        },
        extname: '.hbs'
    })
    app.engine('.hbs', hbs.engine)
    app.set('view engine', '.hbs');
    app.set('views', path.join(rootPath, '/services/site/views'));
    app.use('/', express.static(path.join(rootPath, '/services/site/public')));

}

export default setEngineView;