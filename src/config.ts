require('dotenv').config()
export const rootPath = __dirname;
export const db_connection = {
    dev: process.env.DB_CONNECTION_DEV,
    prod: process.env.DB_CONNECTION_PROD,
}
export const api_secret = process.env.API_SECRET

export default {
    rootPath,
    db_connection,
    api_secret
}