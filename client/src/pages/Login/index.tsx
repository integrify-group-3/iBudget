import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoogleLogin from 'react-google-login'

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
import { FaGoogle } from 'react-icons/fa'

import { AppState } from '../../types'
import { loginUser, googleLogin } from '../../redux/actions/user'
import { clearErrors } from '../../redux/actions/error'

import './style.scss'

const useStyles = makeStyles((theme) => ({
  container: {
    background:
      'linear-gradient(to right, rgba(243, 239, 234, 0.8), rgba(225, 255, 255, 0.8))',
    borderRadius: '25px',
    marginTop: '4rem',
    padding: '1rem 2rem',
  },
  paper: {
    marginTop: theme.spacing(10),
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
  input: {
    padding: '.3rem',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#865CFF',
    color: 'white',
    borderRadius: '50px',
  },
  errorMsg: {
    color: 'red',
    textAlign: 'center',
    marginTop: '1rem',
  },
  forgotPasswordLink: {
    color: '#865CFF',
    cursor: 'pointer',
  },
}))

export default function Login(props: any) {
  //this will be fixed later
  // const clientID = `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`
  const clientID = '242854292077-jj45elli5ttdmni2jck0vc1is7r1d2rp.apps.googleusercontent.com'
  console.log(clientID)
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(
    (state: AppState) => state.user.isAuthenticated
  )
  const errorMsg = useSelector((state: AppState) => state.error.msg.msg)
  const classes = useStyles()
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

  const responseSuccessGoogle = (response: any) => {
    dispatch(googleLogin(response))
  }

  const responseFailureGoogle = () => {}
  return (
    <div className="login-page-container">
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <GoogleLogin
            clientId={clientID}
            buttonText="Sign in with Google"
            onSuccess={responseSuccessGoogle}
            onFailure={responseFailureGoogle}
            cookiePolicy={'single_host_origin'}
            render={(renderProps: any) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="google-auth-btn"
              >
                <FaGoogle />
                <span>Sign In with Google</span>
              </button>
            )}
          />
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <NavLink to="/forgot-password">Forgot password?</NavLink>
              </Grid>
              <Grid item>
                <NavLink to="/register">
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
