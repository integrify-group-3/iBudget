import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  AppState,
  CalendarScheduler,
  DateView,
  DailyExpense,
  ViewMonth
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
  const [expensesData, setExpensesData] = useState({day: '', expenses: []} as DailyExpense)
  const [calendarData, setCalendarData] = useState({} as CalendarScheduler)
  const [defaultMonth, setDefaultMonth] = useState()
  const [err, setErr] = useState(null)
  const [dateView, setDateView] = useState({
    year: 0,
    month: '',
  } as DateView)
  //trying to move these from Expense to hook

  const [viewMonth, setViewMonth] = useState({
    name: '',
    income: [],
    days: [{ day: '', expenses: [] }],
  } as ViewMonth)
  const switchMonth = {} as ViewMonth

  const [dailyExpense, setDailyExpense] = useState({} as DailyExpense)


  useEffect(() => {
    dispatch(fetchExpenses())
  }, [dispatch])



  useEffect(() => {
    const errMessage = 'There was a problem loading the data. Refresh the page.'
    if (err) {
      setErr(errMessage as any)
    }
    setExpensesData(expenses)
    // console.log('from user expenses', expensesData)
    setCalendarData(calendar)
    setDefaultMonth(selectedMonth)
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
