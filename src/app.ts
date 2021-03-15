import 'reflect-metadata' // typeorm thing
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import lusca from 'lusca'
import path from 'path'
import mongoose from 'mongoose'
import Calendar from './models/Calendar'


import bluebird from 'bluebird'

import userRouter from './routers/user'
import incomeRouter from './routers/income'
import expenseRouter from './routers/expense'
import movieRouter from './routers/movie'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'

import { MONGODB_URI } from './util/secrets'
const mongoUrl = MONGODB_URI

const app = express()

//use cors
app.use(cors())
mongoose.Promise = bluebird

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    console.log('MONGO DB connected')
  })
  .catch((err: Error) => {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
    )
    process.exit(1)
  })
/*
  Calendar.insertMany(dbCalendar)
    .then((calendar) => { 
        console.log('Data inserted', calendar) 
    }).catch((error) => { 
        console.log(error)      // Failure 
    })*/

app.set('port', process.env.PORT || 3000)

// Use common 3rd-party middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))

// Use movie router
app.use('/api/v1/movies', movieRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/income', incomeRouter)
app.use('/api/v1/expense', expenseRouter)


// Custom API error handler
app.use(apiErrorHandler)

app.use(express.static('client/build'))

app.get('*', function (req, res) {
  const fullPath = path.join(__dirname,  '../client', 'build', 'index.html')
  res.sendFile(fullPath)
})

export default app
