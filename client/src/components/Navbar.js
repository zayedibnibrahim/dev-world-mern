import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOut } from '../actions/authActions'
const Navbar = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logOutHandler = () => {
    dispatch(logOut())
  }
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> DevWorld
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='/developers'>
            <i className='fa-solid fa-laptop-code'></i> Developers
          </Link>
        </li>

        {userInfo ? (
          <>
            <li>
              <span>
                <Link to='/dev/posts'>
                  <i className='fa-solid fa-gauge-high'></i> Posts
                </Link>
              </span>
            </li>
            <li>
              <span>
                <Link to='/dev/dashboard'>
                  <i className='fa-solid fa-gauge-high'></i> Dashboard
                </Link>
              </span>
            </li>
            <li>
              <a onClick={logOutHandler} href='#!'>
                <i className='fa-solid fa-right-from-bracket'></i> Log Out
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/register'>
                <i className='fa-solid fa-user-plus'></i> Register
              </Link>
            </li>
            <li>
              <Link to='/login'>
                <i className='fa-solid fa-right-to-bracket'></i> Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
