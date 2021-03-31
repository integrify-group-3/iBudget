import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ForwardIcon from '@material-ui/icons/Forward'

import { TotalYearIncomeProps } from '../../types/income'
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
  },
})

export default function TotalYearIncome({
  year,
  totalAmount,
}: TotalYearIncomeProps) {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Title>
        <span>Total Income 
          {/* year is for testing */}
          {/* {year} */}
          </span>
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
    </React.Fragment>
  )
}
