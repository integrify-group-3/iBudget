import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { TotalMonthlyIncomeProps } from '../../types/income'
import Title from '../Title'

function preventDefault(event: any) {
  event.preventDefault()
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  totalIncomeText: {
    color: '#42A5F5'
  }
})

export default function TotalIncome({
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
      <Typography component="p" variant="h4" className={classes.totalIncomeText}>
        €{totalAmount}
      </Typography>
      <div>
      </div>
    </React.Fragment>
  )
}
