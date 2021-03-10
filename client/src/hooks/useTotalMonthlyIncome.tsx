import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppState } from '../types'
import { getTotalMonthlyIncome } from '../redux/actions/income'

function useTotalMonthlyIncome(monthlyIncome: any) {
  const dispatch = useDispatch()
  const total = useSelector((state: AppState) => state.income.total)
  const [totalMonthlyIncome, setTotalMonthlyIncome] = useState(0)

  useEffect(() => {
    dispatch(getTotalMonthlyIncome(monthlyIncome))
  }, [dispatch, monthlyIncome])

  useEffect(() => {
    if (total) {
      setTotalMonthlyIncome(total)
    }
  }, [total])

  return [totalMonthlyIncome]
}

export default useTotalMonthlyIncome
