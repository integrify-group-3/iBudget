import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Calendar from 'react-calendar'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import { AppState, CalendarScheduler, ViewMonth, DateView } from '../../types'
import { date, months } from '../../utils/dateValues'
import useYearExpenses from '../../hooks/useYearExpenses'
import useYearChart from '../../hooks/useYearChart'
import IncomeExpensesYearChart from '../../components/IncomeExpensesYearChart'
import SwitchAnalyticsViewBtn from '../../components/SwitchAnalyticsViewBtn'
//testing month view here
import useMonthlyExpenses from '../../hooks/useMonthlyExpenses'
import useTotalMonthlyExpenses from '../../hooks/useTotalMonthlyExpenses'
import useTotalMonthlyIncome from '../../hooks/useTotalMonthlyIncome'
import IncomeExpensesMonthChart from '../../components/IncomeExpensesMonthChart'
import TotalExpenses from '../../components/TotalExpenses'
import TotalIncome from '../../components/TotalIncome'

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
  fixedHeightCalendar: {
    height: 260,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  chartHeightPaper: {
    height: 498,
  },
}))

export default function Analytics(props: any) {
  const classes = useStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  const isAuthenticated = useSelector(
    (state: AppState) => state.user.isAuthenticated
  )
  const user = useSelector((state: AppState) => state.user.user)
  const calendarData = useSelector((state: AppState) => state.expenses.calendar)
  const [calendarDate] = useState(date)
  const [selectedYear, setSelectedYear] = useState(0)
  const [yearChart, setYearChart] = useState({} as CalendarScheduler)
  const [
    expensesErr,
    yearExpensesData,
    yearViewExpenses,
    yearTotalExpenses,
  ] = useYearExpenses(selectedYear)
  // console.log('expenses data', yearExpensesData, 'year view expenses', yearViewExpenses, 'year total expenses', yearTotalExpenses)
  const [yearChartErr, yearChartData] = useYearChart(yearChart)
  const [switchView, setSwitchView] = useState(false)
  //testing the monthly data

  const [monthlyData, setMonthlyData] = useState(([] as unknown) as ViewMonth)
  const [
    err,
    expensesData,
    calendarYearData,
    defaultDateView,
    defaultMonth,
  ] = useMonthlyExpenses()
  const [totalExpenses] = useTotalMonthlyExpenses(monthlyData)
  const [totalIncome] = useTotalMonthlyIncome(monthlyData)
  // console.log('total income', totalIncome)
  const [monthChartData, setMonthChartData] = useState([
    { month: '', income: 0, expenses: 0 },
  ])
  const [dateView, setDateView] = useState({
    year: 0,
    month: '',
  } as DateView)

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/login')
    } else {
      setSelectedYear(date.getFullYear())
      setYearChart(yearExpensesData)
      setDateView(defaultDateView)
      //testing the monthly data
      setMonthlyData(defaultMonth)
      setMonthChartData([
        {
          month: defaultDateView.month,
          income: totalIncome,
          expenses: totalExpenses,
        },
      ])
      // console.log(monthChartData)
    }
  }, [isAuthenticated, props.history])

  const onChangeYear = async (e: any) => {
    try {
      const clickedYear = await e.getFullYear()
      setSelectedYear(clickedYear)
      //at the moment this data and chart works only with changing the monthView from current month from here (current month), not with useExpense hook where we also set the total expenses. same code is present also in changeView function in hooks but it doesn't work
      const foundYear = await calendarData.years.find(
        (y: CalendarScheduler) => y.year === clickedYear
      )
      setYearChart(foundYear)
    } catch (err) {
      console.log(err)
    }
  }

  const onChangeMonth = async (e: any) => {
    try {
      const selectedYear = await e.getFullYear()
      const currentIndex = await e.getMonth()
      //this is not working
      // setDateView({year: selectedYear, month: months[currentIndex]})
      //this is provisory
      dateView.year = selectedYear
      dateView.month = months[currentIndex]
      const foundYear = await calendarData.years.find(
        (y: CalendarScheduler) => y.year === selectedYear
      )
      const foundMonth = await foundYear.months.find(
        (month: any) => month.name === months[currentIndex]
      )
      setMonthlyData(foundMonth)
      setMonthChartData([
        { month: dateView.month, income: totalIncome, expenses: totalExpenses },
      ])
    } catch (err) {
      console.log(err)
    }
  }

  const switchAnalyticsView = () => {
    setSwitchView(!switchView)
  }
  const { year, month } = dateView

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* <main className={classes.content}>
        <div className={classes.appBarSpacer} /> */}
      <main>
        <div />
        <Container maxWidth="md" className={classes.container}>
          <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={5} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                {/* Total year expenses go hear */}

                {switchView ? (
                  <TotalExpenses
                    year={year}
                    month={month}
                    totalAmount={totalExpenses}
                  />
                ) : (
                  <>
                    <h2>Expenses {yearViewExpenses.year}</h2>
                    <Typography component="p" variant="h4">
                      €{yearTotalExpenses}
                    </Typography>
                  </>
                )}
              </Paper>
            </Grid>
            <Grid item xs={5} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                {switchView ? (
                  <TotalIncome
                    year={year}
                    month={month}
                    totalAmount={totalIncome}
                  />
                ) : (
                  <>
                    <h2>Income </h2>
                    {/* total year income goes here */}
                    <Typography component="p" variant="h4">
                      €Total
                    </Typography>
                  </>
                )}
              </Paper>
            </Grid>
            <Grid item xs={5} md={6} lg={5}>
              <Paper className={fixedHeightPaper}>
                <h3>
                  {user.firstName} {user.lastName}
                </h3>
                {/* year balance goes here */}
                <h3>Total Balance €{yearTotalExpenses}</h3>
                <h3>Year {selectedYear}</h3>
                <SwitchAnalyticsViewBtn
                  switchAnalyticsView={switchAnalyticsView}
                  switchView={switchView}
                />
              </Paper>
            </Grid>
            <Grid item xs={5} md={8} lg={8}>
              {/*Expenses chart goes here, a series or bar chart for expenses and income for the year */}
              <Paper className={classes.chartHeightPaper}>
                {switchView ? (
                  <IncomeExpensesMonthChart
                    data={monthChartData}
                    year={year}
                    month={month}
                  />
                ) : (
                  <IncomeExpensesYearChart
                    data={yearChartData}
                    year={selectedYear}
                  />
                )}
              </Paper>
            </Grid>

            <Grid item xs={10} md={4}>
              {/*Calendar for year and decade can go here */}
              {switchView ? (
                <Calendar
                  onChange={onChangeMonth}
                  value={calendarDate}
                  defaultView="year"
                  maxDetail="year"
                  // tileContent={({ date, view }) => showExpenseOnCalendar(date, view)}
                />
              ) : (
                <Calendar
                  onChange={onChangeYear}
                  value={calendarDate}
                  defaultView="decade"
                  maxDetail="decade"
                  // tileContent={({ date, view }) => showExpenseOnCalendar(date, view)}
                />
              )}
            </Grid>
          </Grid>
          <Box pt={4}></Box>
        </Container>
      </main>
    </div>
  )
}
