import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userAddEducation, userCurrentProfile } from '../actions/profileActions'
import Spinner from '../components/Spinner'
import { ADD_EDUCATION_RESET } from '../constants/profileConstants'

const AddEducationScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const addEducation = useSelector((state) => state.addEducation)
  const { success, loading } = addEducation

  const [toDateDisabled, toggleDisabled] = useState(false)

  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    current: false,
    to: '',
    description: '',
  })
  const { school, degree, fieldofstudy, from, to, current, description } =
    formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(
      userAddEducation({
        school,
        degree,
        fieldofstudy,
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
      dispatch({ type: ADD_EDUCATION_RESET })
    } else {
      dispatch(userCurrentProfile())
    }
  }, [success])
  return loading ? (
    <Spinner />
  ) : (
    <section className='container'>
      <h1 className='large text-primary'>Add Your Education</h1>
      <p className='lead'>
        <i className='fas fa-graduation-cap'></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* School or Bootcamp'
            name='school'
            onChange={(e) => onChange(e)}
            required
            value={school}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Degree or Certificate'
            name='degree'
            required
            onChange={(e) => onChange(e)}
            value={degree}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Field Of Study'
            name='fieldofstudy'
            onChange={(e) => onChange(e)}
            value={fieldofstudy}
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            name='from'
            value={from}
            onChange={(e) => onChange(e)}
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
            Current School or Bootcamp
          </p>
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            name='to'
            value={to}
            onChange={(e) => onChange(e)}
            disabled={toDateDisabled ? 'disabled' : ''}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            value={description}
            placeholder='Program Description'
            onChange={(e) => onChange(e)}
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

export default AddEducationScreen
