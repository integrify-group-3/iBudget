// Action types
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const TOGGLE_DIALOG = 'TOGGLE_DIALOG'

//user action types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const SHOW_ERRORS = 'SHOW_ERRORS'
export const CLEAR_ERRORS = 'CLEAR_ERRORS'
export const REGISTER_FAIL = 'REGISTER_FAIL'
export const LOGOUT = 'LOGOUT'

//income action types
export const GET_INCOME = 'GET_INCOME'
export const ADD_INCOME = 'ADD_INCOME'

//expenses action types
export const GET_EXPENSES = 'GET_EXPENSES'
export const ADD_EXPENSE = 'ADD_EXPENSE'
export const EDIT_EXPENSE = 'EDIT_EXPENSE'
export const DELETE_EXPENSE = 'DELETE_EXPENSE'

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

export type User = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export type Income = {
  category: string
  description: string
  amount: number
  year: number
  month: string
}

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

export type AddIncomeProps = {
  year: number
  month: string
  openForm: boolean
  handleClose: Function
  updateMonthlyIncome: Function
}

export type AddIncomeBtnProps = {
  showFormOnClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
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

export type IncomeTableProps = {
  year: number 
  month: string 
  monthlyIncome: any 
  updateMonthlyIncome: Function
}

export type TotalIncomeProps = {
  month: string 
  year: number 
  monthlyIncome: any
}

export type DateView = {
  month: string
  year: number
}

export type DailyExpense = {
  day: string
  expenses: Expense[]
}

export type TileContentProps = {
  date: string
  view: string
  viewMonth: any
}

export type ViewMonth = {
  name: string
  days: Array<DailyExpense>
  income: Array<Income>
}
export type ExpensesTableProps = {
  day: string | Date
  // day: any
  dailyExpense: DailyExpense
  showFormOnClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  updateDailyExpenses: Function
  updateEditedExpenses: Function
}

export type TotalExpensesProps = {
  month: string 
  year: number 
  monthExpenses: any
}

export type AddExpenseBtnProps = {
  showFormOnClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
export type AddExpenseProps = {
  expense: object
  setExpense: any
  day: string | Date
  category: string
  description: string
  amount: number
  hideFormOnClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  closeForm: Function
  updateDailyExpenses: Function
  calendarData: CalendarScheduler
}

export type EditExpenseProps = {
  expenseId: string
  day: string | Date
  hideFormOnClick: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void
  dailyExpense: DailyExpense
  updateEditedExpenses: Function
}

export type RegisterFailAction = {
  type: typeof REGISTER_FAIL
  payload: {
    user: User
  }
}

export type RegisterUserSuccessAction = {
  type: typeof REGISTER_SUCCESS
  payload: {
    user: User
  }
}

export type LoginUserSuccessAction = {
  type: typeof LOGIN_SUCCESS
  payload: {
    user: User,
    token: string
  }
}

export type LogoutAction = {
  type: typeof LOGOUT
}


export type ShowErrorAction = {
  type: typeof SHOW_ERRORS
  payload: {
    msg: string
    status?: number
  }
}

export type ClearErrorAction = {
  type: typeof CLEAR_ERRORS
}

export type GetIncomeAction = {
  type: typeof GET_INCOME
  payload: {
    calendar: CalendarScheduler
    income: Income[]
  }
}

export type AddIncomeAction = {
  type: typeof ADD_INCOME
  payload: {
    income: Income[]
  }
}

export type GetExpensesAction = {
  type: typeof GET_EXPENSES
  payload: {
    calendar: CalendarScheduler
    dailyExpenses: DailyExpense
    selectedMonth: any
  }
}

export type AddExpenseAction = {
  type: typeof ADD_EXPENSE
  payload: {
    expense: DailyExpense
  }
}

export type EditExpenseAction = {
  type: typeof EDIT_EXPENSE
  payload: {
    expense: DailyExpense
  }
}

export type DeleteExpenseAction = {
  type: typeof DELETE_EXPENSE
  payload: {
    expense: DailyExpense
  }
}

export type UserActions =
  | RegisterUserSuccessAction
  | RegisterFailAction
  | LoginUserSuccessAction
  | LogoutAction


export type ErrorActions = ShowErrorAction | ClearErrorAction

export type CalendarActions = 
  | GetIncomeAction

export type IncomeActions = 
  | GetIncomeAction
  | AddIncomeAction

  export type ExpensesActions = 
  | GetExpensesAction
  | AddExpenseAction
  | EditExpenseAction
  | DeleteExpenseAction

export type UserState = {
  user: User 
  token: string
  isAuthenticated?: boolean
  error: string
}

export type IncomeState = {
  calendar: CalendarScheduler
  income: Income[]
}
export type ExpensesState = {
  calendar: CalendarScheduler
  dailyExpenses: DailyExpense
  selectedMonth: any
} 

export type ErrorState = {
  msg: any
  status?: any
}

export type AppState = {
  product: ProductState
  ui: UiState
  user: UserState
  error: ErrorState
  income: IncomeState
  expenses: ExpensesState
}
