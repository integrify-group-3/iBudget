import React, { useEffect } from "react";
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
    monthExpenses, 
}: TotalExpensesProps) {
  // console.log('from total expenses', month, year, monthExpenses)
  const classes = useStyles()
  const calculateTotalExpenses = () => {
    let count = 0
    if(monthExpenses !== undefined) {
        for(const dayIndex in monthExpenses.days) {
            const { expenses } = monthExpenses.days[dayIndex]
            for(const expense of expenses) {
                count += expense.amount
            }    
        }
        return count
    }
  }

  useEffect(() => {   
      calculateTotalExpenses()
  })

  const totalExpenses = calculateTotalExpenses()

  return (
    <React.Fragment>
      <Title>
        Total Expenses {month} {year}
      </Title>
      <Typography component="p" variant="h4">
        €{totalExpenses} 
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Current date: {moment(date).format('LL')}
      </Typography>
    </React.Fragment>
  );
}
