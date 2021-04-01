import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ForwardIcon from '@material-ui/icons/Forward'

import { TotalYearIncomeProps } from '../../types/income'
import EmptyTotal from '../EmptyTotal'
import Title from '../Title'

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
  },
  totalIncomeText: {
    color: '#42A5F5',
    fontSize: '2.125rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  forwardIcon: {
    color: '#42A5F5',
    fontSize: '2.3rem',
    transform: 'rotate(-180deg)',
    marginRight: '3rem',
    [theme.breakpoints.down('sm')]: {
      marginRight: '0',
    },  
  },
}))

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
