import jwt from 'jsonwebtoken'
import { api_secret } from '../../../config'
import { ResponseProps } from '../../../shared/types';

export const generateToken = (data) => jwt.sign(data, api_secret, {
    expiresIn: 600 
});

export const isTokenValid = (token) => new Promise<ResponseProps>(resolve => jwt.verify(token, api_secret, (err, data) => (
    err ? resolve({
        success: false,
        messages: ['Invalid token']
    }) : resolve({
        success: true,
        payload: data,
        messages: ['Valid token']
    })
)))

export const splitToken = (authorization) => {
    let token = authorization.split('Bearer ')[1]
    return token;
}
export default {
    isTokenValid,
    generateToken,
    splitToken
}