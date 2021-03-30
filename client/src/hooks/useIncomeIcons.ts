import { useState, useEffect, useCallback } from 'react'

export default function useIncomeIcons(monthIncome: any) {
  const incomesIcons = [
    { category: 'salary', icon: 'fas fa-hand-holding-usd' },
    { category: 'investments', icon: 'fas fa-shopping-cart' },
    { category: 'real estate', icon: 'fas fa-building' },
    { category: 'unemployment benefits', icon: 'fas fa-user-md' },
    { category: 'tax return', icon: 'fas fa-file-invoice-dollar' },
    { category: 'child allowance', icon: 'fas fa-baby' },
  ]
  const [icons, setIcons] = useState<any>([])

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
        setIcons(incomes)
      }
    },
    [monthIncome, incomesIcons, icons]
  )

  useEffect(() => {
    if (monthIncome !== undefined) {
      console.log('reading from income hooks', monthIncome)
      loadIncomesIcons(monthIncome)
    }
  }, [monthIncome])
  return [icons]
}
