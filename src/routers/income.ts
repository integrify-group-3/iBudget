import express from 'express'
import { isAuthorized } from '../middlewares/authorized'


import {
  getIncome,
  addIncome,
  updateIncome,
  deleteIncome
} from '../controllers/income'

const router = express.Router()

router.get('/', isAuthorized, getIncome)
router.post('/', isAuthorized, addIncome)
router.put('/:id', isAuthorized, updateIncome)
router.delete('/:id', isAuthorized, deleteIncome)

export default router
