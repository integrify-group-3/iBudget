import Income, { IncomeDocument } from '../models/Income'

function createIncome(income: IncomeDocument): Promise<IncomeDocument> {
  return income.save()
}

function findIncomeById(incomeId: string): Promise<IncomeDocument> {
    return Income.findById(incomeId)
    .then((income) => {
        if(!income) {
            throw new Error(`Income ${incomeId} not found`)
        }
        return income
    })
}

function updateIncome(incomeId: string, update: Partial<IncomeDocument>): Promise<IncomeDocument> {
    return Income.findById(incomeId)
    .then((income) => {
        if(!income) {
            throw new Error(`Income ${incomeId} not found`)
        }
        if(update.category) {
            income.category = update.category
        }
        if(update.description) {
            income.description = update.description
        }
        if(update.amount) {
            income.amount = update.amount
        }
        if(update.month) {
            income.month = update.month
        }
        if(update.year) {
            income.year = update.year
        }
        return income.save()
    })
}

export default {
    createIncome,
    findIncomeById,
    updateIncome
}