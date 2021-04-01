import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize:  '1.3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      fontSize: '13px',
    },
  }
}))

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
