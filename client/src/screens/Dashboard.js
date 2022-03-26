import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { UserCurrentProfile } from '../actions/profileActions'
import Spinner from '../components/Spinner'

const Dashboard = () => {
  const dispatch = useDispatch()

  const currentUserProfile = useSelector((state) => state.currentUserProfile)
  const { userProfile, loading } = currentUserProfile

  console.log(userProfile)

  useEffect(() => {
    if (!userProfile || !userProfile._id) {
      dispatch(UserCurrentProfile())
    }
  }, [dispatch, userProfile])
  return (
    <div style={{ paddingTop: '80px' }}>
      {loading ? <Spinner /> : <span>Dashboard</span>}
    </div>
  )
}

export default Dashboard
