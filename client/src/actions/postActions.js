import axios from 'axios'
import {
  COMMENT_CREATE_SUCCESS,
  COMMENT_DELETE_SUCCESS,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  DELETE_POST_FAIL,
  DELETE_POST_SUCCESS,
  GET_ALL_POST_FAIL,
  GET_ALL_POST_REQUEST,
  GET_ALL_POST_SUCCESS,
  SINGLE_POST_FAIL,
  SINGLE_POST_REQUEST,
  SINGLE_POST_SUCCESS,
  UPDATE_LIKE_SUCCESS,
} from '../constants/postConstants'

export const postsCreate = (text) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_POST_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post(`/api/post`, { text }, config)

    dispatch({
      type: CREATE_POST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_ALL_POST_FAIL,
      payload: error.response && error.response.data?.error?.msg,
    })
  }
}

export const postsList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_POST_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/post`, config)

    dispatch({
      type: GET_ALL_POST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_ALL_POST_FAIL,
      payload: error.response && error.response.data?.error?.msg,
    })
  }
}

export const singlePostGet = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SINGLE_POST_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/post/${id}`, config)

    dispatch({
      type: SINGLE_POST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SINGLE_POST_FAIL,
      payload: error.response && error.response.data?.error?.msg,
    })
  }
}

export const likeUpdate = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    console.log(config)
    const { data } = await axios.put(`/api/post/like/${id}`, {}, config)

    dispatch({
      type: UPDATE_LIKE_SUCCESS,
      payload: { id, likes: data },
    })
  } catch (error) {
    dispatch({
      type: GET_ALL_POST_FAIL,
      payload: error.response && error.response.data?.error?.msg,
    })
  }
}

export const likeRemove = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(`/api/post/unlike/${id}`, {}, config)

    dispatch({
      type: UPDATE_LIKE_SUCCESS,
      payload: { id, likes: data },
    })
  } catch (error) {
    dispatch({
      type: GET_ALL_POST_FAIL,
      payload: error.response && error.response.data?.error?.msg,
    })
  }
}

export const postDelete = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/post/${id}`, config)

    dispatch({
      type: DELETE_POST_SUCCESS,
      payload: id,
    })
  } catch (error) {
    dispatch({
      type: DELETE_POST_FAIL,
      payload: error.response && error.response.data?.error?.msg,
    })
  }
}

export const commentDelete =
  (postId, commentId) => async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      await axios.put(`/api/post/comment/${postId}/${commentId}`, {}, config)

      dispatch({
        type: COMMENT_DELETE_SUCCESS,
        payload: commentId,
      })
    } catch (error) {
      dispatch({
        type: SINGLE_POST_FAIL,
        payload: error?.response?.data?.error?.msg,
      })
    }
  }

export const commentCreate = (id, text) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/post/comment/${id}`,
      { text },
      config
    )

    dispatch({
      type: COMMENT_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SINGLE_POST_FAIL,
      payload: error?.response?.data?.error?.msg,
    })
  }
}
