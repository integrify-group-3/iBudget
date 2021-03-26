import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import EventNoteIcon from '@material-ui/icons/EventNote';

import Title from "../Title";

const useStyles = makeStyles({
  emptyTotalContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: '1rem 0'
  },
  header: {
    fontSize: '22px'
  },
  eventNoteIcon: {
    fontSize: '50px',
    color: 'lightgrey',
    alignSelf: 'center'
  },
  depositContext: {
    flex: 1,
  },
});

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
