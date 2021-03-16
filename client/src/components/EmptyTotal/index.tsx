import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import EventNoteIcon from '@material-ui/icons/EventNote';

import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';

import Title from "../Title";

const useStyles = makeStyles({
  emptyChartContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '3rem 0'
  },
  header: {
    fontSize: '22px'
  },
  calendarIcon: {
    fontSize: '68px',
    color: 'lightgrey',
    marginTop: '1rem'
  },
  depositContext: {
    flex: 1,
  },
});

export default function EmptyTotal() {
  const classes = useStyles()
  return (
    <main className={classes.emptyChartContainer}>
      <Title>
        No Data 
      </Title>
      <HourglassEmptyIcon className={classes.calendarIcon}/>
      <Typography color="textSecondary" className={classes.depositContext}>
        
      </Typography>
    </main>
  );
}
