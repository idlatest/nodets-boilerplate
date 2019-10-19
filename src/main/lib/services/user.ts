const bcrypt = require('bcrypt')
import {getRepository} from 'typeorm'
import {User} from '../../db/entity/User'

export async function createUser (fields:any) {
  const errors = []
  const userRepo = getRepository(User)
  const exists = await userRepo.findOne({
    where: {
      email: fields.email
    }
  })

  if (exists) {
    errors.push({ message: 'E-mail is already registered!' })
  }

  const encryptedPassword:any = await new Promise(resolve => {
    bcrypt.hash(fields.password, 16, (err:any, encrypted:any) => {
      if (err) resolve(false)

      resolve(encrypted)
    })
  })

  if (!encryptedPassword) {
    errors.push({ message: 'Server error!' })
  }


  if (errors.length === 0) {
    const user = await userRepo.save(userRepo.create({
      email: fields.email,
      passhash: encryptedPassword
    }))
  
    return { user }
  } else return {
    user: { email: null },
    errors
  }
}
