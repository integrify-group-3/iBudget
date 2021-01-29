import { useState, useEffect, useCallback } from 'react'

export default function useExpensesChart(monthlyChart: any) {
  console.log('from use effect', monthlyChart)
  const [chartData, setChartData] = useState([{ category: '', amount: 0 }])
  const chartExpenses = [
    { category: 'housing', amount: 0 },
    { category: 'transportation', amount: 0 },
    { category: 'food', amount: 0 },
    { category: 'utilities', amount: 0 },
    { category: 'clothing', amount: 0 },
    { category: 'sports', amount: 0 },
    { category: 'entertainment', amount: 0 },
    { category: 'healthcare', amount: 0 },
    { category: 'insurance', amount: 0 },
    { category: 'supplies', amount: 0 },
    { category: 'education', amount: 0 },
    { category: 'debt', amount: 0 },
    { category: 'savings', amount: 0 },
    { category: 'holiday', amount: 0 },
  ]

  useEffect(() => {
    loadChartData(monthlyChart)
  }, [monthlyChart])

  const loadChartData = useCallback(
    (monthlyChart) => {
      console.log('from use expenses chart useCallback', monthlyChart)
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

      // setChartData(monthlyChart)
      for (const day of monthlyChart) {
        for (const expense of day.expenses) {
          if (expense.category.includes('housing')) {
            console.log('this is housing', expense)
            housingTotal += expense.amount
            console.log('total count here for clothes', housingTotal)
            for (const data of chartExpenses) {
              if (data.category === expense.category) {
                console.log(
                  'these are matching',
                  data.category,
                  expense.category
                )
                data.amount = housingTotal
              }
            }
          }
          if (expense.category.includes('transportation')) {
            console.log('this is housing', expense)
            transportationTotal += expense.amount
            console.log('total count here for transportation', transportationTotal)
            for (const data of chartExpenses) {
              if (data.category === expense.category) {
                console.log(
                  'these are matching',
                  data.category,
                  expense.category
                )
                data.amount = transportationTotal
              }
            }
          }
          if (expense.category.includes('food')) {
            console.log('this is food', expense)
            foodTotal += expense.amount
            console.log('total count here for food', foodTotal)
            for (const data of chartExpenses) {
              if (data.category === expense.category) {
                console.log(
                  'these are matching',
                  data.category,
                  expense.category
                )
                data.amount = foodTotal
              }
            }
          }
          if (expense.category.includes('utilities')) {
            console.log('this is utilities', expense)
            utilitiesTotal += expense.amount
            console.log('total count here for utilities', utilitiesTotal)
            for (const data of chartExpenses) {
              if (data.category === expense.category) {
                console.log(
                  'these are matching',
                  data.category,
                  expense.category
                )
                data.amount = utilitiesTotal
              }
            }
          }
          if (expense.category.includes('clothing')) {
            console.log('this is clothing', expense)
            clothingTotal += expense.amount
            console.log('total count here for clothes', clothingTotal)
            for (const data of chartExpenses) {
              if (data.category === expense.category) {
                console.log(
                  'these are matching',
                  data.category,
                  expense.category
                )
                data.amount = clothingTotal
              }
            }
          }
          if (expense.category.includes('sports')) {
            console.log('this is sports', expense)
            sportsTotal += expense.amount
            console.log('total count here for sports', sportsTotal)
            for (const data of chartExpenses) {
              if (data.category === expense.category) {
                console.log(
                  'these are matching',
                  data.category,
                  expense.category
                )
                data.amount = sportsTotal
              }
            }
         // return clothingCount
          }
          if (expense.category.includes('entertainment')) {
            console.log('this is entertainment', expense)
            entertainmentTotal += expense.amount
            console.log('total count here for entertainment', entertainmentTotal)
            for (const data of chartExpenses) {
              if (data.category === expense.category) {
                console.log(
                  'these are matching',
                  data.category,
                  expense.category
                )
                data.amount = entertainmentTotal
              }
            }
          }
          if (expense.category.includes('healthcare')) {
            console.log('this is healthcare', expense)
            healthcareTotal += expense.amount
            console.log('total count here for healthcare', healthcareTotal)
            for (const data of chartExpenses) {
              if (data.category === expense.category) {
                console.log(
                  'these are matching',
                  data.category,
                  expense.category
                )
                data.amount = healthcareTotal
              }
            }
          }
          if (expense.category.includes('insurance')) {
            console.log('this is insurance', expense)
            insuranceTotal += expense.amount
            console.log('total count here for insurance', insuranceTotal)
            for (const data of chartExpenses) {
              if (data.category === expense.category) {
                console.log(
                  'these are matching',
                  data.category,
                  expense.category
                )
                data.amount = insuranceTotal
              }
            }
          }
          if (expense.category.includes('supplies')) {
            console.log('this is supplies', expense)
            suppliesTotal += expense.amount
            console.log('total count here for supplies', suppliesTotal)
            for (const data of chartExpenses) {
              if (data.category === expense.category) {
                console.log(
                  'these are matching',
                  data.category,
                  expense.category
                )
                data.amount = suppliesTotal
              }
            }
          }
          if (expense.category.includes('education')) {
            console.log('this is education', expense)
            educationTotal += expense.amount
            console.log('total count here for education', educationTotal)
            for (const data of chartExpenses) {
              if (data.category === expense.category) {
                console.log(
                  'these are matching',
                  data.category,
                  expense.category
                )
                data.amount = educationTotal
              }
            }
          }
          if (expense.category.includes('debt')) {
            console.log('this is debt', expense)
            debtTotal += expense.amount
            console.log('total count here for debt', debtTotal)
            for (const data of chartExpenses) {
              if (data.category === expense.category) {
                console.log(
                  'these are matching',
                  data.category,
                  expense.category
                )
                data.amount = debtTotal
              }
            }
          }
          if (expense.category.includes('savings')) {
            console.log('this is savings', expense)
            savingsTotal += expense.amount
            console.log('total count here for savings', savingsTotal)
            for (const data of chartExpenses) {
              if (data.category === expense.category) {
                console.log(
                  'these are matching',
                  data.category,
                  expense.category
                )
                data.amount = savingsTotal
              }
            }
          }
          if (expense.category.includes('holiday')) {
            console.log('this is holiday', expense)
            holidayTotal += expense.amount
            console.log('total count here for holiday', holidayTotal)
            for (const data of chartExpenses) {
              if (data.category === expense.category) {
                console.log(
                  'these are matching',
                  data.category,
                  expense.category
                )
                data.amount = holidayTotal
              }
            }
          }
          console.log('chart expenses for testing expenses', chartExpenses)
          setChartData(chartExpenses)
          console.log(chartData)

          // return clothingCount
        }
      }
    },
    [monthlyChart]
  )

  return [chartData]
}
