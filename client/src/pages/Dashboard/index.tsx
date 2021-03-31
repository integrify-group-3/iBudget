import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import { AppState, ViewMonth } from '../../types'
import { DailyExpense } from '../../types/expenses'
import TotalMonthlyExpenses from '../../components/TotalMonthlyExpenses'
import TotalIncome from '../../components/TotalMonthlyIncome'
import ProfileDashboardBudget from '../../components/ProfileDashboardBudget'
import useMonthlyExpenses from '../../hooks/useMonthlyExpenses'
import useTotalMonthlyExpenses from '../../hooks/useTotalMonthlyExpenses'
import useTotalMonthlyIncome from '../../hooks/useTotalMonthlyIncome'
import IncomeExpensesMonthChart from '../../components/IncomeExpensesMonthChart'
import useMonthlyExpensesChart from '../../hooks/useMonthlyExpensesChart'
import useMonthlyIncomeChart from '../../hooks/useMonthlyIncomeChart'
import ExpensesMonthlyChartDashboard from '../../components/ExpensesMonthlyChartDashboard'
import IncomeMonthlyChartDashboard from '../../components/IncomeMonthlyChartDashboard'
import EmptyMonthlyChartContainer from '../../components/EmptyMonthlyChartContainer'
import { bigTabletScreen, mobileScreen } from '../../utils/windowSize'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '5rem 1rem',
    width: '98vw',
    paddingLeft: `${mobileScreen ? `0` : `6rem`}`,
    overflow: 'hidden',
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
    justifyContent: 'center',
  },
  fixedHeight: {
    height: 195,
    borderRadius: '18px',
  },
  fixedHeightChart: {
    height: 243,
    borderRadius: '18px',
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
    height: `${mobileScreen ? 270 : 370}`,
  },
  fixedHeightChartIncome: {
    marginTop: '1rem',
  },
}))

export default function Dashboard(props: any) {
  const classes = useStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  const fixedHeightPaperChart = clsx(classes.paper, classes.fixedHeightChart)
  const fixedHeightPaperChartIncome = clsx(
    classes.paper,
    classes.fixedHeightChartIncome
  )

  const isAuthenticated = useSelector(
    (state: AppState) => state.user.isAuthenticated
  )
  const user = useSelector((state: AppState) => state.user.user)
  const [monthlyData, setMonthlyData] = useState(([] as unknown) as ViewMonth)
  const [
    err,
    expensesData,
    calendarData,
    defaultDateView,
    defaultMonth,
  ] = useMonthlyExpenses()
  const [totalExpenses] = useTotalMonthlyExpenses(monthlyData)
  const [totalIncome] = useTotalMonthlyIncome(monthlyData)
  //this is dummy data and it will replaced with the yearChart data and setted each time for the current month
  const [monthChartData, setMonthChartData] = useState([
    { month: '', income: 0, expenses: 0 },
  ])
  const [
    monthlyExpensesChartCategory,
    setMonthlyExpensesChartCategory,
  ] = useState([] as DailyExpense[])
  const [monthlyIncomeChartCategory, setMonthlyIncomeChartCategory] = useState(
    []
  )
  const [expensesChartData] = useMonthlyExpensesChart(
    monthlyExpensesChartCategory
  )
  const [incomeChartData] = useMonthlyIncomeChart(monthlyIncomeChartCategory)

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/login')
    } else {
      setMonthlyData(defaultMonth)
      console.log('total income', totalIncome)
      setMonthChartData([
        {
          month: defaultDateView.month,
          income: totalIncome,
          expenses: totalExpenses,
        },
      ])
      setMonthlyExpensesChartCategory(defaultMonth.days)
      setMonthlyIncomeChartCategory(defaultMonth.income)
    }
  }, [
    isAuthenticated,
    props.history,
    setMonthChartData,
    totalIncome,
    totalExpenses,
  ])

  console.log('should update', monthChartData)
  // console.log('checking condition for empty chart', !monthChartData[1], !monthChartData[2])
  //if this is true, no chart
  /*
  if(monthChartData[1] && monthChartData[2]) {
    console.log('chart')
  }
  if(!monthChartData[1] && !monthChartData[2]) {
    console.log('no chart')
  }*/

  const { year, month } = defaultDateView
  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* <main className={classes.content}>
        <div className={classes.appBarSpacer} /> */}
      <main>
        <div />
        <Container maxWidth="md" className={classes.container}>
          <Grid container spacing={3} className={classes.grid}>
          <Grid item xs={12} md={5} lg={5}>
              <Paper className={fixedHeightPaper}>
                <ProfileDashboardBudget
                  totalBudget={totalIncome - totalExpenses}
                  month={month}
                  year={year}
                  user={user}
                />
              </Paper>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <Paper className={fixedHeightPaper}>
                <TotalMonthlyExpenses
                  year={year}
                  month={month}
                  totalMonthlyExpenses={totalExpenses}
                  totalMonthlyIncome={totalIncome}
                />
              </Paper>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <Paper className={fixedHeightPaper}>
                <TotalIncome
                  year={year}
                  month={month}
                  totalAmount={totalIncome}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={11} lg={6}>
              <Paper className={classes.chartHeightPaper}>
                {totalIncome > 0 || totalExpenses > 0 ? (
                  <IncomeExpensesMonthChart
                    data={monthChartData}
                    year={year}
                    month={month}
                  />
                ) : (
                  <EmptyMonthlyChartContainer month={month} year={year} />
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <Paper className={fixedHeightPaperChart}>
                {expensesChartData.length > 0 ? (
                  <ExpensesMonthlyChartDashboard
                    chartData={expensesChartData}
                    year={year}
                    month={month}
                    valueField="amount"
                    argumentField="category"
                    name="category"
                  />
                ) : (
                  <EmptyMonthlyChartContainer month={month} year={year} />
                )}
              </Paper>
              <Paper
                className={`${fixedHeightPaperChart} ${fixedHeightPaperChartIncome}`}
              >
                {incomeChartData.length > 0 ? (
                  <IncomeMonthlyChartDashboard
                    chartData={incomeChartData}
                    year={year}
                    month={month}
                    valueField="amount"
                    argumentField="category"
                    name="category"
                  />
                ) : (
                  <EmptyMonthlyChartContainer month={month} year={year} />
                )}
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}></Box>
        </Container>
      </main>
    </div>
  )
}
