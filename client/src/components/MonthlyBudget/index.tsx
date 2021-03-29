import React from "react";
import moment from "moment"
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { MonthlyBudgetProps } from '../../types'
import Title from "../Title";
import { date } from '../../utils/dateValues';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  monthlyBudget: {
    color: '#865cff',
    fontWeight: 700
  }
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
        Today: {moment(date).format('LL')}
      </Typography>
    </React.Fragment>
  );
}
