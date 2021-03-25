import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppState } from '../types'
import { getTotalMonthlyIncome } from '../redux/actions/income'

export default function useTotalMonthlyIncome(monthlyData: any) {
  const dispatch = useDispatch()
  const total = useSelector((state: AppState) => state.income.total)
  const [totalMonthlyIncome, setTotalMonthlyIncome] = useState(0)

  useEffect(() => {
    dispatch(getTotalMonthlyIncome(monthlyData))
  }, [dispatch, monthlyData])

  useEffect(() => {
    if (total !== undefined) {
      setTotalMonthlyIncome(total)
    }
  }, [total])

  return [totalMonthlyIncome]
}

