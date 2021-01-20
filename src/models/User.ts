import mongoose, { Document } from 'mongoose'
import { CalendarDocument } from '../models/Calendar'

export type UserDocument = Document & {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    registeredAt: Date;
    calendar: CalendarDocument;
}

const userSchema = new mongoose.Schema({
    id: String,
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
    calendar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'calendar',
      },
  })

  export default mongoose.model<UserDocument>('user', userSchema)
