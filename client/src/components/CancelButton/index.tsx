import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}))

export default function CancelButton() {
  const classes = useStyles()

  return (
    <Button
      variant="contained"
      color="primary"
      size="small"
      className={classes.button}
    >
      Cancel
    </Button>
  )
}
