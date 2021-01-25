import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppState, Income, CalendarScheduler, DateView } from '../types'
import { fetchIncome } from '../redux/actions/income'
import { year, currentMonth } from '../utils/dateValues'

export default function useIncome() {
  const dispatch = useDispatch()
  const income = useSelector((state: AppState) => state.income.income)
  const calendar = useSelector((state: AppState) => state.income.calendar)
  const [incomeData, setIncomeData] = useState([] as Income[])
  const [calendarData, setCalendarData] = useState({} as CalendarScheduler)

  const [err, setErr] = useState(null)
  const [dateView, setDateView] = useState({
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
    setDateView({ year: year, month: currentMonth })
    console.log(incomeData)
  }, [income, calendar, calendarData])

  return [err, incomeData, dateView, calendar]
}
