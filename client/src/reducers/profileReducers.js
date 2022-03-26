import {
  CREATE_PROFILE_FAIL,
  CREATE_PROFILE_REQUEST,
  CREATE_PROFILE_SUCCESS,
  CURRENT_USER_PROFILE_FAIL,
  CURRENT_USER_PROFILE_REQUEST,
  CURRENT_USER_PROFILE_RESET,
  CURRENT_USER_PROFILE_SUCCESS,
} from '../constants/profileConstants'

export const currentUserProfileReducer = (
  state = { userProfile: {} },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case CURRENT_USER_PROFILE_REQUEST:
      return { ...state, loading: true }
    case CURRENT_USER_PROFILE_SUCCESS:
      return { loading: false, userProfile: payload }
    case CURRENT_USER_PROFILE_FAIL:
      return { loading: false, error: payload, userProfile: {} }
    case CURRENT_USER_PROFILE_RESET:
      return { userProfile: {} }
    default:
      return state
  }
}

export const createProfileReducer = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case CREATE_PROFILE_REQUEST:
      return { loading: true }
    case CREATE_PROFILE_SUCCESS:
      return { loading: false, success: true }
    case CREATE_PROFILE_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}
