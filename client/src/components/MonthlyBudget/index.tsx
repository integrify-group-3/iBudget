import React from "react";
import moment from "moment"
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ScheduleIcon from '@material-ui/icons/Schedule'

import { MonthlyBudgetProps } from '../../types'
import Title from "../Title";
import { date } from '../../utils/dateValues';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  monthlyBudget: {
    color: '#865cff',
    fontWeight: 700
  },
  clockIcon: {
    color: 'lightgrey',
    marginRight: '.3rem',
  },
});

export default function MonthlyBudget({ 
    month, 
    year, 
    totalMonthlyExpenses,
    totalMonthlyIncome,
}: MonthlyBudgetProps) {
  const classes = useStyles()

  return (
    <React.Fragment>
      <Title>
        My Budget {month} {year}
      </Title>
      <Typography component="p" variant="h4" className={classes.monthlyBudget}>
        {/* this will be total income - total expenses  */}
        €{totalMonthlyIncome - totalMonthlyExpenses} 
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
      <ScheduleIcon className={classes.clockIcon} />
        {moment(date).format('LL')}
      </Typography>
    </React.Fragment>
  );
}
