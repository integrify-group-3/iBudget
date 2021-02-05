import { Dispatch } from 'redux'
import axios from 'axios'

import {
  LOGIN_SUCCESS,
  UserActions,
  User,
  EditUser,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  UPDATE_USER,
} from '../../types'

import { showErrors, clearErrors } from './error'
import { showValidation, clearValidation } from './validation'

export function registerFail(): UserActions {
  return {
    type: REGISTER_FAIL,
  }
}

export function registerSuccess(user: User): UserActions {
  return {
    type: REGISTER_SUCCESS,
    payload: {
      user,
    },
  }
}

export function loginSuccess(user: User, token: string): UserActions {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      user,
      token,
    },
  }
}

export function logout(): UserActions {
  return {
    type: LOGOUT,
  }
}

export function update(user: User): UserActions {
  console.log('calling from here', user)
  return {
    type: UPDATE_USER,
    payload: {
      user,
    },
  }
}

export const registerUser = ({ firstName, lastName, email, password }: any) => {
  return (dispatch: Dispatch) => {
    const url = 'http://localhost:5000/api/v1/user/register'
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
        dispatch(registerFail())
        dispatch(showErrors(error.response.data, error.response.status))
        setTimeout(() => {
          dispatch(clearErrors())
        }, 4000);
      })
  }
}

export function loginUser({ email, password }: any) {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const body = JSON.stringify({ email, password })
      tokenConfig(getState)
      const url = 'http://localhost:5000/api/v1/user/login'
      const res = await axios.post(url, body, config)
      dispatch(loginSuccess(res.data.user, res.data.token))
    } catch (err) {
      dispatch(showErrors(err.response.data, err.response.status))
      setTimeout(() => {
        dispatch(clearErrors())
      }, 4000);
    }
  }
}

export const updateUser = (id: string, user: any) => {
  return async (dispatch: Dispatch, getState: any) => {
    console.log('from user actions', id, user)
    const url = `http://localhost:5000/api/v1/user/${id}`
    try {
      const res = await axios.put(url, user, tokenConfig(getState))
      console.log(res.data)
      dispatch(update(res.data.user))
      dispatch(showValidation())
    } catch (err) {
      console.log(err)
    }
  }
}

export const tokenConfig = (getState: any) => {
  //gets the token from localstorage
  const token = getState().user.token
  // console.log(token)
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
