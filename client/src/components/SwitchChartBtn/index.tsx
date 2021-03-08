import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import EqualizerIcon from '@material-ui/icons/Equalizer';

import { SwitchChartBtnProps } from '../../types/ui'

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}))

export default function SwitchChartBtn({
  switchChartView,
  btnText
}: SwitchChartBtnProps) {
  const classes = useStyles()
  return (
    <Button
      variant="outlined"
      color="primary"
      className={classes.margin}
      onClick={switchChartView}
    > <span>
      {btnText}
      </span>
      <EqualizerIcon />
    </Button>
  )
}
