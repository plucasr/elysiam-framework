export type IdentityProps = {
    id?: string,
    source: string,
    user_id?: number,
    user_type: string, //role
    password: string, //hash
    email: string,
    avatar?: string,
    phone: string,
}

export const idetityModel = {
    id: {
        presence: true
    },
    source: {
        presence: true,
    },
    user_id: {},
    user_type: {
        presence: true
    },
    password: {
        presence: true
    },
    email: {
        presence: true
    },
    avatar: {},
    phone: {
        presence: true
    }
}
export const loginModel = {
    email: {
        presence: true,
    },
    password: {
        presence: true
    }
}

export default {
    idetityModel
}