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
    console.log('total here', total)
    if(total !== undefined) {
        setTotalExpenses(total)
    } 
  }, [monthExpenses])

  return [totalExpenses]
}
