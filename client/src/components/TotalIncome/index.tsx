import React, { useEffect } from 'react'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { TotalIncomeProps } from '../../types'
import Title from '../Title'
import { setTimeout } from 'timers'

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
  monthlyIncome,
}: TotalIncomeProps) {
  const classes = useStyles()
  console.log('from total income', monthlyIncome)

  const calculateTotalIncome = () => {
    let count = 0
    for (const income of monthlyIncome) {
      const { amount } = income
      count += amount
    }
    return count
  }

  useEffect(() => {
    console.log('from total income', monthlyIncome)
    if(monthlyIncome !== undefined) {
      calculateTotalIncome()
    }
  }, [])

  const income = calculateTotalIncome()
  return (
    <React.Fragment>
      <Title>
        Total Income {month} {year}
      </Title>
      <Typography component="p" variant="h4">
        {income} 
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  )
}
