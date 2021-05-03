import Koa from 'koa'
import Router from 'koa-router'
import { AppRoutes } from './routes'
import bodyParser from 'koa-bodyparser'
import { toNumber } from 'lodash'

const pkg = require('../package.json')
require('dotenv').config()

function main() {
  // create koa app
  const app: Koa = new Koa()
  const pathPrefix = process.env.PATH_PREFIX || '/api/v1'
  const router: Record<string, any> = new Router({ prefix: pathPrefix })

  // register all application routes
  AppRoutes.forEach((route) => {
    router[route.method](route.path, route.action)
  })

  // run app
  app.use(bodyParser())
  app.use(router.routes())
  app.use(router.allowedMethods())

  const port = toNumber(process.env.PORT)

  app.listen(port, 'localhost')

  console.log(`${pkg.name} start running on localhost:${port}`)
}

main()
