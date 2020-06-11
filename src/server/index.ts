import express from 'express'
import * as http from 'http'
import middlewares from './middlewares'
import services from '../services'

const serverEngine = () => {
    const app = express()
    const port = process.env.PORT || 4004;

    middlewares(app)
    services(app)

    const server = http.createServer(app)

    server.listen(port, () => {
        console.log(`running on port ${port}`)
    })

}

export default serverEngine;