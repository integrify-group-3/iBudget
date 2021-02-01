import React, { useEffect } from "react";
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
});

export default function MonthlyBudget({ 
    month, 
    year, 
    totalExpenses
}: MonthlyBudgetProps) {
  const classes = useStyles()

  return (
    <React.Fragment>
      <Title>
        Total Budget {month} {year}
      </Title>
      <Typography component="p" variant="h4">
        {/* this will be total income - total expenses  */}
        €{totalExpenses} 
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Current date: {moment(date).format('LL')}
      </Typography>
    </React.Fragment>
  );
}
