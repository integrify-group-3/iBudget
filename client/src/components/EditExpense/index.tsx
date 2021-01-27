import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import moment from 'moment'
import ClearIcon from '@material-ui/icons/Clear'

import { AppState, Expense, EditExpenseProps, DailyExpense } from '../../types'
import { updateExpense } from '../../redux/actions/expenses'
import SaveButton from '../SaveButton'
import { setTimeout } from 'timers'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  clear: {
    cursor: 'pointer',
  },
  save: {
    border: 'none',
    background: 'none',
  },
}))

export default function EditExpense({
  expenseId,
  day,
  hideFormOnClick,
  dailyExpense,
  updateEditedExpenses,
}: EditExpenseProps) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const updatedExpenses = useSelector(
    (state: AppState) => state.expenses.dailyExpenses
  )
  const [expense, setExpense] = useState({
    category: '',
    description: '',
    amount: 0,
    date: '',
    month: '',
    year: 0,
  })
  const { category, description, amount } = expense

  useEffect(() => {
    const foundExpense = dailyExpense.expenses.find(
      (exp: any) => exp._id === expenseId
    )
    setExpense(foundExpense as Expense)
  }, [updatedExpenses])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    dispatch(updateExpense(expense, expenseId))
    hideFormOnClick(e)
    setTimeout(() => {
        console.log('updating expense', updatedExpenses)
        // updateEditedExpenses(updatedExpenses)
    }, 2000);
    // updateExpenses()
  }
  useEffect(() => {
    console.log(updatedExpenses)
  }, [updatedExpenses])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setExpense({ ...expense, [name]: value })
  }

  return (
    <div>
      <div className={classes.paper}>
        <div className="form-container">
          <h3>{moment(day).format('LL')}</h3>
          <form onSubmit={handleSubmit} className={classes.root}>
            <div className={classes.header}>
              <ClearIcon className={classes.clear} onClick={hideFormOnClick} />
            </div>
            <div className="input-topics">
              <InputLabel id="demo-simple-select-outlined-label">
                Select category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="category"
                // size="small"
                value={category}
                onChange={handleChange}
                required={true}
              >
                <MenuItem value="housing">Housing</MenuItem>
                <MenuItem value="transportation">Transportation</MenuItem>
                <MenuItem value="food">Food</MenuItem>
                <MenuItem value="utilities">Utilities</MenuItem>
                <MenuItem value="clothing">Clothing</MenuItem>
                <MenuItem value="sports">Sports</MenuItem>
                <MenuItem value="entertainment">Entertainment</MenuItem>
                <MenuItem value="healthcare">Healthcare</MenuItem>
                <MenuItem value="insurance">Insurance</MenuItem>
                <MenuItem value="supplies">Household/Supplies</MenuItem>
                <MenuItem value="education">Education</MenuItem>
                <MenuItem value="debt">Debt/Loans</MenuItem>
                <MenuItem value="savings">Savings</MenuItem>
                <MenuItem value="holiday">Holiday</MenuItem>
              </Select>
            </div>

            <div className="input-topics">
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="description (rent, car)"
                onChange={handleChange}
                name="description"
                value={description}
              />
            </div>

            <div className="input-topics">
              <TextField
                type="number"
                id="outlined-basic"
                variant="outlined"
                label="amount"
                onChange={handleChange}
                name="amount"
                value={amount}
              />
            </div>
            <button className={classes.save}>
              <SaveButton />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
