import {
  ADD_EDUCATION_FAIL,
  ADD_EDUCATION_REQUEST,
  ADD_EDUCATION_RESET,
  ADD_EDUCATION_SUCCESS,
  ADD_EXPERIENCE_FAIL,
  ADD_EXPERIENCE_REQUEST,
  ADD_EXPERIENCE_RESET,
  ADD_EXPERIENCE_SUCCESS,
  CREATE_PROFILE_FAIL,
  CREATE_PROFILE_REQUEST,
  CREATE_PROFILE_RESET,
  CREATE_PROFILE_SUCCESS,
  CURRENT_USER_PROFILE_FAIL,
  CURRENT_USER_PROFILE_REQUEST,
  CURRENT_USER_PROFILE_RESET,
  CURRENT_USER_PROFILE_SUCCESS,
  DELETE_ACCOUNT_FAIL,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_RESET,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_EDUCATION_FAIL,
  DELETE_EDUCATION_REQUEST,
  DELETE_EDUCATION_RESET,
  DELETE_EDUCATION_SUCCESS,
  DELETE_EXPERIENCE_FAIL,
  DELETE_EXPERIENCE_REQUEST,
  DELETE_EXPERIENCE_RESET,
  DELETE_EXPERIENCE_SUCCESS,
  FETCH_GITHUB_FAIL,
  FETCH_GITHUB_REQUEST,
  FETCH_GITHUB_RESET,
  FETCH_GITHUB_SUCCESS,
  GET_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_RESET,
  GET_PROFILE_SUCCESS,
  PROFILE_LIST_FAIL,
  PROFILE_LIST_REQUEST,
  PROFILE_LIST_SUCCESS,
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
      return { ...state, loading: false, userProfile: payload }
    case CURRENT_USER_PROFILE_FAIL:
      return { ...state, loading: false, error: payload, userProfile: {} }
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
    case CREATE_PROFILE_RESET:
      return {}
    default:
      return state
  }
}

export const addExperienceReducer = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case ADD_EXPERIENCE_REQUEST:
      return { loading: true }
    case ADD_EXPERIENCE_SUCCESS:
      return { loading: false, success: true }
    case ADD_EXPERIENCE_FAIL:
      return { loading: false, error: payload }
    case ADD_EXPERIENCE_RESET:
      return {}
    default:
      return state
  }
}

export const addEducationReducer = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case ADD_EDUCATION_REQUEST:
      return { loading: true }
    case ADD_EDUCATION_SUCCESS:
      return { loading: false, success: true }
    case ADD_EDUCATION_FAIL:
      return { loading: false, error: payload }
    case ADD_EDUCATION_RESET:
      return {}
    default:
      return state
  }
}

export const deleteExperienceReducer = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case DELETE_EXPERIENCE_REQUEST:
      return { loading: true }
    case DELETE_EXPERIENCE_SUCCESS:
      return { loading: false, success: true }
    case DELETE_EXPERIENCE_FAIL:
      return { loading: false, error: payload }
    case DELETE_EXPERIENCE_RESET:
      return {}
    default:
      return state
  }
}

export const deleteEducationReducer = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case DELETE_EDUCATION_REQUEST:
      return { loading: true }
    case DELETE_EDUCATION_SUCCESS:
      return { loading: false, success: true }
    case DELETE_EDUCATION_FAIL:
      return { loading: false, error: payload }
    case DELETE_EDUCATION_RESET:
      return {}
    default:
      return state
  }
}

export const deleteAccountReducer = (state = {}, action) => {
  const { type, payload } = action

  switch (type) {
    case DELETE_ACCOUNT_REQUEST:
      return { loading: true }
    case DELETE_ACCOUNT_SUCCESS:
      return { loading: false }
    case DELETE_ACCOUNT_FAIL:
      return { loading: false, error: payload }
    case DELETE_ACCOUNT_RESET:
      return {}
    default:
      return state
  }
}

export const listProfilesReducer = (state = { profiles: [] }, action) => {
  const { type, payload } = action

  switch (type) {
    case PROFILE_LIST_REQUEST:
      return { ...state, loading: true }
    case PROFILE_LIST_SUCCESS:
      return { ...state, loading: false, profiles: payload }
    case PROFILE_LIST_FAIL:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}

export const getProfileReducer = (state = { profile: {} }, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_PROFILE_REQUEST:
      return { ...state, loading: true }
    case GET_PROFILE_SUCCESS:
      return { ...state, loading: false, profile: payload }
    case GET_PROFILE_FAIL:
      return { ...state, loading: false, error: payload }
    case GET_PROFILE_RESET:
      return { profile: {} }
    default:
      return state
  }
}

export const fetchGithubReducer = (state = { gitInfo: [] }, action) => {
  const { type, payload } = action

  switch (type) {
    case FETCH_GITHUB_REQUEST:
      return { ...state, loading: true }
    case FETCH_GITHUB_SUCCESS:
      return { ...state, loading: false, gitInfo: payload }
    case FETCH_GITHUB_FAIL:
      return { ...state, loading: false, error: payload }
    case FETCH_GITHUB_RESET:
      return { gitInfo: [] }
    default:
      return state
  }
}
