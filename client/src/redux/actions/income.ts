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
  const url = '/api/v1/income'
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
    const url = '/api/v1/income'
    const res = await axios.post(url, newIncome, tokenConfig(getState))
    console.log('from add income', res)
    const foundYear = await res.data.years.find(
      (y: any) => y.year === newIncome.year
    )
    const foundMonth = await foundYear.months.find(
      (month: any) => month.name === newIncome.month
    )
    dispatch(addNewIncome(foundMonth.income))
  }
}

export function updateIncome(income: Income, incomeId: string) {
  const url = `/api/v1/income/${incomeId}`
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const res = await axios.put(url, income, tokenConfig(getState))
      const foundYear = await res.data.years.find(
        (y: any) => y.year === income.year
      )
      const foundMonth = await foundYear.months.find(
        (month: any) => month.name === income.month
      )
      dispatch(editIncome(foundMonth.income))
    } catch (err) {
      console.log(err)
    }
  }
}

export function removeIncome(id: string, income: Income) {
  const url = `/api/v1/income/${id}`
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const res = await axios.delete(url, tokenConfig(getState))
      const foundYear = await res.data.years.find(
        (y: any) => y.year === income.year
      )
      const foundMonth = await foundYear.months.find(
        (month: any) => month.name === income.month
      )

      dispatch(deleteIncome(foundMonth.income))
    } catch (err) {
      console.log(err)
    }
  }
}
