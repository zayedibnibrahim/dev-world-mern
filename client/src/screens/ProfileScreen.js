import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { profileById } from '../actions/profileActions'
import { GET_PROFILE_RESET } from '../constants/profileConstants'
import ProfileTopBlock from '../components/ProfileTopBlock'
import ProfileAboutBlock from '../components/ProfileAboutBlock'
import ProfileExperienceBlock from '../components/ProfileExperienceBlock'
import ProfileEducationBlock from '../components/ProfileEducationBlock'
import ProfileGithubBlock from '../components/ProfileGithubBlock'
import Spinner from '../components/Spinner'

const ProfileScreen = () => {
  const dispatch = useDispatch()
  const params = useParams()

  const getProfile = useSelector((state) => state.getProfile)
  const { profile, error, loading } = getProfile
  const {
    social,
    user,
    company,
    location,
    status,
    website,
    skills,
    bio,
    githubusername,
    experience,
    education,
  } = profile

  useEffect(() => {
    dispatch({ type: GET_PROFILE_RESET })
    dispatch(profileById(params.id))
  }, [params, dispatch])

  return (
    <section className='container'>
      <Link to='/developers' className='btn btn-light'>
        Back To Profiles
      </Link>
      {loading ? (
        <Spinner />
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <div className='profile-grid my-1'>
          <ProfileTopBlock
            social={social}
            user={user}
            company={company}
            location={location}
            status={status}
            website={website}
          />
          <ProfileAboutBlock skills={skills} bio={bio} user={user} />

          <ProfileExperienceBlock experience={experience} />

          <ProfileEducationBlock education={education} />

          <ProfileGithubBlock githubusername={githubusername} />
        </div>
      )}
    </section>
  )
}

export default ProfileScreen
