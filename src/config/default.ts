export default {
  server: {
    port: 3000
  },
  api: {
    prefix: 'api',
    secret: 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-='
  },
  database: {
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: '',
    schema: 'public',
    charset: 'UTF8MB4_UNICODE_CI',
    timezone: 'local',
    logging: true
  },
  redis: {
    connStr: null,
    host: '127.0.0.1',
    port: 6379
  }
}