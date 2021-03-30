import { useState, useEffect, useCallback } from 'react'

import { incomeIcons } from '../utils/styleIcons'

export default function useIncomeIcons(monthIncome: any) {
 
  const [icons, setIcons] = useState<any>([])

  const loadIncomesIcons = useCallback(
    async (incomes) => {
      if (incomes !== undefined) {
        const iconsArr = [] as any
        await incomes.forEach((income: any) => {
          incomeIcons.forEach((icon) => {
            if (income.category === icon.category) {
              income.icon = icon.icon
              iconsArr.push(income)
            }
          })
        })
        setIcons(incomes)
      }
    },
    [monthIncome, incomeIcons, icons]
  )

  useEffect(() => {
    if (monthIncome !== undefined) {
      console.log('reading from income hooks', monthIncome)
      loadIncomesIcons(monthIncome)
    }
  }, [monthIncome])
  return [icons]
}
