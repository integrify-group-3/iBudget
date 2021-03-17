import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DataUsageIcon from '@material-ui/icons/DataUsage';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';

import Title from "../Title";

const useStyles = makeStyles({
  emptyTotalContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '1rem 0'
  },
  header: {
    fontSize: '22px'
  },
  dataUsageIcon: {
    fontSize: '55px',
    color: 'lightgrey',
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
      <DataUsageIcon className={classes.dataUsageIcon}/>
    </main>
  );
}
