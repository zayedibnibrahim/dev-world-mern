import { USER_REGISTER_REQUEST } from '../constants/auth'

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    default:
      return state
  }
}
