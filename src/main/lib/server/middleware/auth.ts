import {Request, Response} from 'express'
import { User, UserRole } from '../../../db/entity/User'
import { respond } from '../../respond'
import { AppError } from '../../errors/AppError'

export function isAdmin (req:Request, res:Response, next:Function) {
  const user:User = req.session!.user
  if (
    user &&
    (
      user.role === UserRole.ADMIN ||
      user.role === UserRole.SUPERADMIN
    )
  ) return next()
  else respond(res, 401, [new AppError({ message: 'Unauthorized!', status: 401 })])
}

export function isSuperAdmin (req:Request, res:Response, next:Function) {
  const user:User = req.session!.user
  if (
    user &&
    user.role === UserRole.SUPERADMIN
  ) return next()
  else respond(res, 401, [new AppError({ message: 'Unauthorized!', status: 401 })])
}