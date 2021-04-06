import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import EqualizerIcon from '@material-ui/icons/Equalizer';

import { EmptyChartContainerProps } from '../../types/ui'
import Title from "../Title";

const useStyles = makeStyles({
  emptyChartContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '3rem 0',
    overflow: 'hidden'
  },
  header: {
    fontSize: '22px'
  },
  emptyChartIcon: {
    fontSize: '60px',
    color: 'lightgrey',
    marginTop: '1rem'
  },
  depositContext: {
    flex: 1,
  },
});

export default function EmptyMonthlyChartContainer({ 
    month, 
    year, 
}: EmptyChartContainerProps) {
  const classes = useStyles()
  
  return (
    <main className={classes.emptyChartContainer}>
      <Title>
        No Chart Data 
      </Title>
      <Typography component="p" variant="h4" className={classes.header}>
        No data registered for {month} {year} 
      </Typography>
      <EqualizerIcon className={classes.emptyChartIcon}/>
      <Typography color="textSecondary" className={classes.depositContext}>
        
      </Typography>
    </main>
  );
}
