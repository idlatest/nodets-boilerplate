import bcrypt from 'bcrypt'
import { getRepository } from 'typeorm'
import { User, UserStatus } from '../../db/entity/User'
import { AppError } from '../errors/AppError';

export async function authenticate (fields:any):Promise<User> {
  const userRepo = getRepository(User)
  const user = await userRepo.findOne({
    where: [
      { username: fields.username },
      { email: fields.email }
    ]
  })

  return new Promise((resolve, reject) => {
    if (user) {
      if (user.status === UserStatus.BLOCKED) {
        return reject(new AppError({
          message: 'Account is blocked!',
          status: 403
        }))
      }

      if (user.status === UserStatus.DELETED) {
        return reject(new AppError({
          message: 'Account is deactivated!',
          status: 403
        }))
      }

      if (user.status === UserStatus.INACTIVE) {
        return reject(new AppError({
          message: 'Account is not activated!',
          status: 403
        }))
      }

      bcrypt.compare(fields.password || '', user.passhash, (err:any, same:any) => {
        if (err) reject(new AppError({
          message: 'Invalid credentials!',
          status: 403
        }))

        resolve(user)
      })
    } else reject(new AppError({
      message: 'Invalid credentials!',
      status: 403
    }))
  })
}