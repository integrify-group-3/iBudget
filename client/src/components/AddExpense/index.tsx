import React from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import moment from 'moment'

import { AddExpenseProps, Expense } from '../../types/expenses'
import { addExpense } from '../../redux/actions/expenses'
import { expensesUiCategories } from '../../utils/uiCategories'
import SaveButton from '../SaveButton'
import CancelButton from '../CancelButton'

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
    width: '96%',
  },
  save: {
    border: 'none',
    background: 'none',
  },
}))

export default function AddExpense({
  expense,
  day,
  category,
  description,
  amount,
  setExpense,
  hideFormOnClick,
  closeForm,
}: AddExpenseProps) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    dispatch(addExpense(expense as Expense))
    closeForm()
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
                className={classes.select}
                value={category}
                onChange={handleChange}
                required
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
                        style={{ color: `${iconStyle}`, fontSize: '1.3rem', opacity: '0.6' }}
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
                onChange={handleChange}
                className={classes.input}
                name="description"
                value={description}
                required
              />
            </div>

            <div className="input-topics">
              <TextField
                type="number"
                id="outlined-basic"
                variant="outlined"
                label="amount"
                onChange={handleChange}
                className={classes.input}
                name="amount"
                value={amount}
                required
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
