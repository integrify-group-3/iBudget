import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppState } from '../types'
import { getTotalMonthlyIncome } from '../redux/actions/income'

function useTotalMonthlyIncome(monthlyData: any) {
  const dispatch = useDispatch()
  const total = useSelector((state: AppState) => state.income.total)
  // console.log('total income from hooks', total)
  const [totalMonthlyIncome, setTotalMonthlyIncome] = useState(0)
  console.log(monthlyData)
  useEffect(() => {
    dispatch(getTotalMonthlyIncome(monthlyData))
  }, [dispatch, monthlyData])

  useEffect(() => {
    if (total) {
      setTotalMonthlyIncome(total)
    }
  }, [total])

  return [totalMonthlyIncome]
}

export default useTotalMonthlyIncome
