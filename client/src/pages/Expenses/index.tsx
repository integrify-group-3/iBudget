import React, { useCallback, useEffect, useState } from 'react'
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
  ViewMonth,
} from '../../types'
import {   DailyExpense,
} from '../../types/expenses'

import { Expense } from '../../types/expenses'

import useMonthlyExpenses from '../../hooks/useMonthlyExpenses'
import useExpensesChart from '../../hooks/useExpensesChart'
import useTotalMonthlyIncome from '../../hooks/useTotalMonthlyIncome'
import useTotalMonthlyExpenses from '../../hooks/useTotalMonthlyExpenses'
import { months, date, year, currentMonth } from '../../utils/dateValues'
import EmptyChartContainer from '../../components/EmptyChartContainer'
import ExpensesChart from '../../components/ExpensesMonthlyChart'
import TotalExpenses from '../../components/TotalExpenses'
import MonthlyBudget from '../../components/MonthlyBudget'
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
  fixedHeightTable: {
    height: 340,
  },
  fixedHeightChart: {
    height: 550,
  },
  addExpenseContainer: {
    backgroundColor: 'rgba(25, 20, 20, 0.6)',
    position: 'absolute',
    height: '200vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    top: '0',
    left: '17px',
    zIndex: 2,
  },
  addExpenseFormContainer: {
    position: 'fixed',
    top: '27%',
  },
}))

export default function ExpensesPage(props: any) {
  const classes = useStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  const fixedHeightPaperTable = clsx(classes.paper, classes.fixedHeightTable)
  const isAuthenticated = useSelector(
    (state: AppState) => state.user.isAuthenticated
  )
  const expenses = useSelector(
    (state: AppState) => state.expenses.dailyExpenses
  )
  const selectedMonth = useSelector(
    (state: AppState) => state.expenses.selectedMonth
  )
  const [monthlyChart, setMonthlyChart] = useState([] as DailyExpense[])
  const [monthlyData, setMonthlyData] = useState(
    ([] as unknown) as ViewMonth
  )
  //to be deleted
  const [expensesChartData] = useExpensesChart(monthlyChart)
  const [totalExpenses] = useTotalMonthlyExpenses(monthlyData)
  const [totalIncome] = useTotalMonthlyIncome(monthlyData)
  console.log('total income', totalIncome)
  const [
    err,
    expensesData,
    calendarData,
    defaultDateView,
    defaultMonth,
  ] = useMonthlyExpenses()
  const [calendarDate, setCalendarDate] = useState(date)
  const [isFormShowing, setIsFormShowing] = useState(false)
  //moving this to hook
  const [dailyExpense, setDailyExpense] = useState({} as DailyExpense)
  const [isDayClicking, setIsDayClicking] = useState(false)
  //moving this to hook
  const switchMonth = {} as ViewMonth
  //moving this to hook
  const [schedule, setSchedule] = useState({
    day: '',
    expenses: [],
  })
  //moving this to hook
  const [dateView, setDateView] = useState({
    year: 0,
    month: '',
  } as DateView)

  const [tileContentData, setTileContentData] = useState(
  {name: '',
  income: [],
  days: [{ day: '', expenses: [] }]} as ViewMonth)

  const [expense, setExpense] = useState({
    category: '',
    description: '',
    amount: 0,
    date: '',
    month: '',
    year: 0,
  } as Expense)
  const { category, description, amount } = expense

  const loadChart = () => {
    setMonthlyChart(defaultMonth?.days)
  }

  console.log('expenses monthly chart data', expensesChartData)
  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/login')
    } else {
      setDateView(defaultDateView as DateView)
      setExpense({
        category: '',
        description: '',
        amount: 0,
        date: moment(date).format('LL'),
        year: year,
        month: currentMonth,
      })
      loadChart()
      setMonthlyData(defaultMonth)
      setTileContentData(defaultMonth)
    }
  }, [dateView, calendarData, tileContentData, defaultMonth])

  const showFormOnClick = () => {
    setIsFormShowing(true)
  }

  const hideFormOnClick = () => {
    setIsFormShowing(false)
  }

  const closeForm = () => {
    setIsFormShowing(false)
  }

  //this function is moving to usexpenses hook but keeps throwing an infinite loop
  const showDayOnClick = async (e: any) => {
      setIsFormShowing(false)
      setIsDayClicking(true)
      setSchedule({ ...schedule, day: e })
    try {
      const selectedYear = await e.getFullYear()
      const currentIndex = await e.getMonth()
      // const clickedMonth = months[currentIndex]
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
        month: months[currentIndex],
      })
      const foundYear = await calendarData.years.find(
        (y: CalendarScheduler) => y.year === selectedYear
      )

      const foundMonth = await foundYear.months.find(
        (month: any) => month.name === months[currentIndex]
      )
      setMonthlyChart(foundMonth.days)
      //we should not modify the state directly but now it's to make it work
      switchMonth.name = foundMonth.name
      switchMonth.income = foundMonth.income
      switchMonth.days = foundMonth.days
      setMonthlyData(switchMonth)
      //this is the proper way
      const selectedDay = await foundMonth.days.find(
        (d: any) => moment(d.day).format('LL') === moment(e).format('LL')
      )
      if (selectedDay !== undefined) {
        setDailyExpense(selectedDay)
      } else {
        setDailyExpense(schedule)
      }
    } catch (err) {
      console.log(err)
    }
  }

  //this function is not working properly, fixing it
  const switchMonthOnClick = async (e: any) => {
    // console.log(calendarData.years)
    // console.log(e)
    // console.log(e.value.getFullYear())
    try {
      const selectedYear = await e.value.getFullYear()
      const currentIndex = await e.value.getMonth()
      // console.log('one', selectedYear, months[currentIndex])
      const selectedYearTwo = await e.activeStartDate.getFullYear()
      const currentIndexTwo = await e.activeStartDate.getMonth()
      // console.log('two', selectedYearTwo, months[currentIndexTwo], months)
      const clickedMonth = months[currentIndex]
      // console.log(e.activeStartDate, selectedYear, clickedMonth)
      dateView.year = selectedYearTwo
      dateView.month = months[currentIndexTwo]
      const foundYear = await calendarData.years.find(
        (y: CalendarScheduler) => y.year === dateView.year
      )
      for (const month of foundYear.months) {
        if (month.name === dateView.month) {
          //sets the chart to selected month
          setMonthlyChart(month.days)
          // console.log('monthly chart should update', monthlyChart)
          //sets the month expenses and budget to selected month
          setMonthlyData(month)
          // console.log(calendarData.years)
          // setTileContentData(month)
          console.log('tile content here', tileContentData)
        } 
      }
    } catch (err) {
      console.log(err)
    }
  }

  const updateDailyExpenses = useCallback(async () => {
    try {
      // console.log('calling from updateDailyExpenses')
      // console.log(defaultMonth)
      //this is not updating
      // setMonthlyChart(selectedMonth.days)
      //when clicking on the calendar again, the calendar reset the charts to the previous state cuz is still taking the calendar before the state update
      setDailyExpense(expenses)
      setMonthlyData(selectedMonth)
      setTileContentData(defaultMonth)
    } catch (err) {}
  }, [selectedMonth, expenses, dailyExpense])

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
                {expensesChartData.length > 0 ? (
                  <ExpensesChart
                    chartData={expensesChartData}
                    year={dateView.year}
                    month={dateView.month}
                    valueField="amount"
                    argumentField="category"
                    name="category"
                  />
                ) : (
                  <EmptyChartContainer
                    month={dateView.month}
                    year={dateView.year}
                  />
                )}
              </Paper>
            </Grid>
            <Grid item xs={5} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <TotalExpenses
                  year={dateView.year}
                  month={dateView.month}
                  totalAmount={totalExpenses}
                />
                <h2 style={{color: 'red'}} title="% expenses/income">{`${Math.floor((totalExpenses / totalIncome)*100)}`}%</h2>
              </Paper>
            </Grid>
            <Grid item xs={5} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                {/* Total balance goes here */}
                <MonthlyBudget
                  year={dateView.year}
                  month={dateView.month}
                  //total month income will be added here
                  totalExpenses={totalExpenses}
                  totalIncome={totalIncome}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaperTable}>
                <ExpensesTable
                  day={isDayClicking ? schedule.day : date}
                  dailyExpense={
                    isDayClicking
                      ? dailyExpense
                      : (expensesData as DailyExpense)
                  }
                  updateDailyExpenses={updateDailyExpenses}
                  showFormOnClick={showFormOnClick}
                />
              </Paper>
            </Grid>
            {isFormShowing && (
              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                className={classes.addExpenseContainer}
              >
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
                  />
                </Paper>
              </Grid>
            )}

            <Grid item xs={12} md={6} lg={6}>
              <Calendar
                value={calendarDate}
                onChange={showDayOnClick}
                onActiveStartDateChange={switchMonthOnClick}
                showNeighboringMonth={true}
                tileContent={({ activeStartDate, date, view }: any) => (
                  <TileContent
                    date={date}
                    view={view}
                    activeStartDate={activeStartDate}
                    // contentData={isDayClicking ? tileContentData : defaultMonth}
                    contentData={tileContentData}
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
