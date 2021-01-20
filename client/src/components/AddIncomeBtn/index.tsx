import React, { MouseEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { AddIncomeBtnProps } from '../../types'

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function AddIncomeBtn({ handleOpen }: AddIncomeBtnProps) {
  const classes = useStyles();
  return (
        // <Button variant="contained" size="small" color="primary" className={classes.margin} onClick={handleOpen}>
        //   Add Income
        // </Button>
        <div></div>
   
  );
}
