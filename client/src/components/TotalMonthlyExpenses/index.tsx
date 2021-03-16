import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { TotalMonthlyExpensesProps } from '../../types/expenses'
import EmptyTotal from '../EmptyTotal'
import Title from "../Title";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  totalExpensesText: {
    color: '#FF7043',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default function TotalMonthlyExpenses({ 
    month, 
    year, 
    totalMonthlyExpenses,
    totalMonthlyIncome
}: TotalMonthlyExpensesProps) {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Title>
        Total Expenses {month} {year}
      </Title>
      {
        totalMonthlyExpenses > 0 ?
        <Typography component="p" variant="h4" className={classes.totalExpensesText}>
        <span>€{totalMonthlyExpenses}   </span>              
        <span style={{color: 'red'}}>{`${Math.floor((totalMonthlyExpenses / totalMonthlyIncome)*100)}`}%</span>
      </Typography>

      : 
        <EmptyTotal />
      }
    
    </React.Fragment>
  );
}
