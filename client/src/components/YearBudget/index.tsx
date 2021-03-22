import React, { useEffect } from "react";
import moment from "moment"
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { YearBudgetProps } from '../../types'
import Title from "../Title";
import { date } from '../../utils/dateValues';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  yearBudgetText: {
    color: '#865cff',
    fontWeight: 700
  }
});

export default function YearBudget({ 
    year, 
    totalYearIncome,
    totalYearExpenses,
}: YearBudgetProps) {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Title>
        Total Budget for {year}
      </Title>
      <Typography component="p" variant="h4" className={classes.yearBudgetText}>
        €{totalYearIncome - totalYearExpenses} 
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Today: {moment(date).format('LL')}
      </Typography>
    </React.Fragment>
  );
}
