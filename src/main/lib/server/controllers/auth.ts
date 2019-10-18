import {Request, Response} from 'express'
import * as userService from '../../services/user'

export async function login (req: Request, res: Response) {
}

export async function logout (req: Request, res: Response) {
}

export async function register (req: Request, res: Response) {
  const user = await userService.createUser(req.body)

  res.send({
    data: user.email
  })
}