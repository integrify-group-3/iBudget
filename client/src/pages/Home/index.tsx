import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, Typography, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

import { AppState } from '../../types'

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
    left: '35%',
    transform: 'translateY(-50%)',
  },
  HeaderStyle: {
    color: '#886DFA',
    marginTop: '2rem',
  },
  descStyle: {
    marginBottom: '40px',
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

export default function Home(props: any) {
  const classes = useStyles()
  const isAuthenticated = useSelector(
    (state: AppState) => state.user.isAuthenticated
  )
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/dashboard')
    }
  }, [isAuthenticated])

  return (
    <div className="home-page">
      <Container className={classes.container}>
        <Typography variant="h3" className={classes.HeaderStyle}>
          iBudget
        </Typography>
        <Typography color="primary" variant="h6" className={classes.descStyle}>
          Cause your cash matters
        </Typography>
        {isAuthenticated ? (
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <>
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
          </>
        )}
      </Container>
    </div>
  )
}
