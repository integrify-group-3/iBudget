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

import { AppState, CalendarScheduler } from '../../types'
import { date } from '../../utils/dateValues'
import useYearExpenses from '../../hooks/useYearExpenses'
import useYearChart from '../../hooks/useYearChart'
import IncomeExpensesYearChart from '../../components/IncomeExpensesYearChart'

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
    expensesData,
    yearViewExpenses,
    yearTotalExpenses,
  ] = useYearExpenses(selectedYear)
  // console.log('expenses data', expensesData, 'year view expenses', yearViewExpenses, 'year total expenses', yearTotalExpenses)
  const [yearChartErr, yearChartData] = useYearChart(yearChart)
  console.log('year chart data', yearChartData)

  console.log('year expenses', expensesData)

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/login')
    } else {
      setSelectedYear(date.getFullYear())
      setYearChart(expensesData)
    }
  }, [isAuthenticated, props.history])

  const onChange = async (e: any) => {
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
                <h2>Expenses {yearViewExpenses.year}</h2>
                <Typography component="p" variant="h4">
                  €{yearTotalExpenses}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={5} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <h2>Income </h2>
                {/* total year income goes here */}
                <Typography component="p" variant="h4">
                  €Total
                </Typography>              </Paper>
            </Grid>
            <Grid item xs={5} md={6} lg={5}>
              <Paper className={fixedHeightPaper}>
                <h3>
                  {user.firstName} {user.lastName}
                </h3>
                {/* year balance goes here */}
                <h3>Total Balance</h3>
                <h3>Year {selectedYear}</h3>
              </Paper>
            </Grid>
            <Grid item xs={5} md={8} lg={8}>
              {/*Expenses chart goes here, a series or bar chart for expenses and income for the year */}
              <Paper className={classes.chartHeightPaper}>
                <IncomeExpensesYearChart data={yearChartData} year={selectedYear} />
              </Paper>
            </Grid>

            <Grid item xs={10} md={4}>
              {/*Calendar for decade can goe here */}
              <Calendar
                onChange={onChange}
                value={calendarDate}
                defaultView="decade"
                maxDetail="decade"
                // tileContent={({ date, view }) => showExpenseOnCalendar(date, view)}
              />
            </Grid>
          </Grid>
          <Box pt={4}></Box>
        </Container>
      </main>
    </div>
  )
}
