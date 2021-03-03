import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { AppState } from '../../types'
import { forgotPassword, clearEmailReq } from '../../redux/actions/user'
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
    marginLeft: '1rem'
  },
}))

export default function ForgotPassword(props: any) {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(
    (state: AppState) => state.user.isAuthenticated
  )
  const errorMsg = useSelector((state: AppState) => state.error.msg.msg)
  const emailConfirmation = useSelector(
    (state: AppState) => state.user.forgotPasswordEmailMsg
  )
  const classes = useStyles()
  const [userEmail, setUserEmail] = useState({ email: '' })
  const [openFormDialog, setOpenFormDialog] = useState(true)
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    dispatch(forgotPassword(userEmail))
    setTimeout(() => {
      dispatch(clearErrors())
    }, 4000)
      setOpenConfirmationDialog(true)    
  }

  const handleClose = () => {
    setOpenConfirmationDialog(false)
    props.history.push('/login')
    dispatch(clearEmailReq())
  }

  const handleCloseForm = () => {
    props.history.push('/login')
  }
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(clearErrors())
      props.history.push('/dashboard')
    }
  }, [dispatch, isAuthenticated, props.history])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setUserEmail({ ...userEmail, [name]: value })
  }
  return (
    <div className="forgot-password-container">
      { emailConfirmation !== '' && openConfirmationDialog ? (
        <Dialog
          open={openConfirmationDialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Email Sent!'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {emailConfirmation}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Back to Login
            </Button> 
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog
          open={openFormDialog}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <DialogTitle id="form-dialog-title">{'Forgot Password?'}</DialogTitle>
          <Grid container>
            <Grid item className={classes.errorMsg}>
              {errorMsg}
            </Grid>
          </Grid>
          <DialogContent>
              <DialogContentText>
                Please enter your email to receive a link for a password reset.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                name="email"
                fullWidth
                onChange={handleChange}
                autoComplete="email"
                required
              />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseForm} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">Submit</Button>
          </DialogActions>
          </form>
        </Dialog>
      )}
    </div>
  )
}
