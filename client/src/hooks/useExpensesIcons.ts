import { useState, useEffect, useCallback } from 'react'

import { expensesUiCategories } from '../utils/uiCategories'

export default function useExpensesIcons(dailyExpense: any) {
  const [formattedExpenses, setFormattedExpenses] = useState({day: '', expenses: [] })

  const loadExpensesIcons = useCallback (
    async (expenses) => {
    if(expenses !== undefined) {
        const iconsArr = [] as any
        await expenses.forEach((expense: any) => {
          expensesUiCategories.forEach((icon) => {
            if(expense.category === icon.category) {
              expense.icon = icon.icon
              expense.iconStyle = icon.iconStyle
              iconsArr.push(expense)
            }
          })
        })
        setFormattedExpenses({day: dailyExpense.day, expenses: iconsArr})
    }
  },[dailyExpense, expensesUiCategories, formattedExpenses]
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

