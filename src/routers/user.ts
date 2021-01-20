import express from 'express'
const router = express.Router()

import { isAuthorized } from '../middlewares/authorized'

import {
  registerUser,
  loginUser,
  findOneUser,
} from '../controllers/user'

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/auth', isAuthorized, findOneUser)
export default router
