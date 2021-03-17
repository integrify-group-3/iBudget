import {
  ExpensesState,
  GET_EXPENSES,
  ADD_EXPENSE,
  EDIT_EXPENSE,
  DELETE_EXPENSE,
  TOTAL_MONTHLY_EXPENSES,
  CLEAR_UPDATING,
  ExpensesActions,
  DailyExpense,
} from '../../types/expenses'
import { CalendarScheduler } from '../../types'

export default function expenses(
  state: ExpensesState = {
    calendar: {} as CalendarScheduler,
    selectedYear: {},
    selectedMonth: {},
    dailyExpenses: {} as DailyExpense,
    total: 0,
    isUpdating: false,
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
      const { expense, monthlyData } = action.payload
      return {
        ...state,
        calendar: action.payload.calendar,
        dailyExpenses: expense,
        selectedMonth: monthlyData,
        isUpdating: true,
      }
    case TOTAL_MONTHLY_EXPENSES:
      const { total } = action.payload
      return {
        ...state,
        total,
      }
    case CLEAR_UPDATING:
      return {
        ...state,
        isUpdating: false,
      }
    default:
      return state
  }
}
