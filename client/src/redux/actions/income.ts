import { Dispatch } from 'redux'
import axios from 'axios'
import moment from 'moment'

import {
  GET_INCOME,
  ADD_INCOME,
  Income,
  IncomeActions,
  CalendarScheduler,
  UPDATE_INCOME,
  DELETE_INCOME,
} from '../../types'

import { tokenConfig } from './user'

import { months } from '../../utils/dateValues'

export function getIncome(
  calendar: CalendarScheduler,
  income: Income[]
): IncomeActions {
  return {
    type: GET_INCOME,
    payload: {
      calendar,
      income,
    },
  }
}
export function addNewIncome(income: Income[]): IncomeActions {
  return {
    type: ADD_INCOME,
    payload: {
      income,
    },
  }
}

export function editIncome(income: Income[]): IncomeActions {
  return {
    type: UPDATE_INCOME,
    payload: {
      income,
    },
  }
}

export function deleteIncome(income: Income[]): IncomeActions {
  return {
    type: DELETE_INCOME,
    payload: {
      income,
    },
  }
}

export function fetchIncome() {
  const url = 'http://localhost:5000/api/v1/income'
  return async (dispatch: Dispatch, getState: any) => {
    const res = await axios.get(url, tokenConfig(getState))
    const date = new Date()
    const year = date.getFullYear()
    const currentIndex = date.getMonth()
    const data = await res.data
    const foundYear = await res.data.years.find((y: any) => y.year === year)
    const foundMonth = await foundYear.months.find(
      (month: any) => month.name === months[currentIndex]
    )
    dispatch(getIncome(data, foundMonth.income))
  }
}

export function addIncome(newIncome: any) {
  console.log(newIncome)
  return async (dispatch: Dispatch, getState: any) => {
    const url = 'http://localhost:5000/api/v1/income'
    const res = await axios.post(url, newIncome, tokenConfig(getState))
    console.log('from add income', res)
    const foundYear = await res.data.years.find(
      (y: any) => y.year === newIncome.year
    )
    const foundMonth = await foundYear.months.find(
      (month: any) => month.name === newIncome.month
    )
    console.log('from add income', foundMonth)
    dispatch(addNewIncome(foundMonth.income))
  }
}

const getMonthlyIncome = async (data: any, income: Income) => {
  const { year, month, date } = income
  try {
    const foundYear = await data.years.find(
      (y: CalendarScheduler) => y.year === year
    )
    const selectedMonth = await foundYear.months.find(
      (m: CalendarScheduler) => m.name === month
    )
    console.log('selected month', selectedMonth)

    return selectedMonth
  } catch (err) {
    console.log(err)
  }
}

export function updateIncome(income: Income, incomeId: string) {
  const url = `http://localhost:5000/api/v1/income/${incomeId}`
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const res = await axios.put(url, income, tokenConfig(getState))
      dispatch(editIncome(res.data))
    } catch (err) {
      console.log(err)
    }
  }
}

export function removeIncome(id: string, income: Income) {
  const url = `http://localhost:5000/api/v1/income/${id}`
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const res = await axios.delete(url, tokenConfig(getState))
      console.log(res)
       const foundMonth = await getMonthlyIncome(res.data, income)
       dispatch(deleteIncome(foundMonth.income))
    } catch (err) {
      console.log(err)
    }
  }
}
