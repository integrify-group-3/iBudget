import {
  IncomeState,
  GET_INCOME,
  ADD_INCOME,
  IncomeActions,
  CalendarScheduler,
  UPDATE_INCOME,
  DELETE_INCOME
} from '../../types'

export default function income(
  state: IncomeState = {
    calendar: {} as CalendarScheduler,
    income: [],
  },
  action: IncomeActions
): IncomeState {
  switch (action.type) {
  case GET_INCOME:
    return {
      ...state,
      calendar: action.payload.calendar,
      income: action.payload.income,
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
