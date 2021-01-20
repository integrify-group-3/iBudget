import React from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Title from '../Title'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import { IncomeTableProps } from '../../types'
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
}))

export default function IncomeTable({
  year,
  month,
  monthlyIncome,
  updateIncome,
}: IncomeTableProps) {
  // console.log('fromt props', monthlyIncome, year, month)
  const dispatch = useDispatch()
  const classes = useStyles()
  const [openForm, setOpenForm] = React.useState(false)
  const handleOpen = () => {
    setOpenForm(true)
  }

  const handleClose = () => {
    setOpenForm(false)
  }

  const deleteOnClick = (id: string) => {
    const url = `http://localhost:5000/api/v1/income/${id}`
    axios.delete(url).then((res) => {
      console.log(res)
      updateIncome()
    })
  }

  return (
    <React.Fragment>
      {!openForm ? (
        <>
          <Title>
            {month} {year}
          </Title>
          {monthlyIncome.length < 1 ? (
            <Typography component="p" variant="h4">
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
                  onClick={(e) => deleteOnClick(income._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))
          )}
          {/* <AddIncomeBtn handleOpen={handleOpen} /> */}
          <button onClick={handleOpen}>Add Income</button>
        </>
      ) : (
        <div>
          <AddIncome
            year={year}
            month={month}
            openForm={openForm}
            handleClose={handleClose}
          />
        </div>
      )}
    </React.Fragment>
  )
}
