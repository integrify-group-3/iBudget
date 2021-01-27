import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import Calendar from 'react-calendar'

import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import {
  AppState,
  CalendarScheduler,
  DateView,
  DailyExpense,
  Expense,
  ViewMonth,
} from '../../types'

import useExpenses from '../../hooks/useExpenses'
import { months, date, year, currentMonth } from '../../utils/dateValues'
import TotalExpenses from '../../components/TotalExpenses'
import ExpensesTable from '../../components/ExpensesTable'
import TileContent from '../../components/TileContent'
import AddExpense from '../../components/AddExpense'

import 'react-calendar/dist/Calendar.css'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '5rem 1rem',
    width: '100vw',
    paddingLeft: '6rem',
    overflow: 'hidden',
  },
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    width: '70vw',
  },
  grid: {
    width: '90vw',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  chartHeightPaper: {
    height: 550,
  },
  addExpenseContainer: {
    backgroundColor: 'rgba(75, 50, 50, 0.6)',
    position: 'absolute',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    top: '0',
    left: '0'
  },
  addExpenseFormContainer: {
    position: 'fixed'

  }

}))

export default function ExpensesPage(props: any) {
  const classes = useStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  const isAuthenticated = useSelector(
    (state: AppState) => state.user.isAuthenticated
  )
  const expenses = useSelector((state: AppState) => state.expenses.dailyExpenses)
  const [selected, setSelected] = useState()
  const [
    err,
    expensesData,
    calendarData,
    defaultDateView,
    defaultMonth,
  ] = useExpenses()
  const [calendarDate, setCalendarDate] = useState(date)
  const [isFormShowing, setIsFormShowing] = useState(false)
  const [dailyExpense, setDailyExpense] = useState({} as DailyExpense)
  const [isDayClicking, setIsDayClicking] = useState(false)
  const [viewMonth, setViewMonth] = useState({
    name: '',
    income: [],
    days: [{ day: '', expenses: [] }],
  } as ViewMonth)
  const switchMonth = {} as ViewMonth
  const [schedule, setSchedule] = useState({
    day: '',
    expenses: [],
  })

  const [dateView, setDateView] = useState({
    year: 0,
    month: '',
  } as DateView)
  
  const [expense, setExpense] = useState({
    category: '',
    description: '',
    amount: 0,
    date: '',
    month: '',
    year: 0,
  } as Expense)
  
  const { category, description, amount } = expense

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/login')
    } else {
        setDateView(defaultDateView as DateView)
        setViewMonth(defaultMonth)
        setExpense({
          category: '',
          description: '',
          amount: 0,
          date: moment(date).format('LL'),
          year: year,
          month: currentMonth,
        })
        // console.log(calendarData.years, defaultDateView, defaultMonth)
        console.log('expense from useEffect', expense)
        
    }
  }, [dateView, viewMonth, calendarData, defaultMonth])

  const onChange = (e: any) => {
    console.log('calling from onchange')
    setCalendarDate(calendarDate)
    console.log(calendarDate)
    console.log(calendarData)
    console.log(e)
    console.log(e.getFullYear())
  }

  const showFormOnClick = () => {
    setIsFormShowing(true)
  }

  const hideFormOnClick = () => {
    setIsFormShowing(false)
  }

  const closeForm = () => {
    setIsFormShowing(false)
  }

  const updateDailyExpenses = () => {
    console.log('update expenses', expenses)
    setIsDayClicking(false)
    console.log('update expenses', expensesData)
    setDailyExpense(expenses)
    // console.log(dailyExpense)
  }

  const findYearOnExpenses = (selectedYear: number) => {
    return calendarData.years.find(
      (y: CalendarScheduler) => y.year === selectedYear
    )
  }
  const findMonthOnExpenses = (foundYear: CalendarScheduler, clickedMonth: string) => {
    return foundYear.months.find(
      (month: any) => month.name === clickedMonth
    )
  }

  const showDayOnClick = async(e: any) => {
    try {
      setIsFormShowing(false)
      setSchedule({ ...schedule, day: e })
      const selectedYear = await e.getFullYear()
      const currentIndex = await e.getMonth()
      const clickedMonth = months[currentIndex]
      //this will set the day, year and month to the expense in case we will add a new new one for the day
      //we should not modify the state directly but now it's to make it work
      dateView.year = selectedYear
      dateView.month = months[currentIndex]
      //this is the corret way
      // setDateView({year: selectedYear, month: months[currentIndex]})
      // console.log('date view', dateView)
      setExpense({
        category: '',
        description: '',
        amount: 0,
        date: moment(e).format('LL'),
        year: selectedYear,
        month: clickedMonth,
      })
      console.log('expense from selectDay', expense)
      // console.log('after setting date view', calendarData.years)
    
      // const foundYear = await findYearOnExpenses(selectedYear)
      // const foundMonth = await findMonthOnExpenses(foundYear, clickedMonth)
      const foundYear = await calendarData.years.find(
          (y: CalendarScheduler) => y.year === selectedYear
        )
      
      const foundMonth = await foundYear.months.find(
          (month: any) => month.name === clickedMonth
        )
  
      // console.log(foundMonth)
      
      //we should not modify the state directly but now it's to make it work
      switchMonth.name = foundMonth.name
      switchMonth.income = foundMonth.income
      switchMonth.days = foundMonth.days
      //this is the proper way
      // setViewMonth(foundMonth);
      // console.log('view month from select day', viewMonth)
      // const selectedDay = findDayOnExpenses(foundMonth, e)
      const selectedDay = await foundMonth.days.find(
        (d: any) => moment(d.day).format('LL') === moment(e).format('LL')
      )
      setIsDayClicking(true)
      if (selectedDay !== undefined) {
        setDailyExpense(selectedDay)
        // console.log(calendarData.years)
      } else {
        setDailyExpense(schedule)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const showMonth = (e: any) => {
    console.log(e)
    const selectedYear = e.getFullYear()
    // const currentIndex = e.getMonth()
    // console.log(selectedYear, months[currentIndex])
  }
  
  const switchMonthOnClick = async (e: any) => {
    console.log(calendarData.years)
    console.log(e.activeStartDate.getFullYear())
    const selectedYear = e.activeStartDate.getFullYear()
    const currentIndex = e.activeStartDate.getMonth()
    const clickedMonth = months[currentIndex]
    console.log(e.activeStartDate, selectedYear, clickedMonth)
    dateView.year = selectedYear
    dateView.month = months[currentIndex]
    try {
      // const foundYear = await findYearOnExpenses(selectedYear)
      // const foundMonth = await findMonthOnExpenses(foundYear, clickedMonth)
      const foundYear = await calendarData.years.find(
        (y: CalendarScheduler) => y.year === selectedYear
      )
      console.log(foundYear)
    foundYear.months.forEach((month: any) => {
      console.log(month)
    });
    const foundMonth = await foundYear.months.find(
        (month: any) => month.name === clickedMonth
      )
      //we should not modify the state directly but now it's to make it work
      // console.log(foundMonth)
      // console.log(viewMonth)
      viewMonth.name = foundMonth.name
      // console.log(viewMonth)
      viewMonth.income = foundMonth.income
      viewMonth.days = foundMonth.days
      console.log(calendarData.years)
    }
    catch(err) {
      console.log(err)
    }
  }
 
  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* <main className={classes.content}>
        <div className={classes.appBarSpacer} /> */}
      <main>
        <div />
        <Container maxWidth="md" className={classes.container}>
          <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={5} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
                {/*Expenses chart goes here */}
                <h2>Chart</h2>
              </Paper>
            </Grid>
            <Grid item xs={5} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <TotalExpenses
                  year={dateView.year}
                  month={dateView.month}
                  monthExpenses={viewMonth}
                />
              </Paper>
            </Grid>
            <Grid item xs={5} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                {/* Total balance goes here */}
                <h2>Total Balance</h2>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper className={fixedHeightPaper}>
                  <ExpensesTable
                    day={isDayClicking ? schedule.day : date}
                    dailyExpense={
                      isDayClicking
                        ? dailyExpense
                        : (expensesData as DailyExpense)
                    }
                    updateDailyExpenses={updateDailyExpenses}
                    updateEditedExpenses={updateDailyExpenses}
                    showFormOnClick={showFormOnClick}
                  />
              </Paper>
            </Grid>
            {isFormShowing &&
            <Grid item xs={12} md={12} lg={12} className={classes.addExpenseContainer}>
              <Paper className={classes.addExpenseFormContainer}>
                  <AddExpense
                    expense={expense}
                    day={isDayClicking ? schedule.day : date}
                    category={category}
                    description={description}
                    amount={amount}
                    setExpense={setExpense}
                    hideFormOnClick={hideFormOnClick}
                    closeForm={closeForm}
                    updateDailyExpenses={updateDailyExpenses}
                    calendarData={calendarData}
                  />
              </Paper>
              </Grid>
            }

            <Grid item xs={10} md={6}>
              <Calendar
                // onChange={onChange}
                value={calendarDate}
                //   onClickYear={showYear}
                // onClickMonth={showMonth}
                onChange={showDayOnClick}
                // onActiveStartDateChange={switchMonthOnClick}
                showNeighboringMonth={true}
                tileContent={({ date, view }: any) => (
                  <TileContent
                    date={date}
                    view={view}
                    viewMonth={viewMonth}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Box pt={4}></Box>
        </Container>
      </main>
    </div>
  )
}
