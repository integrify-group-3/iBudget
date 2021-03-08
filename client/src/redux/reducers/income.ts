import {
  IncomeState,
  GET_INCOME,
  ADD_INCOME,
  IncomeActions,
  UPDATE_INCOME,
  DELETE_INCOME
} from '../../types/income'

import {
  CalendarScheduler
} from '../../types/index'

export default function income(
  state: IncomeState = {
    calendar: {} as CalendarScheduler,
    income: [],
    selectedMonth: {},
  },
  action: IncomeActions
): IncomeState {
  switch (action.type) {
  case GET_INCOME:
    console.log(action.payload.selectedMonth)
    return {
      ...state,
      calendar: action.payload.calendar,
      income: action.payload.income,
      selectedMonth: action.payload.selectedMonth
    }
  case ADD_INCOME:
    return {
      ...state,
      income: action.payload.income,
    }
  case DELETE_INCOME:
  case UPDATE_INCOME:
    const { income } = action.payload
    console.log('from reducer', income)
    return {
      ...state,
      income: income,
    }
  default:
    return state
  }
}
