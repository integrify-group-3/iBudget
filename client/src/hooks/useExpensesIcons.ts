import { useState, useEffect, useCallback } from 'react'

import { expensesIcons } from '../utils/styleIcons'

export default function useExpensesIcons(dailyExpense: any) {
  const [formattedExpenses, setFormattedExpenses] = useState({day: '', expenses: [] })

  const loadExpensesIcons = useCallback (
    async (expenses) => {
    if(expenses !== undefined) {
        const iconsArr = [] as any
        await expenses.forEach((expense: any) => {
          expensesIcons.forEach((icon) => {
            if(expense.category === icon.category) {
              expense.icon = icon.icon
              iconsArr.push(expense)
            }
          })
        })
        setFormattedExpenses({day: dailyExpense.day, expenses: iconsArr})
    }
  },[dailyExpense, expensesIcons, formattedExpenses]
  )

  useEffect(() => {
    if(dailyExpense !== undefined) {
      loadExpensesIcons(dailyExpense.expenses)
    }
  }, [dailyExpense])
  
  return [
    formattedExpenses
  ]
}

