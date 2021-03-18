"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Calendar_1 = __importDefault(require("../models/Calendar"));
function findCalendarByUserId(calendarId) {
    return __awaiter(this, void 0, void 0, function* () {
        const calendar = yield Calendar_1.default.findById(calendarId);
        if (!calendar) {
            throw new Error(`Calendar ${calendarId} not found`);
        }
        return calendar;
    });
}
function findCalendarIncomeByYear(calendar, income) {
    return calendar.years.find((y) => y.year === income.year);
}
function findCalendarIncomeByMonth(calendar, income) {
    return calendar.months.find((month) => month.name === income.month);
}
function updateCalendarIncome(incomeId, foundMonth, update) {
    const foundIncome = foundMonth.income.find((i) => i._id.equals(incomeId));
    console.log('found income', foundIncome);
    if (!foundIncome) {
        throw new Error();
    }
    if (update.category) {
        foundIncome.category = update.category;
    }
    if (update.description) {
        foundIncome.description = update.description;
    }
    if (update.amount) {
        foundIncome.amount = update.amount;
    }
    return foundIncome;
}
function saveUpdatedCalendarIncome(calendar) {
    calendar.markModified('years');
    calendar.markModified('months');
    calendar.markModified('days');
    calendar.markModified('income');
    return calendar.save();
}
function findCalendarExpenseByYear(calendar, expense) {
    return calendar.years.find((y) => y.year === expense.year);
}
function findCalendarExpenseByMonth(foundYear, expense) {
    return foundYear.months.find((month) => month.name === expense.month);
}
function findCalendarExpenseByDay(foundMonth, date) {
    return foundMonth.days.find((d) => d.day === date);
}
function updateCalendarExpense(expenseId, foundDay, update) {
    const foundExpense = foundDay.expenses.find((e) => e._id.equals(expenseId));
    console.log('found expense', foundExpense);
    if (!foundExpense) {
        throw new Error();
    }
    if (update.category) {
        foundExpense.category = update.category;
    }
    if (update.description) {
        foundExpense.description = update.description;
    }
    if (update.amount) {
        foundExpense.amount = update.amount;
    }
    return foundExpense;
}
function saveUpdatedCalendarExpense(calendar) {
    calendar.markModified('years');
    calendar.markModified('months');
    calendar.markModified('days');
    calendar.markModified('expenses');
    return calendar.save();
}
exports.default = {
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
};
//# sourceMappingURL=calendar.js.map