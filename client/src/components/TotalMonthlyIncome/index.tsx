import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ForwardIcon from '@material-ui/icons/Forward';

import { TotalMonthlyIncomeProps } from '../../types/income'
import EmptyTotal from '../EmptyTotal'
import Title from '../Title'
import { mobileScreen } from '../../utils/windowSize'

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  totalIncomeText: {
    color: '#42A5F5',
    fontSize: `${mobileScreen ? '1rem' : '2.125rem'}`
  },
  forwardIcon: {
    color: '#42A5F5',
    fontSize: '2.3rem',
    transform: 'rotate(-180deg)',
    marginRight: `${mobileScreen ? '0' : '3rem'}`
  }
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
        My Income 
        {/* month and year are for testing purposes */}
        {/* {month} {year} */}
        <ForwardIcon className={classes.forwardIcon}/>
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
