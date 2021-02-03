import { useState, useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { AppState } from '../types'
import { getTotalExpenses } from '../redux/actions/expenses' 

export default function useTotalExpenses(monthExpenses: any) { 
  const dispatch = useDispatch()
  const [totalExpenses, setTotalExpenses] = useState(0)
  const total = useSelector(
    (state: AppState) => state.expenses.total
  )
 
  useEffect(() => {
    dispatch(getTotalExpenses(monthExpenses))
  }, [monthExpenses])

  useEffect(() => {
    if(total !== undefined) {
        setTotalExpenses(total)
        // console.log('total here', total)
    } 
  }, [total])

  return [totalExpenses]
}
