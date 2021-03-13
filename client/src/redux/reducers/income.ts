import {
  IncomeState,
  GET_INCOME,
  ADD_INCOME,
  IncomeActions,
  UPDATE_INCOME,
  DELETE_INCOME,
  TOTAL_INCOME,
} from '../../types/income'

import { CalendarScheduler } from '../../types/index'

export default function income(
  state: IncomeState = {
    calendar: {} as CalendarScheduler,
    income: [],
    selectedMonth: {},
    total: 0,
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
      }
    case ADD_INCOME:
      return {
        ...state,
        income: action.payload.income,
      }
    case DELETE_INCOME:
    case UPDATE_INCOME:
      const { income } = action.payload
      return {
        ...state,
        income: income,
      }
    case TOTAL_INCOME:
      const { total } = action.payload
      return {
        ...state,
        total,
      }
    default:
      return state
  }
}
