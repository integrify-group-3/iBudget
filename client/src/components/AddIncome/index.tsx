import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import CancelButton from '../CancelButton'

import { AddIncomeProps } from '../../types/income'
import { addIncome } from '../../redux/actions/income'
import SaveButton from '../SaveButton'
import { incomeUiCategories } from '../../utils/uiCategories'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '1px solid rgba(184, 173, 173, 0.6)',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(1, 22, 1, 2),
      borderRadius: '5px',
      [theme.breakpoints.down('sm')]: {
        width: '22rem',
      },
    },
    header: {
      marginLeft: '.5rem',
    },
    select: {
      width: '22rem',
      marginTop: '8px',
       [theme.breakpoints.down('sm')]: {
      width: '17rem',
    },
    },
    input: {
      width: '22rem',
      marginTop: '8px',
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
      paddingLeft: '164px'
    },
    save: {
      border: 'none',
      background: 'none',
    },
  })
)

export default function AddIncome({
  year,
  month,
  closeForm,
  hideFormOnClick,
}: AddIncomeProps) {
  const dispatch = useDispatch()

  const classes = useStyles()
  const [income, setIncome] = useState({
    category: '',
    description: '',
    amount: '',
    year: year,
    month: month,
  })
  const { category, description, amount } = income

  const handleSubmit = (e: any) => {
    e.preventDefault()
    dispatch(addIncome(income))
    closeForm()
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setIncome({
      ...income,
      [name]: value,
    })
  }
  return (
    <div className={classes.paper}>
      <div className="form-container">
        <h3 className={classes.header}>{month} {year}</h3>
        <form className={classes.root} onSubmit={handleSubmit}>
          <div className="input-topics">
            <InputLabel id="demo-simple-select-outlined-label">
              Select Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              name="category"
              onChange={handleChange}
              className={classes.select}
              required
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
                        }}
                      ></i>
                    </MenuItem>
                  )
                })}
            </Select>
            <div className="input-topics">
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={description}
                name="description"
                label="description"
                onChange={handleChange}
                className={classes.input}
                required
              />
            </div>
            <div className="input-topics">
              <TextField
                value={amount}
                name="amount"
                variant="outlined"
                id="outlined-basic"
                type="number"
                label="amount"
                onChange={handleChange}
                className={classes.input}
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
          </div>
        </form>
      </div>
    </div>
  )
}
