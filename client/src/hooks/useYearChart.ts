import { useState, useEffect, useCallback } from 'react'

export default function useYearChart(yearChart: any) {
  type YearChart = {
      month: string
      income: number
      expenses: number
  }
  const [err, setErr] = useState(null)
  const [chartData, setChartData] = useState([] as YearChart[])
   //this is dummy data, and how the chart should look like
 const data = [
    {month: 'January', income: 0, expenses: 0},
    {month: 'February', income: 0, expenses: 0},
    {month: 'March', income: 0, expenses: 0},
    {month: 'April', income: 0, expenses: 0},
    {month: 'May', income: 0, expenses: 0},
    {month: 'June', income: 0, expenses: 0},
    {month: 'July', income: 0, expenses: 0},
    {month: 'August', income: 0, expenses: 0},
    {month: 'September', income: 0, expenses: 0},
    {month: 'October', income: 0, expenses: 0},
    {month: 'November', income: 0, expenses: 0},
    {month: 'December', income: 0, expenses: 0},
  ]

  useEffect(() => {
    loadChartData(yearChart)
  }, [yearChart])

  const loadChartData = useCallback(
    (yearChart) => {
     console.log('year calendar', yearChart)
      
    },
    [yearChart, chartData]
  )

  return [err, chartData]
}
