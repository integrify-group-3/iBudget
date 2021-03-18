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
const Expense_1 = __importDefault(require("../models/Expense"));
function createExpense(expense) {
    return expense.save();
}
function findExpenseById(expenseId) {
    return __awaiter(this, void 0, void 0, function* () {
        return Expense_1.default.findById(expenseId).then((expense) => {
            if (!expense) {
                throw new Error(`Expense ${expenseId} not found`);
            }
            return expense;
        });
    });
}
function updateExpense(expenseId, update) {
    return __awaiter(this, void 0, void 0, function* () {
        return Expense_1.default.findById(expenseId).then((expense) => {
            if (!expense) {
                throw new Error(`Expense ${expenseId} not found`);
            }
            if (update.category) {
                expense.category = update.category;
            }
            if (update.description) {
                expense.description = update.description;
            }
            if (update.amount) {
                expense.amount = update.amount;
            }
            //these cannot be edited in frontend, are just to test backend API
            if (update.month) {
                expense.month = update.month;
            }
            if (update.year) {
                expense.year = update.year;
            }
            return expense.save();
        });
    });
}
exports.default = {
    createExpense,
    findExpenseById,
    updateExpense,
};
//# sourceMappingURL=expense.js.map