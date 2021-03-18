import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

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
import EmptyChartContainer from '../../components/EmptyChartContainer'

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
    justifyContent: 'center',
  },
  fixedHeight: {
    height: 195,
    borderRadius: '18px'
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
    height: 370,
  },
  chartsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
  },
  chartExpensesPaper: {
    height: '200px',
    width: '500px',
  },
  chartIncomePaper: {
    height: '200px',
    width: '500px',
    marginTop: '5rem',
  },
}))

export default function Dashboard(props: any) {
  const classes = useStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
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
  console.log('total income', totalIncome)
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
  }, [isAuthenticated, props.history, setMonthChartData, totalExpenses])

  console.log('should update', monthChartData)
  const { year, month } = defaultDateView
  const { firstName, lastName } = user
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
                <TotalMonthlyExpenses
                  year={year}
                  month={month}
                  totalMonthlyExpenses={totalExpenses}
                  totalMonthlyIncome={totalIncome}
                />
              </Paper>
            </Grid>
            <Grid item xs={5} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <TotalIncome
                  year={year}
                  month={month}
                  totalAmount={totalIncome}
                />
              </Paper>
            </Grid>
            <Grid item xs={5} md={6} lg={5}>
              <Paper className={fixedHeightPaper}>
                <ProfileDashboardBudget
                  totalBudget={totalIncome - totalExpenses}
                  month={month}
                  year={year}
                  user={user}
                />
              </Paper>
            </Grid>

            <Grid item xs={8} md={11} lg={6}>
              <Paper className={classes.chartHeightPaper}>
                <IncomeExpensesMonthChart
                  data={monthChartData}
                  year={year}
                  month={month}
                />
              </Paper>
            </Grid>
            <Grid
              item
              xs={8}
              md={11}
              lg={6}
              className={classes.chartsContainer}
            >
              <Paper className={classes.chartExpensesPaper}>
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
                  <EmptyChartContainer month={month} year={year} />
                )}
              </Paper>
              {/* <Paper className={classes.chartIncomePaper}>
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
                  <EmptyChartContainer month={month} year={year} />
                )}
              </Paper> */}
            </Grid>
          </Grid>
          <Box pt={4}></Box>
        </Container>
      </main>
    </div>
  )
}
