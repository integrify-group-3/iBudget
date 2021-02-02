import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppState, CalendarScheduler } from '../types'
import { fetchExpenses } from '../redux/actions/expenses'
import { months, year } from '../utils/dateValues'

export default function useYearExpenses(selectedYear: number) {
  const dispatch = useDispatch()
  const calendarData = useSelector((state: AppState) => state.expenses.calendar)
  const yearExpenses = useSelector(
    (state: AppState) => state.expenses.selectedYear
  )

  const [err, setErr] = useState(null)
  const [dateView, setDateView] = useState({
    year: 0,
  })
  const [yearTotalExpenses, setYearTotalExpenses] = useState(0)
  const [avgYearExpenses, setAvgYearExpenses] = useState(0)

  useEffect(() => {
    console.log('I am calling second')
    dispatch(fetchExpenses())
  }, [dispatch])

  useEffect(() => {
    console.log('I am calling third', selectedYear)
    changeYearView(selectedYear)
  }, [selectedYear])

  const changeYearView = useCallback(async (selectedYear: number) => {
    console.log(selectedYear)
    try {
      const foundYear = await calendarData.years.find(
        (y: CalendarScheduler) => y.year === selectedYear
      )    
      const totalExpenses = calculateYearExpenses(foundYear)
      const avgYearExpenses = calculateYearExpenses(foundYear) / 12
      setYearTotalExpenses(totalExpenses)
      setAvgYearExpenses(avgYearExpenses)
      setDateView({ year: selectedYear })
    } catch (err) {
      console.log(err)

    }
  }, [selectedYear, yearTotalExpenses, avgYearExpenses, dateView])

  const calculateYearExpenses = useCallback(
    (yearExpenses) => {
      let count = 0
    //   console.log('expenses year', yearExpenses)
      for (const month of yearExpenses.months) {
        if (month.days.length > 0) {
          const { days } = month
          console.log('these are not undefined', days)
          for (const day of days) {
            // console.log(day)
            if (day.expenses.length > 0) {
              for (const expense of day.expenses) {
                const { amount } = expense
                // console.log('expense here', amount)
                count += amount
              }
            }
          }
        }
        else {
            console.log('there is no data registered')
        }
      }
      return count
    },
    [yearExpenses]
  )

  
  useEffect(() => {
    const errMessage = 'There was a problem loading the data. Refresh the page.'
    if (err) {
      setErr(errMessage as any)
    }
    const totalExpenses = calculateYearExpenses(yearExpenses)
    const avgYearExpenses = calculateYearExpenses(yearExpenses) / 12
    setYearTotalExpenses(totalExpenses)
    setAvgYearExpenses(avgYearExpenses)
    setDateView({ year: year })
  }, [yearExpenses])

  return [err, yearExpenses, dateView, yearTotalExpenses, avgYearExpenses]
}
