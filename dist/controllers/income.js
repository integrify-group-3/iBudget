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
const Income_1 = __importDefault(require("../models/Income"));
const income_1 = __importDefault(require("../services/income"));
const calendar_1 = __importDefault(require("../services/calendar"));
const apiError_1 = require("../helpers/apiError");
//@GET ROUTE
//@DESC gets all the calendar
//@ACCESS- PRIVATE
exports.getIncome = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const calendar = yield calendar_1.default.findCalendarByUserId(id);
        res.json(calendar);
    }
    catch (error) {
        next(new apiError_1.NotFoundError('Calendar Not Found', error));
    }
});
//@ROUTE POST api/v1/income/
//@DESC Adds one income
//@ACCESS: Private
exports.addIncome = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newIncome = new Income_1.default(req.body);
        const savedIncome = yield income_1.default.createIncome(newIncome);
        console.log('income', savedIncome);
        const { id } = req.user;
        const calendar = yield calendar_1.default.findCalendarByUserId(id);
        const foundYear = yield calendar_1.default.findCalendarIncomeByYear(calendar, savedIncome);
        const foundMonth = yield calendar_1.default.findCalendarIncomeByMonth(foundYear, savedIncome);
        if (!foundMonth) {
            return res.status(404).json({ msg: 'Not found' });
        }
        foundMonth.income.push(newIncome);
        const updatedCalendar = yield calendar_1.default.saveUpdatedCalendarIncome(calendar);
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
//@ROUTE PUT api/v1/income/
//@DESC Updaets one income
//@ACCESS: Private
exports.updateIncome = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = req.body;
        const incomeId = req.params.id;
        const { id } = req.user;
        const updatedIncome = yield income_1.default.updateIncome(incomeId, update);
        const calendar = yield calendar_1.default.findCalendarByUserId(id);
        const foundYear = yield calendar_1.default.findCalendarIncomeByYear(calendar, updatedIncome);
        const foundMonth = yield calendar_1.default.findCalendarIncomeByMonth(foundYear, updatedIncome);
        calendar_1.default.updateCalendarIncome(incomeId, foundMonth, updatedIncome);
        const updatedCalendar = yield calendar_1.default.saveUpdatedCalendarIncome(calendar);
        res.json(updatedCalendar);
    }
    catch (error) {
        next(new apiError_1.NotFoundError('Income not found', error));
    }
});
//@ROUTE POST api/v1/income/:id
//@DESC Deletes one income item
//@ACCESS: Private
exports.deleteIncome = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const incomeId = req.params.id;
        const { id } = req.user;
        const income = yield income_1.default.findIncomeById(incomeId);
        const calendar = yield calendar_1.default.findCalendarByUserId(id);
        const foundYear = yield calendar_1.default.findCalendarIncomeByYear(calendar, income);
        const foundMonth = yield calendar_1.default.findCalendarIncomeByMonth(foundYear, income);
        const foundIncomeIndex = foundMonth.income.findIndex((i) => i._id.equals(incomeId));
        foundMonth.income.splice(foundIncomeIndex, 1);
        income.delete();
        const updatedCalendar = yield calendar_1.default.saveUpdatedCalendarIncome(calendar);
        res.json(updatedCalendar);
    }
    catch (error) {
        next(new apiError_1.NotFoundError('Movie not found', error));
    }
});
//# sourceMappingURL=income.js.map