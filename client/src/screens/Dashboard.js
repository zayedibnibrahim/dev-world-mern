import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  userCurrentProfile,
  userDeleteExperience,
  userDeleteEducation,
} from '../actions/profileActions'
import DashboardActions from '../components/DashboardActions'
import EducationCatalog from '../components/EducationCatalog'
import ExperienceCatalog from '../components/ExperienceCatalog'
import Spinner from '../components/Spinner'
import {
  DELETE_EDUCATION_RESET,
  DELETE_EXPERIENCE_RESET,
} from '../constants/profileConstants'

const Dashboard = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo, loading: loadingUser } = userLogin

  const currentUserProfile = useSelector((state) => state.currentUserProfile)
  const { userProfile, loading } = currentUserProfile

  const deleteExperience = useSelector((state) => state.deleteExperience)
  const { success: successDeleteExp } = deleteExperience

  const deleteEducation = useSelector((state) => state.deleteEducation)
  const { success: successDeleteEdu } = deleteEducation

  const experienceDeleteHandler = (id) => {
    dispatch(userDeleteExperience(id))
  }

  const educationDeleteHandler = (id) => {
    dispatch(userDeleteEducation(id))
  }

  useEffect(() => {
    dispatch(userCurrentProfile())
    if (successDeleteExp) {
      dispatch({
        type: DELETE_EXPERIENCE_RESET,
      })
    }

    if (successDeleteEdu) {
      dispatch({
        type: DELETE_EDUCATION_RESET,
      })
    }
  }, [successDeleteExp, successDeleteEdu])

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

          {userProfile && userProfile.experience.length !== 0 ? (
            <ExperienceCatalog
              experiences={userProfile.experience}
              experienceDeleteHandler={experienceDeleteHandler}
            />
          ) : (
            <p style={{ color: 'red', marginTop: '20px' }}>
              No Experience added yet
            </p>
          )}
          {userProfile && userProfile.education.length !== 0 ? (
            <EducationCatalog
              educations={userProfile.education}
              educationDeleteHandler={educationDeleteHandler}
            />
          ) : (
            <p style={{ color: 'red', marginTop: '20px' }}>
              No Education added yet
            </p>
          )}
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
