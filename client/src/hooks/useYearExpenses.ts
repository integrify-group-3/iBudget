import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppState, CalendarScheduler } from '../types'
import { fetchExpenses } from '../redux/actions/expenses'
import { months, year } from '../utils/dateValues'

//
export default function useYearExpenses(selectedYear: number) {
  const dispatch = useDispatch()
  const calendarData = useSelector((state: AppState) => state.expenses.calendar)
  const expenses = useSelector((state: AppState) => state.expenses.selectedYear)
  type YearExpenses = {
    year: number
    months: any
  }
  const [yearExpenses, setYearExpenses] = useState({
    year: 0,
    months: ([] as unknown) as YearExpenses,
  })
  const [yearUpdate, setYearUpdate] = useState()
  const [err, setErr] = useState(null)
  const [dateView, setDateView] = useState({
    year: 0,
  })
  const [yearTotalExpenses, setYearTotalExpenses] = useState(0)
  const [avgYearExpenses, setAvgYearExpenses] = useState(0)

  useEffect(() => {
    dispatch(fetchExpenses())
  }, [dispatch])

  useEffect(() => {
    changeYearView(selectedYear)
  }, [selectedYear])

  const changeYearView = useCallback(
    async (selectedYear: number) => {
      try {
        const foundYear = await calendarData.years.find(
          (y: CalendarScheduler) => y.year === selectedYear
        )
        // console.log('found year', foundYear)
        //this does not update, same as in the Expense page with tileContent
        // setYearExpenses(foundYear)
        //as we will need useYearIncome as well for total income, we could just leave the switch chart view on the component as it will just update the chart for both once, since income and expenses are on the same json data. total income will be calcualted on income action and have their own useYearIncome
        // console.log('year different', foundYear.year, yearExpenses.year)

        // console.log('after update', yearExpenses)

        const totalExpenses = calculateYearExpenses(foundYear)
        const avgYearExpenses = calculateYearExpenses(foundYear) / 12
        setYearTotalExpenses(totalExpenses)
        setAvgYearExpenses(avgYearExpenses)
        setDateView({ year: selectedYear })
      } catch (err) {
        console.log(err)
      }
    },
    [
      selectedYear,
      calendarData,
      yearExpenses,
      yearTotalExpenses,
      avgYearExpenses,
      dateView,
    ]
  )

  const calculateYearExpenses = useCallback(
    (yearExpenses) => {
      let count = 0
      //   console.log('expenses year', yearExpenses)
      for (const month of yearExpenses.months) {
        if (month.days.length > 0) {
          const { days } = month
          //   console.log('these are not undefined', days)
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
        } else {
          console.log('there is no data registered')
        }
      }
      return count
    },
    [expenses]
  )

  useEffect(() => {
    const errMessage = 'There was a problem loading the data. Refresh the page.'
    if (err) {
      setErr(errMessage as any)
    }
    setYearExpenses(expenses)
    // console.log(yearExpenses)
    if (expenses !== undefined) {
      const totalExpenses = calculateYearExpenses(expenses)
      const avgYearExpenses = calculateYearExpenses(expenses) / 12
      setYearTotalExpenses(totalExpenses)
      setAvgYearExpenses(avgYearExpenses)
      setDateView({ year: year })
      // console.log(expenses)
    }
  }, [expenses])

  return [err, expenses, dateView, yearTotalExpenses, avgYearExpenses]
}
