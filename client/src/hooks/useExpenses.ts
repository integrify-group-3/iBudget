import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  AppState,
  CalendarScheduler,
  DateView,
  DailyExpense,
} from '../types'
import { fetchExpenses } from '../redux/actions/expenses'
import { months } from './../utils/months'

export default function useExpenses() {
  const dispatch = useDispatch()
  const expenses = useSelector(
    (state: AppState) => state.expenses.dailyExpenses
  )
  const calendar = useSelector((state: AppState) => state.expenses.calendar)

  //   const foundYear = useSelector((state: AppState) => state.calendar.year)
  const [expensesData, setExpensesData] = useState({} as DailyExpense)
  const [err, setErr] = useState(null)
  const date = new Date()
  const year = date.getFullYear()
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
  }, [expenses])

  return [err, expensesData, calendar]
}
