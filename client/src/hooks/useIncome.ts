import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppState, CalendarScheduler, DateView } from '../types'
import { Income } from '../types/income'
import { fetchIncome } from '../redux/actions/income'
import { year, currentMonth } from '../utils/dateValues'

export default function useIncome() {
  const dispatch = useDispatch()
  const income = useSelector((state: AppState) => state.income.income)
  const calendar = useSelector((state: AppState) => state.income.calendar)
  const selectedMonth = useSelector(
    (state: AppState) => state.income.selectedMonth
  )
  const [incomeData, setIncomeData] = useState([] as Income[])
  const [calendarData, setCalendarData] = useState({} as CalendarScheduler)
  const [err, setErr] = useState(null)
  const [defaultMonth, setDefaultMonth] = useState()
  const [defaultDateView, setDefaultDateView] = useState({
    year: 0,
    month: '',
  } as DateView)


  useEffect(() => {
    dispatch(fetchIncome())
  }, [dispatch])

  useEffect(() => {
    const errMessage = 'There was a problem loading the data. Refresh the page.'
    if (err) {
      setErr(errMessage as any)
    }
    setIncomeData(income)
    setCalendarData(calendar)
    setDefaultDateView({ year: year, month: currentMonth })
    setDefaultMonth(selectedMonth)
  }, [income, calendar, calendarData, defaultMonth])

  return [err, incomeData, defaultDateView, calendar, defaultMonth]
}
