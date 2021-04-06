import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Calendar from 'react-calendar'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import { AppState, CalendarScheduler, DateView, ViewMonth } from '../../types'
import { clearUpdate } from '../../redux/actions/income'
import useMonthlyIncomeChart from '../../hooks/useMonthlyIncomeChart'
import EmptyMonthlyChartContainer from '../../components/EmptyMonthlyChartContainer'
import { Income } from '../../types/income'
import useIncome from '../../hooks/useMonthlyIncome'
import useYearIncome from '../../hooks/useYearIncome'
import IncomeTable from '../../components/IncomeTable'
import AddIncome from '../../components/AddIncome'
import TotalMonthlyIncome from '../../components/TotalMonthlyIncome'
import { date, months } from '../../utils/dateValues'
import IncomeMonthlyChart from '../../components/IncomeMonthlyChart'
import useTotalMonthlyIncome from '../../hooks/useTotalMonthlyIncome'
import useTotalMonthlyExpenses from '../../hooks/useTotalMonthlyExpenses'
import MonthlyBudget from '../../components/MonthlyBudget'
import TileContentMonthlyIncome from '../../components/TileContentMonthlyIncome'
import useIncomeIcons from '../../hooks/useIncomeIcons'
import backgroundImgMobile from '../../imgs/background-pages-mobile.jpg'

import 'react-calendar/dist/Calendar.css'
import './style.css'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '5rem 3rem',
    width: '98vw',
    paddingLeft: '6rem',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
      paddingLeft: '0',
      backgroundImage: `linear-gradient(to right, rgba(243, 239, 234, 0.8), rgba(225, 219, 236, 0.3)), url(${backgroundImgMobile})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    },
  },
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    width: '70vw',
  },
  grid: {
    width: '90vw',
    [theme.breakpoints.down('sm')]: {
      width: '99vw',
    },  
  },
  gridItem: {
    padding: '12px',
    [theme.breakpoints.down('sm')]: {
      padding: '5px !important',
    },  
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
    height: '240px',
    borderRadius: '18px',
     [theme.breakpoints.down('sm')]: {
      height: '120px',
    },
  },
  fixedHeightIncome: {
    height: '240px',
    borderRadius: '18px',
     [theme.breakpoints.down('sm')]: {
      height: '120px',
    },
  },
  fixedHeightTable: {
    height: 340,
    borderRadius: '18px',
    // background: '#131313'
  },
  chartHeightPaper: {
    height: 640,
  },
  addIncomeContainer: {
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
    [theme.breakpoints.down('md')]: {
      left: '0',
    },
  },
  addIncomeFormContainer: {
    position: 'fixed',
    top: '27%',
  },
}))

export default function IncomePage(props: any) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  const fixedHeightPaperBudget = clsx(classes.paper, classes.fixedHeightBudget)
  const fixedHeightPaperIncome = clsx(classes.paper, classes.fixedHeightIncome)
  const fixedHeightPaperTable = clsx(classes.paper, classes.fixedHeightTable)
  const isAuthenticated = useSelector(
    (state: AppState) => state.user.isAuthenticated
  )
  const isUpdating = useSelector((state: AppState) => state.income.isUpdating)
  const [isMonthClicking, setIsMonthClicking] = useState(false)
  const [selectedYear, setSelectedYear] = useState(0)
  const [calendarDate, setCalendarDate] = useState(new Date())
  const [calendar, setCalendar] = useState({} as any)
  const [monthlyChart, setMonthlyChart] = useState([])
  const [monthIncome, setMonthIncome] = useState([] as Income[])
  const [formattedIncome] = useIncomeIcons(monthIncome)
  const [monthlyData, setMonthlyData] = useState(([] as unknown) as ViewMonth)
  const [
    err,
    incomeData,
    defaultDateView,
    calendarData,
    defaultMonth,
  ] = useIncome()
  const [yearData, totalYearIncome] = useYearIncome(selectedYear)
  const [incomeChartData] = useMonthlyIncomeChart(monthlyChart)
  const [totalMonthlyIncome] = useTotalMonthlyIncome(monthlyData)
  const [totalMonthlyExpenses] = useTotalMonthlyExpenses(monthlyData)
  const [loaded, setIsLoaded] = useState(false)
  const [isFormShowing, setIsFormShowing] = useState(false)
  const [dateView, setDateView] = useState({
    year: 0,
    month: '',
  } as DateView)
  const [tileContentData, setTileContentData] = useState({
    name: '',
    income: [],
    days: [{ day: '', expenses: [] }],
  } as ViewMonth)

  //this one only loads the chart for default month
  const loadChart = () => {
    setMonthlyChart(defaultMonth?.income as any)
  }

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/login')
    } else {
      setCalendar(calendarData)
      setSelectedYear(date.getFullYear())
      //console.log(isMonthClicking, isUpdating)
      if (!isMonthClicking) {
        setDateView(defaultDateView as DateView)
        loadChart()
        // console.log('I am calling now for monthly data', defaultMonth)
        setMonthlyData(defaultMonth)
        setMonthIncome(incomeData)
        setTileContentData(yearData.months)
        dispatch(clearUpdate())
      } else if (isMonthClicking && isUpdating) {
        setTimeout(() => {
          setMonthlyData(defaultMonth)
          loadChart()
          setMonthIncome(defaultMonth.income)
          // console.log('income data should update', incomeData)
          setTileContentData(yearData.months)
          console.log('tile content data', tileContentData)
          //  console.log(monthIncome)
          dispatch(clearUpdate())
          //  console.log('monthly data from ismonthclicking', monthlyData)
        }, 1000)
      }
    }
  }, [
    isAuthenticated,
    monthIncome,
    incomeData,
    calendarData,
    tileContentData,
    yearData,
    dateView,
    defaultDateView,
    defaultMonth,
  ])

  const showFormOnClick = () => {
    setIsFormShowing(true)
  }

  const hideFormOnClick = () => {
    setIsFormShowing(false)
  }

  const closeForm = () => {
    setIsFormShowing(false)
  }

  const changeMonthView = async (
    currentYear: number,
    currentMonth: string,
    foundYear: CalendarScheduler | undefined,
    currentIndex: number
  ) => {
    const foundMonth = await foundYear?.months.find(
      (month: any) => month.name === months[currentIndex]
    )
    setMonthIncome(foundMonth?.income)
    if (foundMonth) {
      setMonthlyChart(foundMonth?.income)
    } else {
      alert('no year registered')
    }
    //console.log('from changeMonthView', monthlyChart)
    setMonthlyData(foundMonth)
    //console.log('from changeMonthView', monthlyData)
    setIsLoaded(true)
  }

  const showMonthOnClick = async (e: any) => {
    setIsMonthClicking(true)
    const selectedYear = e.getFullYear()
    const currentIndex = e.getMonth()
    const foundYear = await calendar.years.find((i: any) => {
      return i.year === selectedYear
    })
    if (foundYear) {
      setTileContentData(foundYear.months)
    }
    setDateView({
      ...dateView,
      year: selectedYear,
      month: months[currentIndex],
    })
    changeMonthView(dateView.year, dateView.month, foundYear, currentIndex)
  }

  const switchYearOnClick = useCallback(
    async (e: any) => {
      try {
        const selectedYear = await e.activeStartDate.getFullYear()
        const foundYear = await calendar.years.find(
          (i: any) => i.year === selectedYear
        )
        console.log('found year', foundYear)
        //this is not updating
        setTileContentData(foundYear.months)
        console.log('tile content data', tileContentData)
      } catch (err) {}
    },
    [tileContentData, calendar]
  )

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* <main className={classes.content}>
        <div className={classes.appBarSpacer} /> */}
      <main>
        <div />
        <Container maxWidth="md" className={classes.container}>
          <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={7} md={6} lg={3} className={classes.gridItem}>
              <Paper className={fixedHeightPaperBudget}>
                <MonthlyBudget
                  year={dateView.year}
                  month={dateView.month}
                  totalMonthlyExpenses={totalMonthlyExpenses}
                  totalMonthlyIncome={totalMonthlyIncome}
                />
              </Paper>
            </Grid>
            <Grid item xs={5} md={4} lg={3} className={classes.gridItem}>
              <Paper className={fixedHeightPaperIncome}>
                <TotalMonthlyIncome
                  year={dateView.year}
                  month={dateView.month}
                  totalAmount={totalMonthlyIncome}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6} className={classes.gridItem}>
              <Paper className={fixedHeightPaper}>
                {incomeChartData.length > 0 ? (
                  <IncomeMonthlyChart
                    chartData={incomeChartData}
                    month={dateView.month}
                    year={dateView.year}
                  />
                ) : (
                  <EmptyMonthlyChartContainer
                    month={dateView.month}
                    year={dateView.year}
                  />
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6} className={classes.gridItem}>
              <Paper className={fixedHeightPaperTable}>
                <IncomeTable
                  monthlyIncome={formattedIncome}
                  year={dateView.year}
                  month={dateView.month}
                  showFormOnClick={showFormOnClick}
                />
              </Paper>
            </Grid>
            {isFormShowing && 
              <Grid item xs={12} md={12} lg={12} className={classes.addIncomeContainer}>
              <Paper className={classes.addIncomeFormContainer}>
                <AddIncome
                  year={dateView.year}
                  month={dateView.month}
                  closeForm={closeForm}
                  hideFormOnClick={hideFormOnClick}
                />
              </Paper>
            </Grid>}
            <Grid item xs={12} md={6} lg={6} className={classes.gridItem}>
              <Calendar
                value={calendarDate}
                showNeighboringMonth={true}
                onChange={showMonthOnClick}
                onActiveStartDateChange={switchYearOnClick}
                defaultView="year"
                maxDetail="year"
                tileContent={({ activeStartDate, date, view }: any) => (
                  <TileContentMonthlyIncome
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
