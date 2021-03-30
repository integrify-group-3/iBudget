import { useState, useEffect, useCallback } from 'react'

export default function useExpensesIcons(dailyExpense: any) {
  const incomesIcons = [
    { category: 'salary', icon: 'fas fa-hand-holding-usd' },
    { category: 'investments', icon: 'fas fa-shopping-cart' },
    { category: 'real estate', icon: 'fas fa-lightbulb' },
    { category: 'unemployment benefits', icon: 'fas fa-gas-pump' },
    { category: 'tax return', icon: 'fas fa-shopping-bag' },
    { category: 'child allowance', icon: 'fas fa-dumbbell' },
  ]
  const [icons, setIcons] = useState({ day: '', expenses: [] })

  const loadIncomesIcons = useCallback(
    async (incomes) => {
      if (incomes !== undefined) {
        //   if(dailyExpense.expenses.length > 0) {
        const iconsArr = [] as any
        await incomes.forEach((income: any) => {
          incomesIcons.forEach((icon) => {
            if (income.category === icon.category) {
              income.icon = icon.icon
              iconsArr.push(income)
            }
          })
        })
        console.log(iconsArr)
        setIcons({ day: dailyExpense.day, expenses: iconsArr })
        console.log(icons)
        // }

        // } else {
        //   console.log('no expense here')
      }
    },
    [dailyExpense, incomesIcons, icons]
  )

  useEffect(() => {
    if (dailyExpense !== undefined) {
      console.log('reading', dailyExpense)
      loadIncomesIcons(dailyExpense.expenses)
    }
  }, [dailyExpense])

  return [icons]
}
