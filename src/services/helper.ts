import { Application } from 'express'
import { rootPath } from '../config'
import fs from 'fs'
import { IMiddleware } from '../shared/interfaces'

export const routesToScape = [
    "helper.js", 
    "helper.js.map", 
    "index.js", 
    "index.js.map", 
    "helper.ts", 
    "helper.ts.map", 
    "index.ts", 
    "index.ts.map"
];


export const defaultMiddleware: IMiddleware = (req, res, next) => next()

export const servicesListProvider = () => {
    let directories = fs.readdirSync(`${rootPath}/services/`)
    directories = directories.filter(item => routesToScape.indexOf(item) === -1)
    return directories;
}

export const main = (app: Application) => {
    let listOfServices = servicesListProvider()
    let servicesObject: any = {}
    listOfServices.forEach((item: string) => {
        let routePath = `./${item}/routes`
        servicesObject[item] = require(routePath);
    })
    listOfServices.forEach((service: any) => {
        let serviceRoute = servicesObject[service].default;
        if (typeof serviceRoute === 'function') {
            app.use(`/${service}`, serviceRoute, defaultMiddleware)
        }
    })
}