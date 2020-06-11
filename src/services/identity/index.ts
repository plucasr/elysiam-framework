import { Request } from 'express';
import { ILogin } from './providers/interfaces';
import { generateToken, splitToken, isTokenValid } from './providers/token_provider';
import { ResponseProps } from '../../shared/types';
import { Repository } from '../../shared/db_client/index';
import { ValidationModel } from '../../shared/validation';

import { IdentityProps, idetityModel, loginModel } from './model';
import { getHash, createHashPassword } from './providers/hashPassword';

const client = new Repository<IdentityProps>('identity', idetityModel);
const validation = new ValidationModel(idetityModel);
const validationLogin = new ValidationModel(loginModel);

export const loginService: ILogin = (loginData) => new Promise(async resolve => {
    let isValid = validationLogin.insertIsValid(loginData)

    if (isValid.success === false) {
        return resolve({
            success: false,
            messages: isValid.messages
        });
    }
    else {
        let [response] = await client.getByField('email', loginData.email);
        if (response) {
            if(await getHash(loginData.password, response.password )) {
                return resolve({
                    success: true,
                    payload: {
                        token: await generateToken({ id: response.id, email: response.email }),
                        user: response
                    },
                    messages: ['User logged!']
                })
            } else {
                return resolve({
                    success: false,
                    messages: ['Invalid Password']
                })
            }
        }
        else {
            return resolve({
                success: false,
                messages: ['User not found']
            })
        }

    }
})

export const getAll = async (offset = 0, limit = 15) => {
    let response = await client.getAll(offset, limit);
    return {
        success: response.length > 0,
        messages: response.length > 0 ? ['list is ready'] : ["ops, we didn't get any results"],
        payload: response
    };
}

export const insert = async (data: IdentityProps) => {
    data.user_type = data.user_type || 'user';
    data.phone = JSON.stringify(data.phone);
    let valid = validation.insertIsValid(data);
    if (valid.success) {
        let alreadyExists = await client.getByField('email', data.email);
        if (alreadyExists.length > 0) {
            return {
                success: false,
                messages: ['Você já tem cadastro, para continuar faça login'],
            }
        }
        else {
            data.password = createHashPassword(data.password)
            let response = await client.insert(data);
            return {
                success: response.length > 0,
                messages: response.length ? ['Usúario criado com sucesso! Faça login para continuar!'] : ['Ops, we have a problem trying to place you in our database'],
                payload: response.length > 0 ? {
                    token: generateToken({ id: response })
                } : null
            }
        }
    }
    else {
        return valid;
    }
}
export const updateIdentity = async (data: IdentityProps) => {
    data.user_type = data.user_type || 'user';
    data.phone = JSON.stringify(data.phone);

    let valid = validation.updateIsValid(data);
    
    if (valid.success) {
        let response = await client.update(data);
        return {
            success: response > 0,
            messages: response > 0 ? ['All right, data updated'] : ['Ops, we have a problem trying update you'],
            payload: response
        }
    }
    else {
        return valid;
    }
}
export const verifyToken = (req: Request) => new Promise<ResponseProps>(async resolve => {
    let token = splitToken(req.headers.authorization)
    let response = await isTokenValid(token)
    return resolve(response)
})
export const getUserByToken = (token: string) => new Promise<ResponseProps>(async resolve => {
    let tokenData = await isTokenValid(token)
    resolve(tokenData)
})

export default {
    loginService,
    verifyToken
}