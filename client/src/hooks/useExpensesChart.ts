import { useState, useEffect, useCallback } from 'react'

import { defaultMonthlyChartExpensesData } from '../utils/defaultChartValues'

export default function useExpensesChart(monthlyChart: any) {
  const [chartData, setChartData] = useState([{ category: '', amount: 0 }])
  
  useEffect(() => {
    loadChartData(monthlyChart)
  }, [monthlyChart])

  const loadChartData = useCallback(
    (monthlyChart) => {
      let housingTotal = 0
      let transportationTotal = 0
      let foodTotal = 0
      let utilitiesTotal = 0
      let clothingTotal = 0
      let sportsTotal = 0
      let entertainmentTotal = 0
      let healthcareTotal = 0
      let insuranceTotal = 0
      let suppliesTotal = 0
      let educationTotal = 0
      let debtTotal = 0
      let savingsTotal = 0
      let holidayTotal = 0
      if (monthlyChart.length < 1) {
        setChartData([])
      } else {
        for (const day of monthlyChart) {
          for (const expense of day.expenses) {
            if (expense.category.includes('housing')) {
              housingTotal += expense.amount
              for (const data of defaultMonthlyChartExpensesData) {
                if (data.category === expense.category) {
                  data.amount = housingTotal
                }
              }
            }
            if (expense.category.includes('transportation')) {
              transportationTotal += expense.amount
              for (const data of defaultMonthlyChartExpensesData) {
                if (data.category === expense.category) {
                  data.amount = transportationTotal
                }
              }
            }
            if (expense.category.includes('food')) {
              foodTotal += expense.amount
              for (const data of defaultMonthlyChartExpensesData) {
                if (data.category === expense.category) {
                  data.amount = foodTotal
                }
              }
            }
            if (expense.category.includes('utilities')) {
              utilitiesTotal += expense.amount
              for (const data of defaultMonthlyChartExpensesData) {
                if (data.category === expense.category) {
                  data.amount = utilitiesTotal
                }
              }
            }
            if (expense.category.includes('clothing')) {
              clothingTotal += expense.amount
              for (const data of defaultMonthlyChartExpensesData) {
                if (data.category === expense.category) {
                  data.amount = clothingTotal
                }
              }
            }
            if (expense.category.includes('sports')) {
              sportsTotal += expense.amount
              for (const data of defaultMonthlyChartExpensesData) {
                if (data.category === expense.category) {
                  data.amount = sportsTotal
                }
              }
            }
            if (expense.category.includes('entertainment')) {
              entertainmentTotal += expense.amount
              for (const data of defaultMonthlyChartExpensesData) {
                if (data.category === expense.category) {
                  data.amount = entertainmentTotal
                }
              }
            }
            if (expense.category.includes('healthcare')) {
              healthcareTotal += expense.amount
              for (const data of defaultMonthlyChartExpensesData) {
                if (data.category === expense.category) {
                  data.amount = healthcareTotal
                }
              }
            }
            if (expense.category.includes('insurance')) {
              insuranceTotal += expense.amount
              for (const data of defaultMonthlyChartExpensesData) {
                if (data.category === expense.category) {
                  data.amount = insuranceTotal
                }
              }
            }
            if (expense.category.includes('supplies')) {
              suppliesTotal += expense.amount
              for (const data of defaultMonthlyChartExpensesData) {
                if (data.category === expense.category) {
                  data.amount = suppliesTotal
                }
              }
            }
            if (expense.category.includes('education')) {
              educationTotal += expense.amount
              for (const data of defaultMonthlyChartExpensesData) {
                if (data.category === expense.category) {
                  data.amount = educationTotal
                }
              }
            }
            if (expense.category.includes('debt')) {
              debtTotal += expense.amount
              for (const data of defaultMonthlyChartExpensesData) {
                if (data.category === expense.category) {
                  data.amount = debtTotal
                }
              }
            }
            if (expense.category.includes('savings')) {
              savingsTotal += expense.amount
              for (const data of defaultMonthlyChartExpensesData) {
                if (data.category === expense.category) {
                  data.amount = savingsTotal
                }
              }
            }
            if (expense.category.includes('holiday')) {
              holidayTotal += expense.amount
              for (const data of defaultMonthlyChartExpensesData) {
                if (data.category === expense.category) {
                  data.amount = holidayTotal
                }
              }
            }
          }
          setChartData(defaultMonthlyChartExpensesData)
          const filteredChartData = defaultMonthlyChartExpensesData.filter((data) => {
            if (data.amount > 0) {
              return data
            }
          })
          setChartData(filteredChartData)
        }
      }
    },
    [monthlyChart, chartData]
  )

  return [chartData]
}
