import { Dispatch } from 'redux'
import axios from 'axios'
import moment from 'moment'

import {
    GET_EXPENSES,
    ExpensesActions,
    CalendarScheduler,
    DailyExpense
} from '../../types'

import {
    tokenConfig
} from './user'

import {
    months
} from '../../utils/months'

export function getExpenses(calendar: CalendarScheduler, dailyExpenses: DailyExpense): ExpensesActions {
    return {
        type: GET_EXPENSES,
        payload: {
            calendar,
            dailyExpenses
        }
    }
}

export function fetchExpenses() {
    const url = "http://localhost:3000/api/v1/expense"
    return async (dispatch: Dispatch, getState: any) => {
        const res = await axios.get(url, tokenConfig(getState))
        const date = new Date()
        const year = date.getFullYear();
        const currentIndex = date.getMonth()
        const data = await res.data
        const foundYear = res.data.years.find((y: any) => y.year === year);
        for (const year of data.years) {
          if (year.year === foundYear.year) {
            const selectedMonth = await year.months.find(
              (month: any) => month.name === months[currentIndex]
            );
            console.log('found month here', selectedMonth);
            const selectedDay = await selectedMonth.days.find(
              (d: any) => moment(d.day).format("LL") === moment(date).format("LL")
            );
            console.log(selectedDay)
            if(!selectedDay) {
                console.log('is undefined')
                const day = moment(date).format("LL")
                const dailyExp = {
                    day,
                    expenses: []
                }
                console.log(dailyExp)
                dispatch(getExpenses(res.data, dailyExp))
            } else {
                dispatch(getExpenses(res.data, selectedDay))
            }
          } else {
            console.log("no year on database");
          }
        }
    }
}

