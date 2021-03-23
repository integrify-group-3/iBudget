// Action types
import { UserState, User } from './user'
import { Income, IncomeState } from './income'
import { Expense, DailyExpense, ExpensesState } from './expenses'
import { ValidationState } from './validation'
import { ErrorState } from './error'

export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const TOGGLE_DIALOG = 'TOGGLE_DIALOG'

//expenses action types

// Enum
export enum DialogType {
  SignIn = 'signIn',
  SignUp = 'signUp',
}

// A product
export type Product = {
  id: string
  name: string
  price: number
}

export type AddProductAction = {
  type: typeof ADD_PRODUCT
  payload: {
    product: Product
  }
}

export type RemoveProductAction = {
  type: typeof REMOVE_PRODUCT
  payload: {
    product: Product
  }
}

export type ToggleDialogAction = {
  type: typeof TOGGLE_DIALOG
  payload: {
    dialog: DialogType
  }
}

export type UiActions = ToggleDialogAction 

// Use this union in reducer
export type ProductActions = AddProductAction | RemoveProductAction

export type ProductState = {
  inCart: Product[]
}

// Using dynamic keys from an enum
export type UiState = {
  dialogOpen: {
    [key in DialogType]?: boolean
  }
}

export type CalendarScheduler = {
  years: any
  year: number
  months: any
  month: object
  name: string
  income: Income[]
  expenses: Expense[]
  days: string[]
  day: object
}

export type DateView = {
  month: string
  year: number
}

export type ViewMonth = {
  name: string
  days: Array<DailyExpense>
  income: Array<Income>
}

export type ProfileDashboardProps = {
  totalBudget: number
  year: string
  month: number
  user: User
}

export type MonthlyBudgetProps = {
  month: string
  year: number
  totalMonthlyExpenses: number
  totalMonthlyIncome: number
}

export type YearBudgetProps = {
  year: number
  totalYearExpenses: number
  totalYearIncome: number
}

export type YearChartData = {
  month: string
  income: number
  expenses: number
}

export type IncomeExpensesMonthChartProps = {
  data: any
  year: number
  month: string
}

export type IncomeExpensesYearChartProps = {
  // data: YearChartData[]
  data: any
  year: number
}

// export type CalendarActions = GetIncomeAction

export type IncomeChartData = {
  category: string
  amount: number
}

export type IncomeChartDataProps = {
  chartData: IncomeChartData[]
  year: number
  month: string
}

export type IncomeChartDashboardProps = {
  chartData: IncomeChartData[]
  year: number
  month: string
  valueField: string
  argumentField: string
  name: string
}

export type AppState = {
  product: ProductState
  ui: UiState
  user: UserState
  error: ErrorState
  validation: ValidationState
  income: IncomeState
  expenses: ExpensesState
}
