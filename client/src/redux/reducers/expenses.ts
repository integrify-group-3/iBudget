import {
  ExpensesState,
  GET_EXPENSES,
  ADD_EXPENSE,
  EDIT_EXPENSE,
  DELETE_EXPENSE,
  CALCULATE_TOTALEXPENSES,
  ExpensesActions,
  DailyExpense,
} from '../../types/expenses'
import {
  CalendarScheduler
} from '../../types'

export default function expenses(
  state: ExpensesState = {
    calendar: {} as CalendarScheduler,
    selectedYear: {},
    selectedMonth: {},
    dailyExpenses: {} as DailyExpense,
    total: 0,
  },
  action: ExpensesActions
): ExpensesState {
  switch (action.type) {
    case GET_EXPENSES:
      const {
        calendar,
        selectedYear,
        selectedMonth,
        dailyExpenses,
      } = action.payload
      // console.log('from reducer', action.payload)
      return {
        ...state,
        calendar,
        selectedYear,
        selectedMonth,
        dailyExpenses,
      }
    case ADD_EXPENSE:
    case DELETE_EXPENSE:
    case EDIT_EXPENSE:
      console.log('from reducer', action.payload.expense)
      const { expense, monthlyExpense } = action.payload
      return {
        ...state,
        calendar: action.payload.calendar,
        dailyExpenses: expense,
        selectedMonth: monthlyExpense
      }
    case CALCULATE_TOTALEXPENSES:
      // console.log(action.payload)
      const { total } = action.payload
      return {
        ...state,
        total,
      }
    default:
      return state
  }
}
