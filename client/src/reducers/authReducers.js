import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  // USER_LOAD,
  // USER_LOAD_FAIL,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/authConstants'

export const userRegisterReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    // case USER_LOAD:
    //   return { loading: false, userInfo: payload }
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: payload }
    case USER_REGISTER_FAIL:
      // case USER_LOAD_FAIL:
      // localStorage.removeItem('userInfo')
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const userLoginReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: payload }
    case USER_LOGOUT:
      return { userInfo: null }
    default:
      return state
  }
}
