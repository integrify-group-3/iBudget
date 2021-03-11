import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppState, CalendarScheduler } from '../types'
import { fetchExpenses } from '../redux/actions/expenses'
import { year } from '../utils/dateValues'

//
export default function useYearExpenses(selectedYear: number) {
  const dispatch = useDispatch()
  const calendarData = useSelector((state: AppState) => state.expenses.calendar)
  const data = useSelector((state: AppState) => state.expenses.selectedYear)
  type YearData = {
    year: number
    months: any
  }
  
  const [yearData, setYearData] = useState({
    year: 0,
    months: ([] as unknown) as YearData,
  })
  const [err, setErr] = useState(null)
  const [dateView, setDateView] = useState({
    year: 0,
  })
  const [yearTotalExpenses, setYearTotalExpenses] = useState(0)
  console.log('from year expenses hook', yearData)
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
        // setYearData(foundYear)
        //as we will need useYearIncome as well for total income, we could just leave the switch chart view on the component as it will just update the chart for both once, since income and expenses are on the same json data. total income will be calcualted on income action and have their own useYearIncome
        // console.log('year different', foundYear.year, yearData.year)

        // console.log('after update', yearData)

        const totalExpenses = calculateYearExpenses(foundYear)
        setYearTotalExpenses(totalExpenses)
        setDateView({ year: selectedYear })
      } catch (err) {
        console.log(err)
      }
    },
    [
      selectedYear,
      calendarData,
      yearData,
      yearTotalExpenses,
      dateView,
    ]
  )

  const calculateYearExpenses = useCallback(
    (data) => {
      let count = 0
      //   console.log('expenses year', data)
      for (const month of data.months) {
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
    [data]
  )

  useEffect(() => {
    const errMessage = 'There was a problem loading the data. Refresh the page.'
    if (err) {
      setErr(errMessage as any)
    }
    setYearData(data)
    // console.log(yearExpenses)
    if (data !== undefined) {
      const totalExpenses = calculateYearExpenses(data)
      setYearTotalExpenses(totalExpenses)
      setDateView({ year: year })
      // console.log(data)
    }
  }, [data])

  console.log('expenses', data)

  return [err, data, dateView, yearTotalExpenses]
}
