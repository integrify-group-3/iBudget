import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import { AddExpenseBtnProps } from '../../types/ui'
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    width: '7rem'
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}))

export default function AddExpenseBtn({ showFormOnClick }: AddExpenseBtnProps) {
  const classes = useStyles()

  return (
    <Button
      variant="contained"
      size="small"
      color="primary"
      className={classes.margin}
      onClick={showFormOnClick}
    >
      Add Expense
    </Button>
  )
}
