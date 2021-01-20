import express from 'express'
import { isAuthorized } from '../middlewares/authorized'


import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from '../controllers/expense'

const router = express.Router()

router.get('/', isAuthorized, getExpenses)
router.post('/', isAuthorized, addExpense)
router.put('/:id', isAuthorized, updateExpense)
router.delete('/:id', isAuthorized, deleteExpense)

export default router
