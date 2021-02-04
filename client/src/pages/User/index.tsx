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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

  },
  HeaderStyle: {
    color: '#886DFA',
    marginTop: '2rem',
    fontSize: '23px'
  },
  descStyle: {
    marginBottom: '40px',
  },
  btnStyle: {
    borderRadius: 50,
    display: 'block',
    width: '50%',
    textAlign: 'center',
    marginTop: '20px',
    margin: 'auto',
  },
  userDetails: {
      fontSize: '18px',
      marginTop: '1rem'
  }
}))

export default function User(props: any) {
  const classes = useStyles()
  const user = useSelector(
    (state: AppState) => state.user
  )
  console.log(user)
 
  const { isAuthenticated } = user
  const { id, firstName, lastName, email } = user.user

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/login')
    } 
  }, [isAuthenticated, props.history])

  return (
    <div className="home-page-container">
      <Container className={classes.container}>
        <Typography variant="h4" className={classes.HeaderStyle}>
          User
        </Typography>
        <Typography variant="h4" className={classes.userDetails}>
          First Name {firstName}
        </Typography>
        <Typography variant="h4" className={classes.userDetails}>
          Last Name {lastName}
        </Typography>
        <Typography variant="h4" className={classes.userDetails}>
          email {email} 
        </Typography>
        <Button
          component={Link}
          to={`user/${id}`}
          color="primary"
          variant="contained"
          className={classes.btnStyle}
        > Update User
        </Button>
      </Container>
    </div>
  )
}
