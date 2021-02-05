import { combineReducers } from 'redux'

import product from './product'
import ui from './ui'
import user from './user'
import error from './error'
import validation from './validation'
import income from './income'
import expenses from './expenses'

const createRootReducer = () =>
  combineReducers({
    product,
    ui,
    user,
    error,
    validation,
    income,
    expenses
  })

export default createRootReducer
