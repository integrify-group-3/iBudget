import {
    ExpensesState,
    GET_EXPENSES,
    ExpensesActions,
    Expense,
    CalendarScheduler,
    DailyExpense,
  } from '../../types'
  
  export default function expenses(
    state: ExpensesState = {
      calendar: {} as CalendarScheduler,
      dailyExpenses: {} as DailyExpense,
    },
    action: ExpensesActions
  ): ExpensesState {
    switch (action.type) {
      case GET_EXPENSES:
        const { calendar, dailyExpenses} = action.payload
        console.log('from reducer', action.payload)
        console.log(state.dailyExpenses)
        return {
          ...state,
          calendar,
          dailyExpenses
        }
      default:
        return state
    }
  }
  