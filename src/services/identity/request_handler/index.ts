import { IHttpExpress } from "../../../shared/interfaces";
import * as service from '../index'
import { ResponseProps } from "../../../shared/types";

let { loginService, verifyToken } = service;

export const handleGet: IHttpExpress = async (req, res, next) => {
    console.log('loading get all')
    let response = await service.getAll();
    res.json(response);
}
export const handleTokenRequest = async (req, res, next) => {
    console.log(req.params.token)
    let response = await service.getUserByToken(req.params.token)
    return res.json(response);
}
export const handleLogin: IHttpExpress = async (req, res, next) => {
    let response = await loginService(req.body)
    return res.json(response);
}

export const verifyAuthMiddleware: IHttpExpress = async (req, res, next) => {
    let response: ResponseProps = await verifyToken(req);
    if (response.success) {
        next()
    }
    else {
        res.json(response)
    }
}
export const handleUpdate = async (req, res, next) => {
    let response = await service.updateIdentity(req.body);
    return res.json(response);
}
export const handleSignUpRequest: IHttpExpress = async (req, res, next) => {
    let response = await service.insert(req.body);
    res.json(response);
}
export default {
    handleLogin
}