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

import { date, year, currentMonth } from '../../utils/dateValues'

export function getExpenses(
  calendar: CalendarScheduler,
  selectedYear: any,
  selectedMonth: any,
  dailyExpenses: DailyExpense
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

export function addNewExpense(
  calendar: CalendarScheduler,
  expense: DailyExpense,
  monthlyExpense: any
): ExpensesActions {
  return {
    type: ADD_EXPENSE,
    payload: {
      calendar,
      expense,
      monthlyExpense,
    },
  }
}

export function editExpense(
  calendar: CalendarScheduler,
  expense: DailyExpense,
  monthlyExpense: any
): ExpensesActions {
  return {
    type: EDIT_EXPENSE,
    payload: {
      calendar,
      expense,
      monthlyExpense,
    },
  }
}

export function deleteExpense(
  calendar: CalendarScheduler,
  expense: DailyExpense,
  monthlyExpense: any
): ExpensesActions {
  return {
    type: DELETE_EXPENSE,
    payload: {
      calendar,
      expense,
      monthlyExpense,
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

const getYearlyExpenses = async (data: any, expense: Expense) => {
  const { year } = expense
    const foundYear = await data.years.find(
      (y: CalendarScheduler) => y.year === year
    )
    return foundYear
}

const getMonthlyExpenses = async (data: any, expense: Expense) => {
  const { month } = expense
    const foundMonth = await data.months.find(
      (m: CalendarScheduler) => m.name === month
    )
    return foundMonth
}

const getDailyExpenses = async (data: any, expense: Expense) => {
  const { date } = expense
    const selectedDay = await data.days.find((d: CalendarScheduler) => {
      return moment(d.day).format('LL') === moment(date).format('LL')
    })
    return selectedDay
}

export function fetchExpenses() {
  const url = '/api/v1/expense'
  return async (dispatch: Dispatch, getState: any) => {
    const res = await axios.get(url, tokenConfig(getState))
    const data = await res.data
    // console.log(data)
    const foundYear = res.data.years.find((y: any) => y.year === year)
    for (const year of data.years) {
      if (year.year === foundYear.year) {
        //this will set the expenses to the current date when fetching data
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
  const url = '/api/v1/expense'
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const res = await axios.post(url, expense, tokenConfig(getState))
      //we compare all the data on the calendar with the expense data, year, month and day
      const foundYear = await getYearlyExpenses(res.data, expense)
      const foundMonth = await getMonthlyExpenses(foundYear, expense)
      const foundDay = await getDailyExpenses(foundMonth, expense)
      // console.log('found day to pass to reducer', foundDay)
      dispatch(addNewExpense(res.data, foundDay, foundMonth))
    } catch (err) {
      console.log(err)
    }
  }
}

export function updateExpense(expense: Expense, expenseId: string) {
  // console.log('from actions edit expense', expense)
  const url = `/api/v1/expense/${expenseId}`
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const res = await axios.put(url, expense, tokenConfig(getState))
      const foundYear = await getYearlyExpenses(res.data, expense)
      const foundMonth = await getMonthlyExpenses(foundYear, expense)
      const foundDay = await getDailyExpenses(foundMonth, expense)
      dispatch(editExpense(res.data, foundDay, foundMonth))
    } catch (err) {
      console.log(err)
    }
  }
}

export function removeExpense(id: string, expense: Expense) {
  console.log('from actions add expense', id, expense)
  const url = `/api/v1/expense/${id}`
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const res = await axios.delete(url, tokenConfig(getState))
      const foundYear = await getYearlyExpenses(res.data, expense)
      const foundMonth = await getMonthlyExpenses(foundYear, expense)
      const foundDay = await getDailyExpenses(foundMonth, expense)
      dispatch(deleteExpense(res.data, foundDay, foundMonth))
    } catch (err) {
      console.log(err)
    }
  }
}

export function getTotalExpenses(monthExpenses: any) {
  return async (dispatch: Dispatch) => {
    try {
      let count = 0
      if (monthExpenses !== undefined) {
        for (const dayIndex in monthExpenses.days) {
          const { expenses } = monthExpenses.days[dayIndex]
          for (const expense of expenses) {
            count += expense.amount
          }
        }
        dispatch(calculateTotalExpenses(count))
      }
    } catch (err) {
      console.log(err)
    }
  }
}
