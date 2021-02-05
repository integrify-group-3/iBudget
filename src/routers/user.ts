import express from 'express'
const router = express.Router()

import { isAuthorized } from '../middlewares/authorized'

import {
  registerUser,
  loginUser,
  findOneUser,
  updateUser
} from '../controllers/user'

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/auth', isAuthorized, findOneUser)
router.put('/:id', isAuthorized, updateUser)
export default router
