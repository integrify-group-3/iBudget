import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import moment from 'moment'

import SaveButton from '../SaveButton'
import CancelButton from '../CancelButton'
import { AppState } from '../../types'
import { updateIncome } from '../../redux/actions/income'
import { incomeUiCategories } from '../../utils/uiCategories'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '45ch',
    },
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid rgba(184, 173, 173, 0.6)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '5px',
    [theme.breakpoints.down('sm')]: {
      width: '22rem',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
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

function EditIncome({
  incomeId,
  hideFormOnClick,
  monthlyIncome,
  month,
  year,
}: any) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [income, setIncome] = useState({
    category: '',
    description: '',
    amount: 0,
    date: '',
    month: '',
    year: 0,
  })

  useEffect(() => {
    const foundIncome = monthlyIncome.find(
      (income: any) => income._id === incomeId
    )
    setIncome(foundIncome)
  }, [])
  const { category, description, amount } = income

  const handleSubmit = (e: any) => {
    e.preventDefault()
    dispatch(updateIncome(income, incomeId))
    hideFormOnClick(e)
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setIncome({ ...income, [name]: value })
  }

  return (
    <div>
      <div className={classes.paper}>
        <div className="form-container">
          {month} {year}
          <form className={classes.root} onSubmit={handleSubmit}>
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
                {incomeUiCategories &&
                  incomeUiCategories.map((incomeCategory: any) => {
                    const { category, icon, iconStyle } = incomeCategory
                    return (
                      <MenuItem
                        value={category}
                        key={category}
                        className={classes.selectCategory}
                      >
                        <span>
                          {category[0].toUpperCase().concat(category.slice(1))}
                        </span>
                        <i
                          className={icon}
                          style={{
                            color: `${iconStyle}`,
                            fontSize: '1.3rem',
                            opacity: '0.6',
                            paddingLeft: '12rem',
                          }}
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
                name="description"
                onChange={handleChange}
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
                name="amount"
                onChange={handleChange}
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
    </div>
  )
}

export default EditIncome
