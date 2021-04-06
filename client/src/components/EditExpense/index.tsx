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
import CancelButton from '../CancelButton'

import { AppState } from '../../types/index'
import { Expense, EditExpenseProps } from '../../types/expenses'
import { expensesUiCategories } from '../../utils/uiCategories'
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
    border: '1px solid rgba(184, 173, 173, 0.6)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '5px',
    width: '27rem',
    [theme.breakpoints.down('sm')]: {
      width: '22rem',
    },
  },
  header: {
    marginLeft: '.5rem',
  },
  clear: {
    cursor: 'pointer',
  },
  input: {
    width: '22rem',
    [theme.breakpoints.down('sm')]: {
      width: '17rem',
    },
  },
  select: {
    width: '22rem',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      width: '17rem',
    },
  },
  selectCategory: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  btnSaveWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
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
  }
  
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setExpense({ ...expense, [name]: value })
  }

  return (
      <div className={classes.paper}>
        <div className="form-container">
          <h3 className={classes.header}>{moment(day).format('LL')}</h3>
          <form onSubmit={handleSubmit} className={classes.root}>
            <div className="input-topics">
              <InputLabel id="demo-simple-select-outlined-label">
                Select category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="category"
                value={category}
                onChange={handleChange}
                className={classes.select}
                required={true}
              >
                {expensesUiCategories.map((expenseCat) => {
                  const { category, icon, iconStyle } = expenseCat
                  return (
                    <MenuItem
                      value={category}
                      className={classes.selectCategory}
                    >
                      <span>{`${category
                        .charAt(0)
                        .toUpperCase()}${category.slice(1)}`}</span>
                      <i
                        className={icon}
                        style={{ color: `${iconStyle}`, fontSize: '1.3rem', opacity: '0.6', marginLeft: '14rem' }}
                      ></i>
                    </MenuItem>
                  )
                })}
              </Select>
            </div>

            <div className="input-topics">
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="description (rent, car)"
                className={classes.input}
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
                className={classes.input}
                onChange={handleChange}
                name="amount"
                value={amount}
              />
            </div>
            <div className={classes.btnSaveWrapper}>
            <button className={classes.save}>
              <SaveButton />
            </button>
            <button className={classes.save} onClick={hideFormOnClick}>
              <CancelButton />
            </button>
            </div>
          </form>
        </div>
      </div>
  )
}
