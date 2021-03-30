import { useState, useEffect, useCallback } from 'react'

export default function useExpensesIcons(dailyExpense: any
  ) {
  const expensesIcons = [
    {category: 'housing', icon: 'fas fa-home'},
    {category: 'food', icon: 'fas fa-shopping-cart'},
    {category: 'utilities', icon: 'fas fa-lightbulb'},
    {category: 'transportation', icon: 'fas fa-gas-pump'},
    {category: 'clothing', icon: 'fas fa-shopping-bag'},
    {category: 'sports', icon: 'fas fa-dumbbell'},
    {category: 'healthcare', icon: 'fad fa-file-medical'},
    {category: 'entertainment', icon: 'fas fa-glass-martini-alt'},
    {category: 'education', icon: 'fas fa-graduation-cap'},
    {category: 'supplies', icon: 'fas fa-wrench'},
    {category: 'insurance', icon: 'fas fa-glass-martini-alt'},
    {category: 'debt', icon: 'fas fa-glass-martini-alt'},
    {category: 'savings', icon: 'fas fa-coins'},
    {category: 'holiday', icon: 'fas fa-plane-departure'},


  ]
  const [icons, setIcons] = useState({day: '', expenses: [] })

  const loadExpensesIcons = useCallback (
    async (expenses) => {
    if(expenses !== undefined) {
    //   if(dailyExpense.expenses.length > 0) {
        const iconsArr = [] as any
        await expenses.forEach((expense: any) => {
          expensesIcons.forEach((icon) => {
            if(expense.category === icon.category) {
              expense.icon = icon.icon
              iconsArr.push(expense)
            }
          })
        })
        console.log(iconsArr)
        setIcons({day: dailyExpense.day, expenses: iconsArr})
        console.log(icons)
      // }
    
    // } else {
    //   console.log('no expense here')
    }
  
  },[dailyExpense, expensesIcons, icons]
  )

  useEffect(() => {
    if(dailyExpense !== undefined) {
      console.log('reading', dailyExpense)
      loadExpensesIcons(dailyExpense.expenses)
    }
  }, [dailyExpense])
  
  return [
    icons
  ]
}

