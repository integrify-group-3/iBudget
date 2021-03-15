import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppState } from '../types'
import { fetchIncome } from '../redux/actions/income'
import { year } from '../utils/dateValues'

function useYearIncome(selectedYear: number) {
  const dispatch = useDispatch()
  const [total, setTotal] = useState(0)
  const YearData = useSelector((state: AppState) => state.income.selectedYear)
  const calendarData = useSelector((state: AppState) => state.income.calendar)
  const [dateView, setDateView] = useState({
    year: 0,
  })
  useEffect(() => {
    dispatch(fetchIncome())
  }, [dispatch])

  const calculateTotal = useCallback((selectedYear: any) => {
    let count = 0
    selectedYear &&
      selectedYear.months.map((currentMonth: any) =>
        currentMonth.income.map((income: any) => (count += income?.amount))
      )
    return count
  }, [])

  useEffect(() => {
    changeYearView(selectedYear)
  }, [selectedYear])

  const changeYearView = useCallback(
    async (currentYear: number) => {
      try {
        const foundYear = await calendarData.years.find(
          (current: any) => current.year === currentYear
        )
        const totalIncomes = calculateTotal(foundYear)
        setTotal(totalIncomes)
        setDateView({ year: selectedYear })
      } catch (err) {
        console.log(err)
      }
    },
    [total, selectedYear, calculateTotal, dateView]
  )

  useEffect(() => {
    const totalIncomes = calculateTotal(YearData)
    setTotal(totalIncomes)
    setDateView({ year: year })
  }, [calculateTotal, selectedYear])

  return [total, dateView]
}

export default useYearIncome
