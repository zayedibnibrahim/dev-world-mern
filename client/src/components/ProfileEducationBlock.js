import React from 'react'
import Moment from 'react-moment'

const ProfileEducationBlock = ({ education }) => {
  return (
    <div className='profile-edu bg-white p-2'>
      <h2 className='text-primary'>Education</h2>
      {education && education.length !== 0 ? (
        education.map((edu) => (
          <div>
            <h3>{edu.school}</h3>
            <p>
              {edu.from && <Moment format='MMMM YYYY'>{edu.from}</Moment>} -{' '}
              {edu.to ? (
                <Moment format='MMMM YYYY'>{edu.to}</Moment>
              ) : (
                'Current'
              )}
            </p>
            <p>
              <strong>Degree: </strong>
              {edu.degree}
            </p>
            <p>
              <strong>Field Of Study: </strong>
              {edu.fieldofstudy}
            </p>
            <p>
              <strong>Description: </strong>
              {edu.description}
            </p>
          </div>
        ))
      ) : (
        <span style={{ color: 'red', MarginTop: '20px' }}>
          No Education Added
        </span>
      )}
    </div>
  )
}

export default ProfileEducationBlock
