import knex from 'knex'
import config from '../../config'
require('dotenv').config()

const connection = process.env.NODE_ENV === 'dev' ? config.db_connection.prod : config.db_connection.prod

export default knex(connection);