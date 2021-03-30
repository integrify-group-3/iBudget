import { useState, useEffect, useCallback } from 'react'

export default function useExpensesIcons(dailyIncome: any) {
  const incomesIcons = [
    { category: 'salary', icon: 'fas fa-hand-holding-usd' },
    { category: 'investments', icon: 'fas fa-shopping-cart' },
    { category: 'real estate', icon: 'fas fa-lightbulb' },
    { category: 'unemployment benefits', icon: 'fas fa-gas-pump' },
    { category: 'tax return', icon: 'fas fa-shopping-bag' },
    { category: 'child allowance', icon: 'fas fa-dumbbell' },
  ]
  const [icons, setIcons] = useState({ day: '', incomes: [] })

  const loadIncomesIcons = useCallback(
    async (incomes) => {
      if (incomes !== undefined) {
        const iconsArr = [] as any
        await incomes.forEach((income: any) => {
          incomesIcons.forEach((icon) => {
            if (income.category === icon.category) {
              income.icon = icon.icon
              iconsArr.push(income)
            }
          })
        })
        console.log('iconsarray from income hooks', iconsArr)
        setIcons({ day: dailyIncome.day, incomes: iconsArr })
        console.log('icons from hooks', icons)
      }
    },
    [dailyIncome, incomesIcons, icons]
  )

  useEffect(() => {
    if (dailyIncome !== undefined) {
      console.log('reading from income hooks', dailyIncome)
      loadIncomesIcons(dailyIncome.incomes)
    }
  }, [dailyIncome])

  return [icons]
}
