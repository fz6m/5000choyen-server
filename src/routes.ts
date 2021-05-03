import { GenImage } from './controller/GenImage'
import { Context } from 'koa'

export interface IAppRoute {
  path: string
  method: string
  action: (context: Context) => any
}

export const AppRoutes: IAppRoute[] = [
  {
    path: '/gen',
    method: 'get',
    action: GenImage,
  },
]
