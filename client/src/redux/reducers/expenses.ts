import {
    ExpensesState,
    GET_EXPENSES,
    ADD_EXPENSE,
    EDIT_EXPENSE,
    DELETE_EXPENSE,
    ExpensesActions,
    CalendarScheduler,
    DailyExpense,
  } from '../../types'
  
  export default function expenses(
    state: ExpensesState = {
      calendar: {} as CalendarScheduler,
      selectedMonth: {},
      dailyExpenses: {} as DailyExpense,
    },
    action: ExpensesActions
  ): ExpensesState {
    switch (action.type) {
      case GET_EXPENSES:
        const { calendar, dailyExpenses, selectedMonth} = action.payload
        // console.log('from reducer', action.payload)
        return {
          ...state,
          calendar,
          dailyExpenses,
          selectedMonth
        }
        case ADD_EXPENSE:
        case DELETE_EXPENSE:
          console.log('from reducer', action.payload)
          const { expense } = action.payload
          return {
            ...state,
            dailyExpenses: expense
          }
          case EDIT_EXPENSE:
            console.log('from reducer', action.payload)
            return {
              ...state,
              dailyExpenses: action.payload.expense
              
            }
      default:
        return state
    }
  }
  