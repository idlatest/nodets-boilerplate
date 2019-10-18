import {getRepository} from 'typeorm'
import {User} from '../../db/entity/User'

export async function createUser (fields:any) {
  const userRepo = getRepository(User)
  const user = await userRepo.save(userRepo.create({
    email: fields.email,
    passhash: fields.password
  }))

  return user
}
