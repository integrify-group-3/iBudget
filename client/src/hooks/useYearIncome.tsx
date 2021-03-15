import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppState } from '../types'
import { fetchIncome } from '../redux/actions/income'
export function useYearIncome(currentYear: number) {
  const dispatch = useDispatch()
  const [total, setTotal] = useState(0)
  const selectedYear = useSelector(
    (state: AppState) => state.income.selectedYear
  )
  const calendarData = useSelector((state: AppState) => state.expenses.calendar)

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

  const changeYearView = useCallback(
    async (currentYear: number) => {
      try {
        const foundYear = await calendarData.years.find(
          (current: any) => current.year === currentYear
        )
        const totalIncomes = calculateTotal(foundYear)
        setTotal(totalIncomes)
      } catch (err) {
        console.log(err)
      }
    },
    [total, currentYear, calculateTotal]
  )

  useEffect(() => {
    const totalIncomes = calculateTotal(currentYear)
    setTotal(totalIncomes)
  }, [calculateTotal, currentYear])

  console.log('total from useYearIncome hooks ', total)

  return [total]
}
