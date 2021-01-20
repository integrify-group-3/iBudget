import { Request, Response, NextFunction } from 'express'

import { RequestUser } from '../middlewares/authorized'
import Income from '../models/Income'
import IncomeService from '../services/income'
import CalendarService from '../services/calendar'
import { CalendarDocument } from '../models/Calendar'

import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'

//@GET ROUTE
//@DESC gets all the calendar
//@ACCESS- PRIVATE
export const getIncome = async (
  req: Request,
  res: Response,
  next: NextFunction
  ) => {
    try {
      const { id } = req.user as RequestUser
      const calendar = await CalendarService.findCalendarByUserId(id)
      res.json(calendar)
    }
    catch (error) {
      next(new NotFoundError('Calendar Not Found', error))
    }
  }

//@ROUTE POST api/v1/income/
//@DESC Adds one income
//@ACCESS: Private
export const addIncome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newIncome = new Income(req.body)
    await IncomeService.createIncome(newIncome)
    
    const { id } = req.user as RequestUser
    const calendar = await CalendarService.findCalendarByUserId(id)

        console.log('calendar here', calendar)
        for(const year of calendar?.years) {
            console.log('testing', newIncome.year)
          if (year.year === newIncome.year) {
            const foundMonth = year.months.find(
              (month: CalendarDocument) => month.name === newIncome.month
            )
            console.log('found month', foundMonth)
            if(!foundMonth) {
              return res.status(404).json({msg: 'Not found'})
            }
            foundMonth.income.push(newIncome)
            const updatedCalendar = await CalendarService.saveUpdatedCalendarIncome(calendar)
            res.json(updatedCalendar)
          }
        }
            
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}

//@ROUTE PUT api/v1/income/
//@DESC Updaets one income
//@ACCESS: Private
export const updateIncome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const incomeId = req.params.id
    const { id } = req.user as RequestUser
   
    const updatedIncome = await IncomeService.updateIncome(incomeId, update)

    const calendar = await CalendarService.findCalendarByUserId(id)
    for(const year of calendar.years) {
      if (year.year === update.year) {
        const foundMonth = year.months.find(
          (month: CalendarDocument) => month.name === update.month
        )              
        const foundIncome = foundMonth.income.find((i: any) => i._id.equals(incomeId))
        console.log('updated income', updatedIncome.amount)
        foundIncome._id === updatedIncome._id
        foundIncome.category = updatedIncome.category,
        foundIncome.description = updatedIncome.description,
        foundIncome.amount = updatedIncome.amount,
        foundIncome.month = updatedIncome.month,
        foundIncome.year = updatedIncome.year
        const updatedCalendar = await CalendarService.saveUpdatedCalendarIncome(calendar)
            res.json(updatedCalendar)
      }
    }                                                
  } catch (error) {
    next(new NotFoundError('Income not found', error))
  }
}

//@ROUTE POST api/v1/income/:id
//@DESC Deletes one income item
//@ACCESS: Private
export const deleteIncome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const incomeId = req.params.id
    const { id } = req.user as RequestUser
    const income = await IncomeService.findIncomeById(incomeId)
    const calendar = await CalendarService.findCalendarByUserId(id)

    for(const year of calendar.years) {
      if (year.year === income.year) {
        const foundMonth = year.months.find(
          (month: CalendarDocument) => month.name === income.month
        )              
        const foundIncomeIndex = foundMonth.income.findIndex((i: any) => i._id.equals(incomeId))

        foundMonth.income.splice(foundIncomeIndex, 1)
        console.log('found month after updating', foundMonth)
        income.delete()
        const updatedCalendar = await CalendarService.saveUpdatedCalendarIncome(calendar)
            res.json(updatedCalendar)
      }
    }
  } catch (error) {
    next(new NotFoundError('Movie not found', error))
  }
}



