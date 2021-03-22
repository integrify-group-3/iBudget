import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppState } from '../types'
import { fetchIncome } from '../redux/actions/income'

export default function useYearIncome(selectedYear: number) {
  const dispatch = useDispatch()
  const [total, setTotal] = useState(0)
  const yearData = useSelector((state: AppState) => state.income.selectedYear)
  const calendarData = useSelector((state: AppState) => state.income.calendar)
 
  useEffect(() => {
    dispatch(fetchIncome())
  }, [dispatch])

  const calculateTotal = useCallback((yearData: any) => {
    let count = 0
    yearData !== undefined &&
    yearData.months.map((month: any) =>
        month.income.map((income: any) => (count += income?.amount))
      )
    return count
  }, [yearData])

  useEffect(() => {
    changeYearView(selectedYear)
  }, [selectedYear])

  const changeYearView = useCallback(
    async (selectedYear: number) => {
      try {
        const foundYear = await calendarData.years.find(
          (current: any) => current.year === selectedYear
        )
        const totalIncome = calculateTotal(foundYear)
        setTotal(totalIncome)
      } catch (err) {
        console.log(err)
      }
    },
    [total, selectedYear, calculateTotal]
  )

  useEffect(() => {
    const totalIncomes = calculateTotal(yearData)
    setTotal(totalIncomes)
  }, [calculateTotal])

  return [yearData, total]
}

