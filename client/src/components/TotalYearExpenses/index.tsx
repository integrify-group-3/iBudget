import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { TotalYearExpensesProps } from '../../types/expenses'
import Title from "../Title";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  totalIncomeText: {
    color: '#FF7043'
  }
});

export default function TotalYearExpenses({ 
    year, 
    totalAmount
}: TotalYearExpensesProps) {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Title>
        Total Expenses {year}
      </Title>
      <Typography component="p" variant="h4" className={classes.totalIncomeText}>
        €{totalAmount} 
      </Typography>
    </React.Fragment>
  );
}
