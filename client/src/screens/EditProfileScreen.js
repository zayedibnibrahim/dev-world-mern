import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { profileCreate } from '../actions/profileActions'
import { CREATE_PROFILE_RESET } from '../constants/profileConstants'
import Spinner from '../components/Spinner'

const EditProfileScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentUserProfile = useSelector((state) => state.currentUserProfile)
  const { error, userProfile } = currentUserProfile

  const createProfile = useSelector((state) => state.createProfile)
  const { error: errorCreate, success, loading: landingCreate } = createProfile

  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    githubusername: '',
    bio: '',
    skills: '',
    twitter: '',
    facebook: '',
    youtube: '',
    instagram: '',
    linkedin: '',
  })

  useEffect(() => {
    if (!success) {
      setFormData({
        company: userProfile.company ? userProfile.company : '',
        website: userProfile.website ? userProfile.website : '',
        location: userProfile.location ? userProfile.location : '',
        status: userProfile.status ? userProfile.status : '',
        githubusername: userProfile.githubusername
          ? userProfile.githubusername
          : '',
        bio: userProfile.bio ? userProfile.bio : '',
        skills: userProfile.skills ? userProfile.skills.join(',') : '',
        twitter: userProfile.social ? userProfile.social.twitter : '',
        facebook: userProfile.social ? userProfile.social.facebook : '',
        youtube: userProfile.social ? userProfile.social.youtube : '',
        instagram: userProfile.social ? userProfile.social.instagram : '',
        linkedin: userProfile.social ? userProfile.social.linkedin : '',
      })
    } else {
      navigate('/dashboard')
      dispatch({ type: CREATE_PROFILE_RESET })
    }
  }, [success])

  const {
    company,
    website,
    location,
    status,
    githubusername,
    bio,
    skills,
    twitter,
    facebook,
    youtube,
    instagram,
    linkedin,
  } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(
      profileCreate({
        company,
        website,
        location,
        status,
        githubusername,
        bio,
        skills,
        twitter,
        facebook,
        youtube,
        instagram,
        linkedin,
      })
    )
  }

  return landingCreate ? (
    <Spinner />
  ) : (
    <section className='container'>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <select
            name='status'
            onChange={(e) => {
              onChange(e)
            }}
            value={status}
          >
            <option value='0'>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Company'
            name='company'
            onChange={(e) => {
              onChange(e)
            }}
            value={company}
          />
          <small className='form-text'>
            Could be your own company or one you work for
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Website ex: https://example.com'
            name='website'
            onChange={(e) => {
              onChange(e)
            }}
            value={website}
          />
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            onChange={(e) => {
              onChange(e)
            }}
            value={location}
          />
          <small className='form-text'>
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Skills'
            name='skills'
            onChange={(e) => {
              onChange(e)
            }}
            value={skills}
          />
          <small className='form-text'>
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            name='githubusername'
            onChange={(e) => {
              onChange(e)
            }}
            value={githubusername}
          />
          <small className='form-text'>
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            onChange={(e) => {
              onChange(e)
            }}
            value={bio}
          ></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='my-2'>
          <button type='button' className='btn btn-light'>
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        <div className='form-group social-input'>
          <i className='fab fa-twitter fa-2x'></i>
          <input
            type='text'
            placeholder='Twitter URL'
            name='twitter'
            onChange={(e) => {
              onChange(e)
            }}
            value={twitter}
          />
        </div>

        <div className='form-group social-input'>
          <i className='fab fa-facebook fa-2x'></i>
          <input
            type='text'
            placeholder='Facebook URL'
            name='facebook'
            onChange={(e) => {
              onChange(e)
            }}
            value={facebook}
          />
        </div>

        <div className='form-group social-input'>
          <i className='fab fa-youtube fa-2x'></i>
          <input
            type='text'
            placeholder='YouTube URL'
            name='youtube'
            onChange={(e) => {
              onChange(e)
            }}
            value={youtube}
          />
        </div>

        <div className='form-group social-input'>
          <i className='fab fa-linkedin fa-2x'></i>
          <input
            type='text'
            placeholder='Linkedin URL'
            name='linkedin'
            onChange={(e) => {
              onChange(e)
            }}
            value={linkedin}
          />
        </div>

        <div className='form-group social-input'>
          <i className='fab fa-instagram fa-2x'></i>
          <input
            type='text'
            placeholder='Instagram URL'
            name='instagram'
            onChange={(e) => {
              onChange(e)
            }}
            value={instagram}
          />
        </div>
        <input
          type='submit'
          className='btn btn-primary my-1'
          onChange={(e) => {
            onChange(e)
          }}
        />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </section>
  )
}

export default EditProfileScreen
