import React from 'react';
import {NavLink} from 'react-router-dom';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../Title';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function ProfileDashboard() {
  const classes = useStyles();
  const date = new Date()
  const formattedDate = moment(date).format('LL') 

  return (
    <React.Fragment>
      <Title>John Doe</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {formattedDate}
      </Typography>
      <div>
        <NavLink to="/income" color="primary">
          Update Income
        </NavLink>
      </div>
    </React.Fragment>
  );
}