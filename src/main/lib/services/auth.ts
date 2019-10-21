import bcrypt from 'bcrypt'
import {getRepository} from 'typeorm'
import {User} from '../../db/entity/User'
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