import axios from 'axios'
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  //   USER_LOAD,
  //   USER_LOAD_FAIL,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
} from '../constants/authConstants'
import { GET_ALL_POST_RESET } from '../constants/postConstants'
import { CURRENT_USER_PROFILE_RESET } from '../constants/profileConstants'

// export const loadUser = () => async (dispatch, getState) => {
//   try {
//     const {
//       userRegister: { userInfo },
//     } = getState()

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     }
//     const { data } = await axios.get('/api/auth', config)

//     dispatch({
//       type: USER_LOAD,
//       payload: data,
//     })

//     localStorage.setItem('userInfo', JSON.stringify(data))
//   } catch (error) {
//     dispatch({
//       type: USER_LOAD_FAIL,
//       payload:
//         error.response && error.response.data.error.message
//           ? error.response.data.error.message
//           : error.message,
//     })
//   }
// }

export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data?.error?.msg,
    })
  }
}

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post('/api/auth', { email, password }, config)

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data?.error?.msg,
    })
  }
}

export const logOut = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: CURRENT_USER_PROFILE_RESET })
  dispatch({ type: GET_ALL_POST_RESET })
}
