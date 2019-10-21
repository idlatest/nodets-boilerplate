import {Request, Response} from 'express'
import config = require('config')
import express = require('express')
import {AppRoutes} from './routes'
const app:any = express()
const session = require('./session')

// register body parser MW
app.use(express.json())

// register session MW
app.use(session)

// register all application routes
AppRoutes.forEach(route => {
  const routePath = `/${config.get('api.prefix')}/${route.path}`.replace(/\/+/g, '/')
  let mw:any[]

  if (route.middleware) mw = route.middleware
  else mw = []
  
  app[route.method](
    routePath,
    ...mw,
    (req:Request, res:Response, next:Function) => {
      route.action(req, res)
      .then(() => next)
      .catch(err => next(err))
    }
  )
})

module.exports = {
  http: app
}
