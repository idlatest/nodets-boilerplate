import config from 'config'
import { APP_ROUTES } from './routes'
import { session } from './session'
import express = require('express')
import cors from 'cors'
const app:any = express()

// cors configuration
const corsOptions = {
  credentials: true,
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// register cors MW
app.use(cors(corsOptions))

// register body parser MW
app.use(express.json())

// register session MW
app.use(session)

// register all application routes
APP_ROUTES.forEach(route => {
  const routePath = `/${config.get('api.prefix')}/${route.path}`.replace(/\/+/g, '/')
  let mw:any[]

  if (route.middleware) mw = route.middleware
  else mw = []
  
  app[route.method](
    routePath,
    ...mw,
    route.action
  )
})

module.exports = {
  http: app
}
