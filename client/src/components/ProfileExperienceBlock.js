import React from 'react'
import Moment from 'react-moment'
const ProfileExperienceBlock = ({ experience }) => {
  return (
    <div className='profile-exp bg-white p-2'>
      <h2 className='text-primary'>Experience</h2>
      {experience && experience.length !== 0 ? (
        experience.map((exp, index) => (
          <div key={index + 1}>
            <h3 className='text-dark'>{exp?.company}</h3>
            <p>
              {exp.from && <Moment format='MMMM YYYY'>{exp.from}</Moment>} -{' '}
              {exp.to ? (
                <Moment format='MMMM YYYY'>{exp.to}</Moment>
              ) : (
                'Current'
              )}
            </p>
            <p>
              <strong>Position: </strong>
              {exp?.title}
            </p>
            <p>
              <strong>Description: </strong>
              {exp?.description}
            </p>
          </div>
        ))
      ) : (
        <span style={{ color: 'red', MarginTop: '20px' }}>
          No Experience Available
        </span>
      )}
    </div>
  )
}

export default ProfileExperienceBlock
