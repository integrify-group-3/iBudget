import { Request, Response, NextFunction } from 'express'
import moment from 'moment'

import { RequestUser } from '../middlewares/authorized'
import { ExpenseDocument } from '../models/Expense'
import Expense from '../models/Expense'
import ExpenseService from '../services/expense'
import CalendarService from '../services/calendar'
import { DayObj } from '../models/Calendar'

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
    res.json(calendar)
  } catch (error) {
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
    const foundYear = await CalendarService.findCalendarExpenseByYear(
      calendar,
      newExpense
    )
    const foundMonth = await CalendarService.findCalendarExpenseByMonth(
      foundYear,
      savedExpense
    )
    const foundDay = await CalendarService.findCalendarExpenseByDay(
      foundMonth,
      req.body.date
    )
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
    const updatedCalendar = await CalendarService.saveUpdatedCalendarExpense(
      calendar
    )
    res.json(updatedCalendar)
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
    const foundYear = await CalendarService.findCalendarExpenseByYear(
      calendar,
      updatedExpense
    )
    const foundMonth = await CalendarService.findCalendarExpenseByMonth(
      foundYear,
      updatedExpense
    )
    const foundDay = await CalendarService.findCalendarExpenseByDay(
      foundMonth,
      updatedExpense.date
    )
    CalendarService.updateCalendarExpense(expenseId, foundDay, updatedExpense)
    const updatedCalendar = await CalendarService.saveUpdatedCalendarExpense(
      calendar
    )
    res.json(updatedCalendar)
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
    const foundYear = await CalendarService.findCalendarExpenseByYear(
      calendar,
      expense
    )
    const foundMonth = await CalendarService.findCalendarExpenseByMonth(
      foundYear,
      expense
    )
    const foundDay = foundMonth.days.find((d: DayObj) => {
      return moment(d.day).format('LL') === moment(expense.date).format('LL')
    })
    if (!foundDay) {
      res.status(404).json({ msg: 'Not Found' })
    }
    const expenseIndex = foundDay.expenses.findIndex((e: ExpenseDocument) => {
      return e._id.equals(expenseId)
    })
    foundDay.expenses.splice(expenseIndex, 1)
    expense.delete()
    const updatedCalendar = await CalendarService.saveUpdatedCalendarExpense(
      calendar
    )
    res.json(updatedCalendar)
  } catch (error) {
    next(new NotFoundError('Expense not found', error))
  }
}
