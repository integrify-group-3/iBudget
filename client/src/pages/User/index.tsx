import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, Typography, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit'
import PersonIcon from '@material-ui/icons/Person'
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail'

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
    fontSize: '23px',
  },
  descStyle: {
    marginBottom: '40px',
  },
  userDetails: {
    fontSize: '16px',
    marginTop: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStyle: {
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    textAlign: 'center',
    marginTop: '30px',
  },
  editIcon: {
    color: 'white',
    marginRight: '.4rem',
  },
  userIcon: {
    color: '#4F416B',
    marginRight: '.4rem',
  },
}))

export default function User(props: any) {
  const classes = useStyles()
  const user = useSelector((state: AppState) => state.user)
  console.log(user)

  const { isAuthenticated, isGoogleUser } = user
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
          User Profile
        </Typography>
        <Typography variant="h4" className={classes.userDetails}>
          <PersonIcon className={classes.userIcon} />{' '}
          <span>First Name: {firstName}</span>
        </Typography>
        <Typography variant="h4" className={classes.userDetails}>
          <PersonIcon className={classes.userIcon} />{' '}
          <span>Last Name: {lastName}</span>
        </Typography>
        <Typography variant="h4" className={classes.userDetails}>
          <AlternateEmailIcon className={classes.userIcon} />{' '}
          <span>email: {email} </span>
        </Typography>
        {!isGoogleUser && (
          <Button
            component={Link}
            to={`/user/${id}/edit`}
            color="primary"
            variant="contained"
            className={classes.btnStyle}
          >
            <EditIcon className={classes.editIcon} />
            <span>Update User</span>
          </Button>
        )}
      </Container>
    </div>
  )
}
