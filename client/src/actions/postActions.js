import axios from 'axios'
import {
  GET_ALL_POST_FAIL,
  GET_ALL_POST_REQUEST,
  GET_ALL_POST_SUCCESS,
} from '../constants/postConstants'

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
