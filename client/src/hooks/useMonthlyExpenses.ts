import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

import {
  AppState,
  CalendarScheduler,
  DateView,
  ViewMonth
} from '../types'
import {
  DailyExpense,
  Expense,
} from '../types/expenses'
import { fetchExpenses } from '../redux/actions/expenses'
import { year, months, currentMonth } from '../utils/dateValues'

export default function useMonthlyExpenses(
  // e: any
  ) {
  const dispatch = useDispatch()
  const expenses = useSelector(
    (state: AppState) => state.expenses.dailyExpenses
  )
  const calendar = useSelector((state: AppState) => state.expenses.calendar)
  const selectedMonth = useSelector(
    (state: AppState) => state.expenses.selectedMonth
  )
  console.log('selected month', selectedMonth)


  const [expensesData, setExpensesData] = useState({day: '', expenses: []} as DailyExpense)
  const [calendarData, setCalendarData] = useState({} as CalendarScheduler)
  const [defaultMonth, setDefaultMonth] = useState()
  const [err, setErr] = useState(null)
  const [dateView, setDateView] = useState({
    year: 0,
    month: '',
  } as DateView)
  //trying to move these from Expense to hook
 
  useEffect(() => {
    dispatch(fetchExpenses())
  }, [dispatch])

  useEffect(() => {
    //this use effect will update at every state change 
    const errMessage = 'There was a problem loading the data. Refresh the page.'
    if (err) {
      setErr(errMessage as any)
    }
    // console.log('I run every time expenses are updated', expenses)
    setExpensesData(expenses)
    setCalendarData(calendar)
    setDefaultMonth(selectedMonth)
    console.log('I run every time expenses are updated', defaultMonth)
    setDateView({ year: year, month: currentMonth })
  }, [expenses, calendar, calendarData, selectedMonth, defaultMonth])
  
  return [
    err,
    expensesData,
    calendar,
    dateView,
    selectedMonth
  ]
}
