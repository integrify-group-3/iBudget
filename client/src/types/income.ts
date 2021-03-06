import { CalendarScheduler } from './index'

//income action types
export const GET_INCOME = 'GET_INCOME'
export const ADD_INCOME = 'ADD_INCOME'
export const UPDATE_INCOME = 'UPDATE_INCOME'
export const DELETE_INCOME = 'DELETE_INCOME'
export const TOTAL_MONTHLY_INCOME = 'TOTAL_MONTHLY_INCOME'
export const CLEAR_UPDATING = 'CLEAR_UPDATING'

export type Income = {
  category: string
  description: string
  amount: number
  year: number
  month: string
  date: any
}

export type DailyIncome = {
  month: string
  income: Income[]
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
    calendar: CalendarScheduler
    monthlyData: any
    yearData: any
  }
}

export type UpdateIncomeAction = {
  type: typeof UPDATE_INCOME
  payload: {
    income: Income[]
    calendar: CalendarScheduler
    monthlyData: any
    yearData: any
  }
}

export type DeleteIncomeAction = {
  type: typeof DELETE_INCOME
  payload: {
    income: Income[]
    calendar: CalendarScheduler
    monthlyData: any
    yearData: any
  }
}

export type AddIncomeProps = {
  year: number
  month: string
  closeForm: Function
  hideFormOnClick: React.MouseEventHandler<HTMLButtonElement>
}

export type IncomeTableProps = {
  year: number
  month: string
  monthlyIncome: any
  updateMonthlyIncome: Function
}

export type IncomeChartData = {
  category: string
  amount: number
}

export type TotalYearIncomeProps = {
  year: number
  totalAmount: any
}

export type TotalMonthlyIncomeProps = {
  month: string
  year: number
  totalAmount: number
}

export type TotalMonthlyIncomeAction = {
  type: typeof TOTAL_MONTHLY_INCOME
  payload: {
    total: number
  }
}

export type ClearUpdating = {
  type: typeof CLEAR_UPDATING
}

export type IncomeActions =
  | GetIncomeAction
  | AddIncomeAction
  | UpdateIncomeAction
  | DeleteIncomeAction
  | TotalMonthlyIncomeAction
  | ClearUpdating

export type IncomeState = {
  calendar: CalendarScheduler
  income: Income[]
  selectedMonth: any
  total: number | any
  selectedYear: any
  isUpdating: boolean
}
