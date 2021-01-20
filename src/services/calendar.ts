import Calendar, { CalendarDocument } from '../models/Calendar'

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

export default {
    findCalendarByUserId,
    saveUpdatedCalendarIncome,
    saveUpdatedCalendarExpense
}