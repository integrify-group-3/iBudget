import { CalendarScheduler } from './index'

//income action types
export const GET_INCOME = 'GET_INCOME'
export const ADD_INCOME = 'ADD_INCOME'
export const UPDATE_INCOME = 'UPDATE_INCOME'
export const DELETE_INCOME = 'DELETE_INCOME'
export const TOTAL_INCOME = 'TOTAL_INCOME'

export type Income = {
  category: string
  description: string
  amount: number
  year: number
  month: string
  date: any
}

export type GetIncomeAction = {
  type: typeof GET_INCOME
  payload: {
    calendar: CalendarScheduler
    income: Income[]
    selectedMonth: any
    selectedYear: any
  }
}

export type AddIncomeAction = {
  type: typeof ADD_INCOME
  payload: {
    income: Income[]
  }
}

export type UpdateIncomeAction = {
  type: typeof UPDATE_INCOME
  payload: {
    income: Income[]
  }
}

export type DeleteIncomeAction = {
  type: typeof DELETE_INCOME
  payload: {
    income: Income[]
  }
}

export type AddIncomeProps = {
  year: number
  month: string
  handleClose: Function
  hideFormOnClick: React.MouseEventHandler<HTMLButtonElement>
}

export type IncomeTableProps = {
  year: number
  month: string
  monthlyIncome: any
  updateMonthlyIncome: Function
}

export type TotalIncomeProps = {
  month: string
  year: number
  totalAmount: number
}

export type totalMonthlyIncome = {
  type: typeof TOTAL_INCOME
  payload: {
    total: Income[]
  }
}

export type IncomeActions =
  | GetIncomeAction
  | AddIncomeAction
  | UpdateIncomeAction
  | DeleteIncomeAction
  | totalMonthlyIncome

export type IncomeState = {
  calendar: CalendarScheduler
  income: Income[]
  selectedMonth: any
  total: number | any
  selectedYear: any
}
