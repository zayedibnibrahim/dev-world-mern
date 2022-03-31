import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { profilesList } from '../actions/profileActions'
import DeveloperCard from '../components/DeveloperCard'

const DevelopersScreen = () => {
  const dispatch = useDispatch()

  const listProfiles = useSelector((state) => state.listProfiles)
  const { profiles, loading, error } = listProfiles

  useEffect(() => {
    dispatch(profilesList())
  }, [])
  return (
    <section className='container'>
      <h1 className='large text-primary'>Developers</h1>
      <p className='lead'>
        <i className='fab fa-connectdevelop'></i> Browse and connect with
        developers
      </p>
      <div className='profiles'>
        {profiles.map((profile, index) => (
          <DeveloperCard profile={profile} key={index + 1} />
        ))}
      </div>
    </section>
  )
}

export default DevelopersScreen
