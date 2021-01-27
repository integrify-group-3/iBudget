import Calendar, { CalendarDocument } from '../models/Calendar'
import { ExpenseDocument } from '../models/Expense'
import { IncomeDocument } from '../models/Income'

async function findCalendarByUserId(
  calendarId: string
): Promise<CalendarDocument> {
  const calendar = await Calendar.findById(calendarId)
  if (!calendar) {
    throw new Error(`Calendar ${calendarId} not found`)
  }
  return calendar
}

function findCalendarIncomeByYear(
  calendar: CalendarDocument,
  income: IncomeDocument
) {
  return calendar.years.find((y: CalendarDocument) => y.year === income.year)
}

function findCalendarIncomeByMonth(
  calendar: CalendarDocument,
  income: IncomeDocument
) {
  return calendar.months.find(
    (month: CalendarDocument) => month.name === income.month
  )
}

function updateCalendarIncome(
    incomeId: string,
    foundMonth: CalendarDocument,
    update: Partial<IncomeDocument>
  ) {
    const foundIncome = foundMonth.income.find((i: IncomeDocument) =>
      i._id.equals(incomeId)
    )
    console.log('found income', foundIncome)
    if (!foundIncome) {
      throw new Error()
    }
    if (update.category) {
      foundIncome.category = update.category
    }
    if (update.description) {
      foundIncome.description = update.description
    }
    if (update.amount) {
      foundIncome.amount = update.amount
    }
    return foundIncome
  }
  
function saveUpdatedCalendarIncome(
  calendar: CalendarDocument
) {
  calendar.markModified('years')
  calendar.markModified('months')
  calendar.markModified('days')
  calendar.markModified('income')
  return calendar.save()
}

function findCalendarExpenseByYear(
  calendar: CalendarDocument,
  expense: ExpenseDocument
) {
  return calendar.years.find((y: CalendarDocument) => y.year === expense.year)
}

function findCalendarExpenseByMonth(
  foundYear: CalendarDocument,
  expense: ExpenseDocument
) {
  return foundYear.months.find(
    (month: CalendarDocument) => month.name === expense.month
  )
}

function findCalendarExpenseByDay(
  foundMonth: CalendarDocument,
  date: string
) {
  return foundMonth.days.find((d: CalendarDocument) => d.day === date)
}

function updateCalendarExpense(
    expenseId: string,
    foundDay: CalendarDocument,
    update: Partial<ExpenseDocument>
  ) {
    const foundExpense = foundDay.expenses.find((e: ExpenseDocument) =>
      e._id.equals(expenseId)
    )
    console.log('found expense', foundExpense)
    if (!foundExpense) {
      throw new Error()
    }
    if (update.category) {
      foundExpense.category = update.category
    }
    if (update.description) {
      foundExpense.description = update.description
    }
    if (update.amount) {
      foundExpense.amount = update.amount
    }
    return foundExpense
  }

  
function saveUpdatedCalendarExpense(
  calendar: CalendarDocument
) {
  calendar.markModified('years')
  calendar.markModified('months')
  calendar.markModified('days')
  calendar.markModified('expenses')
  return calendar.save()
}

export default {
  findCalendarByUserId,
  findCalendarIncomeByYear,
  findCalendarIncomeByMonth,
  updateCalendarIncome,
  saveUpdatedCalendarIncome,
  findCalendarExpenseByYear,
  findCalendarExpenseByMonth,
  findCalendarExpenseByDay,
  updateCalendarExpense,
  saveUpdatedCalendarExpense,
}
