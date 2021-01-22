import React, { useEffect, useState, useCallback } from "react"
import { useSelector } from 'react-redux'
import moment from "moment"
import Calendar from "react-calendar"

import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Box from "@material-ui/core/Box"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import { AppState, CalendarScheduler, DateView, DailyExpense, ViewMonth } from '../../types'

import useExpenses from '../../hooks/useExpenses'
import { months, date, year, currentMonth } from '../../utils/dateValues'
import TotalExpenses from "../../components/TotalExpenses";
import ExpensesTable from "../../components/ExpensesTable";
import TileContent from "../../components/TileContent";
import AddExpense from "../../components/AddExpense";

import "react-calendar/dist/Calendar.css";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: 'wrap',
    padding: "5rem 1rem",
    width: "100vw",
    paddingLeft: "6rem",
    overflow: "hidden",
  },
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    width: "70vw",
  },
  grid: {
    width: "90vw",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240
  },
  chartHeightPaper: {
    height: 550
  }
}));

export default function ExpensesPage(props: any) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const isAuthenticated = useSelector(
    (state: AppState) => state.user.isAuthenticated
  )
  const [err, expensesData, calendarData, defaultDateView, defaultMonth] = useExpenses() 
  const [calendarDate, setCalendarDate] = useState(date);
  const [isFormShowing, setIsFormShowing] = useState(false);
  const [month, setMonth] = useState("");
  const [dailyExpense, setDailyExpense] = useState({} as DailyExpense);
  const [isDayClicking, setIsDayClicking] = useState(false)
  const [viewMonth, setViewMonth] = useState({name: '', days: [{day: '', expenses: []}], income: []} as ViewMonth);
  const [schedule, setSchedule] = useState({
    day: "",
    expenses: [],
  });

  const [dateView, setDateView] = useState({
    year: 0,
    month: "",
  } as DateView);

  const [expense, setExpense] = useState({
    category: "",
    description: "",
    amount: 0,
    date: "",
    month: month,
    year: year,
  });
  const { category, description, amount } = expense;

 
  const setDefaultCalendar = async () => {
    try {
      // console.log('from hooks', selectedMonth)
      setViewMonth(defaultMonth)
      // console.log('from async set default', viewMonth)
    }
    catch(err) {
      console.log(err)
    }
  }

  const setClickedCalendar = useCallback(
    (foundMonth) => {
      setViewMonth(foundMonth)
      console.log('from use callback', viewMonth)
    },
    [viewMonth],
  )
  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/login')
    } else {
        setDateView(defaultDateView as DateView)
        setDefaultCalendar()
    }
  }, [dateView, viewMonth, calendarData, defaultMonth])

  const onChange = (e: any) => {
    //   console.log('clicked')
    // console.log(e)
    setCalendarDate(calendarDate);
  };

  const showFormOnClick = () => {
    setIsFormShowing(true);
  };

  const hideFormOnClick = () => {
    setIsFormShowing(false);
  };

  const closeForm = () => {
    setIsFormShowing(false);
  }

  const updateDailyExpenses = (updatedExpenses: any) => {
    console.log('update expenses', updatedExpenses)
    setDailyExpense(updatedExpenses)
  }

  const showDay = async (e: any) => {
      setIsFormShowing(false);
      setSchedule({ ...schedule, day: e });
      // console.log('schedule', schedule)
      const selectedYear = e.getFullYear();
      const currentIndex = e.getMonth();
      //this will set the day, year and month to the expense in case we will add a new new one for the day
      setDateView({year: selectedYear, month: months[currentIndex]})
      console.log('date view', dateView)
      setExpense({
        ...expense,
        date: e,
        year: year,
        month: months[currentIndex],
      });
      console.log(schedule)
      try {
        const foundYear = await calendarData.years.find((y: any) => y.year === selectedYear)
        // console.log(calendarData)
        // console.log(foundYear)
        const foundMonth = await foundYear.months.find(
          (month: any) => month.name === months[currentIndex]
        )
        setClickedCalendar(foundMonth);
        console.log('view month from select day', viewMonth)
        const selectedDay = await foundMonth.days.find(
          (d: any) => moment(d.day).format("LL") === moment(e).format("LL")
        );
        setIsDayClicking(true)
        if(selectedDay !== undefined) {
          setDailyExpense(selectedDay);
          console.log(dailyExpense)
        } else {
          setDailyExpense(schedule)
        }
      }
        catch(err) {
          console.log("no year on database");
        }
      
    }

  const removeExpense = () => {
    setTimeout(() => {
    }, 1000);
  };
  const updateExpenses = () => {
    setTimeout(() => {
    }, 1000);
  };
 
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
              {isFormShowing ? (
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
            ) : (
              <ExpensesTable
                day={isDayClicking ? schedule.day : date}
                dailyExpense={isDayClicking ? dailyExpense : expensesData as DailyExpense}
                updateDailyExpenses={updateDailyExpenses}
                showFormOnClick={showFormOnClick}
              />
            )} 
              </Paper>
            </Grid>
         
            <Grid item xs={10} md={6}>
              <Calendar
                onChange={onChange}
                value={calendarDate}
                //   onClickYear={showYear}
                //   onClickMonth={showMonth}
                onClickDay={showDay}
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
