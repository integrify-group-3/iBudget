import Expense, { ExpenseDocument } from '../models/Expense'

function createExpense(expense: ExpenseDocument): Promise<ExpenseDocument> {
  return expense.save()
}

async function findExpenseById(expenseId: string): Promise<ExpenseDocument> {
  return Expense.findById(expenseId).then((expense) => {
    if (!expense) {
      throw new Error(`Expense ${expenseId} not found`)
    }
    return expense
  })
}

async function updateExpense(
  expenseId: string,
  update: Partial<ExpenseDocument>
): Promise<ExpenseDocument> {
  return Expense.findById(expenseId).then((expense) => {
    if (!expense) {
      throw new Error(`Expense ${expenseId} not found`)
    }
    if (update.category) {
      expense.category = update.category
    }
    if (update.description) {
      expense.description = update.description
    }
    if (update.amount) {
      expense.amount = update.amount
    }
    //these cannot be edited in frontend, are just to test backend API
    if (update.month) {
      expense.month = update.month
    }
    if (update.year) {
      expense.year = update.year
    }
    return expense.save()
  })
}

export default {
  createExpense,
  findExpenseById,
  updateExpense,
}
