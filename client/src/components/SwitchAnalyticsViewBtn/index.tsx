import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import { SwitchAnalyticsViewBtnProps } from '../../types/ui'
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}))

export default function SwitchAnalyticsViewBtn({
  switchAnalyticsView,
  switchView,
}: SwitchAnalyticsViewBtnProps) {
  const classes = useStyles()

  return (
    <>
      {switchView ? (
        <Button
          variant="contained"
          size="small"
          color="primary"
          className={classes.margin}
          onClick={switchAnalyticsView}
        >
          Switch to Year View
        </Button>
      ) : (
        <Button
          variant="contained"
          size="small"
          color="primary"
          className={classes.margin}
          onClick={switchAnalyticsView}
        >
          Switch to Month View
        </Button>
      )}
    </>
  )
}
