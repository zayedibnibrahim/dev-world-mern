import {
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_RESET,
  CREATE_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  GET_ALL_POST_FAIL,
  GET_ALL_POST_REQUEST,
  GET_ALL_POST_RESET,
  GET_ALL_POST_SUCCESS,
  SINGLE_POST_FAIL,
  SINGLE_POST_REQUEST,
  SINGLE_POST_RESET,
  SINGLE_POST_SUCCESS,
  UPDATE_LIKE_SUCCESS,
} from '../constants/postConstants'

export const getPostsReducer = (state = { posts: [] }, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_ALL_POST_REQUEST:
      return { ...state, loading: true }
    case GET_ALL_POST_SUCCESS:
      return { loading: false, posts: payload }

    case UPDATE_LIKE_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      }
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
      }
    case GET_ALL_POST_FAIL:
      return { ...state, loading: false, error: payload }
    case GET_ALL_POST_RESET:
      return { posts: [] }
    default:
      return state
  }
}

export const createPostReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case CREATE_POST_REQUEST:
      return { loading: true }
    case CREATE_POST_SUCCESS:
      return { loading: false, success: true }
    case CREATE_POST_FAIL:
      return { loading: false, error: payload }
    case CREATE_POST_RESET:
      return {}
    default:
      return state
  }
}

export const singlePostReducer = (state = { post: {} }, action) => {
  const { type, payload } = action
  switch (type) {
    case SINGLE_POST_REQUEST:
      return { loading: true }
    case SINGLE_POST_SUCCESS:
      return { loading: false, post: payload }
    case SINGLE_POST_FAIL:
      return { loading: false, error: payload }
    case SINGLE_POST_RESET:
      return {}
    default:
      return state
  }
}
