import {
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
      return { loading: false, error: payload }
    case CURRENT_USER_PROFILE_RESET:
      return { userProfile: {} }
    default:
      return state
  }
}
