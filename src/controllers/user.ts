import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mailgun from 'mailgun-js'
import _ from 'lodash'
import {
  JWT_SECRET,
  RESET_PASSWORD_KEY,
  CLIENT_URL,
  MAILGUN_API_KEY,
} from '../util/secrets'

const DOMAIN = 'sandbox002f25d103de422bb365d88e97eea950.mailgun.org'
const mg = mailgun({ apiKey: MAILGUN_API_KEY, domain: DOMAIN })

import User from '../models/User'
import Calendar from '../models/Calendar'
import { RequestUser } from '../middlewares/authorized'
import { dbCalendar } from '../dbCalendar'

import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'

//@ROUTE POST /v1/user/register
//@DESC Adds a new user
//@ACCESS: Public
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('req.body register', req.body)
    const { firstName, lastName, email, password } = req.body

    if (!firstName || !lastName || !email || !password) {
      console.log('here first empty')
      return res.status(400).json({ msg: 'please enter all fields' })
    }
    const user = await User.findOne({ email })
    if (user) {
      console.log(user)
      return res
        .status(400)
        .json({ msg: 'A user with this username already exists' })
    }
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    })
    bcrypt.genSalt(10, (err: unknown, salt: string) => {
      bcrypt.hash(
        newUser.password,
        salt,
        async (err: unknown, hash: string) => {
          if (err) throw err
          newUser.password = hash
          //one calendar is associated to a single user, we set the calendar id to user id to retrieve it for CRUD operations
          const calendar = new Calendar({
            _id: newUser._id,
            years: dbCalendar.years,
          })
          // calendar.years.push(dbCalendar.years)
          calendar.save()
          newUser.save().then((user) => {
            res.json({
              user: {
                id: user.id,
                password: user.password,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                calendar: calendar,
              },
            })
          })
        }
      )
    })
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Problem validating user'))
    } else {
      next(new InternalServerError('Please refresh the page'))
    }
  }
}

//@ROUTE POST /v1/user/login
//@DESC Logs in a user
//@ACCESS: Private
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ msg: 'please enter all fields' })
    }
    const user = await User.findOne({ email })
    console.log(user)

    if (!user)
      return res
        .status(400)
        .json({ msg: 'There is no user registed with this username' })
    bcrypt.compare(password, user.password).then((isMatch: unknown) => {
      if (!isMatch)
        return res.status(400).json({ msg: 'Invalid username or password' })
      jwt.sign(
        { id: user._id },
        JWT_SECRET,
        { expiresIn: '30d' },
        async (err: unknown, token: unknown) => {
          if (err) throw err
          if (user) {
            console.log('user', user)
            res.json({
              token,
              user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
              },
            })
          }
        }
      )
    })
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(res.status(400).json({ msg: 'Validation error' }))
    } else {
      next(
        next(
          res
            .status(500)
            .json({ msg: 'Something went wrong. Please refresh the page' })
        )
      )
    }
  }
}

//@ROUTE PUT /v1/user/forgotPassword
//@DESC Requests a new passowrd
//@ACCESS: Private
//through this function the user can make a request with the email address to receive an email
export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body
    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res
          .status(400)
          .json({ msg: 'There is no user registered with this email' })
      } else {
        const token = jwt.sign({ id: user._id }, RESET_PASSWORD_KEY, {
          expiresIn: 3700,
        })
        const emailData = {
          from: 'noreply@iBudget.com',
          to: email,
          subject: 'Password Reset Request',
          html: `
            <p>Hello,</p>
            <p>You have attempted a password reset request.</p>
            <a href="${CLIENT_URL}/reset-password/${token}">
            <h4>Click on this link to reset your password</h4></a>
            <p>If you have not requested a password reset, please disregard this email.</p>
            <p>iBudget</p>`,
        }
        //the token will be stored here on the reset link
        return user.updateOne({ resetLink: token }, (err) => {
          if (err) {
            return res.status(404).json({ msg: 'User not found' })
          } else {
            mg.messages().send(emailData, (err) => {
              if (err) {
                return res.json({ msg: err.message })
              }
              return res.json({
                msg: `An email has been sent to ${email} with instructions to reset your password`,
              })
            })
          }
        })
      }
    })
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Problem validating user'))
    } else {
      next(
        new InternalServerError('Something went wrong. Please refresh the page')
      )
    }
  }
}

//@ROUTE PUT /v1/user/reset-password
//@DESC Resets the password to a new one
//@ACCESS: Private
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //receives a new password and a token. reset link is sent from the client side
    const { newPassword, repeatNewPassword, resetLink } = req.body
    console.log('req.body', newPassword, repeatNewPassword, resetLink)
    if (newPassword !== repeatNewPassword) {
      return res.status(400).json({ msg: 'Passwords do not match' })
    }
    if (resetLink) {
      //we will decode the token and convert it to an id
      jwt.verify(resetLink, RESET_PASSWORD_KEY, function (err: any) {
        if (err) {
          return res.status(401).json({
            msg: 'token expired or invalid',
          })
        }
        //the reset link from the client side has to match the token on the database. it's the same token that the user gets sent on his email
        console.log('reset link here', resetLink)
        User.findOne({ resetLink }, (err, user) => {
          console.log('user here', user)
          if (err || !user) {
            return res
              .status(404)
              .json({ msg: 'invalid token' })
          }
          const obj = {
            password: newPassword,
            resetLink: '',
          }
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(obj.password, salt, (err, hash) => {
              if (err) throw err
              obj.password = hash
              //it will update the object in the database, the passowrd will be updated
              user = _.extend(user, obj)
              user.save((err) => {
                if (err) {
                  return res.status(400).json({ msg: 'password reset error' })
                } else {
                  return res
                    .status(200)
                    .json({
                      msg: 'your password has been successfully changed',
                    })
                }
              })
            })
          })
        })
      })
    } else {
      return res.status(401).json({ msg: 'Authentication Error' })
    }
  } catch (err) {
    next(new NotFoundError('Not found', err))
  }
}
//@ROUTE GET /v1/user/:id
//@DESC Finds one user
//@ACCESS: Private
export const findOneUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user has to be logged in or admin to perform this action
    //once a user is logged in and has passed the authorized middleware, checks if the user is admin
    const { id } = req.user as RequestUser //user will be defined
    console.log(id)
    User.findById(id)
      .select('-password')
      .populate('calendar')
      .exec()
      // .then((user) => console.log(user))
      .then((user) => res.json(user))
    // await res.json(UserService.findUserByReq(userId))
  } catch (err) {
    next(res.json({ msg: 'User not found' }))
  }
}

//@ROUTE PUT /v1/user/:id
//@DESC Updates one user
//@ACCESS: Private
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user as RequestUser
    console.log(id)
    console.log('req body here', req.body)
    User.findById(id).then((user) => {
      if (!user) return res.status(404).json({ msg: 'user not found' })
      console.log('found user', user)
      const { firstName, lastName, email, newPassword } = req.body
      console.log(firstName, lastName, email, newPassword)
      user.firstName = firstName
      user.lastName = lastName
      user.email = email
      if (!newPassword) {
        console.log('user updated', user)
        user.save().then((user) =>
          res.json({
            user: {
              id: user._id,
              email: user.email,
              password: user.password,
              firstName: user.firstName,
              lastName: user.lastName,
            },
          })
        )
      } else {
        let { newPassword } = req.body
        console.log('not empty', newPassword)
        bcrypt.genSalt(10, (err: unknown, salt: string) => {
          bcrypt.hash(newPassword, salt, async (err: unknown, hash: string) => {
            if (err) throw err
            newPassword = hash
            console.log('mew password hashed', newPassword)
            user.password = newPassword
            console.log('update user', user)
            user.save().then((user) =>
              res.json({
                user: {
                  id: user._id,
                  email: user.email,
                  password: user.password,
                  firstName: user.firstName,
                  lastName: user.lastName,
                },
              })
            )
          })
        })
      }
    })
  } catch (err) {
    next(new NotFoundError('User not found', err))
  }
}
