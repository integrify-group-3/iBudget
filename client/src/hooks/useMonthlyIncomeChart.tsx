import React, { useState, useEffect, useCallback } from 'react'

import { defaultMonthlyChartIncomesData } from '../utils/defaultChartValues'

export default function useMonthlyIncomeChart(monthlyIncomeData: any) {
  const [chartData, setChartData] = useState([
    {
      category: '',
      amount: 0,
    },
  ])

  const loadMonthlyChart = useCallback(
    (monthlyData: any) => {
      let salaryTotal = 0
      let investmentsTotal = 0
      let realStateTotal = 0
      let benefitsTotal = 0
      let taxReturnTotal = 0
      let childAllowanceTotal = 0
      //console.log('monthlyData', monthlyData)
      if (!monthlyData) {
        setChartData([])
      } else {
        console.log('monthlyData from hooks', monthlyIncomeData)
        for (const income of monthlyIncomeData) {
          const { category, amount } = income
          if (category.includes('salary')) {
            salaryTotal += amount
            for (const data of defaultMonthlyChartIncomesData) {
              if (data.category === category) {
                data.amount = salaryTotal
              }
            }
          }
          if (category.includes('investments')) {
            investmentsTotal += amount
            for (const data of defaultMonthlyChartIncomesData) {
              if (data.category === category) {
                data.amount = investmentsTotal
              }
            }
          }
          if (category.includes('real estate')) {
            realStateTotal += amount
            for (const data of defaultMonthlyChartIncomesData) {
              if (data.category === category) {
                data.amount = realStateTotal
              }
            }
          }
          if (category.includes('unemployment benefits')) {
            benefitsTotal += amount
            for (const data of defaultMonthlyChartIncomesData) {
              if (data.category === category) {
                data.amount = benefitsTotal
              }
            }
          }
          if (category.includes('tax return')) {
            taxReturnTotal += amount
            for (const data of defaultMonthlyChartIncomesData) {
              if (data.category === category) {
                data.amount = taxReturnTotal
              }
            }
          }
          if (category.includes('child allowance')) {
            childAllowanceTotal += amount
            for (const data of defaultMonthlyChartIncomesData) {
              if (data.category === category) {
                data.amount = childAllowanceTotal
              }
            }
          }
        }
      }

      const filterData = defaultMonthlyChartIncomesData.filter(
        (data) => data.amount > 0
      )
      setChartData(filterData)
    },
    [monthlyIncomeData, chartData]
  )

  useEffect(() => {
    //setChartData(defaultMonthlyChartIncomesData)
    loadMonthlyChart(monthlyIncomeData)
  }, [monthlyIncomeData])

  return [chartData]
}
