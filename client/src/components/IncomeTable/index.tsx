import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Title from '../Title'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

import { removeIncome } from '../../redux/actions/income'
import { IncomeTableProps, Income } from '../../types'
import AddIncomeBtn from '../AddIncomeBtn'
import AddIncome from '../AddIncome'

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 0,
  },
  margin: {
    margin: theme.spacing(1),
  },
  incomeList: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  editIncome: {
    color: 'lightblue',
    cursor: 'pointer',
  },
}))

export default function IncomeTable({
  year,
  month,
  monthlyIncome,
  updateMonthlyIncome,
}: IncomeTableProps) {
  // console.log('fromt props', monthlyIncome, year, month)
  const dispatch = useDispatch()
  const classes = useStyles()
  const [openForm, setOpenForm] = React.useState(false)
  const showFormOnClick = () => {
    setOpenForm(true)
  }

  const handleClose = () => {
    setOpenForm(false)
  }

  const deleteOnClick = (id: string, income: Income) => {
    dispatch(removeIncome(id, income))
  }
  
  console.log('from income table', monthlyIncome)
  return (
    <React.Fragment>
      {!openForm ? (
        <>
          <Title>
            {month} {year}
          </Title>
          {monthlyIncome.length < 1 ? (
            <Typography component="p" variant="h5">
              No income registered
            </Typography>
          ) : (
            monthlyIncome.map((income: any) => (
              <div className={classes.incomeList}>
                <Typography component="p" variant="h5" key={income._id}>
                  {income.amount}
                </Typography>
                <Typography
                  color="textSecondary"
                  className={classes.depositContext}
                >
                  {income.category}
                </Typography>
                <IconButton
                  aria-label="delete"
                  className={classes.margin}
                  onClick={(e) => deleteOnClick(income._id, income)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))
          )}
          <AddIncomeBtn showFormOnClick={showFormOnClick} />
        </>
      ) : (
        <div>
          <AddIncome
            year={year}
            month={month}
            openForm={openForm}
            handleClose={handleClose}
            updateMonthlyIncome={updateMonthlyIncome}
          />
        </div>
      )}
    </React.Fragment>
  )
}
