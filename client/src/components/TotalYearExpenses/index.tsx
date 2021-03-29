import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ForwardIcon from '@material-ui/icons/Forward'

import { TotalYearExpensesProps } from '../../types/expenses'
import EmptyTotal from '../EmptyTotal'
import Title from '../Title'

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  totalIncomeText: {
    color: '#FF7043',
  },
  forwardIcon: {
    color: '#fd3865',
    fontSize: '2.3rem',
    marginRight: '2rem'
  },
})

export default function TotalYearExpenses({
  year,
  totalAmount,
}: TotalYearExpensesProps) {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Title>
        <span>
          Total Expenses 
          {/* year is for testing */}
          {/* {year} */}
          </span>
        <ForwardIcon className={classes.forwardIcon} />
      </Title>
      {totalAmount > 0 ? (
        <Typography
          component="p"
          variant="h4"
          className={classes.totalIncomeText}
        >
          €{totalAmount}
        </Typography>
      ) : (
        <EmptyTotal />
      )}
    </React.Fragment>
  )
}
