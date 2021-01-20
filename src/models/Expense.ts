import mongoose, { Document } from 'mongoose'

export type ExpenseDocument = Document & {
    _id: string;
    category: string;
    description: string;
    amount: number;
    date: Date;
    month: string;
    year: number;
    delete: Function;
}

const expenseSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now 
    },
   
})

export default mongoose.model<ExpenseDocument>('expenses', expenseSchema)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               