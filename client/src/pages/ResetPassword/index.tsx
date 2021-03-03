import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Formik, Field, Form } from 'formik'
import * as yup from 'yup'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { AppState } from '../../types'
import { resetPassword, clearResetConfirmation } from '../../redux/actions/user'
import { clearErrors } from '../../redux/actions/error'

import './style.scss'
import { setTimeout } from 'timers'

const useStyles = makeStyles((theme) => ({
  container: {
    background:
      'linear-gradient(to right, rgba(243, 239, 234, 0.8), rgba(225, 255, 255, 0.8))',
    borderRadius: '25px',
    marginTop: '4rem',
    padding: '1rem 2rem',
  },
  inputField: {
    borderRadius: '25px',
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
    marginTop: '1rem' 
  }
}))

export default function ResetPassword(props: any) {
  const dispatch = useDispatch()
  const resetPasswordMsg = useSelector((state: AppState) => state.user.resetPasswordMsg)
  const errorMsg = useSelector((state: AppState) => state.error.msg.msg)
  const classes = useStyles()
  const [openDialog, setOpenDialog] = useState(false)

  console.log(resetPasswordMsg)
  const handleClose = () => {
    setOpenDialog(false)
    props.history.push("/login")
    dispatch(clearResetConfirmation())
  }

  return (
    <div className="forgot-password-container">
        { resetPasswordMsg !== '' && openDialog ?
         <Dialog
         open={openDialog}
         onClose={handleClose}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
       >
         <DialogTitle id="alert-dialog-title">{"Password succesfully reset!"}</DialogTitle>
         <DialogContent>
           <DialogContentText id="alert-dialog-description">
             {resetPasswordMsg} 
           </DialogContentText>
         </DialogContent>
         <DialogActions>
           <Button onClick={handleClose} color="primary">
             Back to Login
           </Button>
         </DialogActions>
       </Dialog>
       :
       <Container component="main" maxWidth="xs" className={classes.container}>
       <CssBaseline />
       <div className={classes.paper}>
         <Typography component="h3" variant="h5">
           Reset password
         </Typography>
         <Formik
           initialValues={{
             newPassword: '',
             repeatNewPassword: '',
           }}
           validationSchema={yup.object({
             newPassword: yup
               .string()
               .min(3, 'must be at least 3 character')
               .max(25, 'password must between 3 and 25 characters')
               .required('Password is required'),
             repeatNewPassword: yup
               .string()
               .test('passwords-match', 'Passwords must match', function (
                 value
               ) {
                 return this.parent.newPassword === value
               }),
           })}
           onSubmit={(values, { resetForm }) => {
             const resetLink = props.match.params.token
             const { newPassword, repeatNewPassword } = values
             const newPasswordReq = { newPassword, repeatNewPassword, resetLink }
            dispatch(resetPassword(newPasswordReq))
            setTimeout(() => {
              dispatch(clearErrors())
            }, 4000);
            setOpenDialog(true)
             resetForm()
           }}
         >
           {({ errors, touched, isValid }) => (
             <Form className={classes.form} noValidate>
               
               <Field
                 helperText={touched.newPassword ? errors.newPassword : ''}
                 error={touched.newPassword && Boolean(errors.newPassword)}
                 variant="outlined"
                 margin="normal"
                 required
                 fullWidth
                 name="newPassword"
                 type="password"
                 id="newPassword"
                 autoComplete="current-password"
                 label="enter new password"
                 className={classes.inputField}
                 as={TextField}
               />
               <Field
                 helperText={
                   touched.repeatNewPassword ? errors.repeatNewPassword : ''
                 }
                 error={
                   touched.repeatNewPassword && Boolean(errors.repeatNewPassword)
                 }
                 variant="outlined"
                 margin="normal"
                 required
                 fullWidth
                 name="repeatNewPassword"
                 type="password"
                 id="repeatNewPassword"
                 label="repeat new password"
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
                 Submit
               </Button>
               <Grid container>
                 <Grid item className={classes.errorMsg}>{errorMsg}</Grid>
               </Grid>
             </Form>
           )}
         </Formik>
       </div>
       <Box mt={8}></Box>
     </Container>
    }
     
    </div>
  )
}
