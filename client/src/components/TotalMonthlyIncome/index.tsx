import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { TotalMonthlyIncomeProps } from '../../types/income'
import EmptyTotal from '../EmptyTotal'
import Title from '../Title'

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  totalIncomeText: {
    color: '#42A5F5',
  },
})

export default function TotalMonthlyIncome({
  month,
  year,
  totalAmount,
}: TotalMonthlyIncomeProps) {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Title>
        Total Income {month} {year}
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

      <div></div>
    </React.Fragment>
  )
}
