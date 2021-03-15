import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppState, CalendarScheduler } from '../types'
import { fetchExpenses } from '../redux/actions/expenses'

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
  const [yearTotalExpenses, setYearTotalExpenses] = useState(0)

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
        const totalExpenses = calculateYearExpenses(foundYear)
        setYearTotalExpenses(totalExpenses)
      } catch (err) {
        return err
      }
    },
    [selectedYear, calendarData, yearData, yearTotalExpenses]
  )

  const calculateYearExpenses = useCallback(
    (data) => {
      let count = 0
      data &&
        data.months.map((month: any) => {
          month &&
            month.days.map((day: any) => {
              if (day.expenses.length > 0) {
                day.expenses.map((expense: any) => {
                  count += expense.amount
                })
              }
            })
        })
      return count
    },
    [data]
  )

  /*const calculateYearExpenses = useCallback(
    (data) => {
      let count = 0
      for (const month of data.months) {
        if (month.days.length > 0) {
          const { days } = month
          for (const day of days) {
            if (day.expenses.length > 0) {
              for (const expense of day.expenses) {
                const { amount } = expense
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
  )*/

  useEffect(() => {
    const errMessage = 'There was a problem loading the data. Refresh the page.'
    if (err) {
      setErr(errMessage as any)
    }
    setYearData(data)
    if (data !== undefined) {
      const totalExpenses = calculateYearExpenses(data)
      console.log('total expenses', totalExpenses)
      setYearTotalExpenses(totalExpenses)
    }
  }, [data])

  return [err, data, yearTotalExpenses]
}
