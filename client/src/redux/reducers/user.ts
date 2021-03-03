import {
  User,
  UserState,
  LOGIN_SUCCESS,
  UserActions,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  UPDATE_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  CLEAR_EMAIL_CONFIRMATION,
  CLEAR_RESET_CONFIRMATION,
} from '../../types'

export default function auth(
  state: UserState = {
    user: {} as User,
    token: '',
    isAuthenticated: false,
    forgotPasswordEmailMsg: '',
    resetPasswordMsg: '',
  },
  action: UserActions
): UserState {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const { user, token } = action.payload
      return {
        ...state,
        ...action.payload,
        user: user,
        token: token,
        isAuthenticated: true,
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
      }
    case REGISTER_FAIL:
      return {
        ...state,
      }
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        token: '',
        isAuthenticated: false,
        user: {} as User,
      }
    case UPDATE_USER:
      return {
        ...state,
        ...action.payload,
      }
    case FORGOT_PASSWORD:
      const { emailMsg } = action.payload
      return {
        ...state,
        forgotPasswordEmailMsg: emailMsg,
      }
    case RESET_PASSWORD:
      const { resetMsg } = action.payload
      return {
        ...state,
        resetPasswordMsg: resetMsg,
      }
    case CLEAR_EMAIL_CONFIRMATION:
      return {
        ...state,
        forgotPasswordEmailMsg: '',
      }
    case CLEAR_RESET_CONFIRMATION:
      return {
        ...state,
        resetPasswordMsg: '',
      }
    default:
      return state
  }
}
