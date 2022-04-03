import {
  GET_ALL_POST_FAIL,
  GET_ALL_POST_REQUEST,
  GET_ALL_POST_RESET,
  GET_ALL_POST_SUCCESS,
} from '../constants/postConstants'

export const getPostsReducer = (state = { posts: [] }, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_ALL_POST_REQUEST:
      return { ...state, loading: true }
    case GET_ALL_POST_SUCCESS:
      return { loading: false, posts: payload }
    case GET_ALL_POST_FAIL:
      return { loading: false, error: payload }
    case GET_ALL_POST_RESET:
      return { posts: [] }
    default:
      return state
  }
}
