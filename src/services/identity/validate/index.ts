import validate from 'validate.js'
import { LoginProps } from '../providers/types'


export const loginValidateProps = {
    email: {
        presence: true,
    },
    password: {
        presence: true
    }
}

export const validationLogin = (data: LoginProps) => {
    let validateData = validate(data, loginValidateProps);
    return {
        success: validateData ? false : true,
        messages: validateData ? validateData : ['']
    }
}

export default {
    validationLogin
}