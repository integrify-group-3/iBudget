import Calendar, { CalendarDocument } from '../models/Calendar'
import { ExpenseDocument } from '../models/Expense'

async function findCalendarByUserId(calendarId: string): Promise<CalendarDocument> {
    const calendar = await Calendar.findById(calendarId)
    if (!calendar) {
        throw new Error(`Calendar ${calendarId} not found`)
    }
    return calendar
}

function saveUpdatedCalendarIncome(calendar: CalendarDocument): Promise<CalendarDocument> {
    calendar.markModified('years')
    calendar.markModified('months')
    calendar.markModified('days')
    calendar.markModified('income')
    return calendar.save()
}

function saveUpdatedCalendarExpense(calendar: CalendarDocument): Promise<CalendarDocument> {
    calendar.markModified('years')
    calendar.markModified('months')
    calendar.markModified('days')
    calendar.markModified('expenses')
    return calendar.save()
}

function findCalendarByYear(calendar: CalendarDocument, newExpense: ExpenseDocument) {
    return calendar.years.find((y: CalendarDocument) => y.year === newExpense.year)
}

function findCalendarByMonth(foundYear: CalendarDocument, newExpense: ExpenseDocument) {
    return foundYear.months.find((month: CalendarDocument) => month.name === newExpense.month)
}

function findCalendarByDay(foundMonth: CalendarDocument, date: string) {
    return foundMonth.days.find((d: CalendarDocument) => d.day === date)
}

export default {
    findCalendarByUserId,
    saveUpdatedCalendarIncome,
    saveUpdatedCalendarExpense,
    findCalendarByYear,
    findCalendarByMonth,
    findCalendarByDay
}