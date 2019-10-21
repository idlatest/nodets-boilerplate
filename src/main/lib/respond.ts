import {Response} from 'express'
import { AppError } from './errors/AppError';

export function respond (res:Response, status:number, errors:AppError[] | null, data?:any) {
  const body:any = {}

  if (errors) {
    body.errors = []
    
    for(const error of errors) { body.errors.push(error.getObject()) }
  }

  if (data) body.data = data
  
  res
    .status(status)
    .send(body)
}
