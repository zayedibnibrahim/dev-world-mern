import axios from 'axios'
import {
  CREATE_PROFILE_FAIL,
  CREATE_PROFILE_REQUEST,
  CREATE_PROFILE_SUCCESS,
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
      payload: error.response && error.response.data?.error?.msg,
    })
  }
}

export const profileCreate = (formData) => async (dispatch, getState) => {
  const {
    company,
    website,
    location,
    status,
    githubusername,
    skills,
    bio,
    twitter,
    facebook,
    youtube,
    instagram,
    linkedin,
  } = formData
  try {
    dispatch({
      type: CREATE_PROFILE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(
      '/api/profile',
      {
        company,
        website,
        location,
        status,
        githubusername,
        skills,
        bio,
        twitter,
        facebook,
        youtube,
        instagram,
        linkedin,
      },
      config
    )

    dispatch({
      type: CREATE_PROFILE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CREATE_PROFILE_FAIL,
      payload: error.response && error.response.data?.error?.msg,
    })
  }
}
