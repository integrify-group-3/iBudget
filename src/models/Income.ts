import mongoose, { Document } from 'mongoose'

export type IncomeDocument = Document & {
    _id: string;
    category: string;
    description: string;
    amount: number;
    month: string;
    year: number;
    delete: Function;
}

const incomeSchema = new mongoose.Schema({
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

export default mongoose.model<IncomeDocument>('income', incomeSchema)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               