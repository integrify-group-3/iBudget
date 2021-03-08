import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

import {
  AppState,
  CalendarScheduler,
  DateView,
  ViewMonth
} from '../types'
import {
  DailyExpense,
  Expense,
} from '../types/expenses'
import { fetchExpenses } from '../redux/actions/expenses'
import { year, months, currentMonth } from '../utils/dateValues'

export default function useMonthlyExpenses(
  // e: any
  ) {
  const dispatch = useDispatch()
  const expenses = useSelector(
    (state: AppState) => state.expenses.dailyExpenses
  )
  const calendar = useSelector((state: AppState) => state.expenses.calendar)
  const selectedMonth = useSelector(
    (state: AppState) => state.expenses.selectedMonth
  )

  const [expensesData, setExpensesData] = useState({day: '', expenses: []} as DailyExpense)
  const [calendarData, setCalendarData] = useState({} as CalendarScheduler)
  const [defaultMonth, setDefaultMonth] = useState()
  const [err, setErr] = useState(null)
  const [dateView, setDateView] = useState({
    year: 0,
    month: '',
  } as DateView)
  //trying to move these from Expense to hook

  const [viewMonth, setViewMonth] = useState({
    name: '',
    income: [],
    days: [{ day: '', expenses: [] }],
  } as ViewMonth)
  const switchMonth = {} as ViewMonth

  const [dailyExpense, setDailyExpense] = useState({} as DailyExpense)

  const [expense, setExpense] = useState({
    category: '',
    description: '',
    amount: 0,
    date: '',
    month: '',
    year: 0,
  } as Expense)
  // console.log(date, schedule)
  const { category, description, amount } = expense

  useEffect(() => {
    dispatch(fetchExpenses())
  }, [dispatch])

  //this function is the equivalent of showdayonclick on expenses but keeps throwing an infinite loop
  /*const showCalendarDay = useCallback(
    async(e) => {
      try {
        const selectedYear = await e.getFullYear()
        const currentIndex = await e.getMonth()
        const clickedMonth = months[currentIndex]
        console.log(selectedYear, clickedMonth)
        //this will set the day, year and month to the expense in case we will add a new new one for the day
        //we should not modify the state directly but now it's to make it work
        dateView.year = selectedYear
        dateView.month = months[currentIndex]
        console.log(dateView)
        //this is the corret way
        // setDateView({year: selectedYear, month: months[currentIndex]})
        // console.log('date view', dateView)
        setExpense({
          category: '',
          description: '',
          amount: 0,
          date: moment(e).format('LL'),
          year: selectedYear,
          month: clickedMonth,
        })
        // console.log('expense from selectDay', expense)
        // console.log('after setting date view', calendarData.years)
        const foundYear = await calendarData.years.find(
          (y: CalendarScheduler) => y.year === selectedYear
        )
        const foundMonth = await foundYear.months.find(
          (month: any) => month.name === clickedMonth
        )
        console.log(foundMonth)
      }
      catch(err) {

      }
     
    },
    [expense, dateView, calendarData],
  )*/

  //this function is throwing an infinite loop
  /*
  useEffect(() => {
    showCalendarDay(e)
  }, [showCalendarDay, e])*/

 
  useEffect(() => {
    //this use effect will update at every state change 
    const errMessage = 'There was a problem loading the data. Refresh the page.'
    if (err) {
      setErr(errMessage as any)
    }
    // console.log('I run every time expenses are updated')
    setExpensesData(expenses)
    // console.log('from useExpenses expenses', expensesData)
    setCalendarData(calendar)
    // console.log('from useExpenses calendar', calendarData)
    setDefaultMonth(selectedMonth)
    // console.log('from useExpenses viewMonth', defaultMonth)
    setDateView({ year: year, month: currentMonth })
  }, [expenses, calendar, calendarData, selectedMonth, defaultMonth])
  
  return [
    err,
    expensesData,
    calendar,
    dateView,
    selectedMonth
  ]
}
