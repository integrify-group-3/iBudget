import {
  IncomeState,
  GET_INCOME,
  ADD_INCOME,
  IncomeActions,
  CalendarScheduler,
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
      console.log('from reducer', action.payload.income)
      return {
        ...state,
        income: action.payload.income
      }
    default:
      return state
  }
}
