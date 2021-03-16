import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { TotalYearIncomeProps } from '../../types/income'
import Title from '../Title'

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  totalIncomeText: {
    color: '#42A5F5'
  }
})

export default function TotalYearIncome({
  year,
  totalAmount,
}: TotalYearIncomeProps) {
  console.log(year, totalAmount)
  const classes = useStyles()
  return (
    <React.Fragment>
      <Title>Total Income {year}</Title> 
      <Typography component="p" variant="h4" className={classes.totalIncomeText}>
        €{totalAmount}
      </Typography>
    </React.Fragment>
  )
}
