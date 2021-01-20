import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppState, Income, CalendarScheduler, DateView } from '../types'
import { fetchIncome } from '../redux/actions/income'
import { months } from './../utils/months'

export default function useIncome() {
  const dispatch = useDispatch()
  const income = useSelector((state: AppState) => state.income.income)
  const calendar = useSelector((state: AppState) => state.income.calendar)

//   const foundYear = useSelector((state: AppState) => state.calendar.year)
const [incomeData, setIncomeData] = useState([] as Income[])
const [err, setErr] = useState(null)
  const date = new Date()
  const year = date.getFullYear()
  const [dateView, setDateView] = useState({
    year: 0,
    month: '',
  } as DateView)

  useEffect(() => {
    dispatch(fetchIncome())
  }, [dispatch])

 
  const setMonthSchedule = async function (
    currentYear: number,
    currentMonth: string,
    foundYear: any,
    currentIndex: number
  ) {
    try {
      const foundMonth = await foundYear.months.find(
        (month: any) => month.name === months[currentIndex]
      )
      console.log(foundMonth)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const errMessage = 'There was a problem loading the data. Refresh the page.'
    if (err) {
      setErr(errMessage as any)
    }
    setIncomeData(income)
    const currentIndex = date.getMonth()
    setDateView({ year: year, month: months[currentIndex] })
    // setMonthSchedule(dateView.year, dateView.month, foundYear, currentIndex)
  
  }, [income])

  return [err, incomeData, dateView, calendar]
}
