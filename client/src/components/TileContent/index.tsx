import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  tileList: {
    margin: theme.spacing(1),
  },
}));

export default function TileContent({ date, view, viewMonth, tileContent }: any) {
  const classes = useStyles();
  if (viewMonth !== undefined) {
    const selectedDay = viewMonth.days.find(
      (d: any) =>
        moment(d.day).format("LL") === moment(date).format("LL")
    );
    // setTileContent(tileContent);

    if (view === "month" && selectedDay) {
      return (
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            listStyle: "none",
            position: "relative"
          }}
        >
          {selectedDay.expenses.map((e: any) => (
            <>
              <li>{e.category}</li>
              <li>{e.amount}</li>
            </>
          ))}
        </ul>
      );
    } else {
      return null;
    }
  }

  return (
        <div></div>
  );
}
