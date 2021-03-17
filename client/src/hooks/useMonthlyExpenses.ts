import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  AppState,
  CalendarScheduler,
  DateView,
} from '../types'
import {
  DailyExpense,
} from '../types/expenses'
import { fetchExpenses } from '../redux/actions/expenses'
import { year, currentMonth } from '../utils/dateValues'

export default function useMonthlyExpenses(
  ) {
  const dispatch = useDispatch()
  const expenses = useSelector(
    (state: AppState) => state.expenses.dailyExpenses
  )
  const calendar = useSelector((state: AppState) => state.expenses.calendar)
  const monthData = useSelector(
    (state: AppState) => state.expenses.selectedMonth
  )
  const [expensesData, setExpensesData] = useState({day: '', expenses: []} as DailyExpense)
  const [calendarData, setCalendarData] = useState({} as CalendarScheduler)
  const [err, setErr] = useState(null)
  const [dateView, setDateView] = useState({
    year: 0,
    month: '',
  } as DateView)
 
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
    console.log('I run every time expenses are updated', expensesData)
    setDateView({ year: year, month: currentMonth })
  }, [expenses, calendar, calendarData, monthData])
  
  return [
    err,
    expensesData,
    calendar,
    dateView,
    monthData
  ]
}
