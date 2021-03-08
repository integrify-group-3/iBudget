import { Dispatch } from 'redux'
import axios from 'axios'

import {
  LOGIN_SUCCESS,
  UserActions,
  User,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  UPDATE_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  CLEAR_EMAIL_CONFIRMATION,
  CLEAR_RESET_CONFIRMATION
} from '../../types/user'

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

export function forgotPasswordEmail(emailMsg: string): UserActions {
  return {
    type: FORGOT_PASSWORD,
    payload: {
      emailMsg,
    },
  }
}

export function resetPasswordConfirm(resetMsg: string): UserActions {
  return {
    type: RESET_PASSWORD,
    payload: {
      resetMsg,
    },
  }
}

export function clearEmailConfirmation(): UserActions {
  return {
    type: CLEAR_EMAIL_CONFIRMATION
  }
}

export function clearResetPasswordConfirmation(): UserActions {
  return {
    type: CLEAR_RESET_CONFIRMATION
  }
}

export function update(user: User): UserActions {
  return {
    type: UPDATE_USER,
    payload: {
      user,
    },
  }
}

export const registerUser = ({ firstName, lastName, email, password }: any) => {
  return (dispatch: Dispatch) => {
    const url = '/api/v1/user/register'
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
        }, 4000)
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
      const url = '/api/v1/user/login'
      const res = await axios.post(url, body, config)
      dispatch(loginSuccess(res.data.user, res.data.token))
    } catch (err) {
      dispatch(showErrors(err.response.data, err.response.status))
      setTimeout(() => {
        dispatch(clearErrors())
      }, 4000)
    }
  }
}

export const updateUser = (id: string, user: any) => {
  return async (dispatch: Dispatch, getState: any) => {
    const url = `/api/v1/user/${id}`
    try {
      const res = await axios.put(url, user, tokenConfig(getState))
      dispatch(update(res.data.user))
      dispatch(showValidation())
    } catch (err) {
      console.log(err)
    }
  }
}

export const forgotPassword = (email: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const url = `/api/v1/user/forgot-password`
      const res = await axios.put(url, email)
      dispatch(forgotPasswordEmail(res.data.msg))
    } catch (err) {
      dispatch(showErrors(err.response.data, err.response.status))
    }
  }
}

export const clearEmailReq = () => {
  return (dispatch: Dispatch) => {
    dispatch(clearEmailConfirmation())
  }
}

export const clearResetConfirmation = () => {
  return (dispatch: Dispatch) => {
    dispatch(clearResetPasswordConfirmation())
  }
}

export const resetPassword = (
 { newPassword,
  repeatNewPassword,
  resetLink} : any
) => {
  return async (dispatch: Dispatch) => {
    try {
      const body = { newPassword, repeatNewPassword, resetLink }
      const url = `http://localhost:5000/api/v1/user/reset-password`
      const res = await axios.put(url, body)
      console.log(res)
      dispatch(resetPasswordConfirm(res.data.msg))
    } catch (err) {
      dispatch(showErrors(err.response.data, err.response.status))
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
