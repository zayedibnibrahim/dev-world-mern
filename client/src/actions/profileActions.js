import axios from 'axios'
import {
  CURRENT_USER_PROFILE_FAIL,
  CURRENT_USER_PROFILE_REQUEST,
  CURRENT_USER_PROFILE_SUCCESS,
} from '../constants/profileConstants'

export const UserCurrentProfile = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CURRENT_USER_PROFILE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/profile/me', config)

    dispatch({
      type: CURRENT_USER_PROFILE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CURRENT_USER_PROFILE_FAIL,
      payload: error.response && error.response.data.error.msg,
    })
  }
}
