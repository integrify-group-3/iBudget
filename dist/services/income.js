"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Income_1 = __importDefault(require("../models/Income"));
function createIncome(income) {
    return income.save();
}
function findIncomeById(incomeId) {
    return Income_1.default.findById(incomeId)
        .then((income) => {
        if (!income) {
            throw new Error(`Income ${incomeId} not found`);
        }
        return income;
    });
}
function updateIncome(incomeId, update) {
    return Income_1.default.findById(incomeId)
        .then((income) => {
        if (!income) {
            throw new Error(`Income ${incomeId} not found`);
        }
        if (update.category) {
            income.category = update.category;
        }
        if (update.description) {
            income.description = update.description;
        }
        if (update.amount) {
            income.amount = update.amount;
        }
        //these cannot be edited in frontend, are just to test backend API
        if (update.month) {
            income.month = update.month;
        }
        if (update.year) {
            income.year = update.year;
        }
        return income.save();
    });
}
exports.default = {
    createIncome,
    findIncomeById,
    updateIncome
};
//# sourceMappingURL=income.js.map