import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { TotalMonthlyExpensesProps } from '../../types/expenses'
import Title from "../Title";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function TotalMonthlyExpenses({ 
    month, 
    year, 
    totalAmount
}: TotalMonthlyExpensesProps) {

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
