import React, { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import moment from "moment"
import Calendar from "react-calendar"
import axios from "axios"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Box from "@material-ui/core/Box"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import { AppState, CalendarScheduler, DateView, DailyExpense } from '../../types'
import { tokenConfig } from '../../redux/actions/user'

import useExpenses from '../../hooks/useExpenses'
import { months } from '../../utils/months'
// import ExpensesChart from "../../components/ExpensesChart";
import TotalExpenses from "../../components/TotalExpenses";
import ExpensesTable from "../../components/ExpensesTable";
// import TileContent from "../../components/TileContent";
import AddExpense from "../../components/AddExpense";
// import TotalBalance from '../../components/TotalBalance'

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
  const [err, expensesData, calendarData] = useExpenses() 
  const date = new Date();
  const year = date.getFullYear();
  const currentMonthIndex = date.getMonth();

  const [calendarDate, setCalendarDate] = useState(date);
  const [calendar, setCalendar] = useState({} as any);
  const [isFormShowing, setIsFormShowing] = useState(false);
  const [month, setMonth] = useState("");
  const [yearExpenses, setYearExpenses] = useState();
  const [monthExpenses, setMonthExpenses] = useState([]);
  const [dailyExp, setDailyExp] = useState({} as DailyExpense);
  const [isDayClicking, setIsDayClicking] = useState(false)
  const day = new Date()
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

  const [viewMonth, setViewMonth] = useState();
  const [tileContent, setTileContent] = useState();
  const [chartLoaded, setChartLoaded] = useState(false)
  const [chartData, setChartData] = useState()

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/login')
    } else {
        setCalendar(calendarData)
    }
  })
 
  const fetchExpenses = () => {
    axios.get("http://localhost:5000/api/v1/expenses").then((res) => {
      setCalendar(res.data);
      const foundYear = res.data.years.find((y: any) => y.year === year);
      const currentIndex = date.getMonth();
      setDateView({ year: year, month: months[currentIndex] });
      setYearExpenses(foundYear);
      for (const year of res.data.years) {
        if (year.year === foundYear.year) {
          const selectedMonth = year.months.find(
            (month: any) => month.name === months[currentIndex]
          );
          // console.log(selectedMonth);
          setViewMonth(selectedMonth);
          const selectedDay = selectedMonth.days.find(
            (d: any) => moment(d.day).format("LL") === moment(date).format("LL")
          );
          setDailyExp(selectedDay);
        } else {
          console.log("no year on database");
        }
      }
    })
}
  

  const onChange = (e: any) => {
    //   console.log('clicked')
    // console.log(e)
    setCalendarDate(calendarDate);
  };

  // console.log(calendarDate)

  const showFormOnClick = () => {
    setIsFormShowing(true);
  };

  const hideFormOnClick = () => {
    setIsFormShowing(false);
  };

  const showDay = (e: any) => {
      // console.log(e.toDateString())
      setIsFormShowing(false);
      setIsDayClicking(true)
      setSchedule({ ...schedule, day: e });
      console.log('schedule', schedule)
      const selectedYear = e.getFullYear();
      const currentIndex = e.getMonth();
      //this will set the day, year and month to the expense in case we will add a new new one for the day
      setExpense({
        ...expense,
        date: e,
        year: year,
        month: months[currentIndex],
      });
      for (const year of calendar.years) {
        if (year.year === selectedYear) {
          // console.log("year matches", year);
          const selectedMonth = year.months.find(
            (month: any) => month.name === months[currentIndex]
          );
          const selectedDay = selectedMonth.days.find(
            (d: any) => moment(d.day).format("LL") === moment(e).format("LL")
          );
          console.log(selectedDay);
          // console.log(selectedMonth)
          if(selectedDay !== undefined) {
            setDailyExp(selectedDay);
          } else {
            setDailyExp(schedule)
          }
        } else {
          console.log("no year on database");
        }
      }
    }

  const addExpense = (newExpense: any) => {
    console.log("here", newExpense);
    // setDailyExp({...dailyExp, newExpense})
    setIsFormShowing(false);
    setTimeout(() => {
      fetchExpenses();
    }, 1000);
  };

  const removeExpense = () => {
    setTimeout(() => {
      fetchExpenses();
    }, 1000);
  };
  const updateExpenses = () => {
    setTimeout(() => {
      fetchExpenses();
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
                {/* <ExpensesChart  
                  // monthlyIncome={monthIncome}
                  chartData={chartData}
                  year={dateView.year}
                  month={dateView.month}
                  valueField="amount"
                  argumentField="category"
                  name="category"
                  chartLoaded={chartLoaded}
                  /> */}
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
                {/* <TotalBalance
                  year={dateView.year}
                  month={dateView.month}
                  monthExpenses={viewMonth}
                  expensesBalance={totalExpenses}
                /> */}
              </Paper>
            </Grid>
           
            <Grid item xs={12} md={6}>
              <Paper className={fixedHeightPaper}>
              {isFormShowing ? (
              <AddExpense
                expense={expense}
                day={isDayClicking ? schedule.day : day}
                category={category}
                description={description}
                amount={amount}
                setExpense={setExpense}
                addExpense={addExpense}
                hideFormOnClick={hideFormOnClick}
              />
            ) : (
              <ExpensesTable
                // expense={expense}
                day={isDayClicking ? schedule.day : day}
                dailyExp={dailyExp}
                removeExpense={removeExpense}
                updateExpenses={updateExpenses}
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
                /*tileContent={({ date, view }) => (
                  <TileContent
                    date={date}
                    view={view}
                    viewMonth={viewMonth}
                    tileContent={tileContent}
                  />
                )}*/
              />
            </Grid>
          </Grid>
          <Box pt={4}></Box>
          </Container>
      </main>
    </div>
  )
}
