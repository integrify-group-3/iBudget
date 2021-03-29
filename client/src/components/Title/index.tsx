import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import { mobileScreen } from '../../utils/windowSize'

const useStyles = makeStyles({
  title: {
    fontSize:  `${mobileScreen ? '1rem' : '1.3rem'}`,
  }
})

export default function Title(props: any) {
  const classes = useStyles()
  return (
    <Typography component="h2" variant="h6" color="primary" className={classes.title} gutterBottom>
      {props.children}
    </Typography>
  )
}

Title.propTypes = {
  children: PropTypes.node,
}
