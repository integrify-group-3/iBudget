import { Dispatch } from 'redux'
import axios from 'axios'

import {
    GET_INCOME,
    ADD_INCOME,
    Income,
    IncomeActions,
    CalendarScheduler
} from '../../types'

import {
    tokenConfig
} from './user'

import {
    months
} from '../../utils/dateValues'

export function getIncome(calendar: CalendarScheduler, income: Income[]): IncomeActions {
    return {
        type: GET_INCOME,
        payload: {
            calendar,
            income
        }
    }
}
export function addNewIncome(income: Income[]): IncomeActions {
    return {
        type: ADD_INCOME,
        payload: {
            income
        }
    }
}

export function fetchIncome() {
    const url = "http://localhost:5000/api/v1/income"
    return async (dispatch: Dispatch, getState: any) => {
        const res = await axios.get(url, tokenConfig(getState))
        const date = new Date();
        const year = date.getFullYear();
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
    return async(dispatch: Dispatch, getState: any) => {
        const url = 'http://localhost:5000/api/v1/income'
        const res = await axios.post(url, newIncome, tokenConfig(getState))
        console.log('from add income', res)
        const foundYear = await res.data.years.find((y: any) => y.year === newIncome.year)
        const foundMonth = await foundYear.months.find((month: any) => month.name === newIncome.month)
        console.log('from add income', foundMonth) 
        dispatch(addNewIncome(foundMonth.income))
    } 
}