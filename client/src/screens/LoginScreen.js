import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { loginUser } from '../actions/authActions'
import { USER_LOGOUT } from '../constants/authConstants'

const LoginScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/dev/dashboard'

  const userLogin = useSelector((state) => state.userLogin)
  const { error, userInfo } = userLogin

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    dispatch({
      type: USER_LOGOUT,
    })
    dispatch(loginUser(email, password))
  }

  useEffect(() => {
    if (userInfo) {
      navigate(from, { replace: true })
    }
  }, [userInfo, navigate, from])
  return (
    <section className='container'>
      {error ? <div className='alert alert-danger'>{error}</div> : ''}
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign into Your Account
      </p>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            required
            onChange={(e) => onChange(e)}
            value={email}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            onChange={(e) => onChange(e)}
            value={password}
            required
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </section>
  )
}

export default LoginScreen
