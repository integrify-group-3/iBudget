import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Formik, Field, Form } from 'formik'
import Button from '@material-ui/core/Button'
import * as yup from 'yup'
import {
  CssBaseline,
  TextField,
  makeStyles,
  Typography,
  Grid,
  Box,
  Container,
} from '@material-ui/core'

import { AppState } from '../../types'
import { registerUser } from '../../redux/actions/user'

import './style.scss'

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage:
      'linear-gradient(to right, rgba(243, 239, 234, 0.8), rgba(225, 219, 236, 0.8))',
    borderRadius: '25px',
    marginTop: '4rem',
    padding: '1rem 2rem',
  },
  inputField: {
    borderRadius: '25px',
  },
  inputAlign: {
    display: 'inline-block',
    width: '48%',
    marginRight: '2%',
    margin: 'auto',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
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
    marginTop: '1rem' 
  }
}))

export default function Register() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const errorMsg = useSelector((state: AppState) => state.error.msg.msg)

  return (
    <div className="login-page-container">
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              repeatPassword: '',
            }}
            validationSchema={yup.object({
              firstName: yup
                .string()
                .min(3, 'must be at least 3 character')
                .max(20, 'firstname must between 3 and 20 characters')
                .required('required field'),
              lastName: yup
                .string()
                .min(3, 'must be at least 3 character')
                .max(20, 'firstname must between 3 and 20 characters')
                .required('required field'),
              email: yup
                .string()
                .email('invalid email address')
                .required('required field'),
              password: yup
                .string()
                .min(3, 'must be at least 3 character')
                .max(25, 'password must between 3 and 25 characters')
                .required('Password is required'),
              repeatPassword: yup
                .string()
                .test('passwords-match', 'Passwords must match', function (
                  value
                ) {
                  return this.parent.password === value
                }),
            })}
            onSubmit={(values, { resetForm }) => {
              dispatch(registerUser(values))
              resetForm()
            }}
          >
            {({ errors, touched, isValid }) => (
              <Form className={classes.form} noValidate>
                <Field
                  variant="outlined"
                  margin="normal"
                  required
                  helperText={touched.firstName ? errors.firstName : ''}
                  error={touched.firstName && Boolean(errors.firstName)}
                  id="firstName"
                  name="firstName"
                  autoComplete="firstName"
                  label="firstNames"
                  className={`${classes.inputField} ${classes.inputAlign}`}
                  as={TextField}
                />
                <Field
                  helperText={touched.lastName ? errors.lastName : ''}
                  error={touched.lastName && Boolean(errors.lastName)}
                  variant="outlined"
                  margin="normal"
                  required
                  id="lastName"
                  name="lastName"
                  autoComplete="lastName"
                  label="lastName"
                  className={`${classes.inputField} ${classes.inputAlign}`}
                  as={TextField}
                />

                <Field
                  helperText={touched.email ? errors.email : ''}
                  error={touched.email && Boolean(errors.email)}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  label="email"
                  className={classes.inputField}
                  as={TextField}
                />

                <Field
                  helperText={touched.password ? errors.password : ''}
                  error={touched.password && Boolean(errors.password)}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  label="password"
                  className={classes.inputField}
                  as={TextField}
                />
                <Field
                  helperText={
                    touched.repeatPassword ? errors.repeatPassword : ''
                  }
                  error={
                    touched.repeatPassword && Boolean(errors.repeatPassword)
                  }
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="repeatPassword"
                  type="password"
                  id="repeatPassword"
                  label="repeat password"
                  className={classes.inputField}
                  as={TextField}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={classes.submit}
                  disabled={!isValid}
                >
                  Register
                </Button>
                <Grid container>
                  <Grid item>
                    <NavLink to="/login">
                      {'Already have an account? Login'}
                    </NavLink>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item className={classes.errorMsg}>{errorMsg}</Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
        <Box mt={8}></Box>
      </Container>
    </div>
  )
}
