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
const moment_1 = __importDefault(require("moment"));
const Expense_1 = __importDefault(require("../models/Expense"));
const expense_1 = __importDefault(require("../services/expense"));
const calendar_1 = __importDefault(require("../services/calendar"));
const apiError_1 = require("../helpers/apiError");
//@GET ROUTE
//@DESC gets all the calendar
//@ACCESS- PRIVATE
exports.getExpenses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const calendar = yield calendar_1.default.findCalendarByUserId(id);
        res.json(calendar);
    }
    catch (error) {
        next(new apiError_1.NotFoundError('Calendar Not Found', error));
    }
});
//@ROUTE POST api/v1/expense/
//@DESC Adds one expense
//@ACCESS: Private
exports.addExpense = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const newExpense = new Expense_1.default(req.body);
        const savedExpense = yield expense_1.default.createExpense(newExpense);
        const calendar = yield calendar_1.default.findCalendarByUserId(id);
        const foundYear = yield calendar_1.default.findCalendarExpenseByYear(calendar, newExpense);
        const foundMonth = yield calendar_1.default.findCalendarExpenseByMonth(foundYear, savedExpense);
        const foundDay = yield calendar_1.default.findCalendarExpenseByDay(foundMonth, req.body.date);
        if (!foundDay) {
            //if the day is found add the epxense to the day array
            const dayObj = {};
            dayObj.day = req.body.date;
            dayObj.expenses = [];
            dayObj.expenses.push(savedExpense);
            foundMonth.days.push(dayObj);
        }
        else {
            //if the day exists we push to the expenses array of the day
            foundDay.expenses.push(savedExpense);
        }
        const updatedCalendar = yield calendar_1.default.saveUpdatedCalendarExpense(calendar);
        res.json(updatedCalendar);
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(new apiError_1.InternalServerError('Internal Server Error', error));
        }
    }
});
//@ROUTE PUT api/v1/expense/:id
//@DESC Updates one expense
//@ACCESS: Private
exports.updateExpense = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expenseId = req.params.id;
        const update = req.body;
        const updatedExpense = yield expense_1.default.updateExpense(expenseId, update);
        const { id } = req.user;
        const calendar = yield calendar_1.default.findCalendarByUserId(id);
        const foundYear = yield calendar_1.default.findCalendarExpenseByYear(calendar, updatedExpense);
        const foundMonth = yield calendar_1.default.findCalendarExpenseByMonth(foundYear, updatedExpense);
        const foundDay = yield calendar_1.default.findCalendarExpenseByDay(foundMonth, updatedExpense.date);
        calendar_1.default.updateCalendarExpense(expenseId, foundDay, updatedExpense);
        const updatedCalendar = yield calendar_1.default.saveUpdatedCalendarExpense(calendar);
        res.json(updatedCalendar);
    }
    catch (error) {
        next(new apiError_1.NotFoundError('Expense not found', error));
    }
});
//@ROUTE DELETE api/v1/expense/:id
//@DESC Deletes one expense
//@ACCESS: Private
exports.deleteExpense = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expenseId = req.params.id;
        const expense = yield expense_1.default.findExpenseById(expenseId);
        const { id } = req.user;
        const calendar = yield calendar_1.default.findCalendarByUserId(id);
        const foundYear = yield calendar_1.default.findCalendarExpenseByYear(calendar, expense);
        const foundMonth = yield calendar_1.default.findCalendarExpenseByMonth(foundYear, expense);
        const foundDay = foundMonth.days.find((d) => {
            return moment_1.default(d.day).format('LL') === moment_1.default(expense.date).format('LL');
        });
        if (!foundDay) {
            res.status(404).json({ msg: 'Not Found' });
        }
        const expenseIndex = foundDay.expenses.findIndex((e) => {
            return e._id.equals(expenseId);
        });
        foundDay.expenses.splice(expenseIndex, 1);
        expense.delete();
        const updatedCalendar = yield calendar_1.default.saveUpdatedCalendarExpense(calendar);
        res.json(updatedCalendar);
    }
    catch (error) {
        next(new apiError_1.NotFoundError('Expense not found', error));
    }
});
//# sourceMappingURL=expense.js.map