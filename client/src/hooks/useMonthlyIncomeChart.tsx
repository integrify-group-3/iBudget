import React, { useState, useEffect } from 'react'

import { defaultMonthlyChartIncomesData } from '../utils/defaultChartValues'

export default function useMonthlyIncomeChart(monthlyChart: any) {
  const [chartData, setChartData] = useState([
    {
      category: '',
      amount: 0,
    },
  ])

  console.log('monthlyChart from hooks', monthlyChart)

  useEffect(() => {
    setChartData(defaultMonthlyChartIncomesData)
  }, [])

  return [chartData]
}
