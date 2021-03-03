import React from "react";
import moment from "moment"
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { TotalExpensesProps } from '../../types'
import Title from "../Title";
import { date } from '../../utils/dateValues';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function TotalExpenses({ 
    month, 
    year, 
    totalAmount
}: TotalExpensesProps) {
  console.log(totalAmount)
  const classes = useStyles()
  return (
    <React.Fragment>
      <Title>
        Total Expenses {month} {year}
      </Title>
      <Typography component="p" variant="h4">
        €{totalAmount} 
      </Typography>
    </React.Fragment>
  );
}
