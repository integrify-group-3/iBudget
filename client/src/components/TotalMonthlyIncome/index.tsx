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
})

export default function TotalIncome({
  month,
  year,
  totalAmount,
}: TotalMonthlyIncomeProps) {
  return (
    <React.Fragment>
      <Title>
        Total Income {month} {year}
      </Title>
      <Typography component="p" variant="h4">
        {totalAmount}
      </Typography>
      <div>
      </div>
    </React.Fragment>
  )
}
