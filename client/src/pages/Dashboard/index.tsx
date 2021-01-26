import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import { AppState, DateView, ViewMonth } from '../../types'
import useExpenses from '../../hooks/useExpenses'
import useIncome from '../../hooks/useIncome'
import TotalExpenses from '../../components/TotalExpenses'
import TotalIncome from '../../components/TotalIncome'

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
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  chartHeightPaper: {
    height: 550,
  },
}))

export default function Dashboard(props: any) {
  const isAuthenticated = useSelector((state: AppState) => state.user.isAuthenticated)
  const user = useSelector((state: AppState) => state.user.user)
  const classes = useStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  const [
    errExpenses,
    expensesData,
    calendarExpensesData,
    defaultDateViewExpenses,
    defaultMonth,
  ] = useExpenses()
  const [errIncome, incomeData, defaultDateViewIncome, calendarIncomeData] = useIncome()
  const [dateView, setDateView] = useState({
    year: 0,
    month: '',
  } as DateView)

  const [viewMonth, setViewMonth] = useState({
    name: '',
    income: [],
    days: [{ day: '', expenses: [] }],
  } as ViewMonth)

  console.log('user here', user)
  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/login')
    } else {
      setDateView(defaultDateViewExpenses as DateView)
      setViewMonth(defaultDateViewExpenses)
      console.log(viewMonth)
    }
  }, [dateView, viewMonth, calendarExpensesData, defaultMonth])
  
  console.log(isAuthenticated)
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
                <TotalExpenses
                  year={dateView.year}
                  month={dateView.month}
                  monthExpenses={viewMonth}
                />
              </Paper>
            </Grid>
             <Grid item xs={5} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <TotalIncome
                  year={dateView.year}
                  month={dateView.month}
                  monthlyIncome={incomeData}
                />
              </Paper>
            </Grid>
            <Grid item xs={5} md={6} lg={5}>
              <Paper className={fixedHeightPaper}>
                <h2>Dashboard {user.firstName} {user.lastName}</h2>
                <p>{user.email}</p>
                <h3>Total Balance</h3>
              </Paper>
            </Grid>

             <Grid item xs={5} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
                {/*Expenses chart goes here */}
                <h2>Chart</h2>
              </Paper>
            </Grid>

             <Grid item xs={5} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
                {/*Expenses chart goes here */}
                <h2>Calendar?</h2>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}></Box>
        </Container>
      </main>
    </div>
  )
}

