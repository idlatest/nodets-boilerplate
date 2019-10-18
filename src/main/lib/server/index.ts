import {Express, Request, Response} from 'express'
import express = require('express')
const app:any = express()
import {AppRoutes} from './routes'

// register body parser
app.use(express.json())

// register all application routes
AppRoutes.forEach(route => {
  app[route.method](route.path, (request: Request, response: Response, next: Function) => {
    route.action(request, response)
    .then(() => next)
    .catch(err => next(err))
  })
})

module.exports = {
  http: app
}
