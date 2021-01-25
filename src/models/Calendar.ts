import mongoose, { Document } from 'mongoose'
import { IncomeDocument } from '../models/Income'
import { ExpenseDocument } from './Expense'


export type CalendarDocument = Document & {
    id: string;
    years: any;
    year: number;
    months: any;
    month: string;
    name: string;
    income: IncomeDocument[];
    days: any;
    day: string;
    expenses: ExpenseDocument[];
    insertOne: Function;
    method: Function;
    insertMany: Function;
    save: () => void;
    markModified: Function;
}

export type DayObj = {
  day: string;
  expenses: ExpenseDocument[];
}

const calendarSchema = new mongoose.Schema({
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }, 
    years: {
      type: Array,
      required: true,
      year: {
        type: Number,
        required: true,
        months: [
          {
          type: Array,
          required: true,
          month: {
            type: Object,
            required: true,
            name: {
              type: String,
              required: true
            },
            income: [
              {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'income',
              }
            ],
            days: [
              {
              type: Array,
              required: true,
              day: {
                type: Object,
                required: true,
                expenses: [
                  {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'expense',
                  }
                ]
              }
            }
          ]  
          }  
          },
          
        ]
      }
    }
  })
  
  export default mongoose.model<CalendarDocument>('calendar', calendarSchema)
  