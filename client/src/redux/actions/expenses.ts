import { Dispatch } from 'redux'
import axios from 'axios'
import moment from 'moment'

import {
  GET_EXPENSES,
  ADD_EXPENSE,
  EDIT_EXPENSE,
  DELETE_EXPENSE,
  CALCULATE_TOTALEXPENSES,
  ExpensesActions,
  CalendarScheduler,
  DailyExpense,
  Expense,
} from '../../types'

import { tokenConfig } from './user'

import { date, year, months, currentMonth } from '../../utils/dateValues'

export function getExpenses(
  calendar: CalendarScheduler,
  selectedYear: any,
  selectedMonth: any,
  dailyExpenses: DailyExpense,
): ExpensesActions {
  return {
    type: GET_EXPENSES,
    payload: {
      calendar,
      selectedYear,
      selectedMonth,
      dailyExpenses,
    },
  }
}

export function addNewExpense(expense: DailyExpense, monthlyExpense: any): ExpensesActions {
  return {
    type: ADD_EXPENSE,
    payload: {
      expense,
      monthlyExpense
    },
  }
}

export function editExpense(expense: DailyExpense): ExpensesActions {
  return {
    type: EDIT_EXPENSE,
    payload: {
      expense,
    },
  }
}

export function deleteExpense(expense: DailyExpense): ExpensesActions {
  return {
    type: DELETE_EXPENSE,
    payload: {
      expense,
    },
  }
}

export function calculateTotalExpenses(total: number): ExpensesActions {
  return {
    type: CALCULATE_TOTALEXPENSES,
    payload: {
      total,
    },
  }
}

const getDailyExpenses = async (data: any, expense: Expense) => {
  const { year, month, date } = expense
  try {
    const foundYear = await data.years.find(
      (y: CalendarScheduler) => y.year === year
    )
    const foundMonth = await foundYear.months.find(
      (m: CalendarScheduler) => (m.name === month)
    )
    const selectedDay = await foundMonth.days.find((d: CalendarScheduler) => {
      return moment(d.day).format('LL') === moment(date).format('LL')
    })
    // console.log('selected day', selectedDay)
    return selectedDay
  } catch (err) {
    console.log(err)
  }
}

const getYearlyExpenses = async (data: any, expense: Expense) => {
  const { year } = expense
  try {
    const foundYear = await data.years.find(
      (y: CalendarScheduler) => y.year === year
    )
    // console.log('selected day', selectedDay)
    return foundYear
  } catch (err) {
    console.log(err)
  }
}

const getMonthlyExpenses = async (data: any, expense: Expense) => {
  const { month } = expense
  try {
    const foundMonth = await data.months.find(
      (m: CalendarScheduler) => (m.name === month)
    )
    // console.log('selected day', selectedDay)
    return foundMonth
  } catch (err) {
    console.log(err)
  }
}

export function fetchExpenses() {
  const url = 'http://localhost:5000/api/v1/expense'
  return async (dispatch: Dispatch, getState: any) => {
    const res = await axios.get(url, tokenConfig(getState))
    const data = await res.data
    // console.log(data)
    const foundYear = res.data.years.find((y: any) => y.year === year)
    for (const year of data.years) {
      if (year.year === foundYear.year) {
        const selectedMonth = await year.months.find(
          (month: any) => month.name === currentMonth
        )
        // console.log('found month here', selectedMonth)
        const selectedDay = await selectedMonth.days.find(
          (d: any) => moment(d.day).format('LL') === moment(date).format('LL')
        )
        // console.log(selectedDay)
        if (!selectedDay) {
          const day = moment(date).format('LL')
          const dailyExp = {
            day,
            expenses: [],
          }
          dispatch(getExpenses(res.data, foundYear, selectedMonth, dailyExp))
        } else {
          dispatch(getExpenses(res.data, foundYear, selectedMonth, selectedDay))
        }
      } else {
        console.log('no year on database')
      }
    }
  }
}

export function addExpense(expense: Expense) {
  console.log('from actions add expense', expense)
  const url = 'http://localhost:5000/api/v1/expense'
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const res = await axios.post(url, expense, tokenConfig(getState))
      // console.log(res)
      const foundYear = await getYearlyExpenses(res.data, expense)
      const foundMonth = await getMonthlyExpenses(foundYear, expense)
      console.log('found month', foundMonth)
      const foundDay = await getDailyExpenses(res.data, expense)
      // console.log('found day to pass to reducer', foundDay)
      dispatch(addNewExpense(foundDay, foundMonth))
    } catch (err) {
      console.log(err)
    }
  }
}

export function updateExpense(expense: Expense, expenseId: string) {
  // console.log('from actions edit expense', expense)
  const url = `http://localhost:5000/api/v1/expense/${expenseId}`
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const res = await axios.put(url, expense, tokenConfig(getState))
      const foundDay = await getDailyExpenses(res.data, expense)
      dispatch(editExpense(foundDay))
    } catch (err) {
      console.log(err)
    }
  }
}

export function removeExpense(id: string, expense: Expense) {
  console.log('from actions add expense', id, expense)
  const url = `http://localhost:5000/api/v1/expense/${id}`
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const res = await axios.delete(url, tokenConfig(getState))
      const foundDay = await getDailyExpenses(res.data, expense)
      dispatch(deleteExpense(foundDay))
    } catch (err) {
      console.log(err)
    }
  }
}

export function getTotalExpenses(monthExpenses: any) {
  return async (dispatch: Dispatch) => {
    try {
      let count = 0
        if(monthExpenses !== undefined) {
            for(const dayIndex in monthExpenses.days) {
                const { expenses } = monthExpenses.days[dayIndex]
                for(const expense of expenses) {
                    count += expense.amount
                }    
            }
            dispatch(calculateTotalExpenses(count)) 
        }
    }
    catch(err) {
      console.log(err)
    }
  }
}
