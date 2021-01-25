import { Dispatch } from 'redux'
import axios from 'axios'
import moment from 'moment'

import {
  GET_EXPENSES,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  ExpensesActions,
  CalendarScheduler,
  DailyExpense,
  Expense,
} from '../../types'

import { tokenConfig } from './user'

import { months } from '../../utils/dateValues'

export function getExpenses(
  calendar: CalendarScheduler,
  dailyExpenses: DailyExpense,
  selectedMonth: any
): ExpensesActions {
  return {
    type: GET_EXPENSES,
    payload: {
      calendar,
      dailyExpenses,
      selectedMonth
    },
  }
}

export function addNewExpense(expense: any): ExpensesActions {
  return {
    type: ADD_EXPENSE,
    payload: {
      expense,
    },
  }
}

export function deleteExpense(expense: any): ExpensesActions {
    return {
      type: DELETE_EXPENSE,
      payload: {
        expense,
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
        (m: CalendarScheduler) => (m.name = month)
      )
      const selectedDay = await foundMonth.days.find(
        (d: CalendarScheduler) => {
           return moment(d.day).format('LL') === moment(date).format('LL')
        }
      )
      return selectedDay
  } catch(err) {
      console.log(err)
  }
  
}

export function fetchExpenses() {
  const url = 'http://localhost:5000/api/v1/expense'
  return async (dispatch: Dispatch, getState: any) => {
    const res = await axios.get(url, tokenConfig(getState))
    const date = new Date()
    const year = date.getFullYear()
    const currentIndex = date.getMonth()
    const data = await res.data
    // console.log(data)
    const foundYear = res.data.years.find((y: any) => y.year === year)
    for (const year of data.years) {
      if (year.year === foundYear.year) {
        const selectedMonth = await year.months.find(
          (month: any) => month.name === months[currentIndex]
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
          dispatch(getExpenses(res.data, dailyExp, selectedMonth))
        } else {
          dispatch(getExpenses(res.data, selectedDay, selectedMonth))
        }
      } else {
        console.log('no year on database')
      }
    }
  }
}

export function addExpense(expense: any) {
//   console.log('from actions add expense', expense)
  const url = 'http://localhost:5000/api/v1/expense'
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const res = await axios.post(url, expense, tokenConfig(getState))
      console.log(res.data)
      const foundDay = await getDailyExpenses(res.data, expense)
      console.log('found day to pass to reducer', foundDay)
      dispatch(addNewExpense(foundDay))
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
        } catch(err) {
            console.log(err)
        }

    }
}
