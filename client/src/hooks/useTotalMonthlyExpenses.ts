import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../types'
import { getTotalExpenses } from '../redux/actions/expenses'

export default function useTotalMonthlyExpenses(monthlyData: any) {
  const dispatch = useDispatch()
  const [totalExpenses, setTotalExpenses] = useState(0)
  const total = useSelector((state: AppState) => state.expenses.total)

  useEffect(() => {
    dispatch(getTotalExpenses(monthlyData))
  }, [dispatch, monthlyData])

  useEffect(() => {
    if (total !== undefined) {
      setTotalExpenses(total)
    }
  }, [total])

  return [totalExpenses]
}
