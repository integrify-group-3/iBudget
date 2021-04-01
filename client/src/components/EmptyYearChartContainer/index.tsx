import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import EqualizerIcon from '@material-ui/icons/Equalizer';

import { EmptyYearChartContainerProps } from '../../types/ui'
import Title from "../Title";

const useStyles = makeStyles((theme) => ({
  emptyChartContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '10rem 0'
  },
  header: {
    fontSize: '22px'
  },
  emptyChartIcon: {
    fontSize: '68px',
    color: 'lightgrey',
    marginTop: '1rem',
  },
  depositContext: {
    flex: 1,
  },
}))

export default function EmptyYearChartContainer({ 
    year, 
}: EmptyYearChartContainerProps) {
  const classes = useStyles()
  return (
    <main className={classes.emptyChartContainer}>
      <Title>
        No Chart Data 
      </Title>
      <Typography component="p" variant="h4" className={classes.header}>
        No data registered for {year} 
      </Typography>
      <EqualizerIcon className={classes.emptyChartIcon}/>
      <Typography color="textSecondary" className={classes.depositContext}>
        
      </Typography>
    </main>
  );
}
