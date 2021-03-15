import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { TotalYearIncomeProps } from '../../types/income'
import Title from '../Title'

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
})

export default function TotalYearIncomes({
  year,
  totalAmount,
}: TotalYearIncomeProps) {
  return (
    <React.Fragment>
      <Title>Total Incomes {year.year}</Title>
      <Typography component="p" variant="h4">
        €{totalAmount}
      </Typography>
    </React.Fragment>
  )
}
