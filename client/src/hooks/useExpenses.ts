import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  AppState,
  CalendarScheduler,
  DateView,
  DailyExpense
} from '../types'
import { fetchExpenses } from '../redux/actions/expenses'
import { year, currentMonth } from '../utils/dateValues'

export default function useExpenses() {
  const dispatch = useDispatch()
  const expenses = useSelector(
    (state: AppState) => state.expenses.dailyExpenses
  )
  const calendar = useSelector((state: AppState) => state.expenses.calendar)
  const selectedMonth = useSelector(
    (state: AppState) => state.expenses.selectedMonth
  )
  const [expensesData, setExpensesData] = useState({} as DailyExpense)
  const [calendarData, setCalendarData] = useState({} as CalendarScheduler)
  const [defaultMonth, setDefaultMonth] = useState()
  const [err, setErr] = useState(null)
  const [dateView, setDateView] = useState({
    year: 0,
    month: '',
  } as DateView)

  useEffect(() => {
    dispatch(fetchExpenses())
  }, [dispatch])

  useEffect(() => {
    const errMessage = 'There was a problem loading the data. Refresh the page.'
    if (err) {
      setErr(errMessage as any)
    }
    setExpensesData(expenses)
    setCalendarData(calendar)
    setDefaultMonth(selectedMonth)
    // console.log(defaultMonth)
    setDateView({ year: year, month: currentMonth })
    console.log('from user epenses', expensesData)
  }, [expenses, calendar, calendarData, selectedMonth, defaultMonth])
  
  return [
    err,
    expensesData,
    calendar,
    dateView,
    selectedMonth
  ]
}
