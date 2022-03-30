import axios from 'axios'
import { USER_LOGOUT } from '../constants/authConstants'
import {
  ADD_EDUCATION_FAIL,
  ADD_EDUCATION_REQUEST,
  ADD_EDUCATION_SUCCESS,
  ADD_EXPERIENCE_FAIL,
  ADD_EXPERIENCE_REQUEST,
  ADD_EXPERIENCE_SUCCESS,
  CREATE_PROFILE_FAIL,
  CREATE_PROFILE_REQUEST,
  CREATE_PROFILE_SUCCESS,
  CURRENT_USER_PROFILE_FAIL,
  CURRENT_USER_PROFILE_REQUEST,
  CURRENT_USER_PROFILE_RESET,
  CURRENT_USER_PROFILE_SUCCESS,
  DELETE_ACCOUNT_FAIL,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_EDUCATION_FAIL,
  DELETE_EDUCATION_REQUEST,
  DELETE_EDUCATION_SUCCESS,
  DELETE_EXPERIENCE_FAIL,
  DELETE_EXPERIENCE_REQUEST,
  DELETE_EXPERIENCE_SUCCESS,
} from '../constants/profileConstants'

export const userCurrentProfile = () => async (dispatch, getState) => {
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
        'Content-Type': 'application/json',
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

export const userAddExperience = (formData) => async (dispatch, getState) => {
  const { title, company, location, from, to, current, description } = formData

  try {
    dispatch({
      type: ADD_EXPERIENCE_REQUEST,
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

    const { data } = await axios.put(
      '/api/profile/experience',
      { title, company, location, from, to, current, description },
      config
    )

    dispatch({
      type: ADD_EXPERIENCE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ADD_EXPERIENCE_FAIL,
      payload: error.response && error.response.data?.error?.msg,
    })
  }
}

export const userAddEducation = (formData) => async (dispatch, getState) => {
  const { school, degree, fieldofstudy, from, to, current, description } =
    formData

  try {
    dispatch({
      type: ADD_EDUCATION_REQUEST,
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

    const { data } = await axios.put(
      '/api/profile/education',
      { school, degree, fieldofstudy, from, to, current, description },
      config
    )

    dispatch({
      type: ADD_EDUCATION_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ADD_EDUCATION_FAIL,
      payload: error.response && error.response.data?.error?.msg,
    })
  }
}

export const userDeleteExperience = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_EXPERIENCE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.delete(`/api/profile/experience/${id}`, config)

    dispatch({
      type: DELETE_EXPERIENCE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: DELETE_EXPERIENCE_FAIL,
      payload: error.response && error.response.data?.error?.msg,
    })
  }
}

export const userDeleteEducation = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_EDUCATION_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/profile/education/${id}`, config)

    dispatch({
      type: DELETE_EDUCATION_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: DELETE_EDUCATION_FAIL,
      payload: error.response && error.response.data?.error?.msg,
    })
  }
}

export const userDeleteAccount = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_ACCOUNT_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/profile`, config)

    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: CURRENT_USER_PROFILE_RESET })
    dispatch({
      type: DELETE_ACCOUNT_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: DELETE_ACCOUNT_FAIL,
      payload: error.response && error.response.data?.error?.msg,
    })
  }
}
