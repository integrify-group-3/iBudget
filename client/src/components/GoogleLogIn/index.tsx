import React from 'react'
import { useDispatch } from 'react-redux'
import GoogleLogin from 'react-google-login'
import { FaGoogle } from 'react-icons/fa'
import { makeStyles } from '@material-ui/core'

import { googleLogin } from '../../redux/actions/user'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}))

function GoogleLogIn({ isSigIn }: any) {
  const dispatch = useDispatch()
  const classes = useStyles()
  console.log('isSignIn', isSigIn)
  const clientID =
    '242854292077-jj45elli5ttdmni2jck0vc1is7r1d2rp.apps.googleusercontent.com'
  const responseSuccessGoogle = (response: any) => {
    dispatch(googleLogin(response))
  }
  const responseFailureGoogle = () => {}

  return (
    <div className={classes.paper}>
      <GoogleLogin
        clientId={clientID}
        buttonText="Sign up with Google"
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
            <span>
              {isSigIn ? 'Sign In with Google' : 'Sign Up with Google'}
            </span>
          </button>
        )}
      />
    </div>
  )
}

export default GoogleLogIn
