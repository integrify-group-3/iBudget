import { useState, useEffect, useCallback } from 'react'

import { defaultMonthlyChartExpensesData } from '../utils/defaultChartValues'

export default function useMonthlyExpensesChart(monthlyData: any) {
  const [chartData, setChartData] = useState([{ category: '', amount: 0 }])

  const loadChartData = useCallback(
    (monthlyData) => {
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
      if (monthlyData.length < 1) {
        setChartData([])
      } else {
        for (const day of monthlyData) {
          console.log('day is here', day)
          for (const expense of day.expenses) {
            const { category, amount} = expense
            if (category.includes('housing')) {
              housingTotal += amount
              for (const data of defaultMonthlyChartExpensesData) {
                if (data.category === category) {
                  data.amount = housingTotal
                }
              }
            }
            if (category.includes('transportation')) {
              transportationTotal += amount
              for (const data of defaultMonthlyChartExpensesData) {
                if (data.category === category) {
                  data.amount = transportationTotal
                }
              }
            }
            if (category.includes('food')) {
              foodTotal += amount
              for (const data of defaultMonthlyChartExpensesData) {
                if (data.category === expense.category) {
                  data.amount = foodTotal
                }
              }
            }
            if (category.includes('utilities')) {
              utilitiesTotal += amount
              for (const data of defaultMonthlyChartExpensesData) {
                if (data.category === expense.category) {
                  data.amount = utilitiesTotal
                }
              }
            }
            if (category.includes('clothing')) {
              clothingTotal += amount
              for (const data of defaultMonthlyChartExpensesData) {
                if (data.category === expense.category) {
                  data.amount = clothingTotal
                }
              }
            }
            if (category.includes('sports')) {
              sportsTotal += amount
              for (const data of defaultMonthlyChartExpensesData) {
                if (data.category === expense.category) {
                  data.amount = sportsTotal
                }
              }
            }
            if (category.includes('entertainment')) {
              entertainmentTotal += amount
              for (const data of defaultMonthlyChartExpensesData) {
                if (data.category === expense.category) {
                  data.amount = entertainmentTotal
                }
              }
            }
            if (category.includes('healthcare')) {
              healthcareTotal += amount
              for (const data of defaultMonthlyChartExpensesData) {
                if (data.category === expense.category) {
                  data.amount = healthcareTotal
                }
              }
            }
            if (category.includes('insurance')) {
              insuranceTotal += amount
              for (const data of defaultMonthlyChartExpensesData) {
                if (data.category === expense.category) {
                  data.amount = insuranceTotal
                }
              }
            }
            if (category.includes('supplies')) {
              suppliesTotal += expense.amount
              for (const data of defaultMonthlyChartExpensesData) {
                if (data.category === expense.category) {
                  data.amount = suppliesTotal
                }
              }
            }
            if (category.includes('education')) {
              educationTotal += amount
              for (const data of defaultMonthlyChartExpensesData) {
                if (data.category === expense.category) {
                  data.amount = educationTotal
                }
              }
            }
            if (category.includes('debt')) {
              debtTotal += amount
              for (const data of defaultMonthlyChartExpensesData) {
                if (data.category === expense.category) {
                  data.amount = debtTotal
                }
              }
            }
            if (category.includes('savings')) {
              savingsTotal += amount
              for (const data of defaultMonthlyChartExpensesData) {
                if (data.category === expense.category) {
                  data.amount = savingsTotal
                }
              }
            }
            if (category.includes('holiday')) {
              holidayTotal += amount
              for (const data of defaultMonthlyChartExpensesData) {
                if (data.category === expense.category) {
                  data.amount = holidayTotal
                }
              }
            }
          }
          setChartData(defaultMonthlyChartExpensesData)
          //we only want to show the categories that have a value > 0
          const filteredChartData = defaultMonthlyChartExpensesData.filter((data) => {
            if (data.amount > 0) {
              return data
            }
          })
          setChartData(filteredChartData)
          // console.log('this should update', chartData)
        }
      }
    },
    [monthlyData, chartData]
  )

  useEffect(() => {
    for (const data of defaultMonthlyChartExpensesData) {
      data.amount = 0
    }
    loadChartData(monthlyData)
  }, [monthlyData])

  return [chartData]
}
