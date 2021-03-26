import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import { AppState } from '../../types'
import { loginUser } from '../../redux/actions/user'
import { clearErrors } from '../../redux/actions/error'
import GoogleLogIn from '../../components/GoogleLogIn'
import './style.scss'

const useStyles = makeStyles((theme) => ({
  container: {
    background:
      'linear-gradient(to right, rgba(243, 239, 234, 0.8), rgba(225, 255, 255, 0.8))',
    borderRadius: '25px',
    marginTop: '4rem',
  },
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  title: {
    color: '#865CFF',
    paddingTop: '25px',
  },
  input: {
    padding: '.3rem',
  },
  submit: {
    backgroundColor: '#865CFF',
    color: 'white',
    borderRadius: '50px',
    marginTop: '1rem',
  },
  forgotPasswordSignup: {
    marginTop: '1rem',
  },
  errorMsg: {
    color: 'red',
    textAlign: 'center',
    marginTop: '1rem',
  },
  signUpLink: {
    textDecoration: 'none',
  },
  forgotPasswordLink: {
    color: '#865CFF',
    cursor: 'pointer',
  },
}))

export default function Login(props: any) {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(
    (state: AppState) => state.user.isAuthenticated
  )
  const errorMsg = useSelector((state: AppState) => state.error.msg.msg)
  const classes = useStyles()
  const [isSignIn] = useState(true)
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    dispatch(loginUser(user))
  }

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(clearErrors())
      props.history.push('/dashboard')
    }
  }, [dispatch, isAuthenticated, props.history])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value,
    })
  }

  return (
    <div className="login-page-container">
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" className={classes.title}>
            Sign in
          </Typography>
          <GoogleLogIn isSigIn={isSignIn} />
          <div className="login-page-container__divider">
            <hr className="login-page-container__divider-line-before"></hr>
            <p>Or</p>
          </div>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={handleChange}
              autoComplete="email"
              className={classes.input}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleChange}
              autoComplete="current-password"
              className={classes.input}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container className={classes.forgotPasswordSignup}>
              <Grid item xs>
                <NavLink to="/forgot-password" className={classes.signUpLink}>
                  Forgot password?
                </NavLink>
              </Grid>
              <Grid item>
                <NavLink to="/register" className={classes.signUpLink}>
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item className={classes.errorMsg}>
                {errorMsg}
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}></Box>
      </Container>
    </div>
  )
}
