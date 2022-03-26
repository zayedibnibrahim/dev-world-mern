import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { UserCurrentProfile } from '../actions/profileActions'

const Dashboard = () => {
  const dispatch = useDispatch()

  const currentUserProfile = useSelector((state) => state.currentUserProfile)
  const { userProfile } = currentUserProfile

  console.log(userProfile)

  useEffect(() => {
    if (!userProfile || !userProfile._id) {
      dispatch(UserCurrentProfile())
    }
  }, [dispatch, userProfile])
  return <div style={{ paddingTop: '80px' }}>Dashboard</div>
}

export default Dashboard
