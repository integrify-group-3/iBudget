import React, { useState, useEffect } from 'react'
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
import { updateUser } from '../../redux/actions/user'

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
  registerHeader: {
    marginTop: '1.5rem',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  showPasswordChange: {
    cursor: 'pointer',
    color: '#865CFF',
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
}))

export default function EditUser(props: any) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const errorMsg = useSelector((state: AppState) => state.error.msg.msg)
  const foundUser = useSelector((state: AppState) => state.user)
  console.log(foundUser.user)
  type EditUser = {
    firstName: string
    lastName: string
    email: string
    newPassword: string
    repeatNewPassword: string
  }
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    newPassword: '',
    repeatNewPassword: '',
  } as EditUser)
  const [showUpdatePassword, setShowUpdatePassword] = useState(false)
  const { isAuthenticated } = foundUser
  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/login')
    } else {
      setUser(({
        ...user,
        firstName: foundUser.user.firstName,
        lastName: foundUser.user.lastName,
        email: foundUser.user.email,
      } as unknown) as EditUser)
    }
  }, [isAuthenticated, props.history])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value,
    })
  }
  const openChangePassword = () => {
    setShowUpdatePassword(!showUpdatePassword)
  }
  const { firstName, lastName, email, newPassword, repeatNewPassword } = user

  if (!user) {
    return <h2>User not found</h2>
  }
  return (
    <div className="login-page-container">
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography
            component="h1"
            variant="h5"
            className={classes.registerHeader}
          >
            Edit User
          </Typography>
          <Formik
            initialValues={{
              firstName: firstName,
              lastName: lastName,
              email: email,
              newPassword: '',
              repeatNewPassword: '',
            }}
            enableReinitialize
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
              newPassword: yup
                .string()
                .min(3, 'must be at least 3 character')
                .max(25, 'password must between 3 and 25 characters')
                .required('Password is required'),
              repeatNewPassword: yup
                .string()
                .test(
                  'passwords-match',
                  'Passwords do not match',
                  function (value) {
                    return this.parent.newPassword === value
                  }
                ),
            })}
            onSubmit={(values, { resetForm }) => {
              dispatch(updateUser(values))
              console.log(values)
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
                  autoComplete={firstName}
                  value={firstName}
                  onChange={handleChange}
                  label="firstName"
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
                  autoComplete={lastName}
                  value={lastName}
                  onChange={handleChange}
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
                  value={email}
                  onChange={handleChange}
                  label="email"
                  className={classes.inputField}
                  as={TextField}
                />
                {showUpdatePassword && (
                  <>
                    <Field
                      helperText={showUpdatePassword && touched.newPassword ? errors.newPassword : ''}
                      error={showUpdatePassword && touched.newPassword && Boolean(errors.newPassword)}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="newPassword"
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={handleChange}
                      label="new password"
                      className={classes.inputField}
                      as={TextField}
                    />
                    <Field
                      helperText={
                        showUpdatePassword &&  
                        touched.repeatNewPassword
                          ? errors.repeatNewPassword
                          : ''
                      }
                      error={
                        showUpdatePassword &&
                        touched.repeatNewPassword &&
                        Boolean(errors.repeatNewPassword)
                      }
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="repeatNewPassword"
                      type="password"
                      id="repeatNewPassword"
                      value={repeatNewPassword}
                      onChange={handleChange}
                      label="repeat new password"
                      className={classes.inputField}
                      as={TextField}
                    />
                  </>
                )}
                { showUpdatePassword ? (
                  <p
                    onClick={openChangePassword}
                    className={classes.showPasswordChange}
                  >
                    Close
                  </p>
                ) : (
                  <p
                    onClick={openChangePassword}
                    className={classes.showPasswordChange}
                  >
                    Change password
                  </p>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={classes.submit}
                  //   disabled={!isValid}
                >
                  Save
                </Button>
                <Grid container>
                  <Grid item>
                    <NavLink to="/user">
                      {'Already have an account? Login'}
                    </NavLink>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item className={classes.errorMsg}>
                    {errorMsg}
                  </Grid>
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
