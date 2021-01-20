/* eslint-disable @typescript-eslint/ban-ts-ignore */
require('dotenv').config()
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secrets'

export const isAuthorized = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('x-auth-token')
  console.log('this is the token from middleware auth', token)
  if (!token)
    return res.status(401).json({ msg: 'no token, authorization denied' })

  try {
    //verify token
    console.log(token, req.header)
    const decoded = jwt.verify(token, JWT_SECRET)
    //Add user from payload
    req.user = decoded

    console.log('this is req.user from middleware', req.user)

    next()
  } catch (e) {
    res.status(400).json({ msg: 'token is not valid' })
  }
}

export type RequestUser = {
  id: string;
  iat: string;
  exp: string;
}
