import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import EventNoteIcon from '@material-ui/icons/EventNote';

import Title from "../Title";

const useStyles = makeStyles((theme) => ({
  emptyTotalContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: '0 0'
  },
  header: {
    fontSize: '22px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '13px',
    },
  },
  eventNoteIcon: {
    fontSize: '50px',
    color: 'lightgrey',
    alignSelf: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '28px',
    },
  },
  depositContext: {
    flex: 1,
  },
}))

export default function EmptyTotal() {
  const classes = useStyles()
  return (
    <main className={classes.emptyTotalContainer}>
      <Title>
        No Data Recorded
      </Title>
      <EventNoteIcon className={classes.eventNoteIcon}/>
    </main>
  );
}
