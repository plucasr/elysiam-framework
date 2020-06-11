import * as services from '../index'
import { IHttpExpress } from '../../../shared/interfaces'


export const getDemoRequest: IHttpExpress = (req, res, next) => {
    let response = services.demoService()
    res.json(response).status(200)
}