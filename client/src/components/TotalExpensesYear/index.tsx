import React, { useEffect } from "react";
import moment from "moment"
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { TotalExpensesYearProps } from '../../types'
import Title from "../Title";
import { date } from '../../utils/dateValues';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function TotalExpensesYear({ 
    year, 
    totalAmount
}: TotalExpensesYearProps) {
  const classes = useStyles()
  
  return (
    <React.Fragment>
      <Title>
        Total Expenses {year}
      </Title>
      <Typography component="p" variant="h4">
        €{totalAmount} 
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Current date: {moment(date).format('LL')}
      </Typography>
    </React.Fragment>
  );
}
