import {
  User,
  UserState,
  LOGIN_SUCCESS,
  UserActions,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  UPDATE_USER
} from '../../types'

export default function auth(
  state: UserState = {
    user: {} as User,
    token: '',
    isAuthenticated: false
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
      user: {} as User
    }
  case UPDATE_USER:
    console.log('from user reducer', action.payload)
  return {
      ...state,
      ...action.payload    
  }
  default:
    return state
  }
}
