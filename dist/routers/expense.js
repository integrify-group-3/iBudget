"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorized_1 = require("../middlewares/authorized");
const expense_1 = require("../controllers/expense");
const router = express_1.default.Router();
router.get('/', authorized_1.isAuthorized, expense_1.getExpenses);
router.post('/', authorized_1.isAuthorized, expense_1.addExpense);
router.put('/:id', authorized_1.isAuthorized, expense_1.updateExpense);
router.delete('/:id', authorized_1.isAuthorized, expense_1.deleteExpense);
exports.default = router;
//# sourceMappingURL=expense.js.map