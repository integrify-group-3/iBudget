import { CalendarScheduler } from './index'
//expenses action types
export const GET_EXPENSES = 'GET_EXPENSES'
export const ADD_EXPENSE = 'ADD_EXPENSE'
export const EDIT_EXPENSE = 'EDIT_EXPENSE'
export const DELETE_EXPENSE = 'DELETE_EXPENSE'
export const TOTAL_MONTHLY_EXPENSES = 'TOTAL_MONTHLY_EXPENSES'
export const CLEAR_UPDATING = 'CLEAR_UPDATING'

export type Expense = {
  category: string
  description: string
  amount: number
  //change this later
  date: any
  // date: string | Date
  year: number
  month: string
}

export type DailyExpense = {
  day: string
  expenses: Expense[]
}

export type AddExpenseProps = {
  expense: object
  setExpense: any
  day: string | Date
  category: string
  description: string
  amount: number
  hideFormOnClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void
  closeForm: Function
}

export type EditExpenseProps = {
  expenseId: string
  day: string | Date
  hideFormOnClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void
  dailyExpense: DailyExpense
}

export type ExpensesChartData = {
  category: string
  amount: number
}

export type TotalMonthlyExpensesProps = {
  month: string
  year: number
  totalMonthlyExpenses: number
  totalMonthlyIncome: number
}

export type TotalYearExpensesProps = {
  year: number
  totalAmount: number
}

export type GetExpensesAction = {
  type: typeof GET_EXPENSES
  payload: {
    calendar: CalendarScheduler
    selectedYear: any
    selectedMonth: any
    dailyExpenses: DailyExpense
  }
}

export type AddExpenseAction = {
  type: typeof ADD_EXPENSE
  payload: {
    calendar: CalendarScheduler
    expense: DailyExpense
    monthlyData: any
  }
}

export type EditExpenseAction = {
  type: typeof EDIT_EXPENSE
  payload: {
    calendar: CalendarScheduler
    expense: DailyExpense
    monthlyData: any
  }
}

export type DeleteExpenseAction = {
  type: typeof DELETE_EXPENSE
  payload: {
    calendar: CalendarScheduler
    expense: DailyExpense
    monthlyData: any
  }
}

export type TotalMonthlyExpensesAction = {
  type: typeof TOTAL_MONTHLY_EXPENSES
  payload: {
    total: number
  }
}

export type ClearUpdating = {
  type: typeof CLEAR_UPDATING
}

export type ExpensesActions =
  | GetExpensesAction
  | AddExpenseAction
  | EditExpenseAction
  | DeleteExpenseAction
  | TotalMonthlyExpensesAction
  | ClearUpdating

export type ExpensesState = {
  calendar: CalendarScheduler
  selectedYear: any
  selectedMonth: any
  dailyExpenses: DailyExpense
  total: number
  isUpdating: boolean
}
