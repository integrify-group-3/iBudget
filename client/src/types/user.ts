//user action types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const GOOGLE_LOGIN = 'GOOGLE_LOGIN'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const SHOW_ERRORS = 'SHOW_ERRORS'
export const CLEAR_ERRORS = 'CLEAR_ERRORS'
export const SHOW_VALIDATIONS = 'SHOW_VALIDATIONS'
export const CLEAR_VALIDATIONS = 'CLEAR_VALIDATIONS'
export const REGISTER_FAIL = 'REGISTER_FAIL'
export const LOGOUT = 'LOGOUT'
export const UPDATE_USER = 'UPDATE_USER'
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD'
export const CLEAR_EMAIL_CONFIRMATION = 'CLEAR_EMAIL_CONFIRMATION'
export const RESET_PASSWORD = 'RESET_PASSWORD'
export const CLEAR_RESET_CONFIRMATION = 'CLEAR_RESET_CONFIRMATION'

export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  picture: string
}

export type EditUser = {
  firstName: string
  lastName: string
  email: string
  newPassword: string
  repeatNewPassword: string
}

export type RegisterFailAction = {
  type: typeof REGISTER_FAIL
}

export type RegisterUserSuccessAction = {
  type: typeof REGISTER_SUCCESS
  payload: {
    user: User
  }
}

export type LoginUserSuccessAction = {
  type: typeof LOGIN_SUCCESS
  payload: {
    user: User
    token: string
  }
}

export type GoogleLoginAction = {
  type: typeof GOOGLE_LOGIN
}

export type LogoutAction = {
  type: typeof LOGOUT
}

export type UpdateUserAction = {
  type: typeof UPDATE_USER
  payload: {
    user: User
  }
}

export type ForgotPasswordAction = {
  type: typeof FORGOT_PASSWORD
  payload: {
    emailMsg: string
  }
}

export type ClearEmailConfirmationAction = {
  type: typeof CLEAR_EMAIL_CONFIRMATION
}

export type ClearResetPasswordConfirmationAction = {
  type: typeof CLEAR_RESET_CONFIRMATION
}

export type ResetPasswordAction = {
  type: typeof RESET_PASSWORD
  payload: {
    resetMsg: string
  }
}

export type UserActions =
  | RegisterUserSuccessAction
  | RegisterFailAction
  | LoginUserSuccessAction
  | GoogleLoginAction
  | LogoutAction
  | UpdateUserAction
  | ForgotPasswordAction
  | ResetPasswordAction
  | ClearEmailConfirmationAction
  | ClearResetPasswordConfirmationAction

export type UserState = {
  user: User
  token: string
  isAuthenticated?: boolean
  isGoogleUser: boolean
  forgotPasswordEmailMsg: string
  resetPasswordMsg: string
}
