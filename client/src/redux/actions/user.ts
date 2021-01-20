import { Dispatch } from 'redux'
import axios from 'axios'

import {
  LOGIN_SUCCESS,
  UserActions,
  User,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT
} from '../../types'

import { showErrors } from './error'

export function registerFail(error: UserActions) {
  return {
    type: REGISTER_FAIL,
    payload: error,
  }
}

export function registerSuccess(user: User): UserActions {
  return {
    type: REGISTER_SUCCESS,
    payload: {
      user
    }
  }
}

export function loginSuccess(user: User, token: string): UserActions {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      user,
      token
    } 
  }
}

export function logout(): UserActions {
  return {
    type: LOGOUT,
  }
}

export function loginUser({ email, password }: any) {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        }
      }
      const body = JSON.stringify({ email, password})
      tokenConfig(getState)
      const url = 'http://localhost:3000/api/v1/user/login'
      const res = await axios.post(url, body, config)
      dispatch(loginSuccess(res.data.user, res.data.token))
    } catch (err) {
      // no json or flash msg is returned from the backend so this can be added later 
      dispatch(showErrors(err.response.data, err.response.status))
    }
  }
}

export const registerUser = ({ firstName, lastName, email, password }: any) => {
  return (dispatch: Dispatch) => {
    const url = 'http://localhost:3000/api/v1/user/register'
    axios
      .post(url, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      })
      .then((response) => {
        const user = response.data
        dispatch(registerSuccess(user))
        window.location.href = '/login'
      })
      .catch((error) => {
        dispatch(registerFail(error.message))
        // no json or flash msg is returned from the backend so this can be added later 
        dispatch(showErrors(error.response.data, error.response.status))

      })
  }
}

export const tokenConfig = (getState: any) => {
  //gets the token from localstorage
  const token = getState().user.token
  console.log(token)
  const config = {
    headers: {
      'Content-type': 'application/json',
      'x-auth-token': '',
    },
  }
  if (token) {
    config.headers['x-auth-token'] = token
  }
  return config
}
