import { Request, Response, NextFunction } from 'express'

import { RequestUser } from '../middlewares/authorized'
import Expense from '../models/Expense'
import ExpenseService from '../services/expense'
import CalendarService from '../services/calendar'
import { CalendarDocument, DayObj } from '../models/Calendar'
import moment from 'moment'

import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'

//@GET ROUTE
//@DESC gets all the calendar
//@ACCESS- PRIVATE
export const getExpenses = async (
  req: Request,
  res: Response,
  next: NextFunction
  ) => {
    try {
      const { id } = req.user as RequestUser
      const calendar = await CalendarService.findCalendarByUserId(id)
      console.log('calendar for expense', calendar)
      res.json(calendar)
    }
    catch (error) {
      next(new NotFoundError('Calendar Not Found', error))
    }
  }

//@ROUTE POST api/v1/expense/
//@DESC Adds one expense
//@ACCESS: Private
export const addExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user as RequestUser
    const newExpense = new Expense(req.body)
    const savedExpense = await ExpenseService.createExpense(newExpense)
    const calendar = await CalendarService.findCalendarByUserId(id)
    const foundYear = await CalendarService.findCalendarByYear(calendar, newExpense)
    // console.log('found year', foundYear)
    const foundMonth = await CalendarService.findCalendarByMonth(foundYear, savedExpense)
    console.log('found month', foundMonth)
    const foundDay =  await CalendarService.findCalendarByDay(foundMonth, req.body.date)
    console.log('found day', foundDay)
    if (!foundDay) {
      //if the day is found add the epxense to the day array
      const dayObj = {} as DayObj
      dayObj.day = req.body.date
      dayObj.expenses = []
      dayObj.expenses.push(savedExpense)
      foundMonth.days.push(dayObj)
    } else {
      //if the day exists we push to the expenses array of the day
      foundDay.expenses.push(savedExpense)
    }
    const updatedCalendar = await CalendarService.saveUpdatedCalendarExpense(calendar)
    res.json(updatedCalendar)
    /*
    for (const year of calendar.years) {
      if (year.year === newExpense.year) {
        console.log('year here', year.months)
        for (const month of year.months) {
          if (month.name === savedExpense.month) {
            //check if the day already exists
            const foundDay = month.days.find((d: CalendarDocument) => {
              return d.day === req.body.date
            })
            if (!foundDay) {
              //if the day is found add the epxense to the day array
              const dayObj = {} as DayObj
              dayObj.day = req.body.date
              dayObj.expenses = []
              dayObj.expenses.push(savedExpense)
              month.days.push(dayObj)
            } else {
              //if the day exists we push to the expenses array of the day
              foundDay.expenses.push(savedExpense)
            }
            const updatedCalendar = await CalendarService.saveUpdatedCalendarExpense(calendar)
            res.json(updatedCalendar)
          }
        }
      }
    }*/
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}

//@ROUTE PUT api/v1/expense/:id
//@DESC Updates one expense
//@ACCESS: Private
export const updateExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const expenseId = req.params.id
    const update = req.body
    const updatedExpense = await ExpenseService.updateExpense(expenseId, update)
    const { id } = req.user as RequestUser
    const calendar = await CalendarService.findCalendarByUserId(id)
    for (const year of calendar.years) {
      if (year.year === updatedExpense.year) {
        for (const month of year.months) {
          if (month.name === updatedExpense.month) {
            //find the date in the calendar that matches the updated expense
            const foundDay = month.days.find((d: CalendarDocument) => {
              return d.day === updatedExpense.date
            })
            const foundExpense = foundDay.expenses.find((e: any) => {
              return e._id.equals(expenseId)
            })
            foundExpense.category = updatedExpense.category
            foundExpense.description = updatedExpense.description
            foundExpense.amount = updatedExpense.amount
            const updatedCalendar = await CalendarService.saveUpdatedCalendarExpense(calendar)
            res.json(updatedCalendar)
          }
        }
      }
    }
  } catch (error) {
    next(new NotFoundError('Expense not found', error))
  }
}

//@ROUTE DELETE api/v1/expense/:id
//@DESC Deletes one expense
//@ACCESS: Private
export const deleteExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const expenseId = req.params.id
    const expense = await ExpenseService.findExpenseById(expenseId)
    const { id } = req.user as RequestUser
    const calendar = await CalendarService.findCalendarByUserId(id)

    for (const year of calendar.years) {
      if (year.year === expense?.year) {
        for (const month of year.months) {
          if (month.name === expense.month) {
            // find the day in the calendar that matches the deleted expense
            const foundDay = month.days.find((d: any) => {
              return (
                moment(d.day).format('LL') === moment(expense.date).format('LL')
              )
            })
            if (!foundDay) {
              res.status(404).json({ msg: 'Not Found' })
            }
            const expenseIndex = foundDay.expenses.findIndex((e: any) => {
              return e._id.equals(expenseId)
            })
            foundDay.expenses.splice(expenseIndex, 1)

            expense.delete()
            const updatedCalendar = await CalendarService.saveUpdatedCalendarExpense(calendar)
            res.json(updatedCalendar)
          }
        }
      }
    }
  } catch (error) {
    next(new NotFoundError('Expense not found', error))
  }
}
