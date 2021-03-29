import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ForwardIcon from '@material-ui/icons/Forward';

import { TotalMonthlyExpensesProps } from '../../types/expenses'
import EmptyTotal from '../EmptyTotal'
import Title from '../Title'
import { mobileScreen } from '../../utils/windowSize'

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  totalExpensesText: {
    color: '#fd3865',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: `${mobileScreen ? '1rem' : '2.125rem'}`
  },
  percentageToIncome: {
    color: 'red',
    backgroundColor: 'lightgrey',
    borderRadius: '15px',
    padding: '.3rem 1rem',
    fontSize: `${mobileScreen ? '13px' : '18px'}`
  },
  forwardIcon: {
    color: '#fd3865',
    fontSize: '2.3rem',
    marginRight: '2rem'
  }
})

export default function TotalMonthlyExpenses({
  month,
  year,
  totalMonthlyExpenses,
  totalMonthlyIncome,
}: TotalMonthlyExpensesProps) {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Title>
        My Expenses 
        {/* month and year are for testing purposes */}
        {/* {month} {year} */}
        <ForwardIcon className={classes.forwardIcon}/>
      </Title>
      {totalMonthlyExpenses > 0 ? (
        <Typography
          component="p"
          variant="h4"
          className={classes.totalExpensesText}
        >
          <span>€{totalMonthlyExpenses} </span>
          <span className={classes.percentageToIncome} title='percentage to income'>
            {`${totalMonthlyIncome < 1 ? `100` : Math.round((totalMonthlyExpenses / totalMonthlyIncome) * 100)}`}
            %
          </span>
        </Typography>
      ) : (
        <EmptyTotal />
      )}
    </React.Fragment>
  )
}
