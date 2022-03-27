import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { userCurrentProfile } from '../actions/profileActions'
import DashboardActions from '../components/DashboardActions'
import Spinner from '../components/Spinner'

const Dashboard = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo, loading: loadingUser } = userLogin

  const currentUserProfile = useSelector((state) => state.currentUserProfile)
  const { userProfile, loading } = currentUserProfile

  useEffect(() => {
    dispatch(userCurrentProfile())
  }, [dispatch])
  return loadingUser || loading ? (
    <Spinner />
  ) : (
    <section className='container'>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {userInfo && userInfo.name}
      </p>
      {Object.keys(userProfile).length === 0 ? (
        <>
          <p>You have not setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </>
      ) : (
        <>
          <DashboardActions />

          <h2 className='my-2'>Experience Credentials</h2>
          <table className='table'>
            <thead>
              <tr>
                <th>Company</th>
                <th className='hide-sm'>Title</th>
                <th className='hide-sm'>Years</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tech Guy Web Solutions</td>
                <td className='hide-sm'>Senior Developer</td>
                <td className='hide-sm'>02-03-2009 - 01-02-2014</td>
                <td>
                  <button className='btn btn-danger'>Delete</button>
                </td>
              </tr>
              <tr>
                <td>Traversy Media</td>
                <td className='hide-sm'>Instructor & Developer</td>
                <td className='hide-sm'>02-03-2015 - Now</td>
                <td>
                  <button className='btn btn-danger'>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>

          <h2 className='my-2'>Education Credentials</h2>
          <table className='table'>
            <thead>
              <tr>
                <th>School</th>
                <th className='hide-sm'>Degree</th>
                <th className='hide-sm'>Years</th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Northern Essex</td>
                <td className='hide-sm'>Associates</td>
                <td className='hide-sm'>02-03-2007 - 01-02-2009</td>
                <td>
                  <button className='btn btn-danger'>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}

      <div className='my-2'>
        <button className='btn btn-danger'>
          <i className='fas fa-user-minus'></i>
          Delete My Account
        </button>
      </div>
    </section>
  )
}

export default Dashboard
