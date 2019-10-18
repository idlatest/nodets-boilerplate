import path from 'path'
let cfgPaths = path.join(__dirname, '..', 'config')
cfgPaths += path.delimiter
cfgPaths += path.join(__dirname, '..', '..')
process.env['NODE_CONFIG_DIR'] = cfgPaths
import 'reflect-metadata'
import { Express } from 'express'
import {createConnection} from 'typeorm'
const config = require('config')
const { http }: {http: Express} = require('./lib/server')
const port:number = config.get('server').port

createConnection({
  ...config.get('database'),
  synchronize: true,
  entities: [`${__dirname}/db/entity/*`]
}).then(() => {
  console.info(`Established database connection...`)

  http.listen(port, () => {
    console.info(`HTTP server is running on port ${port}`)
  })
}).catch(err => console.error('Database connection error:', err))