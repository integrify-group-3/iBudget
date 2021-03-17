import { Dispatch } from 'redux'
import axios from 'axios'

import {
  GET_INCOME,
  ADD_INCOME,
  Income,
  IncomeActions,
  UPDATE_INCOME,
  DELETE_INCOME,
  TOTAL_MONTHLY_INCOME,
  CLEAR_UPDATING
} from '../../types/income'

import { CalendarScheduler } from '../../types/index'

import { tokenConfig } from './user'

import { year, currentMonth } from '../../utils/dateValues'

export function getIncome(
  calendar: CalendarScheduler,
  income: Income[],
  selectedMonth: any,
  selectedYear: any
): IncomeActions {
  return {
    type: GET_INCOME,
    payload: {
      calendar,
      income,
      selectedMonth,
      selectedYear,
    },
  }
}
export function addNewIncome(income: Income[], monthlyData: any): IncomeActions {
  return {
    type: ADD_INCOME,
    payload: {
      income,
      monthlyData
    },
  }
}

export function editIncome(income: Income[], monthlyData: any): IncomeActions {
  return {
    type: UPDATE_INCOME,
    payload: {
      income,
      monthlyData
    },
  }
}

export function deleteIncome(income: Income[], monthlyData: any): IncomeActions {
  return {
    type: DELETE_INCOME,
    payload: {
      income,
      monthlyData
    },
  }
}

export function totalMonthlyIncome(total: number): IncomeActions {
  return {
    type: TOTAL_MONTHLY_INCOME,
    payload: {
      total
    },
  }
}

export function clearUpdate(): IncomeActions {
  return {
    type: CLEAR_UPDATING, 
  }
}

export function fetchIncome() {
  const url = '/api/v1/income'
  return async (dispatch: Dispatch, getState: any) => {
    const res = await axios.get(url, tokenConfig(getState))
    const data = await res.data
    const foundYear = await res.data.years.find((y: any) => y.year === year)
    const foundMonth = await foundYear.months.find(
      (month: any) => month.name === currentMonth
    )
    //console.log('foundYear from income actions', foundYear)

    dispatch(getIncome(data, foundMonth.income, foundMonth, foundYear))
  }
}

const getYearIncome = async (data: any, income: Income) => {
  const { year } = income
  const foundYear = await data.years.find(
    (y: CalendarScheduler) => y.year === year
  )
  return foundYear
}

const getMonthIncome = async (data: any, income: Income) => {
  const { month } = income
  const foundYear = await data.months.find(
    (m: CalendarScheduler) => m.name === month
  )
  return foundYear
}

export function addIncome(newIncome: any) {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const url = '/api/v1/income'
      const res = await axios.post(url, newIncome, tokenConfig(getState))
      const foundYear = await getYearIncome(res.data, newIncome)
      const foundMonth = await getMonthIncome(foundYear, newIncome)
      dispatch(addNewIncome(foundMonth.income, foundMonth))
    } catch (err) {
      console.log(err)
    }
  }
}

export function updateIncome(income: Income, incomeId: string) {
  const url = `/api/v1/income/${incomeId}`
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const res = await axios.put(url, income, tokenConfig(getState))
      const foundYear = await getYearIncome(res.data, income)
      const foundMonth = await getMonthIncome(foundYear, income)
      dispatch(editIncome(foundMonth.income, foundMonth))
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
      const foundYear = await getYearIncome(res.data, income)
      const foundMonth = await getMonthIncome(foundYear, income)
      dispatch(deleteIncome(foundMonth.income, foundMonth))
    } catch (err) {
      console.log(err)
    }
  }
}

export function getTotalMonthlyIncome(monthlyData: any) {
  return (dispatch: Dispatch) => {
    try {
      let count: any = 0
      if (monthlyData !== undefined) {
        // console.log('from getTotalMonthlyIncome action', monthlyData)
        for (const income of monthlyData.income) {
          const { amount } = income
          count += amount
        }
        dispatch(totalMonthlyIncome(count))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export default function clearUpdating() {
  return (dispatch: Dispatch) => {
    dispatch(clearUpdate())
  }
}
