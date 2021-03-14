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

import { AppState, CalendarScheduler, DateView, ViewMonth } from '../../types'
import useMonthlyIncomeChart from '../../hooks/useMonthlyIncomeChart'
import EmptyChartContainer from '../../components/EmptyChartContainer'
import { Income } from '../../types/income'
import useIncome from '../../hooks/useIncome'
import IncomeTable from '../../components/IncomeTable'
import TotalIncome from '../../components/TotalIncome'
import ProfileDashboard from '../../components/ProfileDashboard'
import { months } from '../../utils/dateValues'
import IncomeMonthlyChart from '../../components/IncomeMonthlyChart'
import useTotalMonthlyIncome from '../../hooks/useTotalMonthlyIncome'
import 'react-calendar/dist/Calendar.css'
import './style.css'
import { useYearIncome } from '../../hooks/useYearIncome'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '5rem 3rem',
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
    height: 340,
  },
  chartHeightPaper: {
    height: 640,
  },
}))

export default function IncomePage(props: any) {
  const [currentYear, setCurrentYear] = useState(0)
  const [total] = useYearIncome(currentYear)

  console.log('total from pages', total)

  const classes = useStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  const isAuthenticated = useSelector(
    (state: AppState) => state.user.isAuthenticated
  )
  const [isMonthClicking, setIsMonthClicking] = useState(false)
  const [calendarDate, setCalendarDate] = useState(new Date())
  const [calendar, setCalendar] = useState({} as any)
  const [isFormShowing, setIsFormShowing] = useState(false)
  const [monthlyChart, setMonthlyChart] = useState([])
  const [monthIncome, setMonthIncome] = useState([] as Income[])
  const [monthlyData, setMonthlyData] = useState(([] as unknown) as ViewMonth)
  const [
    err,
    incomeData,
    defaultDateView,
    calendarData,
    defaultMonth,
  ] = useIncome()
  const [incomeChartData] = useMonthlyIncomeChart(monthlyChart)
  const [totalIncome] = useTotalMonthlyIncome(monthlyData)
  //console.log('total income from page', totalIncome)
  const [loaded, setIsLoaded] = useState(false)
  const [dateView, setDateView] = useState({
    year: 0,
    month: '',
  } as DateView)

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/login')
    } else {
      setCalendar(calendarData)
      if (!isMonthClicking) {
        //atm the below set state keeps running an infinite loop
        setDateView(defaultDateView as DateView)
        setMonthlyData(defaultMonth)
        // console.log('monthly data', monthlyData)
        setMonthlyChart(defaultMonth?.income as any)
      }
    }
  }, [isAuthenticated, calendarData, dateView, defaultDateView])
  const changeMonthView = (
    currentYear: number,
    currentMonth: string,
    foundYear: CalendarScheduler | undefined,
    currentIndex: number
  ) => {
    //setTimeout(() => {
    const foundMonth = foundYear?.months.find(
      (month: any) => month.name === months[currentIndex]
    )
    setMonthIncome(foundMonth?.income)
    setMonthlyChart(foundMonth.income)
    setMonthlyData(foundMonth)
    // console.log('monthly data', monthlyData)
    setIsLoaded(true)
    // }, 150)
  }

  const updateMonthlyIncome = (updatedIncome: Income[]) => {
    setMonthIncome(updatedIncome)
  }

  useEffect(() => {
    setMonthIncome(incomeData as Income[])
  }, [])

  const onChange = () => {
    setCalendarDate(calendarDate)
  }

  const showYearOnClick = (e: any) => {
    const year = e.getFullYear()
    setDateView({ ...dateView, year: year })
    const yearIncome = calendar.years.find(
      (calendar: any) => calendar.year === year
    )
  }

  const showMonthOnClick = (e: any) => {
    setIsMonthClicking(true)
    const year = e.getFullYear()
    const yearIncome = calendar.years.find((i: any) => i.year === year)
    const currentIndex = e.getMonth()
    setDateView({ ...dateView, year: year, month: months[currentIndex] })
    changeMonthView(dateView.year, dateView.month, yearIncome, currentIndex)
  }
  /*
  const calculateTotalIncome = () => {
    let count = 0
    for (const income of incomeData) {
      const { amount } = income
      count += amount
    }
    return count
  }

  useEffect(() => {
    if (incomeData !== undefined) {
      calculateTotalIncome()
    }
  }, [incomeData, calculateTotalIncome])*/

  // const income = calculateTotalIncome()

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
                {incomeChartData.length > 0 ? (
                  <IncomeMonthlyChart
                    chartData={incomeChartData}
                    month={dateView.month}
                    year={dateView.year}
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
                <TotalIncome
                  year={dateView.year}
                  month={dateView.month}
                  totalAmount={totalIncome}
                />
              </Paper>
            </Grid>
            <Grid item xs={5} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                {/* <ProfileDashboard income={income} /> */}
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
                <IncomeTable
                  // key={calendar?._id}
                  monthlyIncome={!isMonthClicking ? incomeData : monthIncome}
                  year={dateView.year}
                  month={dateView.month}
                  updateMonthlyIncome={updateMonthlyIncome}
                />
              </Paper>
            </Grid>
            <Grid item xs={10} md={6} lg={6}>
              <Calendar
                // onChange={onChange}
                value={calendarDate}
                showNeighboringMonth={true}
                // onClickYear={showYearOnClick}
                onChange={showMonthOnClick}
                defaultView="year"
                maxDetail="year"
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
