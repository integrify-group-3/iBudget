import {
  User,
  UserState,
  LOGIN_SUCCESS,
  UserActions,
  REGISTER_SUCCESS,
  LOGOUT
} from '../../types'

export default function auth(
  state: UserState = {
    user: {} as User,
    token: '',
    isAuthenticated: false,
    error: '',
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
      isAuthenticated: true
    }
  case REGISTER_SUCCESS:
    return {
      ...state,
      ...action.payload,
      error: '',
    }
  case LOGOUT:
    localStorage.removeItem('token')
    return {
      ...state,
      token: '',
      isAuthenticated: false,
      user: {} as User
    }
  default:
    return state
  }
}
