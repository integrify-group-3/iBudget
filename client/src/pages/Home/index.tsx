import React from 'react'
import { Button, Typography, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

import './style.scss'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    backgroundImage:
      'linear-gradient(to right, rgba(243, 239, 234, 0.7), rgba(225, 219, 236, 0.7))',
    padding: theme.spacing(2),
    textAlign: 'center',
    margin: 'auto',
    minHeight: '350px',
    width: '400px',
    borderRadius: '10%',
    position: 'absolute',
    top: '56%',
    left: '33%',
    transform: 'translateY(-50%)',
  },
  HeaderStyle: {
    color: '#886DFA',
    marginTop: '2rem',
  },
  descStyle: {
    marginBottom: '20px',
  },
  btnStyle: {
    borderRadius: 50,
    display: 'block',
    width: '50%',
    textAlign: 'center',
    marginBottom: '20px',
    margin: 'auto',
  },
}))

export default function Home() {
  const classes = useStyles()

  return (
    <div className="home-page-container">
      <Container className={classes.container}>
        <Typography variant="h3" className={classes.HeaderStyle}>
          iMoney
        </Typography>
        <Typography color="primary" variant="h6" className={classes.descStyle}>
          Cause your cash matters
        </Typography>
        <Button
          component={Link}
          to="register"
          color="primary"
          variant="contained"
          className={classes.btnStyle}
        >
          Join Today
        </Button>
        <Button
          color="secondary"
          component={Link}
          to="login"
          variant="contained"
          className={classes.btnStyle}
        >
          Sign in
        </Button>
      </Container>
    </div>
  )
}
