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
      if (!monthlyData || monthlyData.length < 1) {
        setChartData([])
      } else {
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
          // console.log(defaultMonthlyChartIncomesData)
          setChartData(defaultMonthlyChartIncomesData)

          const filterData = defaultMonthlyChartIncomesData.filter(
            (data) => data.amount > 0
          )
          // console.log('data after filtering', filterData)
          setChartData(filterData)
          // console.log('chart should update', chartData)
        }
      }
    },
    [monthlyIncomeData, chartData]
  )

  useEffect(() => {
    //this resets the defaultMonthlyChartIncomesData
    for (const data of defaultMonthlyChartIncomesData) {
      data.amount = 0
    }
    loadMonthlyChart(monthlyIncomeData)
  }, [monthlyIncomeData])

  return [chartData]
}
