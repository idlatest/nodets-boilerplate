import {Request, Response} from 'express'
import * as userService from '../../services/user'
import {respond} from '../../respond'

export async function fetchSelf (req: Request, res: Response) {
  userService.fetchUserProfile({
    id: req.session!.user.id
  })
    .then(userProfile => {
      respond(res, 200, null, userProfile)
    })
    .catch(err => {
      respond(res, err.getStatus(), [err])
    })
}

export async function registerUser (req: Request, res: Response) {
  userService.createUser({
    email: req.body.email,
    password: req.body.password,
    fullName: req.body.fullName,
  })
    .then(user => {
      respond(res, 200, null, user.id)
    })
    .catch(err => {
      respond(res, err.getStatus(), [err])
    })
}

export async function deleteUser (req: Request, res: Response) {
  userService.deleteUser({ id: req.params.userId })
    .then(user => {
      respond(res, 200, null, user.id)
    })
    .catch(err => {
      respond(res, err.getStatus(), [err])
    })
}