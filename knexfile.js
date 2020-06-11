require('dotenv').config()
module.exports = () => ({
    development: {
        client: 'pg',
        connection: process.env.DB_CONNECTION_DEV,
        migrations: {
            directory: __dirname + '/src/server/db/migrations/'
        }
    },
    production: {
        client: 'pg',
        connection: process.env.DB_CONNECTION_PROD,
        migrations: {
            directory: __dirname + '/src/server/db/migrations/'
        }
    },
})