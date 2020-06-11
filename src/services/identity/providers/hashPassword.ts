import bcrypt from 'bcrypt'

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds)

export const createHashPassword = (password: string) => bcrypt.hashSync(password, salt)

interface IGetHash {
    (passowrd: string, dbHashPassword: string): Promise<boolean>
}

export const getHash:IGetHash = (password, dbHashPassword) => new Promise(resolve => {
    bcrypt.compare(password, dbHashPassword, (err, result) => resolve(err ? false : result));
})