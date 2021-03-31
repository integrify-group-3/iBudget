import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import Calendar from 'react-calendar'

import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { AppState, CalendarScheduler, DateView, ViewMonth } from '../../types'
import { DailyExpense } from '../../types/expenses'

import { Expense } from '../../types/expenses'

import useMonthlyExpenses from '../../hooks/useMonthlyExpenses'
import useMonthlyExpensesChart from '../../hooks/useMonthlyExpensesChart'
import useTotalMonthlyIncome from '../../hooks/useTotalMonthlyIncome'
import useTotalMonthlyExpenses from '../../hooks/useTotalMonthlyExpenses'
import { months, date, year, currentMonth } from '../../utils/dateValues'
import EmptyMonthlyChartContainer from '../../components/EmptyMonthlyChartContainer'
import ExpensesMonthlyChart from '../../components/ExpensesMonthlyChart'
import TotalMonthlyExpenses from '../../components/TotalMonthlyExpenses'
import MonthlyBudget from '../../components/MonthlyBudget'
import ExpensesTable from '../../components/ExpensesTable'
import useExpensesIcons from '../../hooks/useExpensesIcons'
import TileContentMonthlyExpenses from '../../components/TileContentMonthlyExpenses'
import AddExpense from '../../components/AddExpense'
import { clearUpdate } from '../../redux/actions/expenses'
import { mobileScreen } from '../../utils/windowSize'

import 'react-calendar/dist/Calendar.css'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '5rem 1rem',
    width: '98vw',
    paddingLeft: `${mobileScreen ? `0` : `6rem`}`,
    overflow: 'hidden',
    // background: '#131313;'
  },
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    width: '70vw',
  },
  grid: {
    width: `${mobileScreen ? `99vw` : `90vw`}`,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
    borderRadius: '18px',
  },
  fixedHeightBudget: {
    height: `${mobileScreen ? 120 : 240}`,
    borderRadius: '18px',
  },
  fixedHeightExpenses: {
    height: `${mobileScreen ? 120 : 240}`,
    borderRadius: '18px',
  },
  fixedHeightChart: {
    height: 550,
  },
  fixedHeightTable: {
    height: 340,
    borderRadius: '18px',
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
  const dispatch = useDispatch()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  const fixedHeightPaperBudget = clsx(classes.paper, classes.fixedHeightBudget)
  const fixedHeightPaperExpenses = clsx(classes.paper, classes.fixedHeightExpenses)
  const fixedHeightPaperTable = clsx(classes.paper, classes.fixedHeightTable)
  const isAuthenticated = useSelector(
    (state: AppState) => state.user.isAuthenticated
  )
  const isUpdating = useSelector((state: AppState) => state.expenses.isUpdating)
  const [monthlyChart, setMonthlyChart] = useState([] as DailyExpense[])
  const [monthlyData, setMonthlyData] = useState(([] as unknown) as ViewMonth)
  const [expensesChartData] = useMonthlyExpensesChart(monthlyChart)
  const [totalMonthlyExpenses] = useTotalMonthlyExpenses(monthlyData)
  const [totalMonthlyIncome] = useTotalMonthlyIncome(monthlyData)
  const [
    err,
    expensesData,
    calendarData,
    defaultDateView,
    defaultMonth,
  ] = useMonthlyExpenses()
  //
  const [calendarDate, setCalendarDate] = useState(date)
  const [isFormShowing, setIsFormShowing] = useState(false)
  const [dailyExpense, setDailyExpense] = useState({} as DailyExpense)
  const [isDayClicking, setIsDayClicking] = useState(false)
  //after fetched, expenses are passed here and received back from custom hook with the added icon
  const [formattedExpenses] = useExpensesIcons(dailyExpense)
  console.log('dailyExpense', dailyExpense)

  const switchMonth = {} as ViewMonth
  const [schedule, setSchedule] = useState({
    day: '',
    expenses: [],
  })
  //moving this to hook
  const [dateView, setDateView] = useState({
    year: 0,
    month: '',
  } as DateView)

  const [tileContentData, setTileContentData] = useState({
    name: '',
    income: [],
    days: [{ day: '', expenses: [] }],
  } as ViewMonth)

  const [expense, setExpense] = useState({
    category: '',
    description: '',
    amount: 0,
    date: '',
    month: '',
    year: 0,
  } as Expense)
  const { category, description, amount } = expense
  // console.log('expenses data', dailyExpense)
  const loadChart = () => {
    setMonthlyChart(defaultMonth?.days)
  }
  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/login')
    } else {
      // console.log('check here', isDayClicking, isUpdating)
      if (!isDayClicking) {
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
        setDailyExpense(expensesData)
        setTileContentData(defaultMonth)
        dispatch(clearUpdate())
      } else if (isDayClicking && isUpdating) {
        setTimeout(() => {
          setMonthlyData(defaultMonth)
          setDailyExpense(expensesData)
          // console.log('this should update, daily expense', dailyExpense)
          setTileContentData(defaultMonth)
          // console.log('day clicking and updating, expensesData', expensesData)
          loadChart()
          dispatch(clearUpdate())
        }, 1000)
      }
    }
  }, [
    dateView,
    calendarData,
    monthlyData,
    dailyExpense,
    expensesData,
    tileContentData,
    defaultMonth,
  ])
  // console.log('tile content data', tileContentData)
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
      //this is the correct way
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
      // console.log('monthly data from switchMonthDay', monthlyData)
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
      return err
    }
  }

  //this function is not working properly, fixing it
  const switchMonthOnClick = useCallback(
    async (e: any) => {
      setIsFormShowing(false)
      setIsDayClicking(true)
      setSchedule({ ...schedule, day: e.activeStartDate })
      try {
        const selectedYear = await e.activeStartDate.getFullYear()
        const currentIndex = await e.activeStartDate.getMonth()
        // console.log('selectedYearTwo, current indextwo', selectedYear, currentIndex)
        dateView.year = selectedYear
        dateView.month = months[currentIndex]
        console.log('date view', dateView)
        const foundYear = await calendarData.years.find(
          (y: CalendarScheduler) => y.year === dateView.year
        )
        const foundMonth = await foundYear.months.find(
          (month: any) => month.name === months[currentIndex]
        )
        // console.log('found month here', foundMonth)
        // await foundYear.months.map((month: any) => {
        if (foundMonth.name === dateView.month) {
          // console.log('these are the same', foundMonth.name, dateView.month)
          switchMonth.name = foundMonth.name
          switchMonth.income = foundMonth.income
          switchMonth.days = foundMonth.days
          setTileContentData(foundMonth)
          setMonthlyChart(foundMonth.days)
          setMonthlyData(switchMonth)

          const selectedDay = await foundMonth.days.find(
            (d: any) =>
              moment(d.day).format('LL') ===
              moment(e.activeStartDate).format('LL')
          )
          if (selectedDay !== undefined) {
            setDailyExpense(selectedDay)
          } else {
            setDailyExpense(schedule)
          }
        }
      } catch (err) {
        return err
      }
    },
    [dateView, monthlyData, monthlyChart]
  )
  // console.log('monthly data', monthlyData)
  // console.log('monthly chart', monthlyChart)
  // console.log('chart lenght', expensesChartData.length)

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* <main className={classes.content}>
        <div className={classes.appBarSpacer} /> */}
      <main>
        <div />
        <Container maxWidth="md" className={classes.container}>
          <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={7} md={4} lg={3}>
              <Paper className={fixedHeightPaperBudget}>
                <MonthlyBudget
                  year={dateView.year}
                  month={dateView.month}
                  totalMonthlyExpenses={totalMonthlyExpenses}
                  totalMonthlyIncome={totalMonthlyIncome}
                />
              </Paper>
            </Grid>
            <Grid item xs={5} md={4} lg={3}>
              <Paper className={fixedHeightPaperExpenses}>
                <TotalMonthlyExpenses
                  year={dateView.year}
                  month={dateView.month}
                  totalMonthlyExpenses={totalMonthlyExpenses}
                  totalMonthlyIncome={totalMonthlyIncome}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
                {expensesChartData.length > 0 ? (
                  <ExpensesMonthlyChart
                    chartData={expensesChartData}
                    year={dateView.year}
                    month={dateView.month}
                  />
                ) : (
                  <EmptyMonthlyChartContainer
                    month={dateView.month}
                    year={dateView.year}
                  />
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaperTable}>
                <ExpensesTable
                  day={isDayClicking ? schedule.day : date}
                  // dailyExpense={dailyExpense}
                  //testing formatted expenses with icons below
                  dailyExpense={formattedExpenses}
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
                  <TileContentMonthlyExpenses
                    date={date}
                    view={view}
                    activeStartDate={activeStartDate}
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
