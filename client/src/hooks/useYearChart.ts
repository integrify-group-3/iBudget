import { useState, useEffect, useCallback } from 'react'

import { YearChartData } from '../types'
import { defaultYearChartData } from '../utils/defaultChartValues'

export default function useYearChart(yearData: any) {
 
  const [err, setErr] = useState(null)
  let [chartData, setChartData] = useState([] as YearChartData[])
  // this chart will show a comparison between expenses and income per year
  
  const loadChartData = 
  useCallback(
    async (yearData: any) => {
      try {
        const monthsArr = [] as any[]
       await yearData.months.forEach((month: any) => {
        defaultYearChartData.forEach((m: any) => {
            if (m.month === month.name) {
              const monthObj = {month: '', income: 0, expenses: 0}
              monthObj.month = month.name
              let countIncome = 0
              let countExpenses = 0
              for (const income of month.income) {
                const { amount } = income
                countIncome += amount
              }
              monthObj.income = countIncome
              if (month.days.length > 0) {
                const { days } = month
                for (const day of days) {
                  if (day.expenses.length > 0) {
                    for (const expense of day.expenses) {
                      const { amount } = expense
                      countExpenses += amount
                    }
                    monthObj.expenses = countExpenses
                  }
                }
              } else {
                // console.log('there is no data registered')
              }
              monthsArr.push(monthObj)

            }
          })
          // setChartData(monthsArr)          
        })
        
      // setTimeout(() => {
        setChartData(monthsArr)
      // }, 2000);
        // console.log(data)
      } 
      
      catch (err) {
        console.log(err)
      }
    }
     ,
  [yearData, defaultYearChartData, chartData, setChartData]
   )
  // console.log(chartData)

  useEffect(() => {
      loadChartData(yearData)
  }, [yearData])
  
  return [err, chartData]
}
