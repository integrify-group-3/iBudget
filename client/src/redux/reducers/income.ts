import {
  IncomeState,
  GET_INCOME,
  ADD_INCOME,
  IncomeActions,
  UPDATE_INCOME,
  DELETE_INCOME,
  TOTAL_MONTHLY_INCOME,
  CLEAR_UPDATING
} from '../../types/income'

import { CalendarScheduler } from '../../types/index'

export default function income(
  state: IncomeState = {
    calendar: {} as CalendarScheduler,
    income: [],
    selectedMonth: {},
    total: 0,
    selectedYear: {},
    isUpdating: false

  },
  action: IncomeActions
): IncomeState {
  switch (action.type) {
    case GET_INCOME:
      return {
        ...state,
        calendar: action.payload.calendar,
        income: action.payload.income,
        selectedMonth: action.payload.selectedMonth,
        selectedYear: action.payload.selectedYear,
      }
    case ADD_INCOME:
    case DELETE_INCOME:
    case UPDATE_INCOME:
      const { income, monthlyData } = action.payload
      return {
        ...state,
        income: income,
        selectedMonth: monthlyData,
        isUpdating: true
      }
    case TOTAL_MONTHLY_INCOME:
      const { total } = action.payload
      return {
        ...state,
        total,
      }
    case CLEAR_UPDATING: 
      return {
        ...state,
        isUpdating: false
      }
    default:
      return state
  }
}
