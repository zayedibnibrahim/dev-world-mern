import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userAddExperience } from '../actions/profileActions'
import Spinner from '../components/Spinner'
import { ADD_EXPERIENCE_RESET } from '../constants/profileConstants'

const AddExperienceScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const addExperience = useSelector((state) => state.addExperience)
  const { error, success, loading } = addExperience

  const [toDateDisabled, toggleDisabled] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    current: false,
    to: '',
    description: '',
  })
  const { title, company, location, from, to, current, description } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(
      userAddExperience({
        title,
        company,
        location,
        from,
        to,
        current,
        description,
      })
    )
  }

  useEffect(() => {
    if (success) {
      navigate('/dev/dashboard')
      dispatch({ type: ADD_EXPERIENCE_RESET })
    }
  }, [success])

  return loading ? (
    <Spinner />
  ) : (
    <section className='container'>
      <h1 className='large text-primary'>Add An Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Job Title'
            name='title'
            required
            value={title}
            onChange={(e) => {
              onChange(e)
            }}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Company'
            name='company'
            required
            value={company}
            onChange={(e) => {
              onChange(e)
            }}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={(e) => {
              onChange(e)
            }}
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            name='from'
            value={from}
            onChange={(e) => {
              onChange(e)
            }}
          />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              value={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current })
                toggleDisabled(!toDateDisabled)
              }}
            />{' '}
            Current Job
          </p>
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            name='to'
            value={to}
            onChange={(e) => {
              onChange(e)
            }}
            disabled={toDateDisabled ? 'disabled' : ''}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Job Description'
            value={description}
            onChange={(e) => {
              onChange(e)
            }}
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dev/dashboard'>
          Go Back
        </Link>
      </form>
    </section>
  )
}

export default AddExperienceScreen
