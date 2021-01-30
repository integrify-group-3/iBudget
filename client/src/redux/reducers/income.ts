import {
  IncomeState,
  GET_INCOME,
  ADD_INCOME,
  IncomeActions,
  CalendarScheduler,
  UPDATE_INCOME,
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
  case UPDATE_INCOME:
    const { income } = action.payload
    return {
      ...state,
      income: income,
    }
  default:
    return state
  }
}
