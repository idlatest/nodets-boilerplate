import config from 'config'
import session from 'express-session'
const RedisStore = require('connect-redis')(session)
import Redis, { RedisOptions } from 'ioredis'
const redisConnStr:any = config.get('redis.connStr')
const redisOptions:RedisOptions = {
  host: config.get('redis.host'),
  port: config.get('redis.port')
}
const redisClient = redisConnStr
  ? new Redis(redisConnStr)
  : new Redis(redisOptions)

const sessionInstance = session({
  store: new RedisStore({ client: redisClient }),
  secret: config.get('api.secret'),
  resave: false,
  saveUninitialized: false
})

module.exports = sessionInstance