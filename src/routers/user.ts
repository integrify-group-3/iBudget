import express from 'express'
const router = express.Router()

import { isAuthorized } from '../middlewares/authorized'

import {
  registerUser,
  loginUser,
  googleLogin,
  forgotPassword,
  resetPassword,
  findOneUser,
  updateUser
} from '../controllers/user'

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/login/google-auth', googleLogin)
router.put('/forgot-password', forgotPassword)
router.put('/reset-password', resetPassword)
router.get('/auth', isAuthorized, findOneUser)
router.put('/:id', isAuthorized, updateUser)
export default router
