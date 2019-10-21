import {Request, Response} from 'express'
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
  let mw:any[]

  if (route.middleware) mw = route.middleware
  else mw = []
  
  app[route.method](
    route.path,
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
